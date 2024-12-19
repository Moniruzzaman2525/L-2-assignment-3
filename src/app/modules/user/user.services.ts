import { TUser } from "./user.interface";
import { User } from "./user.mode";


const createUserIntoDB = async (payload: TUser) => {
    try {
        const newUser = await User.create(payload)
        console.log(payload);
        console.log(newUser);
        
        return newUser
    } catch (error) {
        console.log(error);
        
    }
}

export const userServices = {
    createUserIntoDB
}