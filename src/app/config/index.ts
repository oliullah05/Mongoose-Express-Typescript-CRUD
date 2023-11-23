import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DatabaseUrl,
  bcrypt_solt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
