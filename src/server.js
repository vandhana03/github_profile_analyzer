require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const pool = require("./config/db");

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
})();