const formatDate = ({ post, upperCase }) => {
  let postDate = new Date(post.date);
  let options = { month: "long" };
  let longMonth = new Intl.DateTimeFormat("en-US", options).format(postDate);
  let dayOfMonth = String(postDate.getDate()).padStart(2, "0");
  let fullYear = postDate.getFullYear();

  return `${
    upperCase ? longMonth.toUpperCase() : longMonth
  } ${dayOfMonth}, ${fullYear}`;
};

export default formatDate;
