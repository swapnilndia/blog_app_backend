import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImageUrl: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null as image can be added later
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userRole: {
    type: DataTypes.ENUM,
    values: ["ADMIN", "USER"],
    defaultValue: "USER",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  accessToken: {
    type: DataTypes.STRING, // Store access token as a string
    allowNull: true, // Allow null as tokens will be added later
  },
  refreshToken: {
    type: DataTypes.STRING, // Store refresh token as a string
    allowNull: true, // Allow null as tokens will be added later
  },
});

export default User;
