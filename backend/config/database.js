import knexConfig from "../knexfile";
const knex = require("knex")(knexConfig.development);
export default knex(knexConfig[process.env.NODE_ENV || "local"]);
