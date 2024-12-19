// import { Auth } from "./auth.model";

// const findLastStudentId = async () => {
//     const lastUser = await Auth.findOne({
//         role: 'user'
//     }, {
//         id: 1,
//         _id: 0
//     }).sort({ createdAt: -1 }).lean()
//     return lastUser?.id ? lastUser.id : undefined
// }
// export const generatedStudentId = async () => {
//     const lastStudentId = await findLastStudentId()
//     let currentId = (0).toString()

//     if (lastStudentId) {
//         currentId = (Number(lastStudentId) + 1).toString().padStart(4, '0')
//     } else {
//         currentId = "0001"
//     }

//     return currentId
// }
