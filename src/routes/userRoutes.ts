import express from 'express';
import {getAllUserTodos,addTask,deleteTask,updateTask} from '../controllers/userController'; 
const router = express.Router();
router.get('/todos',getAllUserTodos)
router.post('/todos',addTask);
router.delete('/todos/:id',deleteTask);
router.patch('/todos',updateTask);




export default router;