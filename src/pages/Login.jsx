import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../images/icon.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Components
import { login } from "../redux/user/userActions";
import { clearError } from "../redux/ui/uiSlice";

const useStyles = makeStyles((theme) => ({
  form: theme.form,
  image: theme.image,
  textField: theme.textField,
  pageTitle: theme.pageTitle,
  button: { ...theme.button, float: "none" },
  customError: theme.customError,
  progress: theme.progress,
}));

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errors = useSelector((state) => state.ui.errors);
  const loading = useSelector((state) => state.ui.loading);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    dispatch(clearError({}));
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData, navigate));
  };

  const handleChange = (e) => {
    dispatch(clearError({}));
    if (e?.target.name === "email") setEmail(() => e?.target.value);
    if (e?.target.name === "password") setPassword(() => e?.target.value);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="icon" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            helperText={errors?.email}
            error={errors?.email ? true : false}
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            id="password"
            name="password"
            helperText={errors?.password}
            error={errors?.password ? true : false}
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {errors?.e && (
            <Typography variant="body2" className={classes.customError}>
              {errors?.e}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} className={classes.progress} />
            ) : (
              "Login"
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/signup">Here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Login;
