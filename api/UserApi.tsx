
import ApiClient from "./ClientApi";

const getUser = async(id:string) =>{
    const getResponse = await ApiClient.get("/user/"+id);
    if (getResponse.ok) {
        return getResponse.data;
    } else {
        console.error("Failed to fetch user:", getResponse.problem);
        throw new Error("Failed to fetch user");
    }
}

const updateUser = async(id:string,year?:string,country?:string,profileImage?:string) =>{
    const updateResponse = await ApiClient.put("/user/" + id, { userYear: year, userCountry: country, userImageUrl: profileImage });
    if (updateResponse.ok) {
        return updateResponse.data;
    } else {
        console.error("Failed to update user:", updateResponse.problem);
        throw new Error("Failed to update user");
    }
}

const logOutUser = async(refreshToken:string)=>{
    ApiClient.setHeaders({ 'authorization': 'bearer ' + refreshToken });
    const res = await ApiClient.get("/auth/logout");
    if (res.ok) {
        console.log("LOG OUT RESPONSE: " + res.data);
    } else {
        console.error("Failed to log out:", res.problem);
        throw new Error("Failed to log out");
    }
}

export default {getUser, updateUser, logOutUser}