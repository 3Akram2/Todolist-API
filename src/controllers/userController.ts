import { Request,Response } from "express"
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()
interface AuthenticatedRequest extends Request {
    user?: any; 
}

export const getAllUserTodos = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.userID; 
    console.log(userId)
    try {
        // Find all todos belonging to the user
        const userTodos = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        });

        // Send the user's todos as a response
        res.status(200).json({ todos: userTodos });
    } catch (error) {
        console.error("Error fetching user todos:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const addTask = async (req:AuthenticatedRequest,res:Response) =>{
   const userId =  req.user.userID;
   const {title} = req.body
   try {
    const newTask = await prisma.todo.create({
        data:{
            title:title,
            userId:userId
        }
    })
    
    res.status(200).json({ newTask: newTask });
    
   } catch (error) {
    console.log(error)
   }

}
export const deleteTask = async (req:AuthenticatedRequest,res:Response) =>{
    
    const taskId = req.params.id;
    console.log(taskId)
    try {
        await prisma.todo.delete({
            where: {
                id: taskId
            }
        });

        // Fetch the remaining todos for the user
        const userId = req.user.userID;
        const userTodos = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        });

        // Send the updated list of todos
        res.status(200).json({ todos: userTodos });
     
    } catch (error) {
     console.log(error)
    }
 
 }
 export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
    const { taskId } = req.body;
    console.log('taskId',taskId);
    try {
        // Find the todo
        const todo = await prisma.todo.findUnique({
            where: {
                id: taskId
            }
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Toggle the completed attribute
        const updatedTodo = await prisma.todo.update({
            where: {
                id: taskId
            },
            data: {
                completed: !todo.completed 
            }
        });

        // Send the updated todo as a response
        res.status(200).json({ updatedTask: updatedTodo });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
