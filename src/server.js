require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
