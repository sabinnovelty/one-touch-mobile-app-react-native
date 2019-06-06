

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,TouchableOpacity , Image , Button} from 'react-native';
// import ImagePicker from './app/components/ImagePicker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import ImageUpload from './app/services/upload';

const options = {
  title:'Image picker',
  takePhotoButtonTitle:'Take photo with your camera',
  chooseFromLibraryButtonTitle:'choose photo from library'
}

export default class App extends Component {
  constructor( props ){
    super( props );
    this.state ={
      imageSource:null,
      data:null
    }
    
  }

  imagePicker = ()=>{
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source,
        });
        const data = new FormData();
        data.append('name','image');
        data.append('fileData',{
          uri:response.uri,
          type:response.type,
          name:response.fileName
        });
        this.setState({data:data})
      }
    });
  }

  // createFormData = ( photo )=>{
  //   console.log( 'createformdata ca;;ed')
  //   const data = new FormData();
  //   data.append('photo',{
  //     name:photo.filename,
  //     type:photo.type,
  //     uri:photo.uri
  //   });
  //   console.log(data,'formdata');s

  //   return data;
  // }

  handleUpload=(  )=>{
    fetch('http://c493e25e.ngrok.io/api/upload',{
      method: 'POST',  
      body:this.state.data
    })
    .then(res=>res.json())
    .then(result=>console.log(result,'result'))
  }


  render() {
    return (
      <View style={styles.container}> 
      <TouchableOpacity style={styles.customButton} onPress={this.imagePicker}>
        <Text style={styles.textStyle}>capture image</Text>
      </TouchableOpacity>

      <View>
        <Image source={this.state.imageSource} style={{width:200,height:200,margin:10}}/>
      </View>

      <Button title='upload' onPress={ this.handleUpload} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imgaeStyle:{
    width:300,
    height:300
  },
  customButton:{
    backgroundColor:'green',
    padding:20
  },
  textStyle:{
    color:'white'
  }
});
