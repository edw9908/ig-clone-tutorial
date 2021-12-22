import React, {useState} from 'react';
import {View, StyleSheet, Button, Text, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import ImageCropPicker from 'react-native-image-crop-picker';
// import RNFS from 'react-native-fs';

const Add = ({navigation}) => {
  const [{cameraRef, type}, {takePicture, toggleFacing}] = useCamera(null);
  const [image, setImage] = useState(null);

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
      const filePath = data.uri;
      setImage(filePath);
      // const date = new Date();
      // const newFilePath =
      //   RNFS.ExternalDirectoryPath + '/' + date.toISOString() + '.jpg';
      // RNFS.moveFile(filePath, newFilePath)
      //   .then(() => {
      //     setImage('file://' + newFilePath);
      //     console.log('IMAGE MOVED');
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  const openLibrary = () => {
    ImageCropPicker.openPicker({cropping: true, mediaType: 'photo'})
      .then(imageResult => {
        setImage(imageResult.path);
      })
      .catch(error => {
        console.log('error imagen', error);
      });
  };

  const Unauthorized = () => {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>Camera Not Authorized</Text>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <View style={styles.cameraContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.fixedRatio}
          type={type}
          notAuthorizedView={<Unauthorized />}
        />
      </View>
      <Button title="Flip Image" onPress={toggleFacing} />
      <Button title="Take Picture" onPress={captureHandle} />
      <Button title="Pick Image From Gallery" onPress={openLibrary} />
      {image && (
        <Button
          title="Save"
          onPress={() => navigation.navigate('Save', {image})}
        />
      )}
      {image && <Image source={{uri: image}} style={styles.body} />}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});

export default Add;
