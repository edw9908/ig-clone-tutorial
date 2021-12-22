import React, {useState} from 'react';
import {View, TextInput, Image, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

const Save = props => {
  const [caption, setCaption] = useState('');
  const date = new Date();
  const imageName = date.toISOString() + '.jpg';
  const reference = storage().ref(
    `post/${auth().currentUser.uid}/${imageName}`,
  );

  const savePostData = downloadUrl => {
    firestore()
      .collection('posts')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadUrl,
        caption,
        creation: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        props.navigation.popToTop();
      });
  };

  const uploadImage = async () => {
    const uri = props.route.params.image.slice(7);
    console.log('uri', uri);
    console.log('utils', utils.FilePath.PICTURES_DIRECTORY);
    const task = reference.putFile(uri);
    task.on('state_changed', taskSnapshot => {
      console.log(`transferred: ${taskSnapshot.bytesTransferred}`);
    });
    task.then(() => {
      task.snapshot.ref.getDownloadURL().then(res => {
        savePostData(res);
        console.log(res);
      });
    });
    task.catch(err => {
      console.log('error storage', err);
    });
  };
  return (
    <View style={{flex: 1}}>
      <Image source={{uri: props.route.params.image}} />
      <TextInput
        placeholder="Write a caption ..."
        onChangeText={value => setCaption(value)}
      />
      <Button title="Save" onPress={uploadImage} />
    </View>
  );
};

export default Save;
