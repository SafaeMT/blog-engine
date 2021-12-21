import React from "react";
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

  return (
    <Card square elevation={0} className={classes.card}>
      <CardActionArea>
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
            by <span className={classes.author}>{post.author}</span> -{" "}
            <span>{post.date}</span>
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
