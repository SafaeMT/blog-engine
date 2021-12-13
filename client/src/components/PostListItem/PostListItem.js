import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function PostListItem({ post }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            by <span>{post.author}</span> - <span>{post.date}</span>
          </Typography>
          <Typography variant="body2" component="p">
            {post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
