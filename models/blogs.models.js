import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Blog = sequelize.define("blog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue : 0
  }
});

export default Blog;
