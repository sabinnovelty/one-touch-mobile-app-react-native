import React, { Component } from 'react';
import { View , Text ,TouchableOpacity ,StyleSheet } from 'react-native';


// const options = {
//     title: 'Select Avatar',
//     takePhotoButtonTitle: 'Choose Photo from Facebook',
//     chooseFromLibraryButtonTitle:' choose photo from library'
//   };
var options = {
    title: 'Select Image',
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
 };


export default class ImagePicker extends Component {

    constructor( props ){
       super(props);
       this.state={
           filePath:null
       }
    }

    // imagePicker=()=>{
    //     // ImagePicker.showImagePicker(options, (response) => {
    //         // console.log('Response = ', response);
          
    //         // if (response.didCancel) {
    //         //   console.log('User cancelled image picker');
    //         // } else if (response.error) {
    //         //   console.log('ImagePicker Error: ', response.error);
    //         // } else {
    //         //     const source = { uri: response.uri };
    //         //     this.setState({
    //         //       avatarSource: source,
    //         //     });
    //         //   } 
    //     }
    chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            this.setState({
              filePath: source,
            });
          }
        });
      };
    
  render() {
    return (
     <View style={styles.container} onPress={this.imagePicker}>
         <TouchableOpacity style={style.buttonStyle}>
         <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
         </TouchableOpacity>
     </View>
    )
  }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    cameraText:{
        color:'green'
    },
    buttonStyle:{
        backgroundColor:'green',
        padding:10,
        margin:10
    }
})