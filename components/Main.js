import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchUser} from '../redux/actions';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            );
          },
        }}
      />
      <Tab.Screen
        name="AddContainer"
        listeners={({navigation}) => {
          return {
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Add');
            },
          };
        }}
        component={EmptyScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
    // <View style={{flex: 1, justifyContent: 'center'}}>
    //   <Text>{currentUser.name} is logged in</Text>
    //   <Button
    //     title="Sign out"
    //     onPress={() =>
    //       auth()
    //         .signOut()
    //         .then(() => console.log('User signed out'))
    //     }
    //   />
    // </View>
  );
};

export default Main;
