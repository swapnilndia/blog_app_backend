import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import UserRouter from "./routes/user.routes.js";
import BlogRouter from "./routes/blogs.routes.js";
import sequelize from "./utils/database.js";
import User from "./models/users.models.js";
import Blog from "./models/blogs.models.js";
import Comment from "./models/comments.models.js";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Hello Swapnil</h1>");
});

app.use("/user", UserRouter);
app.use("/blog", BlogRouter);

Blog.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Blog);

Comment.belongsTo(Blog, { constraints: true, onDelete: "CASCADE" });
Blog.hasMany(Comment);

Comment.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Comment);

sequelize
  .sync({force: true})
  // .sync()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
