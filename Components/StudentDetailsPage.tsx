import { View,Image,StyleSheet, StatusBar,Text, Button, TextInput, ScrollView, TouchableOpacity,Alert, ActivityIndicator } from "react-native";
import { useState,FC, useEffect,useRef } from "react";
import userModel,{User} from "../Model/UserModel";
import PostModel from "../Model/PostModel";
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import HeaderOptions from "./Menu";
import UserApi from "../api/UserApi";
import AddPictureApi from "../api/AddPictureApi";



const ProfilePage:FC<{route:any,navigation:any}>=({route,navigation}) =>{
  const [user,setUser] = useState<User>();
  const [isEditYear,setIsEditYear] = useState(false);
  const [isEditCountry,setIsEditCountry] = useState(false);
  const[year,setYear] = useState<string>();
  const [country,setCountry] = useState<string>('');
  const [userProfileImage,setUserProfileImage] = useState<string>("");
  const[displayActivityIndicator,setDisplayActivityIndicator] = useState(true);
  
  const countryInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  const activateYearField = () =>{
    setIsEditYear(true);
    if(yearInputRef.current){
      yearInputRef.current.focus();
    }
  }

  const activateCountryField = () =>{
    setIsEditCountry(true);
    if(countryInputRef.current){
      countryInputRef.current.focus();
    }
  }

  const onSave = async() =>{
    let saveResponse;
    if(isEditYear){
      saveResponse = await userModel.updateUserData(route.params.id,year)
    }
    if(isEditCountry){
      saveResponse = await userModel.updateUserData(route.params.id,country);
    }
    if(isEditYear && isEditCountry){
      saveResponse = await userModel.updateUserData(route.params.id,year,country)
    }
    setDisplayActivityIndicator(true);
    setTimeout(()=>{
      setDisplayActivityIndicator(false);
      setIsEditYear(false);
      setIsEditCountry(false);
    },2000);

  }
  
  useEffect(()=>{
    const fetchUser = async () => {
      const fetchedUser = await userModel.getUserById(route.params.id);
      setUser(fetchedUser);
      setYear(fetchedUser.userYear);
      setCountry(fetchedUser.userCountry);
    };

    fetchUser();
  }, [route.params.id]);
  
  
  useEffect(()=>{
    if(user){
      navigation.setOptions({
        title: user?.firstName + user?.lastName,
        headerRight:()=>(
          <HeaderOptions 
            navigateToProfile={()=>{}}
            logOutOfApp={()=>{
              navigation.navigate('LogInPage');
              UserApi.logOutUser(route.params.refreshToken);
            
            }}
            navigateToHome={()=>navigation.navigate('HomePage',{accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
          />
        )
      })
      //setDisplayActivityIndicator(false);
    }
  },[user])

  setTimeout(()=>setDisplayActivityIndicator(false),3000);

  return (
    <View style={styles.container}>
      {!displayActivityIndicator ? <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.avatarContainer}>
            {user?.userImageUrl ? <Image style={styles.avatar} source={{ uri: user?.userImageUrl }} />
              : <Image style={styles.avatar} source={require("../assets/man_4140048.png")} />}
            <TouchableOpacity
              onPress={async () => {
                const uri = await AddPictureApi.activateCamera();
                if (uri) {
                  const urlImg = await PostModel.uploadImage(uri);
                  setUserProfileImage(urlImg);
                  await userModel.updateUserData(route.params.id, undefined, undefined, urlImg);
                  setDisplayActivityIndicator(true);
                  setTimeout(() => {
                    setDisplayActivityIndicator(false);
                    Alert.alert("Profile Image Update", "You Image was updated");
                  })
                }
              }}
            >
              <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const uri = await AddPictureApi.openGallery();
                if (uri) {
                  const urlImg = await PostModel.uploadImage(uri);
                  setUserProfileImage(urlImg);
                  userModel.updateUserData(route.params.id, undefined, undefined, urlImg);
                }
              }}
            >
              <FontAwesome6 name="image" size={24} color="black" style={styles.galleryButton} />
            </TouchableOpacity>

          </View>

          <View style={styles.userName}>
            <Text style={styles.name}>{user?.firstName + " "}</Text>
            <Text style={styles.name}>{user?.lastName}</Text>
          </View>

          <View style={styles.userDetails}>

            <View style={styles.userDetail}>
              <Text style={styles.detailLabel}>Email:</Text>
              <TextInput
                editable={false}
                style={styles.input}
              >{user?.email}</TextInput>
            </View>

            <View style={styles.userDetail}>
              <Text style={styles.detailLabel}>Year:</Text>
              <TextInput editable={true}
                style={styles.input}
                keyboardType="numeric"
                ref={yearInputRef}
                onChangeText={setYear}
              >
                {user?.userYear}
              </TextInput>
              <Entypo name="edit" size={24} color="black" onPress={activateYearField} />
            </View>

            <View style={styles.userDetail}>
              <Text style={styles.detailLabel}>I'm from:</Text>
              <TextInput
                style={styles.input}
                ref={countryInputRef}
                editable={true}
                onChangeText={setCountry}
              >
                {user?.userCountry}
              </TextInput>
              <Entypo name="edit" size={24} color="black" onPress={activateCountryField}
              />
            </View>

          </View>

          {(isEditYear || isEditCountry) &&
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          }

          <TouchableOpacity style={styles.myPostsBtn} onPress={() => navigation.navigate('UserPostsPage', { userId: route.params.id, userName: route.params.userName, accessToken: route.params.accessToken, refreshToken: route.params.refreshToken })}>
            <Text style={styles.myPostsButtonText}>My Posts</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
        : <View style={styles.activityIndicator}><ActivityIndicator size={100} /></View>}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#a1cfff',
  },
  scrollView: {
    marginHorizontal: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  userName: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    paddingHorizontal: 20,
  },
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: '500',
    width: 100,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  saveBtn: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#b0ce95',
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelBtn: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#d76161',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraButton: {
    position: 'absolute',
    bottom: -15,
    left: 15,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: 'absolute',
    bottom: -15,
    right: 15,
    width: 50,
    height: 50,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myPostsBtn: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: 'center',
  },
  myPostsButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfilePage;