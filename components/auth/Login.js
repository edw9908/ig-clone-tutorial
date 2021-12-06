import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
  });
  const onSignIn = () => {
    const {email, password, name} = registerForm;
    console.log(email, password, name);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('errorsito', error);
      });
  };
  return (
    <View>
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
      <Button title="Sign In" onPress={() => onSignIn()} />
    </View>
  );
};

export default Login;
