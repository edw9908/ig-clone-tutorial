import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {USER_STATE_CHANGE} from '../constants';

export const userStateChange = currentUser => {
  return {
    type: USER_STATE_CHANGE,
    payload: currentUser,
  };
};

export const fetchUser = () => {
  return dispatch => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch(userStateChange(snapshot.data()));
        } else {
          console.log('does not exist');
        }
      });
  };
};
