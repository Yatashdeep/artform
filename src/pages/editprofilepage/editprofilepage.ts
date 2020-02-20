import { Component,ViewChild } from '@angular/core';
import {Events, IonicPage, App,NavController, NavParams,ViewController,ActionSheetController ,ToastController} from 'ionic-angular';
import { CategoryPage } from '../category/category';
import{Observable}from'rxjs'
import{SecurityProvider}from'../../providers/security/security'
import{TabspagePage}from'../../pages/tabspage/tabspage'
import { from } from 'rxjs/observable/from';
import { FileChooser } from '@ionic-native/file-chooser'
import{Camera,CameraOptions}from'@ionic-native/camera'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { AngularCropperjsComponent } from 'angular-cropperjs';
/**
 * Generated class for the EditprofilepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofilepage',
  templateUrl: 'editprofilepage.html',
})
export class EditprofilepagePage {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;
 
  myImage = null;
  scaleValX = 1;
  scaleValY = 1;


  user
  profile
  user_display_name
  user_fname
  user_message
  user_lname
  user_biography
  user_city
  user_nationality
  user_sex
  user_mobileno
  user_birth
  imgsrc
  bannerimgsrc
  banner
  imageuploadactive
  count=-1
  rotatebox
  coordinates = {x:0} 
  status='Save'
  artistprop
  constructor(public app: App,public event:Events,public menu:MenuController,private toastCtrl: ToastController,public filetransfer:FileTransfer,public camera:Camera,public actionsheetCtrl:ActionSheetController,public security:SecurityProvider,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.imageuploadactive=true
     this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
      
    };
    
  }
  captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myImage = 'data:image/jpeg;base64,' + imageData;
    });
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  clear() {
    this.angularCropper.cropper.clear();
  }

  rotate() {
    this.angularCropper.cropper.rotate(90);
      this.count++
      if(this.count==0)
      {
           this.rotatebox=90
      }
      else if(this.count==1)
      {
        this.rotatebox=180
      }
      else if(this.count==2)
      {
        this.rotatebox=270
      }
      else if(this.count==3)
      {
        this.rotatebox=360
      }
      else if(this.count==4)
      {
        this.rotatebox=0
        this.count=0
      }
      alert(this.rotatebox)
    
  }

  zoom(zoomIn: boolean) {
    let factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(factor);
  }

  scaleX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
 alert(this.angularCropper.cropper.scaleX())
  }

  scaleY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
   
  }

  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }

  savecrop() {
    alert('COORDINATES'+JSON.stringify(this.coordinates))
    let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
  
    var myImg = document.querySelector("#sky") as HTMLImageElement;
    var realWidth = myImg.naturalWidth
    var realHeight = myImg.naturalHeight;
    alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);

  }
  imgSize(){
    var myImg = document.querySelector("#sky") as HTMLImageElement;
    var realWidth = myImg.naturalWidth
    var realHeight = myImg.naturalHeight;
    alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
}
  ionViewDidLoad() {
    var usertype =localStorage['usertype']
    if(usertype==3)
    {
   this.artistprop='inactive'
  
    }
    else
    {
      this.artistprop='active'       
    }
    this.banner=true
    this.user=this.navParams.get('user')
    this.profile=this.user.user_profile_avatar
    console.log('this',this.profile)
    this.user_display_name=this.user.user_display_name
    this.user_fname=this.user.user_fname
    this.user_lname=this.user.user_lname
    this.user_biography=this.user.user_biography 
    this.user_city=this.user.user_city
     this.user_nationality=this.user.user_nationality
     this.user_sex=this.user.user_sex
     this.user_mobileno=this.user.user_mobileno
     this.user_birth=this.user.user_birth
    // this.bannerimgsrc=this.user.user_banner
    this.bannerimgsrc=localStorage['banner']
    console.log('ionViewDidLoad EditprofilepagePage',this.user);
    
  }
  tapshow()
  {
    this.viewCtrl.dismiss()
  }
  category()
  {
    this.navCtrl.push(CategoryPage)
  }
  save()
  {
    this.status='Saving Profile...'
    Observable.of(null)
    .flatMap(()=>this.security.editprofile(
      this.user_fname,
      this.user_lname,
      this.user_display_name,
      this.user_mobileno,
      this.user_nationality,
      this.user_city,
      this.user_sex,
      this.user_biography,
      this.user_birth
 )).subscribe(data=>{
  this.status='Save'
  this.viewCtrl.dismiss();
  // this.menu.enable(false);
  // this.app.getActiveNav().popToRoot()
  this.event.publish('user:image',this.imgsrc,this.user_fname,Date.now())
 // this.navCtrl.setRoot(TabspagePage,{id:4})
  // this.navCtrl.popToRoot();
    })
  }
  capturecamera()
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
  // alert('imagedata'+imageData)
  this.imgsrc=imageData
  this.profile=imageData
      // this.imgsrc = "data:image/jpeg;base64," + imageData;

    this.imageupload()
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
      this.imgsrc=imageData
      this.profile=imageData
      //  this.imgsrc = "data:image/jpeg;base64," + imageData;
      this.imageupload()
    }, (err) => {
    })
  }
  imageupload()
  {
    this.imageuploadactive=false
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
   
    // alert(headers)
    // alert(JSON.stringify(headers))
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'userAvatar',
      fileName: 'filename.jpg',
      chunkedMode: false,
      headers: headers,
      httpMethod: 'POST',
      mimeType: "image/jpeg",
      // params: {"messageId": this.messagedata[this.messagedata.length-1].message_id},
    // params:{"cropData": {"x":2937.6,"y":1171.621978021978,"height":1416.5802197802197,"width":1416.5802197802197,"rotate":0}}
    }
   // filetransfers.upload(this.imgsrc,'https://www.demo.artformplatform.com/api/messages/upload.json', options)
    filetransfers.upload(this.imgsrc,'https://www.artformplatform.com/api/user/uploadAvatar.json', options)
    .then((data) => {
      this.imageuploadactive=true
  //       alert('upload')
  // alert('data11'+JSON.stringify(data))
  this.event.publish('user:image',this.imgsrc,this.user_fname,Date.now())
  localStorage.setItem('image1', this.imgsrc)
  localStorage['image1']=this.imgsrc
      }
      , (err) => {
        alert('bii'+err)
       alert('error4'+JSON.stringify(err))    
      }
      )
  }
  uploadbanner()
  {
    let actionsheet = this.actionsheetCtrl.create({
      title: 'Image Upload!',
      buttons: [{
        text: 'Upload From Gallery',
        handler: () => {
    this.bannergallery()
        },
      }
        ,
      {
        text: 'Take A Snap',
        handler: () => {
        
         this.bannercamera1()
        }
      }]

    })
    actionsheet.present();
  }
  bannercamera1()
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
  this.bannerimgsrc=imageData
      // this.imgsrc = "data:image/jpeg;base64," + imageData;

    this.bannnerimageupload()
    }, (err) => {
    })
  }
  bannergallery()
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
      this.bannerimgsrc=imageData
      //  this.imgsrc = "data:image/jpeg;base64," + imageData;
      this.bannnerimageupload()
    }, (err) => {
    })
  }
  bannnerimageupload()
  {
    this.banner=false
    let sessionId=localStorage['sessionId']
    // alert(sessionId)
    // alert('imgsrc'+this.bannerimgsrc)
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
   
    // alert(headers)
    // alert(JSON.stringify(headers))
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'userBanner',
      fileName: 'filename.jpg',
      chunkedMode: false,
      headers: headers,
      httpMethod: 'POST',
      mimeType: "image/jpeg",
      // params: {"messageId": this.messagedata[this.messagedata.length-1].message_id},
   
    }
   // filetransfers.upload(this.imgsrc,'https://www.demo.artformplatform.com/api/messages/upload.json', options)
    filetransfers.upload(this.bannerimgsrc,'https://www.artformplatform.com/api/user/uploadBanner.json', options)
    .then((data) => {
      this.banner=true
      this.event.publish('user:banner',this.bannerimgsrc,this.user_fname,Date.now())
      localStorage['banner']=this.bannerimgsrc
      localStorage.setItem('banner', this.bannerimgsrc)
  let toast = this.toastCtrl.create({
    message: 'Image Uploaded successfully',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
      }
      , (err) => {
        alert('bii'+err)
       alert('error4'+JSON.stringify(err))    
      }
      )
  }
}
