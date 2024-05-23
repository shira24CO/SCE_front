import apiClient from "./ClientApi"


const registerUser = async(firstName:string,lastName:string,email:string,password:string,url:string,year:string,state:string, institution:string) =>{
    console.log("firstname: "+firstName);
    console.log("lastname: "+lastName);
    
    console.log("username: "+email);
    console.log("password: "+password);
    console.log("year: " +year);
    console.log("state: " +state);
    console.log("institution: " +institution);
    console.log("url: " +url);
    
    const res:any = await apiClient.post("/auth/register",{firstName:firstName,lastName:lastName,email:email,password:password,userImageUrl:url,userYear:year,userState:state, userInstitution: institution});
    console.log("Server register with email and password:"+res.data);//server has to return tokens
    return res;
    
}

export default {registerUser};