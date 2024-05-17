import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { Feather } from '@expo/vector-icons';
import StudentListPage from './StudentListPage'; // Import StudentListPage if needed

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    const configureGoogleSignIn = () => {
        // Configure Google Sign-In
        GoogleSignin.configure({
            webClientId: '1069055896862-i03lnt4fq90j7ll6ucc3250jkpt023ap.apps.googleusercontent.com', // From Google Developer Console
            offlineAccess: true,
        });
    }

    const handleLoginWithEmailAndPassword = async () => {
        // Handle login with email and password
    };

    const handleGoogleSignIn = async () => {
        try{
            console.log("Button clicked");
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("Login Page-User info"+userInfo.idToken);
            const tokenToServer = userInfo.idToken;
            // const serverResponse = await LoginApi.loginWithGoogle(tokenToServer)
            // if(serverResponse.data.userTokens){
            //     navigation.navigate('StudentList')
            // }

            
        }catch(error){
            console.log("Error sign-in with google: "+error);
            
        }
    };

    return (
        <View style={styles.loginPageContainer}>
            <Text style={styles.appName}>StudentHub</Text>
            <Text style={styles.introText}>Welcome to StudentHub! Connect with your classmates, access study resources, and stay updated with the latest events in your academic community.</Text>

            <Text style={styles.topMessage}>Login Here!</Text>

            <View style={styles.details}>
                <View style={styles.email}>
                    <Text style={styles.fieldTitle}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Your Email..."
                    />
                </View>

                <View style={styles.password}>
                    <Text style={styles.fieldTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        textContentType='password'
                        onChangeText={setPassword}
                        placeholder="Your password..."
                        secureTextEntry={true}
                    />
                </View>
            </View>

            <View style={styles.loginRegister}>
                <View style={styles.login}>
                    <Text style={styles.loginText}>Log In</Text>
                    <Feather
                        name="arrow-right-circle"
                        size={44}
                        color="black"
                        onPress={async () => {
                            await handleLoginWithEmailAndPassword();
                        }}
                        style={styles.arrowLogIn}
                    />
                </View>

                <Text>_______________________or___________________________</Text>
                
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={handleGoogleSignIn}
                />

                <Text style={styles.register}>
                    Doesn't have an account yet?
                    <Text style={styles.underline} onPress={() => navigation.navigate('RegisterPage')}>
                        Register Here
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginPageContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#d8b5ff'
    },
    appName: {
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20,
    },
    introText: {
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    topMessage: {
        fontWeight: 'bold',
        fontSize: 25
    },
    details: {
        marginTop: 20,
        marginBottom: 30,
        flexDirection: 'column'
    },
    email: {
        marginBottom: 20,
        flexDirection: 'column',
    },
    password: {
        marginBottom: 20,
        flexDirection: 'column',
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    fieldTitle: {
        marginBottom: 5,
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 10,
    },
    arrowLogIn: {
        marginRight: 10,
    },
    loginRegister: {
        alignItems: 'center',
    },
    register: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    underline: {
        textDecorationLine: 'underline'
    }
});

export default LoginPage;
