import { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
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
  title: {
    margin: theme.spacing(5, 0, 7, 0),
    fontWeight: 600,
    color: "#282C34",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0, 6, 0),
    },
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(2, 0, 6, 0),
    fontWeight: 600,
    color: "#282C34",
    backgroundColor: "#61dafb",
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "#61dafb",
    },
    boxShadow: "3px 3px 5px #6D6D6D",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 4, 0),
    },
  },
}));

export default function AddPost() {
  const classes = useStyles();
  const [titleValue, setTitleValue] = useState("");
  const [isBlurredTitle, setIsBlurredTitle] = useState(false);
  const [isChangedTitle, setIsChangedTitle] = useState(false);
  const [titleFeedback, setTitleFeedback] = useState({
    isValid: false,
    errorMessage: null,
  });
  const [contentValue, setContentValue] = useState("");
  const [isBlurredContent, setIsBlurredContent] = useState(false);
  const [isChangedContent, setIsChangedContent] = useState(false);
  const [contentFeedback, setContentFeedback] = useState({
    isValid: false,
    errorMessage: null,
  });

  return (
    <div className={classes.wrapperDiv}>
      <Container>
        <Typography variant="h2" component="h1" className={classes.title}>
          Add a New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            defaultValue="Admin"
            fullWidth
            disabled
            className={classes.textField}
          />
          <TextField
            label="Title"
            variant="outlined"
            error={(isChangedTitle || isBlurredTitle) && !titleFeedback.isValid}
            helperText={titleFeedback.errorMessage}
            value={titleValue}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            required
            fullWidth
            multiline
            autoFocus
            className={classes.textField}
          />
          <TextField
            label="Content"
            variant="outlined"
            error={
              (isChangedContent || isBlurredContent) && !contentFeedback.isValid
            }
            helperText={contentFeedback.errorMessage}
            value={contentValue}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            required
            fullWidth
            multiline
            className={classes.textField}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={!titleFeedback.isValid || !contentFeedback.isValid}
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );

  function handleTitleChange(e) {
    setIsChangedTitle(true);
    setTitleValue(e.target.value);
    validateTitle(e.target.value);
  }

  function validateTitle(value) {
    const regex = /^[A-Za-z0-9 _\-\.,'"?!/]{1,200}$/;

    if (value.trim() === "" || !regex.test(value)) {
      setTitleFeedback({
        isValid: false,
        errorMessage: "Please enter a valid title.",
      });
    } else {
      setTitleFeedback({ isValid: true, errorMessage: null });
    }
  }

  function handleTitleBlur() {
    if (!isChangedTitle) {
      setIsBlurredTitle(true);
      setTitleFeedback({
        isValid: false,
        errorMessage: "Please enter a valid title.",
      });
    }
  }

  function handleContentChange(e) {
    setIsChangedContent(true);
    setContentValue(e.target.value);
    validateContent(e.target.value);
  }

  function validateContent(value) {
    const regex = /^[A-Za-z0-9 _\-\.,;:'"`?!/()&#@$*%<>]{1,12000}$/;

    if (value.trim() === "" || !regex.test(value)) {
      setContentFeedback({
        isValid: false,
        errorMessage: "Please enter a valid content.",
      });
    } else {
      setContentFeedback({ isValid: true, errorMessage: null });
    }
  }

  function handleContentBlur() {
    if (!isChangedContent) {
      setIsBlurredContent(true);
      setContentFeedback({
        isValid: false,
        errorMessage: "Please enter a valid content.",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const postData = {
      title: titleValue,
      content: contentValue,
      authorName: "Admin",
    };

    fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  }
}
