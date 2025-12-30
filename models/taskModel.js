import db from '../config/db.js';

const Task = {
    findAll: async () => {
        const [rows] = await db.query('select * from tasks order by created_at desc');
        return rows;
    },

    findById: async () => {
        const [rows] = await db.query('selest * from tasks where id = ?', [id]);
        return rows[0]
    },

    create: async (data) => {
        const { title, description, status, priority } = data;
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, status, priority) values (?, ?, ?, ?)',
            [title, description || null, status || 'pending', priority || 'medium']
        );
        //  auto id
        return result.insertId;
    },

    update: async () => {
        const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(data), id]
        const [result] = await db.query(`UPDATE tasks SET ${fields} WHERE ID = ?`, [id]);
        return result.affectedRows > 0;
    },

    search: async (term) => {
        const q = `%${term}%`;
        const [rows] = await db.query(
            'SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ?',
            [q, q]
        );
        return rows;
    },

    getStats: async () => {
    const [rows] = await db.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress
      FROM tasks
    `);
    return rows[0];
  }
};

export default Task;
