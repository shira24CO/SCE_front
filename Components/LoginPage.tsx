import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '1069055896862-i03lnt4fq90j7ll6ucc3250jkpt023ap.apps.googleusercontent.com', // From Google Developer Console
  offlineAccess: true, 
});

const LoginPage = () => {
  useEffect(() => {
    // Any additional configuration if needed
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // Handle the user information as needed
    } catch (error) {
      // Type assertion to handle 'error' as an 'Error'
      if (error instanceof Error) {
        if (error.message.includes(statusCodes.SIGN_IN_CANCELLED)) {
          // user cancelled the login flow
          console.log('User cancelled the login flow');
        } else if (error.message.includes(statusCodes.IN_PROGRESS)) {
          // operation (e.g. sign in) is in progress already
          console.log('Sign in is in progress');
        } else if (error.message.includes(statusCodes.PLAY_SERVICES_NOT_AVAILABLE)) {
          // play services not available or outdated
          console.log('Play services not available or outdated');
        } else {
          // some other error happened
          console.error(error);
        }
      } else {
        console.error('An unexpected error occurred', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    width: 230,
    height: 48,
  },
});

export default LoginPage;
