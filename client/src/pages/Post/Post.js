import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import data from "../../data.js";

export default function Post() {
  const [post, setPost] = useState({});
  let urlParams = useParams();

  useEffect(() => {
    let [filteredPost] = data.posts.filter((post) => post.id == urlParams.id);
    setPost(filteredPost);
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1">
        {post.title}
      </Typography>
      <Typography variant="subtitle1" component="div">
        {post.date} - by {post.author}
      </Typography>
      <Typography variant="body1" component="p">
        {post.content}
      </Typography>
    </Container>
  );
}
