import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";


const validateRequest = (schema: AnyZodObject) => {

    console.log(schema);
    

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            
            await schema.parseAsync({
                body: req.body
            })
            next()
        } catch (error) {
           console.log(error);
           
            
        }
    }
}

export default validateRequest