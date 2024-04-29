import Blog from "../models/blogs.models.js";
import Comment from "../models/comments.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
// Create New Blog
export const create_Blog = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  try {
    const newBlog = await Blog.create({
      title,
      description,
      userId: userId,
    });
    if (!newBlog) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    return res.status(200).json({ msg: "blog createds", data: newBlog });
  } catch (error) {
    res.status(500).json({ msg: "blog not createds", error: error });
  }
};

// Get list of Blog
export const get_All_Blogs = async (req, res) => {
  const userId = req.userId;
  try {
    const blogList = await Blog.findAll();
    if (!blogList) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res
      .status(200)
      .json({ msg: "list of blog successfully retrived", data: blogList });
  } catch (error) {
    res.status(500).json({ msg: "blog not createds", error: error });
  }
};

// Get Specific blog
export const get_Specific_Blog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByPk(blogId);
    console.log(blog);
    if (!blog) {
      return res
        .status(404)
        .json(
          new ApiError(
            401,
            "Blog Not Found",
            `Blog with ID ${blogId} does not exist`
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(500, "Success", `Fetched Blog details`, blog));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", `Something went wrong`));
  }
};

// Update specific blog
export const update_Blog = async (req, res) => {
  const { title, description } = req.body;
  const { blogId } = req.params;
  console.log(blogId);
  try {
    const blog = await Blog.update(
      {
        title,
        description,
      },
      {
        where: {
          id: blogId,
        },
      }
    );
    console.log(blog, "hellow guys");
    if (blog[0] === 0) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res.status(200).json({ msg: "blog successfully updated", data: blog });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error: error });
  }
};

// Delete blog
export const delete_Blog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        id: blogId,
      },
    });
    console.log(deleteBlog);
    if (!deleteBlog) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res
      .status(200)
      .json({ msg: "blog successfully deleted", data: deleteBlog });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error: error });
  }
};

// Add comment to blog
export const add_New_Comment = async (req, res) => {
  const userId = req.userId
  const { blogId } = req.params;
  const { description } = req.body;

  try {
    const newComment = await Comment.create({ description, blogId, userId });
    if (!newComment) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    return res.status(200).json({ msg: "comment added", data: newComment });
  } catch (error) {
    res.status(500).json({ msg: "comment not added", error: error });
  }
};

// Add comment of blog
export const get_Comments = async (req, res) => {
  const { blogId } = req.params;

  try {
    const listOfComments = await Comment.findAll({ where: { blogId: blogId } });
    if (!listOfComments) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ msg: "comment list retrived", data: listOfComments });
  } catch (error) {
    res.status(500).json({ msg: "comment list not found", error: error });
  }
};

// Delete specific comment from the blog
export const delete_Comment = async (req, res) => {
  const { blogId, commentId } = req.params;
  try {
    const deletedComment = await Comment.destroy({ where: { id: commentId } });
    if (!deletedComment) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res
      .status(200)
      .json({ msg: "comment successfully deleted", data: deletedComment });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error: error });
  }
};

// Update comment in blog
export const update_Comment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { description } = req.body;
  try {
    const updatedComment = await Comment.update(
      { description },
      { where: { id: commentId } }
    );
    if (!updatedComment) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res
      .status(200)
      .json({ msg: "comment successfully updated", data: updatedComment });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error: error });
  }
};
