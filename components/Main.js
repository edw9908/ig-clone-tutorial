import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../redux/actions';

const Main = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) {
    return <View></View>;
  }
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>{currentUser.name} is logged in</Text>
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

export default Main;
