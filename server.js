import express from 'express';
import 'dotenv/config'
import taskRoutes from './routers/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server runing on http://;localhost: ${PORT}`)
});