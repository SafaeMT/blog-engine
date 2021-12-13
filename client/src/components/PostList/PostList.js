import React from "react";
import PostListItem from "../PostListItem/PostListItem";
import Grid from "@material-ui/core/Grid";

export default function PostList({ posts }) {
  return (
    <Grid container>
      {posts.map((post) => {
        return (
          <Grid item key={post.id} xs={4}>
            <PostListItem post={post} />
          </Grid>
        );
      })}
    </Grid>
  );
}
