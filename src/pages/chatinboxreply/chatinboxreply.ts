import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController, Alert,Content, ToastController} from 'ionic-angular';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import { from } from 'rxjs/observable/from';
import { FileChooser } from '@ionic-native/file-chooser'
import{Camera,CameraOptions}from'@ionic-native/camera'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { File } from '@ionic-native/file';
@IonicPage()
@Component({
  selector: 'page-chatinboxreply',
  templateUrl: 'chatinboxreply.html',
  queries: {
    content: new ViewChild(Content)
}
})
export class ChatinboxreplyPage {
  // @ViewChild(Content) content: Content;
  // @ViewChild(Content) contentArea: Content;
  id
  page=1
  username
 
  message
  img
  totalpages
  loader
  messagedata=[]
  conversationid
  comments
  imgsrc
  loading
  loaderspinner
  private mutationObserver: MutationObserver;
  @ViewChild('pageTop') pageTop: Content;
  messagefilter
  messagefilter2
  videodata
  mediatype
  constructor(public file:File,public toastCtrl:ToastController,public filetransfer:FileTransfer,public camera:Camera,public filechoose:FileChooser,public actionsheetCtrl:ActionSheetController,public actionsheet:ActionSheetController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.mediatype=1
    this.loading=true
    this.loader=true
    this.loaderspinner=false
    this.loaddata()
    this.createconversation()
    // this.contentArea.scrollToBottom();
    // this.pageTop.scrollToTop();
  //   this.mutationObserver = new MutationObserver((mutations) => {
  //     this.contentArea.scrollToBottom();
  // });

  } 
  loaddata(){
    this.id=this.navParams.get('id')
    console.log('ionViewDidLoad ChatinboxreplyPage');
    Observable.of(null)
     .flatMap(()=>this.security.markasread(this.id)).subscribe(data=>{
      this.loading=false
   
   })
  


  }
  loadMore(infiniteScroll) {

    this.page++
    console.log(this.page)
    console.log(this.totalpages)
    if(this.totalpages>=this.page)
    {
      this.createconversation(infiniteScroll)
    }
    else
    {
      this.loader=false
   
   console.log('falsee')
    }
   
  }
  createconversation(infiniteScroll?)
  {
    this.imgsrc=''
    Observable.of(null)
    .flatMap(()=>this.security.createconversation(this.id,this.page)).subscribe(data=>{
      this.totalpages=data.totalPages
      if(data.conversation.Conversations.conversation_id)
      {
        this.conversationid=data.conversation.Conversations.conversation_id
      }
      //  this.conversationid=data.conversation.Conversations.conversation_id 
       
        
      // this.username=data.user.user_display_name
      this.message=this.getconvdata(data.messages)
     console.log('message',this.message)
       
     if(data.user.user_profile_avatar)
     {
      this.img=data.user.user_profile_avatar
     }
   
      // this.img=data.user.user_profile_avatar
      if (infiniteScroll) {

        infiniteScroll.complete();
      }
    })
  }
  getconvdata(data)
  {
  
for(var i=0;i<data.length;i++)
{ 
  this.messagefilter=data[i].Messages.message
  this.messagefilter2=this.messagefilter.substring(1,this.messagefilter.length-1)
  console.log('message'+this.messagefilter)
    this.messagedata.push({user_profile_avatar:data[i].Users.user_profile_avatar,
      user_display_name:data[i].Users.user_display_name,
      message:this.messagefilter2,
      file_name:data[i].Messages.file_name,
      status:data[i].MessageStatus.status,
      file_url:data[i].Messages.file_url,
      file_type:data[i].Messages.file_type,
      message_id:data[i].Messages.message_id,
      created:data[i].Messages.created
    })

  
 }
 console.log('messagedata'+this.messagedata)

 this.messagedata.reverse()


 return this.messagedata
  }
  replytomessage()
  {
    if(this.comments)
    {
    this.loaderspinner=true
    Observable.of(null)
    .flatMap(()=>this.security.replytoconv(this.conversationid,this.comments)).subscribe(data=>{
      this.loaderspinner=false
     this.comments=''
     this.messagedata=[]
     this.page=1
     console.log('messageid'+data.messageId)
     if(this.imgsrc)
     {
       if(this.mediatype==2)
       {
        this.uploadvideosecond(data.messageId)
       } 
       else
       {
        this.imageupload(data.messageId)
       }   


     }
     else
     {
      this.createconversation()
     }
     
    
    })
  }
  else
  {
    this.toastCtrl.create({ message: `Message Can not be blank`, duration: 4000, position: 'top'}).present();   
  }
  }
  fileadd()
  {
    this.filechoose.open()
  .then(uri => {
    // alert('uri'+JSON.stringify(uri))
  })
  .catch(e => {
    // alert('error'+JSON.stringify(e))
  });
  }
  mediaoption()
  {
    console.log('messagei'+this.messagedata[this.messagedata.length-1].message_id)
    let actionsheet = this.actionsheetCtrl.create({
      title: 'Choose Upload Option!',
      buttons: [{
        text: 'Upload Images',
        handler: () => {
    this.capturecamera()
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
    this.toastCtrl.create({ message: `Upload File below then 5mb.`, duration: 4000, position: 'top'}).present();  
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.VIDEO

    })
      .then((fileuri) => {
        fileuri='file:///'+fileuri
        // alert('fileuri'+fileuri)
      // this.imgsrc=fileuri
      
      // this.uploadvideosecond()
      this.file.resolveLocalFilesystemUrl(fileuri).then(fileEntry => { 
        // alert('hii')
        // alert(fileuri)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
            
    
               
            if(metadata.size<25224){ 
              
             
              this.imgsrc=fileuri
              this.mediatype=2
        this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else if(metadata.size>25224){ 
              
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            else
            {
              
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            
        })
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
    params: {"messageId":messageId} 
    // params: {"messageId": this.messagedata[this.messagedata.length-1].message_id}

  

  }
  // alert('videodata'+this.imgsrc)

  filetransfers.upload(this.imgsrc,'https://www.artformplatform.com/api/upload/message.json', options)
    .then((data) => {
  //     alert('hi')
  // alert('DATA'+JSON.stringify(data))
  this.messagedata=[]
  this.createconversation()

    }, (err) => {
      alert('bi')
     alert('erro34' + JSON.stringify(err))
    })

} 

  capturecamera()
  {
    console.log('messagei'+this.messagedata[this.messagedata.length-1].message_id)
    this.toastCtrl.create({ message: `Upload File below then 5mb.`, duration: 4000, position: 'top'}).present();  
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
  // alert('imagedata'+imageData)
  
  this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
    // alert('hii')
    // alert(imageData)
    fileEntry.getMetadata((metadata) => {
           //metadata.size is the size in bytes
          //  alert('size'+metadata.size)
        

           
        if(metadata.size<25224){ 
          
         
          this.imgsrc=imageData
    this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
          //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
        }
        else if(metadata.size>25224){ 
          
          
          this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
        }
        else
        {
          
          
          this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
        }
        
    })
  })
      // this.imgsrc = "data:image/jpeg;base64," + imageData;

    // this.imageupload()
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
      
      this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
        // alert('hii')
        // alert(imageData)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
            
    
               
            if(metadata.size<25224){ 
              
             
              this.imgsrc=imageData
        this.toastCtrl.create({ message: `Image uploaded successfully.`, duration: 4000, position: 'top'}).present();  
              //this.eleRef.nativeElement.querySelector('#imgfile').dispatchEvent(new Event('click')); 
            }
            else if(metadata.size>25224){ 
              
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            else
            {
              
              
              this.toastCtrl.create({ message: `Please upload file less than 5mb. Thanks!!`, duration: 4000, position: 'top' }).present();
            }
            
        })
      })
      //  this.imgsrc = "data:image/jpeg;base64," + imageData;
      // this.imageupload()
    }, (err) => {
    })
  }
  imageupload(messageId)
  {
    let sessionId=localStorage['sessionId']
    // alert(sessionId)
    // alert('imgsrc'+this.imgsrc)
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
    // alert(headers)
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
    filetransfers.upload(this.imgsrc,'https://www.artformplatform.com/api/upload/message.json', options)
    .then((data) => {
  //       alert('upload')
  // alert('data11'+JSON.stringify(data))
  this.messagedata=[]
  this.createconversation()
      }
      , (err) => {
        alert('bii'+err)
       alert('error4'+JSON.stringify(err))    
      }
      )
  }

}
