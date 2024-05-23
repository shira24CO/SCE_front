
import UserApi from "../api/UserApi"

export type User = {
    _id: string,
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    imageUrl: string
    userYear:String,
    userCountry:String,
    userInstitution:String
} 

const getUserName = async(userId:string) =>{
    const res:any = await UserApi.getUser(userId);
    return res.firstName + " " + res.lastName;
}

export default {getUserName}