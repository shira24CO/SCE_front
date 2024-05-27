import PostApi from "../api/PostApi";
import FormData from 'form-data';
import mime from "mime";

export type Post = {
    _id:string,
    postText: string,
    owner:string
    postImageUrl: string | null
}


const getAllPosts = async(accessToken:string) =>{
  console.log("get all posts")
  try{
    const responseStudents:any = await PostApi.getAllPosts(accessToken);
    console.log("API Response:", responseStudents); // Log the response
    let posts: Post[] = [];
    if (Array.isArray(responseStudents)) {
      responseStudents.forEach((p: any) => {
        const post: Post = {
          _id: p._id,
          postText: p.postText,
          owner: p.owner,
          postImageUrl: p.postImageUrl || null // Handle possible null values
        };
        posts.push(post);
      });
    }
    console.log("Processed Posts:", posts); // Log the processed posts
    return posts; 
  }catch(err){
    console.log("Failed Reading Posts from server: "+err);
    return [];
  }
}


const addPost = async (post: Post) => {
  console.log('addPost');
  const data = {
    _id: post._id,
    postText: post.postText,
    owner: post.owner,
    postImageUrl: post.postImageUrl || null // Ensure postImageUrl is handled correctly
  }
  try {
    const res = await PostApi.addPost(data);
    console.log("Post added:", res); // Log the response
  } catch (err) {
    console.log("add post failed:", err);
  }
}

const updatePost = async(idPost:string,content:string|undefined,image:string|undefined) =>{
  const resUpdatePost = await PostApi.updatePost(idPost,content,image);
  return resUpdatePost;

}

const deletePost = async(id:string)=>{
    try{
      const response = await PostApi.deletePost(id);
      return response;
    }
    catch(error){
      console.log("Error deleting post: "+error);
    }
}

const uploadImage = async(imageUri:string) =>{
  let body = new FormData();
  
  body.append('file', 
    {name:'file',
    type:mime.getType(imageUri),
    uri:imageUri });
  try{
    const res = await PostApi.uploadImage(body);
    if(!res.ok){
      console.log("save failed " + res.problem);
    }else{
      if(res.data){
        const d:any = res.data;
        return d.url;
      }
    }
  }catch(err){
    console.log("save failed with error: " + err);
  }
  return "";
}


export default {getAllPosts,addPost,updatePost,deletePost,uploadImage};