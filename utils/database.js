import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sellersDatabase", "root", "Node@12345", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;