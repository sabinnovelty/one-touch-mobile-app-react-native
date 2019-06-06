const ImageUpload = (function(){

    const API = 'http://localhost:3000/api';

    function uploadImage( data ){
        return fetch( API + '/upload',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data'
            },
            body: data
        })
    }

    function testServer(){
        alert('jsf')
        return fetch(API+'/test',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:{msg:'hello from client'}
        })
    }

    return {
        uploadImage,
        testServer
    }

})();