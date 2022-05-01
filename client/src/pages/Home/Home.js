import { useNavigate } from "react-router-dom";
import PostList from "../../components/PostList/PostList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  div: {
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
  title: {
    margin: theme.spacing(5, 0),
    fontWeight: 600,
    color: "#282C34",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0),
    },
  },
  iconButton: {
    zIndex: 1000,
    position: "fixed",
    top: theme.spacing(19),
    right: theme.spacing(11),
    padding: theme.spacing(1),
    color: "white",
    backgroundColor: "#61dafb",
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "#61dafb",
    },
    border: "1px solid #61dafb",
    boxShadow: "3px 3px 5px #6D6D6D",
    [theme.breakpoints.down("md")]: {
      top: theme.spacing(17),
      right: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      top: "auto",
      bottom: theme.spacing(6),
      right: theme.spacing(6),
    },
    [theme.breakpoints.down("xs")]: {
      top: "auto",
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <div className={classes.div}>
      <Container>
        <Typography variant="h2" component="h1" className={classes.title}>
          Recent Posts
        </Typography>
        <IconButton
          onClick={() => navigate("/add-post")}
          aria-label="add a new post"
          className={classes.iconButton}
        >
          <PostAddIcon fontSize="large" />
        </IconButton>
        <PostList />
      </Container>
    </div>
  );
}
