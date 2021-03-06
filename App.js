import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';

import store from './redux/store.js';
import SaveScreen from './components/main/Save';

const Stack = createNativeStackNavigator();
const App = () => {
  const [init, setInit] = useState({loaded: false, loggedIn: false});

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (!user) {
        setInit({loaded: true, loggedIn: false});
      } else {
        console.log(user);
        setInit({loaded: true, loggedIn: true});
      }
    });
    return subscriber;
  }, []);

  if (!init.loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!init.loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Save" component={SaveScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
