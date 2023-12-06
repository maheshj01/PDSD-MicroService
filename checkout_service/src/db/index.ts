// db.ts

import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'checkout_service',
  password: 'your_db_password',
  port: 5432,
});

export default pool;