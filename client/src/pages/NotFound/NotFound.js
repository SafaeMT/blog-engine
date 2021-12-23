import { Link as RouterLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapperDiv: {
    display: "flex",
    margin: theme.spacing(5, 7),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(5, 6),
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(5, 2),
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(5, 1),
    },
  },
  notFound: {
    margin: theme.spacing(5, "auto"),
    fontWeight: 600,
    color: "#282C34",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, "auto"),
    },
  },
  homeLink: {
    fontWeight: 300,
    color: "#6D6D6D",
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.wrapperDiv}>
      <Container>
        <Typography variant="h2" component="h1" className={classes.notFound}>
          Page Not Found
        </Typography>
        <Link
          component={RouterLink}
          to="/"
          variant="h6"
          className={classes.homeLink}
        >
          Return to the homepage
        </Link>
      </Container>
    </div>
  );
}
