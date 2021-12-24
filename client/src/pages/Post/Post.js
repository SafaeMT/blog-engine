import { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import data from "../../data.js";

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
    color: "#6D6D6D",
  },
  content: {
    margin: theme.spacing(5, "auto"),
    color: "black",
  },
}));

export default function Post() {
  const classes = useStyles();
  const [post, setPost] = useState({});
  let urlParams = useParams();

  useLayoutEffect(() => {
    let [filteredPost] = data.posts.filter((post) => post.id == urlParams.id);
    if (filteredPost) {
      setPost(filteredPost);
    }
  }, []);

  return (
    <>
      {Object.keys(post).length === 0 ? (
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
            <Typography
              variant="subtitle1"
              component="div"
              className={classes.div}
            >
              {post.date} - by {post.author}
            </Typography>
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
}
