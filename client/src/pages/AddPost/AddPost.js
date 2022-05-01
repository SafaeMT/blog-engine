import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapperDiv: {
    display: "flex",
    margin: theme.spacing(5, 7),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(5, 6),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(5, 2),
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(5, 1),
    },
  },
  title: {
    margin: theme.spacing(5, 0, 7, 0),
    fontWeight: 600,
    color: "#282C34",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0, 6, 0),
    },
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(2, 0, 6, 0),
    fontWeight: 600,
    color: "#282C34",
    backgroundColor: "#61dafb",
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "#61dafb",
    },
    boxShadow: "3px 3px 5px #6D6D6D",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 4, 0),
    },
  },
}));

export default function AddPost() {
  const classes = useStyles();

  return (
    <div className={classes.wrapperDiv}>
      <Container>
        <Typography variant="h2" component="h1" className={classes.title}>
          Add a New Post
        </Typography>
        <form>
          <TextField
            label="Name"
            variant="outlined"
            required
            fullWidth
            autoFocus
            className={classes.textField}
          />
          <TextField
            label="Title"
            variant="outlined"
            required
            fullWidth
            multiline
            className={classes.textField}
          />
          <TextField
            label="Content"
            variant="outlined"
            required
            fullWidth
            multiline
            className={classes.textField}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              disabled
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}
