import 'dotenv/config';

const config = {
  getPort: () => {
    return process.env.PORT;
  },
  getDatabaseConfig: () => ({
    database:process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  })
}

export default config;