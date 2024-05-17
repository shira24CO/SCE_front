import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Components/LoginPage'; // Adjust the import path as necessary
import RegisterPage from './Components/RegisterPage';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" component={LoginPage} options={{ title: 'Login Page' }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
