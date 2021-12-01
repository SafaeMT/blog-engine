import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Header() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="span">
            Blog-Engine
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
