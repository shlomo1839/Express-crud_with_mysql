import mysql from 'mysql/promise';
import 'dotenv/config';
import { createPool } from 'mysql';



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    datbase: 'db'
})

async function setupDatabase() {
    try {
        `create table if no exsist setupDatabase(
        table name
        id (INT AUTO_INCREMENT PRIMARY KEY),
        title (varchar(200) not null),
        description (text),
        status (enum with pending, in_progress, completed),
        prioroty (enum with low, medum, high),
        created_at (timestamp defualt current_timestamp),
        updated_at (timestamp defualt current_timestamp on update current_timestamp)
    )`
    console.log("tasks table is ready")
    } catch (error) {
       console.error('Error creating table:', err.message);
    }
}





// export default connection