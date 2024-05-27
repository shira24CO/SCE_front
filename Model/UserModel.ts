
import UserApi from "../api/UserApi"

export type User = {
    _id: string,
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    userImageUrl: string
    userYear:String,
    userCountry:String,
    userInstitution:String
} 

const getUserById = async(userId:string) =>{
    const resGet:any = await UserApi.getUser(userId);
    return resGet;
}

const updateUserData = async(userId:string,age?:string,country?:string,profileImage?:string) =>{
    const resUpdate = await UserApi.updateUser(userId,age,country,profileImage)
}

export default {getUserById,updateUserData}