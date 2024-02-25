import express from 'express';
import {getAllUserTodos,addTask,deleteTask,updateTask} from '../controllers/userController'; 
const router = express.Router();
router.get('/alltodos',getAllUserTodos)
router.post('/addtask',addTask);
router.delete('/deletetask/:id',deleteTask);
router.patch('/updtask',updateTask);




export default router;