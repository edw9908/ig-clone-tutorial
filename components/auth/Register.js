import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  const onSignUp = () => {
    const {email, password, name} = registerForm;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({name, email});
        console.log(result);
      })
      .catch(error => {
        console.log('errorsito', error);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="name"
        onChangeText={name =>
          setRegisterForm(lastValue => ({...lastValue, name}))
        }
      />
      <TextInput
        placeholder="email"
        onChangeText={email =>
          setRegisterForm(lastValue => ({...lastValue, email}))
        }
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={password =>
          setRegisterForm(lastValue => ({...lastValue, password}))
        }
      />
      <Button title="Sign Up" onPress={() => onSignUp()} />
    </View>
  );
};

export default Register;
