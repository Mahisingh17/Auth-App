import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "auth_user",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "auth_db",
  waitForConnections: true,
  connectionLimit: 10,  
  queueLimit: 0
});

export const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
};
