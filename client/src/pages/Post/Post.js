import { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
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
    padding: theme.spacing(1),
    color: "red",
    border: "1px solid red",
  },
  content: {
    margin: theme.spacing(5, "auto"),
    color: "black",
  },
}));

export default function Post() {
  const classes = useStyles();
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(false);
  let urlParams = useParams();

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
              <IconButton
                onClick={openModal}
                aria-label="delete the post"
                className={classes.iconButton}
              >
                <ClearIcon fontSize="large" />
              </IconButton>
              <DeleteModal
                open={open}
                onClose={closeModal}
                cancel={closeModal}
              />
            </Box>
            <Typography
              variant="body1"
              component="p"
              className={classes.content}
            >
              {post.content}
            </Typography>
          </Container>
        </div>
      )}
    </>
  );

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
}
