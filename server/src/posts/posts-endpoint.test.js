const makePostHandlers = require("./posts-endpoint");

describe("Posts Endpoint", () => {
  let fakePostList;
  let postHandlers;
  let fakeRes;

  beforeEach(() => {
    fakeRes = {
      status: jest.fn(() => fakeRes),
      send: jest.fn(),
      end: jest.fn(),
    };
    fakePostList = {
      getRecentPosts: jest.fn(),
      getPostByID: jest.fn(),
      createPost: jest.fn(),
      deletePostByID: jest.fn(),
    };
    postHandlers = makePostHandlers({ postList: fakePostList });
  });

  describe("Handle Get Posts", () => {
    it("successfully gets posts", async () => {
      // Step 1: Arrange
      const fakeReq = { query: { limit: "3" } };
      const fakePosts = [
        { title: "fakePost_1" },
        { title: "fakePost_2" },
        { title: "fakePost_3" },
      ];
      fakePostList.getRecentPosts.mockReturnValue(fakePosts);

      // Step 2: Act
      await postHandlers.handleGetPosts(fakeReq, fakeRes);

      // Step 3: Assert
      expect(fakePostList.getRecentPosts.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls.length).toBe(1);
      expect(fakeRes.send.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls[0][0]).toBe(200);
      expect(fakeRes.send.mock.calls[0][0]).toEqual(fakePosts);
    });

    it("errors when limit is incorrect", async () => {
      const fakeReqs = [
        { query: {} },
        { query: { limit: "" } },
        { query: { limit: "hrfherfb" } },
        { query: { limit: "0" } },
        { query: { limit: "-5" } },
      ];

      await Promise.all(
        fakeReqs.map((fakeReq) => postHandlers.handleGetPosts(fakeReq, fakeRes))
      );

      expect(fakePostList.getRecentPosts.mock.calls.length).toBe(0);
      expect(fakeRes.status.mock.calls.length).toBe(fakeReqs.length);
      expect(fakeRes.end.mock.calls.length).toBe(fakeReqs.length);
      expect(fakeRes.status.mock.calls.map((call) => call[0])).toEqual(
        Array(fakeReqs.length).fill(400)
      );
    });
  });

  describe("Handle Get Post By ID", () => {
    it("successfully gets the post by its ID", async () => {
      const fakeReq = { params: { id: "23bfe45cd831a" } };
      const fakePost = { _id: "23bfe45cd831a", title: "Fake Post" };
      fakePostList.getPostByID.mockReturnValue(fakePost);

      await postHandlers.handleGetPostByID(fakeReq, fakeRes);

      expect(fakePostList.getPostByID.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls.length).toBe(1);
      expect(fakeRes.send.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls[0][0]).toBe(200);
      expect(fakeRes.send.mock.calls[0][0]).toEqual(fakePost);
    });

    it("sends 'undefined' when the post is not found", async () => {
      const fakeReq = { params: { id: "23bf" } };
      fakePostList.getPostByID.mockReturnValue(undefined);

      await postHandlers.handleGetPostByID(fakeReq, fakeRes);

      expect(fakePostList.getPostByID.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls.length).toBe(1);
      expect(fakeRes.send.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls[0][0]).toBe(200);
    });
  });

  describe("Handle Create Post", () => {
    it("successfully creates a new post", async () => {
      const fakeReq = {
        body: {
          title: "Fake title",
          content: "Fake content",
          authorName: "Fake author name",
        },
      };

      await postHandlers.handleCreatePost(fakeReq, fakeRes);

      expect(fakePostList.createPost.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls.length).toBe(1);
      expect(fakeRes.send.mock.calls.length).toBe(1);
      expect(fakeRes.status.mock.calls[0][0]).toBe(200);
    });

    it("errors when post info is not valid", async () => {
      const fakeReqs = [
        { body: { title: "Title 1", authorName: "Author name 1" } },
        { body: { title: "Title 2", content: "Content 2", authorName: true } },
        {
          body: {
            title: "",
            content: "Content 3",
            authorName: "Author name 3",
          },
        },
      ];

      await Promise.all(
        fakeReqs.map((fakeReq) =>
          postHandlers.handleCreatePost(fakeReq, fakeRes)
        )
      );

      expect(fakePostList.createPost.mock.calls.length).toBe(0);
      expect(fakeRes.status.mock.calls.length).toBe(fakeReqs.length);
      expect(fakeRes.end.mock.calls.length).toBe(fakeReqs.length);
      expect(fakeRes.status.mock.calls.map((call) => call[0])).toEqual(
        Array(fakeReqs.length).fill(422)
      );
    });
  });

  describe("Handle Delete Post by ID", () => {
    it("responds accordingly after deleting a post", async () => {
      const fakeReq = { params: { id: "ea631d8" } };
      fakePostList.deletePostByID.mockReturnValue(true);

      await postHandlers.handleDeletePostByID(fakeReq, fakeRes);

      expect(fakePostList.deletePostByID.mock.calls.length).toBe(1);
      expect(fakePostList.deletePostByID.mock.calls[0][0]).toBe(
        fakeReq.params.id
      );
      expect(fakeRes.send.mock.calls.length).toBe(1);
      expect(fakeRes.send.mock.calls[0][0]).toStrictEqual({ success: true });
    });

    it("responds accordingly when not finding a post to delete", async () => {
      const fakeReq = { params: { id: "ea631d9" } };
      fakePostList.deletePostByID.mockReturnValue(false);

      await postHandlers.handleDeletePostByID(fakeReq, fakeRes);

      expect(fakePostList.deletePostByID.mock.calls.length).toBe(1);
      expect(fakePostList.deletePostByID.mock.calls[0][0]).toBe(
        fakeReq.params.id
      );
      expect(fakeRes.send.mock.calls.length).toBe(1);
      expect(fakeRes.send.mock.calls[0][0]).toStrictEqual({ success: false });
    });
  });
});
