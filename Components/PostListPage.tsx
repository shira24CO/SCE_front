import { StyleSheet, Button, Text, View, Image, Alert, TouchableOpacity, Pressable, Platform, TextInput, StatusBar, TouchableHighlight, Modal } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import AddPictureApi from '../api/AddPictureApi';
import { Entypo } from '@expo/vector-icons';
import PostModel, { Post } from '../Model/PostModel';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const PostListPage: FC<{
  idPostOwner: string,
  idPost: string,
  imgUrl: string | null,
  content: string,
  getFullName: (userId: string) => Promise<string | undefined>,
  getUserImgUrl: (userId: string) => Promise<string | undefined>,
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  isHomePage: boolean,
  isUserPostsPage: boolean,
  accessToken: string
}> = ({ idPostOwner, idPost, imgUrl, content, getFullName, getUserImgUrl, setUserPosts, isHomePage, isUserPostsPage, accessToken }) => {

  const [owner, setOwner] = useState<string | undefined>("");
  const [userImgUrl, setUserImgUrl] = useState<string | undefined>("");
  const [postContent, setPostContent] = useState<string>(content);
  const [postImage, setPostImage] = useState<string | undefined>(imgUrl || undefined);
  const [isEditContent, setIsEditContent] = useState(false);
  const [isImgEdit, setIsImgEdit] = useState(false);
  const [displayActivityIndicator, setDisplayActivityIndicator] = useState(false);

  const postContentRef = useRef<TextInput>(null);

  const activateContentField = () => {
    setIsEditContent(true);
    if (postContentRef.current) {
      postContentRef.current.focus();
    }
  }

  const onSave = async () => {
    const saveResponse = await PostModel.updatePost(idPost, postContent, postImage);
    if (saveResponse.ok) {
      setIsEditContent(false);
      setDisplayActivityIndicator(true);
      setTimeout(() => {
        setDisplayActivityIndicator(false);
        Alert.alert('Changes Saved');
      }, 2000);
    }
  }

  const onDelete = async () => {
    Alert.alert("Delete", "Are you sure you want to delete this Post?",
      [{
        text: "Yes", onPress: async () => {
          const deleteResponse = await PostModel.deletePost(idPost);
          if (deleteResponse?.ok) {
            setDisplayActivityIndicator(true);
            const postsNow = await PostModel.getAllPosts(accessToken);
            setUserPosts(postsNow);
            setTimeout(() => {
              setDisplayActivityIndicator(false);
              Alert.alert('Delete', "The post was deleted", [{ text: "Close" }]);
            }, 2000)
          }
          else {
            Alert.alert('Error', deleteResponse?.problem);
          }
        }
      },
      { text: "No, I changed my mind" }]
    );
  }

  const onPress = () => {
    //onItemSelected(idPost);
  };

  useEffect(() => {
    getFullName(idPostOwner).then((ownerName) => setOwner(ownerName));
    getUserImgUrl(idPostOwner).then((url) => setUserImgUrl(url));
    setPostContent(content);
    setPostImage(imgUrl || undefined);
    console.log("User Image Url: " + userImgUrl);
  }, [idPost])

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={'gray'}>
      <View style={styles.listrow}>
        <View style={styles.topPart}>
          <View style={styles.imageAndName}>
            {userImgUrl && <Image style={styles.avatar} source={{ uri: userImgUrl }} />}
            <Text style={styles.name}>{owner}</Text>
          </View>
          {isUserPostsPage && <View>
            <Entypo style={styles.edit} name="edit" size={24} color="black"
              onPress={
                () => {
                  Alert.alert("Edit Post", "What do you want to edit?", [
                    { text: "Post Content", onPress: () => activateContentField() },
                    { text: "Post Image", onPress: () => setIsImgEdit(true) }
                  ])
                }
              } />
            <MaterialIcons name="delete" size={24} color="black" onPress={onDelete} />
          </View>}
        </View>

        <View style={styles.middlePart}>
          <TextInput
            style={styles.content}
            editable={isEditContent}
            ref={postContentRef}
            onChangeText={setPostContent}
            value={postContent}
          />
          {displayActivityIndicator && <ActivityIndicator size={100} />}
          {isEditContent && <View style={styles.buttons}>
            <TouchableOpacity style={styles.saveBtn}>
              <Button title="Save Changes" onPress={onSave} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn}>
              <Button title="Cancel" onPress={() => setIsEditContent(false)} />
            </TouchableOpacity>
          </View>}
          {isImgEdit && <Modal
            visible={isImgEdit}
            onRequestClose={() => setIsImgEdit(false)}>
            <View style={styles.mainView}>
              <TouchableOpacity onPress={() => setIsImgEdit(false)}>
                <Text>X</Text>
              </TouchableOpacity>
              <View style={styles.modalView}>
                <Text>Choose From Where to take the picture</Text>
                <TouchableOpacity
                  onPress={async () => {
                    const uri = await AddPictureApi.activateCamera();
                    console.log("Got uri");

                    if (uri) {
                      const url = await PostModel.uploadImage(uri);
                      setPostImage(url);
                      await PostModel.updatePost(idPost, postContent, url);
                      const postsNow = await PostModel.getAllPosts(accessToken);
                      setUserPosts(postsNow);
                      setIsImgEdit(false);
                    }
                  }
                  }
                >
                  <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    const uri = await AddPictureApi.openGallery();
                    if (uri) {
                      const url = await PostModel.uploadImage(uri);
                      setPostImage(url);
                      setIsImgEdit(false);
                      PostModel.updatePost(idPost, postContent, url);
                    }
                  }
                  }
                >
                  <FontAwesome6 name="image" size={24} color="black" style={styles.galleryButton} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          }
        </View>

        <View style={styles.imageContainer}>
          {postImage ? <Image style={styles.postImage} source={{ uri: postImage }} /> : <Image style={styles.postImage} source={require("../assets/man_4140048.png")} />}
        </View>

      </View>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  listrow: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#18c5d9',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  topPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  imageAndName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  middlePart: {
    marginBottom: 10
  },
  postImage: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  edit: {
    marginRight: 10
  },
  content: {
    fontStyle: 'normal',
    fontSize: 14,
    marginBottom: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  saveBtn: {
    backgroundColor: 'green',
    borderRadius: 5,
    overflow: 'hidden'
  },
  cancelBtn: {
    backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden'
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  modalView: {
    margin: 20,
    alignItems: 'center',
    borderRadius: 20,
    padding: 35,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cameraButton: {
    marginVertical: 10
  },
  galleryButton: {
    marginVertical: 10
  },
  imageContainer: {
    alignItems: 'center'
  }
});

export default PostListPage;
