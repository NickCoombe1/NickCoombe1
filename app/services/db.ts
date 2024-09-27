import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost', // or 'db' if you're using Docker Compose networking
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT ?? 3000)
});

export default pool;
