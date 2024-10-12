import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'login',
  password: '  ',// Set Your Password
  port: 5432,
});

async function query(text, params) {
  const client = await pool.connect();
  const result = await client.query(text, params);
  client.release();
  return result;
}

export { query };
