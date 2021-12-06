import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

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
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>User is logged in</Text>
      <Button
        title="Sign out"
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('User signed out'))
        }
      />
    </View>
  );
};

export default App;
