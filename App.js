

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,TouchableOpacity , Image , Button,TextInput} from 'react-native';
// import ImagePicker from './app/components/ImagePicker';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import ImageUpload from './app/services/upload';

const options = {
  title:'Image picker',
  takePhotoButtonTitle:'Take photo with your camera',
  chooseFromLibraryButtonTitle:'choose photo from library'
}
const BLUE = '#428AF8';
const LIGHT_GRAY='#D3D3D3'

export default class App extends Component {
  constructor( props ){
    super( props );
    this.state ={
      imageSource:null,
      data:null,
      vin:'',
      isFocused:false
    }
  }

  handleTextChange=( event )=>{
    this.setState({
      vin:event.target.value
    })
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


  handleUpload=(  )=>{
    fetch('http://d3cd2dff.ngrok.io/api/upload',{
      method: 'POST',  
      body:this.state.data
    })
    .then(res=>res.json())
    .then(result=>this.setState({vin:result.vin}))
  }


  render() {
    console.log('props',this.state.isFocused)
    const { isFocused , imageSource ,vin  } = this.state;
    return (
      <View style={styles.container}> 
        <Text>Vin number;{this.state.vin}</Text>
        <TextInput placeholder="vin number" style={styles.textInput} value={this.state.vin} onFocus={()=>this.setState({isFocused:true})}
        onBlur={()=>this.setState({isFocused:false})}
        underlineColorAndroid={
          isFocused ? BLUE : LIGHT_GRAY
        }
        editable={ vin ? true : false }
        />
        <TouchableOpacity style={styles.customButton} onPress={this.imagePicker} onChangeText={(event)=>this.handleTextChange(event)}>
          <Text style={styles.textStyle}>capture image</Text>
        </TouchableOpacity>

        <View>
          <Image source={this.state.imageSource} style={ imageSource ? styles.imgaeStyle:{padding:20}}/>
          <Button title='upload' onPress={ this.handleUpload} />
        </View>
      
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
    width:200,
    height:200,
    margin:10
  },
  customButton:{
    backgroundColor:'green',
    padding:20
  },
  textStyle:{
    color:'white'
  },
  textInput: {
    justifyContent: "center",
    alignItems: "stretch",
    // borderWidth:2,
    height:40,
    width:200,
    marginBottom:20,
    paddingRight:30
  }
  
});
