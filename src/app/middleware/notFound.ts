import { NextFunction, Request, Response } from "express";


export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: 'Route not found'
    })
}