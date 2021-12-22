import React from "react";
import Logo from "../Logo/Logo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    height: "60px",
    padding: "0px 50px",
    color: "#61dafb",
    backgroundColor: "#20232a",
    [theme.breakpoints.down("md")]: {
      height: "50px",
      padding: "0px 40px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px 10px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "40px",
      padding: "0px",
    },
  },
  toolBar: {
    minHeight: "60px",
    [theme.breakpoints.down("md")]: {
      minHeight: "50px",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "40px",
    },
  },
  logo: {
    fontSize: "40px",
  },
  brandText: {
    paddingLeft: "2px",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
}));

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
