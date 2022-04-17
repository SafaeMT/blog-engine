import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(0, "auto"),
    padding: theme.spacing(2, 4),
    color: "#282C34",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
  },
  modalTitle: {
    fontWeight: 500,
  },
  cancelButton: {
    color: "#61dafb",
  },
  deleteButton: {
    color: "red",
  },
}));

export default function DeleteModal(props) {
  const classes = useStyles();

  return (
    <Modal open={props.open} onClose={props.onClose} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h4" className={classes.modalTitle}>
          Delete confirmation
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
          Are you sure you want to delete this post ? This operation cannot be
          undone.
        </Typography>
        <Box display="flex" justifyContent="end">
          <Button onClick={props.cancel} className={classes.cancelButton}>
            CANCEL
          </Button>
          <Button className={classes.deleteButton}>DELETE</Button>
        </Box>
      </Paper>
    </Modal>
  );
}
