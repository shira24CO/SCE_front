import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet,View,ActivityIndicator }from 'react-native';
import PostListPage from './PostListPage';
import PostModel,{Post} from '../Model/PostModel';
import userModel from '../Model/UserModel';
import { Ionicons } from '@expo/vector-icons';
import HeaderOprtions from '../Components/Menu';
import UserApi from '../api/UserApi';



const HomePage : FC<{navigation:any,route:any}> = ({navigation,route}) => {
  const [data,setData] = useState<Post[]>([]);
  const[currentUser,setCurrentUser] = useState("");
  const[displayActivityIndicator,setDisplayActivityIndicator] = useState(true);
  
  const onItemSelected = (id:string) =>{
    console.log("Item selected: "+id);
    
  }
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',async()=>{
      console.log("screen in focus");
      try{
        const posts = await PostModel.getAllPosts(route.params.refreshToken);
        setData(posts);
      }catch(err){
        console.log("Failed to read Students from Server: "+err);
        setData(Array<Post>())
      }
    })
    
    return unsubscribe;
  },[navigation])

  useEffect(()=>{
    if(route.params?.userName){
      setCurrentUser(route.params.userName)
    }
  },[route.params?.userName])


 useEffect(()=>{
   
    navigation.setOptions({
      headerRight: () =>(
          <HeaderOprtions
            navigateToProfile= {()=> navigation.navigate('ProfilePage',{id:route.params.userId,userName:route.params.userName,accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
            logOutOfApp={()=>{
              UserApi.logOutUser(route.params.refreshToken);
              navigation.navigate('LogInPage');

            }
            } 
            navigateToHome={()=>{}}
          />
      ),
      
      })
    },[])
        

  const getOwnerName = async(userId:string) =>{
    try{
      const res:any = await userModel.getUserById(userId);
      return res.firstName + " " + res.lastName;
    }catch(error){
      console.log("Error in getting user's full name: "+error)
    }
  }


  const getUserProfileImgUrl = async(userId: string) =>{
    try{
      const user = await userModel.getUserById(userId);
      return user.userImageUrl;
    }catch(error){
      console.log("Error retrieving user by id: "+error);
    }
  }

  setTimeout(()=> setDisplayActivityIndicator(false),2000);
  return (
    <View style={styles.postPage}>
      {!displayActivityIndicator?
      <View style={styles.postPage}>
        <Text style={styles.helloUser}>Hi,{currentUser}</Text>
        <View style={styles.addPost}>
          <Ionicons name="add-circle" 
              size={34} 
              color="black"
              onPress={()=>navigation.navigate('PostAddPage',{owner:currentUser,accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
          />
          
        </View>
      <FlatList
        style={styles.flatList}
        data = {data}
        keyExtractor={(post)=>post._id}
        renderItem={({item})=> (
          <PostListPage
            idPostOwner={item.owner}
            idPost={item._id}
            imgUrl={item.postImageUrl}
            content = {item.postText}
            getFullName={getOwnerName}
            getUserImgUrl = {getUserProfileImgUrl}
            setUserPosts = {setData}
            isHomePage = {true}
            isUserPostsPage = {false}
            accessToken={route.params.refreshToken}
          />    
        )}
      ></FlatList>
      </View>
      :<View style={styles.activityIndicator}><ActivityIndicator size={100}/></View>
  }
  </View>
  
  )
}


const styles = StyleSheet.create({
  postPage:{
    flex:1,
    backgroundColor:'#a1cfff'
  },
  helloUser:{
    fontSize:20,
  },
  addPost:{
    flexDirection:'row',
    //marginStart:370,
    margin:10
  },
  flatList:{
    //flex:1
  },
  activityIndicator:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
export default HomePage;