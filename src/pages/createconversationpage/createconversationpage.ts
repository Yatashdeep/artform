import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController, App,ToastController} from 'ionic-angular';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import{TabspagePage}from'../../pages/tabspage/tabspage'
import { AlertController } from 'ionic-angular';
import { from } from 'rxjs/observable/from';
import { FileChooser } from '@ionic-native/file-chooser'
import{Camera,CameraOptions}from'@ionic-native/camera'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { File } from '@ionic-native/file';
declare var window;
/**
 * Generated class for the CreateconversationpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createconversationpage',
  templateUrl: 'createconversationpage.html',
})
export class CreateconversationpagePage {
  topics = [];
  name: string;
  talks = [];
  preparedTags = []
  preparedTags1=[]
  idtags=[]
  title
  Message
  preparetags2=[]
  idatags2=[]
  titlevalid:boolean
  loader
  searching
  searchingtext
  attachedsrc
  mediatype
  size
  flag
  constructor(public toastCtrl:ToastController,public file:File,public app: App,public filetransfer:FileTransfer,public camera:Camera,public actionsheetCtrl:ActionSheetController,public alertCtrl:AlertController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
  this.loader=false
  this.searching=false
  this.searchingtext=false
  this.mediatype=1
  }
  addTalk() {
    console.log('fgf',this.topics)
    if(this.topics.length!=0)
    {
console.log('hi')
    console.log('value',this.topics)
    console.log('preparedtags',this.preparedTags)
    console.log(this.preparedTags.length)
    for(var i=0;i<this.preparedTags1.length;i++) { 
      console.log('text',this.topics.indexOf(this.preparedTags1[i].text))  
      if(this.topics.indexOf(this.preparedTags1[i].text) > -1){
     
          this.idtags.push(this.preparedTags1[i].id);
             console.log('idatags',this.idtags)

        }
  }
  for(i=0; i < this.idtags.length; i++){
if(this.idatags2.indexOf(this.idtags[i]) === -1) {
  this.idatags2.push(this.idtags[i]);
  }
}
  console.log('idtags222',this.idatags2)

  // console.log('idtags',this.idtags)
  this.loader=true
  
  Observable.of(null)
  .flatMap(()=>this.security.conversation(this.idatags2,this.title,this.Message)).subscribe(data=>{
    if(this.attachedsrc)
    {
      if(this.mediatype==2)
      {
        // alert('imageload')
        this.uploadvideosecond(data.messageId)
      }
      else
      {
        // alert('dataload')
      this.imageupload(data.messageId)
      }
    }
    else
    {
   
   
    this.loader=false
    // this.navCtrl.setRoot(TabspagePage,{id:4})
    this.app.getActiveNav().popToRoot()
    }
// this.navCtrl.pop()
  })
  }
else
{
  let alert = this.alertCtrl.create({
    title: 'Please Enter Aleast One Valid Recipient',
    buttons: ['Ok']
  });
  alert.present();
}
  }
  ionViewDidLoad() {
    this.titlevalid=false
    console.log('ionViewDidLoad CreateconversationpagePage');
    // this.createconv()
  }
  createconv(event)
  {
    console.log('ev',event.target.value)
    console.log('lenghth',event.target.value.length)
    if(event.target.value.length>3)
    {
      this.titlevalid=false
      this.searching=true
      this.searchingtext=false
    Observable.of(null)
    .flatMap(()=>this.security.getrecipients(event.target.value)).subscribe(data=>{
 console.log(data)
 if(data.status!='fail')
 {
  this.searching=false
 this.preparetags2=data.results
 console.log('prepare 2',this.preparetags2)
for(var i=0;i<data.results.length;i++)
{
  if(this.preparedTags.indexOf(data.results[i].text) === -1) {
this.preparedTags.push(data.results[i].text)
  }
}
 for(var i=0; i < data.results.length; i++){
  if(this.preparedTags1.indexOf(data.results[i].text) === -1) {
      this.preparedTags1.push({text:data.results[i].text,id:data.results[i].id});
  }

}
 }
 else
 {
  this.searching=false
  this.searchingtext=true
 }

// for(var i=0;i<this.preparedTags1.length;i++)
// {
// this.preparedTags.push(this.preparedTags1[i].text)
// }
//  for(var i=0;i<data.results.length;i++)
//  {
//      this.preparedTags.push({
//       text:data.results[i].text,
//       id:data.results[i].id})
//  } 
 console.log('preparedTags',this.preparedTags)   
    })
  }
  else
  {
    this.titlevalid=true
  }
 
  }
  uploadattachedfile()
  {
    
    let actionsheet = this.actionsheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
    this.gallery()
        },
      }
        ,
      {
        text: 'Take A Snap',
        handler: () => {
        
         this.camera1()
        }
      }]

    })
    actionsheet.present();
  }
  camera1()
  {
    this.camera.getPicture({
      quality: 75,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      // this.attachedsrc=imageData
      this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
        // alert('hii')
        // alert(imageData)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
               this.size=metadata.size

               
            if(metadata.size<25224){ 
              
             this.flag=1
              this.attachedsrc=imageData
        this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else if(metadata.size>25224){ 
              this.flag=0
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            else
            {
              this.flag=0
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            
        })
      })
  // alert('imagedata'+imageData)
  // this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
  //   // alert('hii')
  //   // alert(imageData)
  //   fileEntry.getMetadata((metadata) => {
  //          //metadata.size is the size in bytes
  //         //  alert('size'+metadata.size)
  //       if(metadata.size < 59099){ 
        
  //         this.attachedsrc=imageData
  //   this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
  //         //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
  //       }
  //       else{ 
  //         this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
  //       }
  //   })
  // })
      // this.imgsrc = "data:image/jpeg;base64," + imageData;

   
    }, (err) => {
    })
  }
  gallery()
  {
    this.camera.getPicture({
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      
      // alert('imagedata'+imageData)
      // this.attachedsrc=imageData
      this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
        // alert('hii')
        // alert(imageData)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
               this.size=metadata.size

               
            if(metadata.size<25224){ 
              
              this.flag=1
              this.attachedsrc=imageData
        this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else if(metadata.size>25224){ 
              this.flag=0
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            else
            {
              this.flag=0
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            
        })
      })
      
      //  this.imgsrc = "data:image/jpeg;base64," + imageData;
     
    }, (err) => {
    })
  }
  imageupload(messageId)
  {
    let sessionId=localStorage['sessionId']
    // alert(sessionId)
    // alert('imgsrc'+this.attachedsrc)
    let headers = new Headers({ 
    'enctype': 'multipart/form-data;',
   // 'Content-Type': 'application/json', 
    // 'Content-Type': 'multipart/form-data',
    'X-Cookie': 'CAKEPHP='+sessionId ,
    'Access-Control-Allow-Origion':'*',
    'Connection': 'close',
    'Accept':'application/json',
    'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token,X-Cookie'})
    // let headers = new Headers({ 'Content-Type': 'multipart/form-data','X-Cookie': 'CAKEPHP='+sessionId ,'Access-Control-Allow-Origion':'*','Accept':'application/json','Access-Control-Allow-Credentials': true})
    // headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');
    // headers.append('Access-Control-Allow-Origion','*');
    // alert('msg_id'+messageId)
    // // alert(headers)
    // alert(JSON.stringify(headers))
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'messageFile',
      fileName: 'filename.jpg',
      chunkedMode: false,
      headers: headers,
      httpMethod: 'POST',
      mimeType: "image/jpeg",
      params: {"messageId": messageId},
    
    }
   // filetransfers.upload(this.imgsrc,'https://www.demo.artformplatform.com/api/messages/upload.json', options)
    filetransfers.upload(this.attachedsrc,'https://www.artformplatform.com/api/upload/message.json', options)
    .then((data) => {
      
  //       alert('upload')
  // alert('data11'+JSON.stringify(data))
  this.app.getActiveNav().popToRoot()
      }
      , (err) => {
      //   alert('bii'+err)
      //  alert('error4'+JSON.stringify(err))   
       this.app.getActiveNav().popToRoot() 
      }
      )
  }
  mediaoption()
  {
   
    let actionsheet = this.actionsheetCtrl.create({
      title: 'Choose Upload Option!',
      buttons: [{
        text: 'Upload Images',
        handler: () => {
    this.uploadattachedfile()
        },
      }
        ,
      {
        text: 'Upload Video',
        handler: () => {
        
         this.UploadVideoFromGallery()
        }
      }]

    })
    actionsheet.present();
  } 
  UploadVideoFromGallery()
  {
    
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.VIDEO 
    })
      .then((fileuri) => {
      
       fileuri='file:///'+fileuri
      //  alert('fileuri'+fileuri)
      // this.attachedsrc=fileuri
      // this.mediatype=2
      this.file.resolveLocalFilesystemUrl(fileuri).then(fileEntry => { 
        // alert('hii')
        // alert(fileuri)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
               this.size=metadata.size

               
            if(metadata.size<25224){ 
              
              this.flag=1
              this.attachedsrc=fileuri
              this.mediatype=2
        this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else if(metadata.size>25224){ 
              this.flag=0
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            else
            {
              this.flag=0
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            
        })
      },(err)=>{
        alert('err'+JSON.stringify(err))
      }) 


      },
      (err) => {
     alert(err)

      } )

  }
  uploadvideosecond(messageId)
{
  let sessionId=localStorage['sessionId']
 
  let headers = new Headers({ 
    'enctype': 'multipart/form-data;',
   // 'Content-Type': 'application/json', 
    // 'Content-Type': 'multipart/form-data',
    'X-Cookie': 'CAKEPHP='+sessionId ,
    'Access-Control-Allow-Origion':'*',
    'Connection': 'close',
    'Accept':'application/json',
    'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token,X-Cookie'})
 

  const filetransfers: FileTransferObject = this.filetransfer.create();
  let options: FileUploadOptions = {
    fileKey: 'messageFile',
    fileName: 'filename.mp4',
    chunkedMode: false,
    mimeType: "video/mp4",
    headers: headers,
    httpMethod: 'POST',
    params: {"messageId": messageId}


  }
  // alert('videodata'+this.attachedsrc)

  filetransfers.upload(this.attachedsrc,'https://www.artformplatform.com/api/upload/message.json', options)
    .then((data) => {
     
  //     alert('hi')
  // alert('DATA'+JSON.stringify(data))
  this.app.getActiveNav().popToRoot()

    }, (err) => {
      // alert('bi')
    //  alert('erro34' + JSON.stringify(err))
     this.app.getActiveNav().popToRoot()
    })

} 

}
