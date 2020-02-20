
import { Component, ɵConsole } from '@angular/core';
import {Events, IonicPage,ModalController, NavController, NavParams,PopoverController,LoadingController } from 'ionic-angular';
import { ReportprobPage } from '../reportprob/reportprob';
import { CommentsboxPage } from '../commentsbox/commentsbox';
import { PopoverpagesharePage } from '../popoverpageshare/popoverpageshare';
import { ChoosecatpagetabPage } from '../choosecatpagetab/choosecatpagetab';
import { CategoryPage } from '../category/category';
import { CategorytabpagePage } from '../categorytabpage/categorytabpage';
import { ArtistprofilepagePage } from '../artistprofilepage/artistprofilepage';
import { ViewtalentPage } from '../viewtalent/viewtalent';
import { FollowedartistPage } from '../followedartist/followedartist';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ViewvideoplayPage } from '../viewvideoplay/viewvideoplay';
import{SecurityProvider}from'../../providers/security/security';
import { Observable } from 'rxjs';
import{DashboardserviceProvider}from'../../providers/dashboardservice/dashboardservice'
import { ViewvideotopperformersPage } from '../viewvideotopperformers/viewvideotopperformers';
import { Pinterest, PinterestUser, PinterestPin, PinterestBoard } from '@ionic-native/pinterest';
import{ArtprofilePage}from'../artprofile/artprofile'
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
fakedata=[1,2,3,4]
showcat:boolean
catshow:boolean
pet
showshare:boolean
count=1
recentdata
trendingdata
src
topperformersdata
loadingdata
categorytag='All Category'
cattagdata
countload=0
page = 0;
completedata
link='recentMedia'
playerlist
tag=0
catid=null
userid
rate
recentdatafull
displayname
user_display_name
PermanentArray
disablescroll:boolean=true; 
searchMagazineString:any;
tiles

showbutton
refreshtext
constructor(public events:Events,public dashboard:DashboardserviceProvider,public service:SecurityProvider,public loadingCtrl:LoadingController,private nativePageTransitions: NativePageTransitions,public popoverCtrl:PopoverController,public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
 this.showbutton=false
  this.showcat=true
  this.catshow=true 
  events.subscribe('star-rating:changed', (starRating) => {
   
    this.rate=starRating
  });
 
}
refreshpage()
{
  // this.catid=6
  // this.tiles='Recent Media'
  // this.loaddata()
  // this.topperformers()
  // this.user_display_name=localStorage['firstname']
 // this.refreshtext='recentuploads'

  this.recentdata=[]
  this.catshow=true
  this.dashboard.recentdataarray=[]
  this.categorytag='All Category'
  this.link='recentMedia'
  this.countload=0
  this.tiles='Recent Uploads'
  this.page=0
  this.tag=0
  this.showbutton=false
  this.loaddata()
 
}

songtype(id)
{
  this.showbutton=true
  this.tag=1
  this.page=0

  this.recentdata=[]
 
  this.dashboard.recentdataarray=[]
 




  this.countload=0
   if(id==1)
  {
    this.categorytag='Music'
    this.catid=1
  }
  else if(id==2)
  {
    this.categorytag='Dance'
    this.catid=2
  }
  else if(id==3)
  {
    this.categorytag='Film'
    this.catid=3
  }
  else if(id==4)
  {
    this.categorytag='Photography'
    this.catid=4
  }

  else if(id==7)
  {
    this.categorytag='Literature'
    this.catid=7
  }
  else if(id==8)
  {
    this.categorytag='Art'
    this.catid=8
  } else if(id==5)
  {
    this.categorytag='Freestyle'
    this.catid=5
  }
  else if(id==9)
  {
    this.categorytag='Personality'
    this.catid=9
  }
  else if(id==6)
  {
    this.categorytag='Others'
    this.catid=6
  }
  this.loaddata()
  // if(id==1)
  // {
  //   this.categorytag='Music'
  //   this.catid=1
  // }
  // else if(id==2)
  // {
  //   this.categorytag='Dance'
  //   this.catid=2
  // }
  // else if(id==3)
  // {
  //   this.categorytag='Film'
  //   this.catid=3
  // }
  // else if(id==4)
  // {
  //   this.categorytag='Photography'
  //   this.catid=4
  // }

  // else if(id==7)
  // {
  //   this.categorytag='Literature'
  //   this.catid=7
  // }
  // else if(id==8)
  // {
  //   this.categorytag='Art'
  //   this.catid=8
  // } else if(id==5)
  // {
  //   this.categorytag='Freestyle'
  //   this.catid=5
  // }
  // else if(id==9)
  // {
  //   this.categorytag='Personality'
  //   this.catid=9
  // }
  // else if(id==6)
  // {
  //   this.categorytag='Others'
  //   this.catid=6
  // }
//  this.dashboard.sortcat(id)
//  this.recentdata=this.dashboard.recentdataarray
}
updateUrl() {
  this.src = 'https://www.lincolnlawsj.edu/wp-content/uploads/2016/07/1920x1080-video-play-overlay.png'
}
 ionViewDidLoad() {
    // ionViewWillEnter(){
   this.tiles='Recent Media'
   this.loaddata()
   this.topperformers()
   this.user_display_name=localStorage['firstname']
  }
  ionViewWillEnter(){

  }

loaddata(infiniteScroll?)
{
  
 
  this.completedata=''
  if(this.countload==0)
  {
  this.loadingdata='on'
  }
  this.countload++
  Observable.of(this.loadingdata)
  .flatMap(()=>this.service.loadmore(this.page,this.link,this.tag,this.catid)).subscribe(data=>{
   


        
         if(data.status=='fail')
         {
          
          this.completedata='No More Data' 
         }
         else{
          this.completedata=''
          this.recentdatafull=data
           this.recentdata=this.dashboard.recentdataarray
       this.PermanentArray=this.dashboard.recentdataarray
       
            this.dashboard.recentdata(data.media)
         }
         

    
   this.loadingdata='off'
   if (infiniteScroll) {
    infiniteScroll.complete();
  }
 })
   
   this.pet='recentuploads'
}
searchMagazines(ev) {
  if(ev.target.value !="")  {
    this.disablescroll=false;
    let messagearray=  this.PermanentArray;           
    this.recentdata = messagearray.filter((item) => {  
      return (item.usermedia_name.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1 || item.user_display_name.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1 || item.artforms.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1); 
    })        
  } 
  if(ev.target.value =="" || ev.target.value ==undefined) {    
    this.recentdata=this.PermanentArray;  
    this.disablescroll=true; 
    this.searchMagazineString="";   
  }    
   
}
loadMore(infiniteScroll) {
  this.page++

  this.loaddata(infiniteScroll)

 
}



  navigatetomsg(id)
  {
  
    
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 2
    
      
     }
  
   this.nativePageTransitions.slide(options)
    let commentsbox=this.modalCtrl.create(CommentsboxPage,{
       usermediaid:this.recentdata[id].usermediaid,
       mediapic:this.recentdata[id].category_image_url,
       medianame:this.recentdata[id].usermedia_name,
       artforms:this.recentdata[id].artforms,
       id:id,
       user_display_name:this.recentdata[id].user_display_name,
       user_avatar:this.recentdata[id].user_avatar,
       small_image_url:this.recentdata[id].small_image_url,
       totalrating:this.recentdata[id].totalrating,
       userurl:this.recentdata[id].user_url,
       artist_id:this.recentdata[id].artist_id,
       rate:this.recentdata[id].rating
     })
    commentsbox.present()
    // this.navCtrl.push(CommentsboxPage) 
  }
  
  navigatetomsgtop(id)
  {
    // alert(id)
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 2
    
      
     }
 
   this.nativePageTransitions.slide(options)
    let commentsbox=this.modalCtrl.create(CommentsboxPage,{
       usermediaid:this.playerlist[id].usermedia_id,
       mediapic:this.playerlist[id].usermedia_path,
       medianame:this.playerlist[id].usermedia_name,
       artforms:this.playerlist[id].toptype,
       id:id,
       user_display_name:this.playerlist[id].user_display_name,
       user_avatar:this.playerlist[id].user_avatar,
       small_image_url:this.playerlist[id].covermediathumbnail,
       totalrating:this.playerlist[id].totalrating,
       userurl:this.playerlist[id].usermedia_url,
       artist_id:this.playerlist[id].artist_id,
       rate:this.playerlist[id].rate
     })
    commentsbox.present()
  }
  

  followartist(artist_id,user_display_name)
  {
    
    if(this.user_display_name==user_display_name)
 {

 }
 else
{
    Observable.of(null)
    .flatMap(()=>this.service.artistfollowed(artist_id)).subscribe(data=>{
      
     
      let modalfollow =this.modalCtrl.create(FollowedartistPage,{msg:data.status})
      modalfollow.present()
   this.navCtrl.setRoot(ArtprofilePage,{id:4})
    })
   
  }
  }
  showcatevent(id)
  {
    if(id==1)
    {
    this.showcat=false
    // document.getElementById('categorylist').style.height='334px'
    }
    else{
      this.showcat=true
      document.getElementById('categorylist').style.height='130px'
    }
  }
  artistfollowed()
  {

  }
  onSegmentChanged(ev?)
  {

 if(ev.value=='recentuploads')
 {

  this.recentdata=[]
   this.catshow=true
   this.dashboard.recentdataarray=[]
   this.categorytag='All Category'
   this.link='recentMedia'
   this.countload=0
   this.tiles='Recent Uploads'
   this.page=0
   this.tag=0
   this.loaddata()
  
   
 }
 else if(ev.value=='trending_items')
 {
  
  this.categorytag='All Category'
  this.recentdata=[]
  this.catshow=true
 
  this.dashboard.recentdataarray=[]
 
  this.link='trendingMedia'
  this.tiles='Trending Items'
  this.countload=0

  this.page=0
  this.tag=0
  this.loaddata()
 
 }

 
 
 else{
  this.catshow=false

// this.loadingdata='on'
//  Observable.of(this.loadingdata)
//  .flatMap(()=>this.service.topperformers()).subscribe(data=>{
//   this.dashboard.topperformers(data.playerList)
//   //  this.dashboard.topperformers(data.data.playerList)
// this.playerlist=this.dashboard.topperformersdata

// this.userid=localStorage['userid']
//  this.loadingdata='off'
//  })

//this.topperformers()

 }
  }
  topperformers()
  {
    this.loadingdata='on'
 Observable.of(this.loadingdata)
 .flatMap(()=>this.service.topperformers()).subscribe(data=>{
  this.dashboard.topperformers(data.playerList)
  //  this.dashboard.topperformers(data.data.playerList)
this.playerlist=this.dashboard.topperformersdata

this.userid=localStorage['userid']
 this.loadingdata='off'
 })
  }

  reportnavigate(id)
  {
  
   
   
   let modal=this.modalCtrl.create(ReportprobPage,{usermediaid:this.recentdata[id].usermediaid})
   modal.present()
  }
  tapshow(i)
  {
 
    let popover = this.popoverCtrl.create(PopoverpagesharePage,
      {image:this.recentdata[i].category_image_url,
      artistname:this.recentdata[i].usermedia_name,
      user_url:this.recentdata[i].user_url,
      usermediaid:this.recentdata[i].usermediaid
    })
      
    popover.present({
    ev:event
    });

    
  
  }
  tapshowtop(i)
  {
    let popover = this.popoverCtrl.create(PopoverpagesharePage,
      {image:this.playerlist[i].category_image_url,
      artistname:this.playerlist[i].user_display_name,
      user_url:this.playerlist[i].usermedia_url
    })
      
    popover.present({
    ev:event
    });
  }
  filtercat()
  {
    this.navCtrl.push(CategorytabpagePage,{id:1})
  }
  authtap(i,user_display_name)
  {
   
   
 
  
 if(this.user_display_name==user_display_name)
 {

 }
 else
 {
   
  
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.recentdata,topid:4})

 } 
  } 
  authtap1(i,user_display_name)
  {
   
    if(this.user_display_name==user_display_name)
    {
   
    }
    else
    {   
    
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.playerlist,topid:1})
    }
  }
 
  
  openstar(usermedia_id)
  {
 
  
  if(usermedia_id)
  {
    let modal=this.modalCtrl.create(ViewtalentPage,{rate:this.rate})
  modal.present()
    Observable.of(null)
 .flatMap(()=>this.service.starmedia(this.rate,usermedia_id)).subscribe(data=>{
  
 })

}
  
  
  }
  viewvideo(id)
  {
    let modal=this.modalCtrl.create(ViewvideoplayPage,{
      data:this.recentdata,id:id
    })
    modal.present()
  }
  viewvideotop(id)
  {
    let modal=this.modalCtrl.create(ViewvideotopperformersPage,{
      data:this.playerlist,id:id
    })
    modal.present()
  }
  

}
