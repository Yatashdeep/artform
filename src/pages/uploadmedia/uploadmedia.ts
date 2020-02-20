import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams ,AlertController,ActionSheetController,Alert} from 'ionic-angular';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import{SecuritypanelPage}from'../../pages/securitypanel/securitypanel'
import { FileChooser } from '@ionic-native/file-chooser'
import{Camera,CameraOptions}from'@ionic-native/camera'
import { from } from 'rxjs/observable/from';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import{FormBuilder,FormGroup,Validator, Validators,AbstractControl }from'@angular/forms'
import { NgZone } from '@angular/core';
import { SelectuploadcategoryPage } from '../selectuploadcategory/selectuploadcategory';
import { DashboardPage } from '../dashboard/dashboard';
import{ArtprofilePage}from'../artprofile/artprofile'
/**
 * Generated class for the UploadmediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadmedia',
  templateUrl: 'uploadmedia.html',
})
export class UploadmediaPage {
id=0
youtubeinput
imgsrc
uploadform
upload:boolean
loadProgress=0
uploadstatus
coverimgsrc
submit:boolean
hidefileinput:boolean
toggleswitch
uploadactive:boolean
medianame
categoryId
subcategoryId
subsubcategoryId
usermediaId
cameraid
coversrc
coverdata
imgsrc1
imgsrc2
youTubeuploadactive
loader
loader1
categories=[]
subid
subsubid

categoryid
subcategoryid
subsubcategoryid
categoryloading:boolean
changetypeshow
Cover:boolean
constructor(public app:App,public _zone: NgZone,public formBuilder:FormBuilder,public filetransfer:FileTransfer,public file:File,public camera:Camera,public actionsheetCtrl:ActionSheetController,public alertCtrl:AlertController,public service:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.id=this.navParams.get('id')
    let linkregex=/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    this.uploadform=formBuilder.group({
      youtubeinput:['',Validators.compose([Validators.pattern(linkregex),Validators.required])],
      
    })
    if(localStorage['usertype']!=2)
    {
      this.changetypeshow=true
      // let alert = this.alertCtrl.create({
      //   title: 'You have created a User profile. In order to upload, please change to Artist profile. Would you like to change to Artist Profile and enable upload?',
    
      //   buttons: [
      //     {
      //       text: 'Ok',
      //       handler: data => {
      //         this.changetype()
      //       }
      //     },
      //     {
      //       text: 'Cancel',
      //       handler: data => {
      //         this.navCtrl.setRoot(ArtprofilePage,{id:4})
      //       }
      //     }
         
      //   ]
      // });
      // alert.present();
    }
    else
    {
      this.changetypeshow=false
    }
    
}

  ionViewDidLoad() {
    this.Cover=true
   
    console.log('ionViewDidLoad UploadmediaPage');
    this.categoryloading=false
    this.submit=true
  this.hidefileinput=false
this.uploadactive=false
this.toggleswitch=true
   this.youTubeuploadactive=true
this.loader=false
this.loader1=false
    
  }
  tap()
  {
 
 if(this.uploadform.valid==true)
 {
this.submit=true

 }
  }
  gettogglevalue()
  {
    console.log('toggle',this.toggleswitch)
    if(this.toggleswitch==true)
    {
    this.uploadactive=false   
    }
    else
    {
      this.uploadactive=true
    }
  }

  submityoutube()
  {
    if(localStorage['usertype']==2)
    {
    this.loader1=true
    Observable.of(null)
.flatMap(()=>this.service.youtubeshare(this.uploadform.get('youtubeinput').value)).subscribe(data=>{
//  alert('data'+JSON.stringify(data))
  this.loader1=false
  this.Cover=false
 this.toggleswitch=false
  this.usermediaId=data.last_id
  this.categoryId=data.user.category_id
  this.subcategoryId=data.user.subcategory_id
  this.subsubcategoryId=data.user.subsubcategory_id
  this.submit=false
  this.hidefileinput=true
  
})
    }
    else
    {
       let alert = this.alertCtrl.create({
         title: 'You have created a User profile. In order to upload, please change to Artist profile. Would you like to change to Artist Profile and enable upload?',
     
         buttons: [
           {
             text: 'Ok',
             handler: data => {
               this.changetype()
             }
           },
           {
             text: 'Cancel',
             handler: data => {
              this.navCtrl.setRoot(ArtprofilePage,{id:4})
             }
           }
          
         ]
       });
       alert.present();
     }
  }
  uploadmediadetails(medianame)
  {

//  alert(medianame)
//  alert(localStorage['category'])
//  alert(localStorage['subcategory'])
//  alert(localStorage['subsubcategory']) 
// alert(this.usermediaId)
  if(this.toggleswitch==true)
  {

    if(this.imgsrc2)
 {
  this.loader=true
    Observable.of(null)
    .flatMap(()=>this.service.uploadmedia(medianame,this.categoryid,this.subcategoryid,this.subsubcategoryid,this.usermediaId)).subscribe(data=>{
      this.loader=false
      console.log('hiiiiitest33')
      this.submit=true
      this.hidefileinput=false
    this.uploadactive=false
    this.toggleswitch=true
       this.youTubeuploadactive=true
    this.loader=false
    this.loader1=false
    this.alertpopup();
   // this.navCtrl.setRoot(UploadmediaPage,{id:1})
     this.navCtrl.setRoot(ArtprofilePage,{id:4})
    })
  } 
  else
  {
    let alert = this.alertCtrl.create({
      title: 'Please attach cover image or deselect cover image option',
  
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            
          }
        },
        {
          text: 'Cancel',
          handler: data => {
          
          }
        }
       
      ]
    });
    alert.present();
  }
  }
  else
  {
    this.loader=true
    Observable.of(null)
    .flatMap(()=>this.service.uploadmedia(medianame,this.categoryid,this.subcategoryid,this.subsubcategoryid,this.usermediaId)).subscribe(data=>{
      console.log('hiiiiitest')
      this.loader=false
      this.submit=true
      this.hidefileinput=false
    this.uploadactive=false
    this.toggleswitch=true
       this.youTubeuploadactive=true
    this.loader=false
    this.loader1=false
      // this.checkevent()
      this.alertpopup();
     //  this.navCtrl.setRoot(UploadmediaPage,{id:1})
     this.navCtrl.setRoot(ArtprofilePage,{id:4})

    },err=>{
      alert(err)
    })
  }





  }
  alertpopup(){
    let alert = this.alertCtrl.create({
      title: 'File uploaded Sucessfully!!',
      subTitle:'Your File will shortly be updated',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            
          }
        }
       
      ]
    });
    alert.present();
  }
  checkevent()
  {
    // alert('hi')
  }
  uploadcover()
  {
    Observable.of(null)
.flatMap(()=>this.service.uploadcovercrop(this.coverimgsrc,this.usermediaId)).subscribe(data=>{
// alert(JSON.stringify(data))
})  
  }
  
  changeusertype()
  {
   if(localStorage['usertype']==2)
   {
    let alert = this.alertCtrl.create({
      title: 'Upload',
      inputs: [
        {
          name: 'medianame',
          placeholder: 'Enter media name'
        }
      ],
      buttons: [
        {
          text: 'Send',
          handler: data => {
            this.uploadmediadetails(data.medianame)
          }
        }
       
      ]
    });
    alert.present();







   }
   else
   {
      let alert = this.alertCtrl.create({
        title: 'You have created a User profile. In order to upload, please change to Artist profile. Would you like to change to Artist Profile and enable upload?',
    
        buttons: [
          {
            text: 'Ok',
            handler: data => {
              this.changetype()
            }
          },
          {
            text: 'Cancel',
            handler: data => {
            
            }
          }
         
        ]
      });
      alert.present();
    }
  }
  changetype()
  {
    Observable.of(null)
    .flatMap(()=>this.service.changeusertype()).subscribe(data=>{
      localStorage['usertype']=2
     // this.navCtrl.setRoot(SecuritypanelPage)
     this.app.getRootNav().setRoot(SecuritypanelPage)
    // this.navCtrl.setRoot(ArtprofilePage,{id:4})
    })
  }
  mediaoption()
  {
    console.log('hi')
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
    
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.VIDEO

    })
      .then((fileuri) => {
        fileuri='file:///'+fileuri
        // alert('fileuri'+fileuri)
       this.imgsrc=fileuri
       this.imgsrc1=fileuri
      // this.uploadvideosecond()
      this.file.resolveLocalFilesystemUrl(fileuri).then(fileEntry => { 
        // alert('hii')
        // alert(fileuri)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
            
            this.uploadvideosecond()  
               

            
        })
      })
      },
      (err) => {
     alert(err)

      } )

  }
  uploadvideosecond()
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
      fileKey: 'files',
    fileName: 'filename.mp4',
    chunkedMode: false,
    mimeType: "video/mp4",
    headers: headers,
    httpMethod: 'POST',
    
    // params: {"messageId": this.messagedata[this.messagedata.length-1].message_id}

  

  }
  // this.uploadstatus='Upload Status:'+this.loadProgress

  this.upload=true
   
  filetransfers.onProgress((e) => {





    this._zone.run(() => {
    this.loadProgress = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
    })
    
    
    });
  // alert('videodata'+this.imgsrc)

  filetransfers.upload(this.imgsrc,'https://www.artformplatform.com/api/upload/media.json', options)
    .then((data) => {
      this.uploadstatus='Succesfully Uploaded'
  
      this.upload=false  
    //  alert('data'+JSON.stringify(data))
     this.youTubeuploadactive=false
     this.coverdata=JSON.parse(data.response)
        
        this.categoryId=this.coverdata.user.category_id
        this.subcategoryId=this.coverdata.user.subcategory_id
        this.subsubcategoryId=this.coverdata.user.subsubcategory_id
        this.usermediaId=this.coverdata.files[0].id 
     
 
        // alert(this.usermediaId)
  
    }, (err) => {
      alert('bi')
     alert('erro34' + JSON.stringify(err))
    })

} 

  capturecamera(id?)
  {
    console.log(id)
    this.cameraid=id   
    console.log(this.cameraid)
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
  if(this.cameraid==1)
  {
  this.imgsrc2=imageData
  }
  else
  {
  this.imgsrc1=imageData
  }
  this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
    // alert('hii')
    // alert(imageData)
    fileEntry.getMetadata((metadata) => {
           //metadata.size is the size in bytes
          //  alert('size'+metadata.size)
        
this.imageupload()
           
  
        
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
      this.imgsrc=imageData
      if(this.cameraid==1)
      {
      this.imgsrc2=imageData
      }
      else
      {
      this.imgsrc1=imageData
      } 
      this.file.resolveLocalFilesystemUrl(imageData).then(fileEntry => { 
        // alert('hii')
        // alert(imageData)
        fileEntry.getMetadata((metadata) => {
               //metadata.size is the size in bytes
              //  alert('size'+metadata.size)
               this.imageupload()
    
               
        
        })
      })
      //  this.imgsrc = "data:image/jpeg;base64," + imageData;
      // this.imageupload()
    }, (err) => {
    })
  }
  imageupload()
  {
    let sessionId=localStorage['sessionId']
    var filekey
    var uploadlink
    if(this.cameraid==1)
    {
      uploadlink='https://www.artformplatform.com/api/upload/cover.json'
      filekey='coverFile'
    }
    else
    {
      uploadlink='https://www.artformplatform.com/api/upload/media.json'
      filekey='files' 
    } 



    
    
    let headers = new Headers({ 
    'enctype': 'multipart/form-data;',
 
    'X-Cookie': 'CAKEPHP='+sessionId ,
    'Access-Control-Allow-Origion':'*',
    'Connection': 'close',
    'Accept':'application/json',
    'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token,X-Cookie'})
   
    const filetransfers: FileTransferObject = this.filetransfer.create();
    

    let options: FileUploadOptions = {
      fileKey: filekey,
      fileName: 'filename.jpg',
      chunkedMode: false,
      headers: headers,
      httpMethod: 'POST',
      mimeType: "image/jpeg"
    
    }
    // this.uploadstatus='Upload Status:'+this.loadProgress

    this.upload=true
     
    filetransfers.onProgress((e) => {





      this._zone.run(() => {
      this.loadProgress = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
      })
      
      
      });

// alert(uploadlink)
   // filetransfers.upload(this.imgsrc,'https://www.demo.artformplatform.com/api/messages/upload.json', options)
    filetransfers.upload(this.imgsrc,uploadlink, options)
    .then((data) => {
      // alert('hope_test'+JSON.stringify(data))
      this.uploadstatus='Succesfully Uploaded'
     
      this.upload=false
      this.coverdata=JSON.parse(data.response)
      // alert(JSON.stringify(this.coverdata))
      this.youTubeuploadactive=false

     if(this.cameraid==1)
      {
           
           this.coverimgsrc=this.coverdata.cover_url
           this.usermediaId=this.coverdata.last_id
     
          //  alert(this.coverimgsrc+''+this.usermediaId)
           this.uploadcover()
          }
      else
      {
        // alert('hi')
        // alert(JSON.stringify(this.coverdata.user))
        // alert(this.coverdata.user.category_id)
        // alert(this.coverdata.user.subcategory_id)
        // alert(this.coverdata.user.subsubcategory_id)
        // alert(JSON.stringify(this.coverdata.files))      
        // alert(this.coverdata.files[0].id)
        this.categoryId=this.coverdata.user.category_id
        this.subcategoryId=this.coverdata.user.subcategory_id
        this.subsubcategoryId=this.coverdata.user.subsubcategory_id
        this.usermediaId=this.coverdata.files[0].id
        // alert(this.coverdata[0].user.category_id)
        // alert(this.coverdata.user)
        // alert(this.coverdata)
        // alert(this.coverdata.user.category_id)
        // this.categoryId=this.coverdata.user[0].category_id
        // alert(this.categoryId)
        
        // this.subcategoryId=this.coverdata.user[0].subcategory_id
        // this.subsubcategoryId=this.coverdata.user[0].subsubcategory_id
        // this.usermediaId=this.coverdata.user[0].files[0].id
        // alert(this.usermediaId)

      }
        
      // alert('uploaddata'+JSON.stringify(data))
  //       alert('upload')


      }
      , (err) => {
        alert('bii'+err)
       alert('error4'+JSON.stringify(err))    
      }
      )
  }



  coverupload()
  {
    let sessionId=localStorage['sessionId']
   
    let headers = new Headers({ 
    'enctype': 'multipart/form-data;',
 
    'X-Cookie': 'CAKEPHP='+sessionId ,
    'Access-Control-Allow-Origion':'*',
    'Connection': 'close',
    'Accept':'application/json',
    'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token,X-Cookie'})
   
    const filetransfers: FileTransferObject = this.filetransfer.create();
    let options: FileUploadOptions = {
      fileKey: 'coverFile',
      fileName: 'filename.jpg',
      chunkedMode: false,
      headers: headers,
      httpMethod: 'POST',
      mimeType: "image/jpeg"
    
    }
   // filetransfers.upload(this.imgsrc,'https://www.demo.artformplatform.com/api/messages/upload.json', options)
    filetransfers.upload(this.imgsrc,'https://www.artformplatform.com/api/upload/cover.json', options)
    .then((data) => {
  //       alert('upload')
  // alert('data11'+JSON.stringify(data))
  
      }
      , (err) => {
        alert('bii'+err)
       alert('error4'+JSON.stringify(err))    
      }
      )
  }
  category(){
// this.navCtrl.push(SelectuploadcategoryPage)
this.categoryloading=true
Observable.of(null)
.flatMap(()=>this.service.getcategory()).subscribe(data=>{
  this.categoryloading=false
this.createcategory(data)

})
  }
  createcategory(data)
  {
    
    this.categories=data.categories
    console.log(this.categories)
   
       
    let alert: Alert = this.alertCtrl.create({});

    // Here we will generate dynamically check-box
    for(let i=0; i<this.categories.length; i++) {
      

      alert.addInput({
          value: this.categories[i].Category.category_id,
          label: this.categories[i].Category.category_name,
          type: 'radio',
          checked: false
      })

    }
    alert.addButton(
      {
        
      text: 'Skip',
      handler: () => {
       
        console.log('cancel clicked');
    
    
    }})
    alert.addButton({
        
      text: 'Next',
      handler: (data) => {
        console.log('Buy clicked',data);
         this.categoryid=data
        this.subcreatecategory(data)

}})

     alert.present(); 
  }
  subcreatecategory(data)
  {
    
    // Here we will generate dynamically check-box
    for(let i=0; i<this.categories.length; i++) { 
      if(this.categories[i].Category.category_id==data){
       this.subid=i
      }
    }
    this.getmysubid(this.subid)
  

  }
  getmysubid(id)
  {
    let alert: Alert = this.alertCtrl.create({});
    for(var j=0;j<this.categories[id].Childrens.length;j++)
    {
     this.categories[id].Childrens[j].Subcategory.checked=false
    
          

      alert.addInput({
          value: this.categories[id].Childrens[j].Subcategory.subcategory_id,
          label: this.categories[id].Childrens[j].Subcategory.subcategory_name,
          type: 'radio',
          checked: false
      })

    }
    alert.addButton(
      {
        
      text: 'Skip',
      handler: () => {
       
        console.log('cancel clicked');
    
    
    }})   
     alert.addButton({
        
      text: 'Next',
      handler: (data) => {
        console.log('Buy clicked',data);
        this.subcategoryid=data  
        this.subsubcategory(data)

}})

     alert.present();
  }
  subsubcategory(data)
  {
    for(var j=0;j<this.categories[this.subid].Childrens.length;j++)
    {
     
     if(this.categories[this.subid].Childrens[j].Subcategory.subcategory_id==data){
      this.subsubid=j
     }
 
    }
    this.getmysubsubid(this.subsubid)
  }
  getmysubsubid(id)
  {
    if(this.categories[this.subid].Childrens[this.subsubid].Childrens.length>0)
    {
    console.log('id'+id)
    let alert: Alert = this.alertCtrl.create({});
    for(var k=0;k<this.categories[this.subid].Childrens[this.subsubid].Childrens.length;k++)
    {
      alert.addInput({
          value: this.categories[this.subid].Childrens[this.subsubid].Childrens[k].Subsubcategory.subsubcategory_id,
          label: this.categories[this.subid].Childrens[this.subsubid].Childrens[k].Subsubcategory.subsubcategory_name,
          type: 'radio',
          checked: false
      })

    }
    alert.addButton(
      {
        
      text: 'Skip',
      handler: () => {
       
        console.log('cancel clicked');
    
    
    }})
    alert.addButton(
      {
        
      text: 'Next',
      handler: (data) => {
        this.subsubcategoryid=data
        console.log('Buy clicked',data);
 

}
},

)


     alert.present();
}
  }


}
