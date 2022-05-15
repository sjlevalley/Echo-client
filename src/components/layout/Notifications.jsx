import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI
import Badge from "@material-ui/core/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
// Components
import { userActionsMarkNotificationsRead } from "../../redux/user/userActions";

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.notifications);
  const [anchorEl, setAnchorEl] = useState(null);
  dayjs.extend(relativeTime);

  const handleOpen = (e) => {
    setAnchorEl(() => e.target);
  };
  const handleClose = () => {
    setAnchorEl(() => null);
  };
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications.filter((n) => !n.read);
    unreadNotificationsIds = unreadNotificationsIds.map(
      (n) => n.notificationId
    );
    dispatch(userActionsMarkNotificationsRead(unreadNotificationsIds));
  };

  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    const unreadNotifications = notifications.filter((n) => n.read === false);
    const unreadLength = unreadNotifications.length;
    if (unreadLength > 0) {
      notificationsIcon = (
        <Badge badgeContent={unreadLength} color="secondary">
          <NotificationsIcon />
        </Badge>
      );
    } else {
      notificationsIcon = <NotificationsIcon />;
    }
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((n) => {
        const verb = n.type === "like" ? "liked" : "commented on";
        const time = dayjs(n.createdAt).fromNow;
        const iconColor = n.read ? "primary" : "error";
        const icon =
          n.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={n.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${n.recipient}/broadcast/${n.broadcastId}`}
            >
              {n.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {notificationsIcon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionProps={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
}

export default Notifications;
