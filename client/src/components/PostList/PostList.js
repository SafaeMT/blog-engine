import React, { useState, useEffect } from "react";
import PostListItem from "../PostListItem/PostListItem";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  gridItem: {
    borderTop: "1px dotted #D0D0D0",
  },
});

export default function PostList() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts?limit=9")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Grid container spacing={2}>
      {posts.map((post) => {
        return (
          <Grid
            item
            key={post.id}
            xs={12}
            sm={6}
            md={4}
            className={classes.gridItem}
          >
            <PostListItem post={post} />
          </Grid>
        );
      })}
    </Grid>
  );
}
