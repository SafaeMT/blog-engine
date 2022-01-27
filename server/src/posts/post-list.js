module.exports = function makePostList({ db }) {
  return {
    getRecentPosts,
    getPostByID,
  };

  async function getRecentPosts(limit) {
    const query = {};
    const options = {
      sort: { date: -1 },
      limit: Number(limit),
    };
    const cursor = db.collection("posts").find(query, options);
    if ((await cursor.count()) === 0) {
      console.log("No documents found");
    }

    return cursor.toArray();
  }

  function getPostByID(id) {
    const query = { _id: db.makeId(id) };
    return db.collection("posts").findOne(query);
  }
};
