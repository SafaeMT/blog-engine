import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2, 0),
  },
  title: {
    fontWeight: 600,
    color: "#282C34",
  },
  div: {
    fontWeight: 400,
    color: "#6D6D6D",
  },
  author: {
    fontWeight: 500,
    color: "#282C34",
  },
  content: {
    textOverflow: "ellipsis",
  },
}));

export default function PostListItem({ post }) {
  const classes = useStyles();
  let navigate = useNavigate();

  function handleClick() {
    navigate(`/post/${post.id}`);
  }

  function formatDate() {
    let postDate = new Date(post.date);
    let options = { month: "long" };
    let longMonth = new Intl.DateTimeFormat("en-US", options).format(postDate);
    let dayOfMonth = String(postDate.getDate()).padStart(2, "0");
    let fullYear = postDate.getFullYear();

    return `${longMonth.toUpperCase()} ${dayOfMonth}, ${fullYear}`;
  }

  return (
    <Card square elevation={0} className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            className={classes.div}
          >
            <span>{formatDate()}</span>
            <br />
            by <span className={classes.author}>{post.authorName}</span>
          </Typography>
          <Typography
            noWrap
            variant="body2"
            component="p"
            className={classes.content}
          >
            {post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
