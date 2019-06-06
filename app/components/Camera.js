import React, { Component } from 'react';
import { AppRegistry,  Text, TouchableOpacity, View , StyleSheet} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
    takePicture = async function() {
        console.log('takepicture');
        // const options = { quality: 0.5, base64: true };
        // this.camera.capture({metadata:options}).then(data=>{
        //     console.log(data,'camera')
        // }).catch(error=>console.log(error,'error'))
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
      };
    
  render() {
    return (
         <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </RNCamera>
      </View>

    )
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
    }
  });
