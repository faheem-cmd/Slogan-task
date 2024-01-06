import React from 'react';
import {View} from 'react-native';

import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import WelcomePage from '../../screens/auth/WelcomePage';
import LoginPage from '../../screens/auth/LoginPage';
import HomePage from '../../screens/home/HomePage';
import DrawerNavigator from '../DrawerNavigator';
import SplashScreen from '../../screens/auth/SplashScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        options={{headerShown: false, gestureEnabled: false}}
        component={SplashScreen}
      />
      <Stack.Screen
        name="WelcomePage"
        options={{headerShown: false, gestureEnabled: false}}
        component={WelcomePage}
      />
      <Stack.Screen
        name="LoginPage"
        options={{headerShown: false, gestureEnabled: false}}
        component={LoginPage}
      />
      <Stack.Screen
        name="DrawerNavigator"
        options={{headerShown: false, gestureEnabled: false}}
        component={DrawerNavigator}
      />
      {/* <Stack.Screen
        name="HomePage"
        options={{headerShown: false, gestureEnabled: false}}
        component={HomePage}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
