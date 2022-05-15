
export const appPageTheme = {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '0px auto'
  },
  textField: {
    margin: '10px auto'
  },
  pageTitle: {
    margin: '10px auto'
  },
  button: {
    margin: '20px auto',
    float: 'right',
    position: 'relative',
    width: '100px'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    margin: '10px 0 0 0'
  },
  progress: {},
  card: {
    display: "flex",
    marginBottom: 10,
  },
  span: {
    fontSize: "12px",
  },
  broadcastCardImage: {
    minWidth: 200,
  },
  container: {
    marginLeft: "-10px",
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  btnContainer: {
    marginLeft: "auto",
    marginTop: "auto",
    height: "fit-content",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    maxWidth: "100%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "relative",
    left: "92%",
    width: "50px",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
  deleteButton: {
    left: "75%",
    top: "65%",
    position: "absolute",
  },
  submitButton: {
    float: "right",
    margin: "1rem 0",
  },
  progressSpinner: {
    position: "absolute",
  },
  editDetailsBtn: {
    float: "right",
  },
  paper: {
    padding: 20,
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
    "& button": {
      position: "absolute",
      top: "80%",
      left: "70%",
    },
  },
  profileDetails: {
    textAlign: "center",
    "& span, svg": {
      verticalAlign: "middle",
    },
    "& a": {
      color: "#00bcd4",
    },
  },
  hr: {
    border: "none",
    margin: "0 0 10px 0",
  },
  profileBtn: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  userNameLink: {
    textDecoration: "none !important",
  },
}
