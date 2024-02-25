import jwt from 'jsonwebtoken';

const generateToken = (userID:string) =>{
    try {
        const jwtSecret:string = process.env.JWT_SECRET as string
   
        const token = jwt.sign({userID},jwtSecret,{
            expiresIn:'30d'
        });

        console.log('Generated Token:', token);
       return token
        
        
    } catch (error) {
        console.error('Error generating token:', error);
    }
    


}
export default generateToken