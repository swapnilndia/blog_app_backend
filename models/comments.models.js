import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likedBy: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
});

export default Comment
