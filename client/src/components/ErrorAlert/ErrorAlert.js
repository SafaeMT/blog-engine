import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  errorAlert: {
    position: "fixed",
    marginRight: theme.spacing(3),
    bottom: theme.spacing(4),
    color: "red",
  },
}));

export default function ErrorAlert(props) {
  const classes = useStyles();

  return (
    <Alert
      className={classes.errorAlert}
      severity="error"
      action={
        <IconButton
          aria-label="close the alert"
          color="inherit"
          size="small"
          onClick={props.onClick}
        >
          <CloseIcon />
        </IconButton>
      }
    >
      {props.errorMessage}
    </Alert>
  );
}
