import mysql from 'mysql/promise';
import 'dotenv/config';
import { createPool } from 'mysql';



const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    database: 'db'
})


async function setupDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
                priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        
        console.log("Tasks table is ready");
    } catch (error) {
        console.error(error);
    }
}

setupDatabase();

export default pool