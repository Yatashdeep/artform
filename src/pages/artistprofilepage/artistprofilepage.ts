import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams ,PopoverController,Events,ActionSheetController} from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { UploadmediaPage } from '../uploadmedia/uploadmedia';
import { EditprofilepagePage } from '../editprofilepage/editprofilepage';
import { InboxpagePage } from '../inboxpage/inboxpage';
import { EditproartistpagPage } from '../editproartistpag/editproartistpag';
import { CommentsboxPage } from '../commentsbox/commentsbox';
import { PopoverpagesharePage } from '../popoverpageshare/popoverpageshare';
import { ReportprobPage } from '../reportprob/reportprob';
import { FollowedartistPage } from '../followedartist/followedartist';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { FileChooser } from '@ionic-native/file-chooser'
import{Camera,CameraOptions}from'@ionic-native/camera'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import{Observable}from'rxjs'
import{SecurityProvider}from'../../providers/security/security'
import{DashboardserviceProvider}from'../../providers/dashboardservice/dashboardservice'
import { from } from 'rxjs/observable/from';
import{ViewtalentPage}from'../../pages/viewtalent/viewtalent'
import { ViewvideoplayPage } from '../viewvideoplay/viewvideoplay';
import{FollowersPagepPage}from'../followers-pagep/followers-pagep'
/**
 * Generated class for the ArtistprofilepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artistprofilepage',
  templateUrl: 'artistprofilepage.html',
})
export class ArtistprofilepagePage {

  fakedata=[1,2,3,4]
  showcat:boolean
  showshare:boolean
count=1
playlist
rate
imgsrc
rcentdata
id
displayname
profilepic
user_banner
artistid

following
followers
latestchart
page=0
catid
profilerecentcharts
categorytag
type
loadingrecentdata
loaderitem
topid
profileuser
followingdata
followersdata  
constructor(public profilemedia:DashboardserviceProvider,public security:SecurityProvider,public filetransfer:FileTransfer,public camera:Camera,public filechoose:FileChooser,public actionsheetCtrl:ActionSheetController,public events:Events,private nativePageTransitions: NativePageTransitions,public popoverCtrl:PopoverController,public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.showcat=true
this.showshare=false 
this.playlist='latest'
events.subscribe('star-rating:changed', (starRating) => {
  console.log('starrating'+starRating)
  this.rate=starRating
});
// events.subscribe('user:following',(followingdata)=>{
  
//   this.followingdata=followingdata
//   console.log(this.followingdata)  
//   this.following=this.followingdata.length
//   // alert(this.banner)
//   })
//   events.subscribe('user:followersdata',(followersdata)=>{
  
//   this.followersdata=followersdata
//   this.followers=this.followersdata.length
//   console.log(this.followersdata)
//   // alert(this.banner)
//   })
  }
  songtype(id)
  {
  
   
    this.page=0
     if(id==1)
    {
      this.categorytag='Music'
      this.catid=1
      this.type='in Music'
    }
    else if(id==2)
    {
      this.categorytag='Dance'
      this.catid=2
      this.type='in Dance'
    }
    else if(id==3)
    {
      this.categorytag='Film'
      this.catid=3
      this.type='in Film'
    }
    else if(id==4)
    {
      this.categorytag='Photography'
      this.catid=4
      this.type='in Photography'
    }
  
    else if(id==7)
    {
      this.categorytag='Literature'
      this.catid=7
      this.type='in Literature'
    }
    else if(id==8)
    {
      this.categorytag='Art'
      this.catid=8
      this.type='in Art'
    } else if(id==5)
    {
      this.categorytag='Freestyle'
      this.catid=5
      this.type='in Freestyle'
    }
    else if(id==9)
    {
      this.categorytag='Personality'
      this.catid=9
      this.type='in Personality'
    }
    else if(id==6)
    {
      this.categorytag='Others'
      this.catid=6
      this.type='in Others'
    }
    this.profilemedia.sortcatprofile=1
    this.recentcharts()
  }
  ionViewDidLoad() {
    this.loadingrecentdata=false
    this.rcentdata=this.navParams.get('rcentdata')
    
    console.log('recentdata chetan== ',this.rcentdata)
    
    this.id=this.navParams.get('id') 
    
    this.topid=this.navParams.get('topid') 
       if(this.topid==1)
       {
        console.log(this.rcentdata,'-topid--',this.rcentdata[this.id].artist_id)
        this.displayname=this.rcentdata[this.id].user_display_name
        this.profilepic=this.rcentdata[this.id].user_avatar
        // this.user_banner=this.rcentdata[this.id].user_banner
        this.artistid=this.rcentdata[this.id].artist_id
       }
       else if(this.topid==2)
       {
        console.log(this.rcentdata,'-topid--',this.rcentdata[this.id].artist_id)
        this.displayname=this.rcentdata[this.id].Users.user_display_name
        this.profilepic=this.rcentdata[this.id].Users.user_avatar
        // this.user_banner=this.rcentdata[this.id].user_banner
        this.artistid=this.rcentdata[this.id].Users.user_id
       }
      else if(this.topid==4)
      {
        this.displayname=this.rcentdata[this.id].user_display_name
        this.profilepic=this.rcentdata[this.id].user_avatar
        // this.user_banner=this.rcentdata.media[this.id].Users.user_banner
        this.artistid=this.rcentdata[this.id].artist_id
        console.log(this.artistid)
      }
       else
       {

        // yatash's code
        console.log(this.rcentdata,'---',this.id)
        this.displayname=this.rcentdata.media[this.id].Users.user_display_name
        this.profilepic=this.rcentdata.media[this.id].Users.user_profile_avatar
        // this.user_banner=this.rcentdata.media[this.id].Users.user_banner
        this.artistid=this.rcentdata.media[this.id].Users.user_id
        // end of yatash's code 

        //chetan's code

        //end of chetan's code
        console.log('displayname'+this.displayname)
       
        console.log('ionViewDidLoad ArtprofilePage');
       }
  this.artitsload()
  this.recentcharts()
  this.getfollow()
  this.getfollowing()
  // console.log('followingdata',localStorage.getItem('followingdata'))
  // this.followingdata=localStorage.getItem('followingdata')
  // console.log('followersdata',localStorage.getItem('followersdata'))
  // this.followersdata=localStorage.getItem('followersdata')
  }
  artitsload()
  {
    
    this.loaderitem=true
    Observable.of(this.loaderitem)
    .flatMap(()=>this.security.artistcharts(this.artistid)).subscribe(data=>{
      
  this.loaderitem=false
    //  this.following=data.user.user_following.length
    //  this.followers=data.user.user_followers.length
     this.latestchart=this.profilemedia.latestcharts(data.playerList)
  //  this.user_banner=data.media[0].Users.user_banner
  //      console.log('user_banner'+data.media[0].Users.user_banner)
    
        
     console.log('latest',this.latestchart)
     console.log(this.following)
     console.log(this.followers)
    })
  }
  recentcharts(infiniteScroll?)
{
  this.loadingrecentdata=true
 Observable.of(this.loadingrecentdata)
 .flatMap(()=>this.security.artistprofilerecentchats(this.page,this.catid,this.artistid)).subscribe(data=>{
  this.user_banner=data.media[0].Users.user_banner
  console.log('user_banner'+data.media[0].Users.user_banner)
  this.loadingrecentdata=false
  this.profileuser=data.user
   this.profilerecentcharts=this.profilemedia.profilerecentcharts(data.media,this.page)
   this.profilemedia.sortcatprofile=0
   if (infiniteScroll) {
    infiniteScroll.complete();
  }
 })
}
loadMore(infiniteScroll) {

  this.page++
console.log('ss')
  this.recentcharts(infiniteScroll)
console.log(this.page)
 
}
  showcatevent(id)
  {
    if(id==1)
    {
    this.showcat=false
    document.getElementById('categorylist').style.height='300px'
    }
    else{
      this.showcat=true
      document.getElementById('categorylist').style.height='120px'
    }
  }
  tapshow()
  {
   
    
    if(this.count%2!=0)
    {
        this.showshare=true
    }
    else
    {
      this.showshare=false
    }
    this.count++
  }
  inboxtap()
  {
    this.navCtrl.push(InboxpagePage)
  }
  editprop()
  {
let contactmodal=this.modalCtrl.create(EditproartistpagPage)
contactmodal.present() 
}
changeprefrence()
{
  this.navCtrl.push(CategoryPage)
}
uploadnavigate()
{
  this.navCtrl.push(UploadmediaPage,{id:1})
}
getfollowing()
{
  Observable.of(null)
  .flatMap(()=>this.security.getfollowing(this.artistid)).subscribe(data=>{
    console.log('followingusers',data.list)
    
this.followingdata=data.list
    
       this.following=data.list.length
   
  
  })
}
getfollow(){

  Observable.of(null)
.flatMap(()=>this.security.getfollow(this.artistid)).subscribe(data=>{
  console.log('datausers',data.list)
  console.log('hii')
 this.followersdata=data.list
          this.followers=data.list.length
  console.log('followersdata',this.followersdata)


})
}
movetofollowers(id)
{
  let popover = this.modalCtrl.create(FollowersPagepPage,{rcentdata:this.latestchart,topid:1,followersdata:this.followersdata,id:id,followingdata:this.followingdata});
  popover.present({
    
  });
}
navigatetocomment(i)
{
 
  // let modal=this.modalCtrl.create(CommentsboxPage)
  // modal.present()
  let options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 2
  
    
   }

 this.nativePageTransitions.slide(options)
 console.log('i',i)
  // let commentsbox=this.modalCtrl.create(CommentsboxPage)
  // commentsbox.present()
   // this.navCtrl.push(CommentsboxPage)
  // let commentsbox=this.modalCtrl.create(CommentsboxPage)
   console.log(this.latestchart[i].usermediaid)
   console.log(this.latestchart[i].category_image_url)
   console.log(this.latestchart[i].usermedia_name)
   console.log(this.latestchart[i].artforms)
   console.log(this.latestchart[i].user_display_name)
   console.log(this.latestchart[i].user_avatar)
   console.log(this.latestchart[i].small_image_url)
   console.log('totalrating',this.latestchart[i].totalRating)
  //  console.log(this.latestchart[id].user_url)
  //  console.log(this.latestchart[id].artist_id)
  //  console.log(this.latestchart[id].rating)

  let commentsbox=this.modalCtrl.create(CommentsboxPage,{
    usermediaid:this.latestchart[i].usermediaid,
    mediapic:this.latestchart[i].category_image_url,
    medianame:this.latestchart[i].usermedia_name,
    artforms:this.latestchart[i].artforms,
    id:i,
    user_display_name:this.latestchart[i].user_display_name,
    user_avatar:this.latestchart[i].user_avatar,
    small_image_url:this.latestchart[i].mediathumbnailuser,
    totalrating:this.latestchart[i].totalRating,
    userurl:this.latestchart[i].user_url,
    artist_id:this.latestchart[i].artist_id,
    rate:this.latestchart[i].rating
  })
  commentsbox.present()
}
navigatetocomment1(i)
{
  let options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 2
  
    
   }

 this.nativePageTransitions.slide(options)
 console.log('i',i)
  // let commentsbox=this.modalCtrl.create(CommentsboxPage)
  // commentsbox.present()
   // this.navCtrl.push(CommentsboxPage)
  // let commentsbox=this.modalCtrl.create(CommentsboxPage)
   console.log('usermediaid',this.profilerecentcharts[i].usermediaid)
   console.log('category_image_url',this.profilerecentcharts[i].category_image_url)
   console.log('usermedia_name',this.profilerecentcharts[i].usermedia_name)
   console.log('artforms',this.profilerecentcharts[i].artforms)
   console.log(this.profilerecentcharts[i].user_display_name)
   console.log(this.profilerecentcharts[i].user_avatar)
   console.log(this.profilerecentcharts[i].small_image_url)
   console.log('totalrating'+this.profilerecentcharts[i].totalRating)
   console.log(this.profilerecentcharts[i].userurl)
   console.log(this.profilerecentcharts[i].artist_id)
   console.log(this.profilerecentcharts[i].rating)

  let commentsbox=this.modalCtrl.create(CommentsboxPage,{
    usermediaid:this.profilerecentcharts[i].usermediaid,
    mediapic:this.profilerecentcharts[i].category_image_url,
    medianame:this.profilerecentcharts[i].usermedia_name,
    artforms:this.profilerecentcharts[i].artforms,
    id:i,
    user_display_name:this.profilerecentcharts[i].user_display_name,
    user_avatar:this.profilerecentcharts[i].user_avatar,
    small_image_url:this.profilerecentcharts[i].mediathumbnailuser,
    totalrating:this.profilerecentcharts[i].totalRating,
    userurl:this.profilerecentcharts[i].userurl,
    artist_id:this.profilerecentcharts[i].artist_id,
    rate:this.profilerecentcharts[i].rating
  })
  commentsbox.present()
}
viewvideo(id)
{
  let modal=this.modalCtrl.create(ViewvideoplayPage,{
    data:this.latestchart,id:id
  })
  modal.present()
}
viewvideo1(id)
{
  console.log('profilerecentcharts',this.profilerecentcharts)
  let modal=this.modalCtrl.create(ViewvideoplayPage,{
    data:this.profilerecentcharts,id:id
  })
  modal.present()
}
tapshow1(i)
{
  let popover = this.popoverCtrl.create(PopoverpagesharePage,{image:this.latestchart[i].category_image_url,
    artistname:this.latestchart[i].usermedia_name,
    user_url:this.latestchart[i].userurl
  } 
     )
    ;
popover.present({
ev:event
});
}
reportnavigate()
  {
   let modal=this.modalCtrl.create(ReportprobPage)
   modal.present()
  }
  followedartist(artist_id)
  {
    Observable.of(null)
    .flatMap(()=>this.security.artistfollowed(artist_id)).subscribe(data=>{
      
      console.log(data.status)
      let modalfollow =this.modalCtrl.create(FollowedartistPage,{msg:data.status})
   modalfollow.present()
   
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
 //  alert('imagedata'+imageData)
  this.imgsrc=imageData
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
      //  this.imgsrc = "data:image/jpeg;base64," + imageData;
      this.imageupload()
    }, (err) => {
    })
  }
  imageupload()
  {
    let sessionId=localStorage['sessionId']
//    alert(sessionId)
 //   alert('imgsrc'+this.imgsrc)
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
    params:{"cropData": {"x":2937.6,"y":1171.621978021978,"height":1416.5802197802197,"width":1416.5802197802197,"rotate":0}}
    }
   // filetransfers.upload(this.imgsrc,'https://www.demo.artformplatform.com/api/messages/upload.json', options)
    filetransfers.upload(this.imgsrc,'https://www.artformplatform.com/api/user/uploadAvatar.json', options)
    .then((data) => {
        alert('upload')
 // alert('data11'+JSON.stringify(data))
 
      }
      , (err) => {  
        alert('bii'+err)
       alert('error4'+JSON.stringify(err))    
      }
      )
  }
  openstar(usermediaid)
{
  console.log('usermedia'+usermediaid)
  console.log('rate'+this.rate)
  
  if(usermediaid)
  {
    Observable.of(null)
 .flatMap(()=>this.security.starmedia(this.rate,usermediaid)).subscribe(data=>{
  let modal=this.modalCtrl.create(ViewtalentPage,{rate:this.rate})
  modal.present()
 })

}
}
tapshow3()
  {
 
    let popover = this.popoverCtrl.create(PopoverpagesharePage,
      {image:this.profileuser.user_avatar,
      artistname:this.profileuser.user_display_name,
      user_url:this.profileuser.user_url
    })
      
    popover.present({
    ev:event
    });

    
  
  }
}
