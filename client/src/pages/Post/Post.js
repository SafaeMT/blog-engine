import { useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import formatDate from "../../lib/lib";

const useStyles = makeStyles((theme) => ({
  wrapperDiv: {
    display: "flex",
    margin: theme.spacing(5, 7),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(4, 6),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4, 2),
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 1),
    },
  },
  title: {
    marginTop: theme.spacing(5),
    fontWeight: 600,
    color: "#282C34",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  div: {
    margin: theme.spacing(1, 3, 1, 0),
    color: "#6D6D6D",
  },
  iconButton: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    color: "white",
    boxShadow: "3px 3px 5px #6D6D6D",
  },
  editButton: {
    backgroundColor: "#61dafb",
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "#61dafb",
    },
  },
  deleteButton: {
    backgroundColor: "red",
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "red",
    },
  },
  content: {
    margin: theme.spacing(5, "auto"),
    color: "black",
  },
  successAlert: {
    position: "fixed",
    marginRight: theme.spacing(3),
    bottom: theme.spacing(4),
    color: "green",
  },
}));

export default function Post() {
  const classes = useStyles();
  const [post, setPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successAlertVisibility, setSuccessAlertVisibility] =
    useState("hidden");
  let urlParams = useParams();
  let navigate = useNavigate();

  useLayoutEffect(() => {
    fetch(`/api/posts/${urlParams.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <>
      {!post ? (
        <NotFound />
      ) : (
        <div className={classes.wrapperDiv}>
          <Container>
            <Typography
              gutterBottom
              variant="h2"
              component="h1"
              className={classes.title}
            >
              {post.title}
            </Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="subtitle1"
                component="div"
                className={classes.div}
              >
                {formatDate({ post, upperCase: false })} - by {post.authorName}
              </Typography>
              <Box>
                <IconButton
                  aria-label="edit the post"
                  className={`${classes.iconButton} ${classes.editButton}`}
                >
                  <EditIcon fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  aria-label="delete the post"
                  className={`${classes.iconButton} ${classes.deleteButton}`}
                >
                  <ClearIcon fontSize="large" />
                </IconButton>
              </Box>
              <DeleteModal
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                }}
                onClick={handleClickModal}
              />
            </Box>
            <Typography
              variant="body1"
              component="p"
              className={classes.content}
            >
              {post.content}
            </Typography>
            <Box visibility={successAlertVisibility}>
              <Alert severity="success" className={classes.successAlert}>
                The post has been deleted !
              </Alert>
            </Box>
            <Collapse in={openErrorAlert}>
              <ErrorAlert
                errorMessage="An error has occurred ! Please try again later or refresh the page."
                onClick={() => {
                  setOpenErrorAlert(false);
                }}
              />
            </Collapse>
          </Container>
        </div>
      )}
    </>
  );

  function handleClickModal(e) {
    if (e.target.textContent === "CANCEL") {
      setOpenModal(false);
    } else if (e.target.textContent === "DELETE") {
      setOpenModal(false);
      fetch(`/api/posts/${post._id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) =>
          data.success ? handlePostDeletionSuccess() : setOpenErrorAlert(true)
        );
    }
  }

  function handlePostDeletionSuccess() {
    setSuccessAlertVisibility("visible");
    setTimeout(() => navigate("/"), 1000);
  }
}
