import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentAddPage from './Components/StudentAddPage';
import StudentDetailsPage from './Components/StudentDetailsPage';
import StudentListPage from './Components/StudentListPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();

const StudentsListScreen: FC = () => {
  return (
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="StudentListPage" component={StudentListPage} options={{ title: 'Students List' }} />
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
      <StudentsListStack.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
    </StudentsListStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
  },

});

