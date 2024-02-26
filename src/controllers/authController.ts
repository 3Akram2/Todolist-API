import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/generateToken'

const prisma = new PrismaClient()

export const register = async (req:Request,res:Response ) => {
 const {email,password} = req.body;
  try {
    const isUserAlreadyExists = await prisma.user.findUnique({
        where:{
        email:email
        }
    })
    if(isUserAlreadyExists){
        console.log('user already exists')
       return res.status(401).json({ msg:'user already exists' })
    }
    const encryptedPassword = await bcrypt.hash(password,10) 
    const newUser = await prisma.user.create({
        data:{
        email:email,
        password:encryptedPassword
    }
    });
    res.status(200).json({ msg:'registerd successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Somthing Went Wrong' });
  }
}
export const login = async (req:Request,res:Response)=>{
const {email,password} =req.body;
try {
    const currentUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    });
 if(!currentUser){
    return res.status(404).send({user:'user does not exist'})
 }
 const isPasswordValid = await bcrypt.compare(password, currentUser.password);
 if (!isPasswordValid) {
    return res.status(401).json({ message: 'Incorrect email or password' });
}
const token = generateToken(currentUser.id);
res.status(200).json({ user: currentUser, token: token });
} catch (error) {
    console.error('Error occurred while logging in:', error);
    res.status(400).json({ message: 'Somthing Went Wrong' });
}
}