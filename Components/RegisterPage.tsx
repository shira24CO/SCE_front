import React, { FC, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

const RegisterPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userImage, setUserImage] = useState<string>("");
    const [userAge, setUserAge] = useState<string>("");
    const [userCountry, setUserCountry] = useState<string>("");
    const [userInstitution, setUserInstitution] = useState<string>("");
    const [userYear, setUserYear] = useState<string>("");

    const handleUserRegister = async () => {
        try {
            // Validate user input
            if (!userEmail || !userPassword || !userAge || !userCountry || !userInstitution || !userYear) {
                alert("Please fill in all fields.");
                return;
            }
    
            // Make a POST request to your backend API endpoint to register the user
            const response = await fetch('https://your-api-endpoint.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    age: userAge,
                    country: userCountry,
                    institution: userInstitution,
                    year: userYear,
                    profileImage: userImage, // If you want to include the profile image
                }),
            });
    
            // Check if registration was successful
            if (response.ok) {
                // Registration successful, navigate to the next screen or perform other actions
                console.log("User registered successfully!");
                navigation.navigate('Login'); // Navigate to the login screen
            } else {
                // Registration failed, display error message
                const errorData = await response.json();
                alert(errorData.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while registering. Please try again later.");
        }
    };
    

    return (
        <View style={styles.registrationPage}>
            <ScrollView style={styles.scrollView} >
                <View style={styles.heading}>
                    <Text style={styles.welcomeMessage}>
                        Welcome to StudentHub!
                    </Text>
                    <Text style={styles.descriptionMessage}>
                        Register to connect with your academic community and explore resources.
                    </Text>
                </View>
                <View>
                    {userImage == "" ? (
                        <Image style={styles.avatar} source={require('../assets/man_4140048.png')} />
                    ) : (
                        <Image source={{ uri: userImage }} style={styles.avatar} />
                    )}
                    <TouchableOpacity
                        onPress={async () => {
                            // Implement image upload logic here
                        }}
                    >
                        <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            // Implement image selection logic here
                        }}
                    >
                        <FontAwesome6 name="image" size={24} color="black" style={styles.galleryButton} />
                    </TouchableOpacity>
                </View>
                <View style={styles.registerDetails}>
                    <View style={styles.userdetail}>
                        <Text>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={userEmail}
                            onChangeText={setUserEmail}
                            placeholder="Your Email goes here..."
                            textContentType='emailAddress'
                        />
                    </View>
                    <View style={styles.userdetail}>
                        <Text>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={userPassword}
                            textContentType='password'
                            onChangeText={setUserPassword}
                            secureTextEntry={true}
                            placeholder="Your Password goes here..."
                        />
                    </View>
                    <View style={styles.userdetail}>
                        <Text>Age</Text>
                        <TextInput
                            style={styles.input}
                            value={userAge}
                            onChangeText={setUserAge}
                            placeholder="Your Age"
                        />
                    </View>
                    <View style={styles.userdetail}>
                        <Text>Country</Text>
                        <TextInput
                            style={styles.input}
                            value={userCountry}
                            onChangeText={setUserCountry}
                            placeholder="Your Country"
                            textContentType='countryName'
                        />
                    </View>
                    <View style={styles.userdetail}>
                        <Text>Institution</Text>
                        <TextInput
                            style={styles.input}
                            value={userInstitution}
                            onChangeText={setUserInstitution}
                            placeholder="Your Academic Institution"
                        />
                    </View>
                    <View style={styles.userdetail}>
                        <Text>Year of Study</Text>
                        <TextInput
                            style={styles.input}
                            value={userYear}
                            onChangeText={setUserYear}
                            placeholder="Year of Study"
                        />
                    </View>
                </View>
                <View style={styles.registerBtn}>
                    <Text style={styles.registerText}>Register</Text>
                    <Feather name="arrow-right-circle" size={44} color="black"
                        onPress={() => handleUserRegister()}
                        style={styles.registerArrow}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    registrationPage: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#d8b5ff'
    },
    scrollView: {
        marginHorizontal: 10,
        backgroundColor: '#d8b5ff'
    },
    heading: {
        marginBottom: 20,
    },
    welcomeMessage: {
        fontWeight: 'bold',
        fontSize: 30
    },
    descriptionMessage: {
        fontSize: 20,
    },
    registerDetails: {
        marginTop: 20,
        marginBottom: 30,
    },
    userdetail: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    cameraButton: {
        position: 'absolute',
        bottom: -15,
        left: 15,
        width: 50,
        height: 50
    },
    galleryButton: {
        position: 'absolute',
        bottom: -15,
        right: 15,
        width: 50,
        height: 50
    },
    avatar: {
        alignSelf: 'center',
        height: 150,
        width: '100%',
        borderRadius: 100,
        resizeMode:'contain'
    },
    registerBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        top:0,
        left:40
    },
    registerArrow:{
        right:1
    },
    registerText:{
        fontWeight:'bold',
        fontSize:20,
        right:50
    }


});

export default RegisterPage;