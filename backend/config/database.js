import Knex from 'knex'
import knexConfig from '../knexfile'
export const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])
