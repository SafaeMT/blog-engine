import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    margin: theme.spacing(5, 7),
  },
  title: {
    margin: theme.spacing(5, "auto"),
    fontWeight: 600,
    color: "#282C34",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Container>
        <Typography variant="h2" component="h1" className={classes.title}>
          Recent Posts
        </Typography>
      </Container>
    </div>
  );
}
