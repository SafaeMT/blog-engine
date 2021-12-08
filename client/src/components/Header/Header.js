import React from "react";
import Logo from "../Logo/Logo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    position: "sticky",
    height: "60px",
    padding: "0px 50px",
    color: "#61dafb",
    backgroundColor: "#20232a",
  },
  toolBar: {
    minHeight: "60px",
  },
  logo: {
    fontSize: "40px",
  },
  brandText: {
    paddingLeft: "2px",
    fontWeight: 700,
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Logo className={classes.logo} />
        <Typography variant="h6" component="span" className={classes.brandText}>
          Blog-Engine
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
