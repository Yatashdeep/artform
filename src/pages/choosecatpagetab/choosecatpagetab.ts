import { Component } from '@angular/core';
import { Events,IonicPage, NavController, NavParams,ModalController,PopoverController } from 'ionic-angular';
import { CommentsboxPage } from '../commentsbox/commentsbox';
import { PopoverpagesharePage } from '../popoverpageshare/popoverpageshare';
import { ReportprobPage } from '../reportprob/reportprob';
import { FollowedartistPage } from '../followedartist/followedartist';
import { ViewtalentPage } from '../viewtalent/viewtalent';
import { ArtistprofilepagePage } from '../artistprofilepage/artistprofilepage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LoaderdataComponent } from '../../components/loaderdata/loaderdata';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import{DashboardserviceProvider}from'../../providers/dashboardservice/dashboardservice'
import{ViewvideoplayPage}from'../../pages/viewvideoplay/viewvideoplay'
import{ViewvideotopperformersPage}from'../../pages/viewvideotopperformers/viewvideotopperformers'
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the ChoosecatpagetabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosecatpagetab',
  templateUrl: 'choosecatpagetab.html',
})
export class ChoosecatpagetabPage {
  top_performers
  pet
  fakedata=[1,2,3,4]
  Title
  type
  Titlecat
  subsub
  id
  title
  media
  profilerecentcharts
  subsubcategory_id
  catype
  choiceofintrest
  intrest
  catid
  playerlist
  page=0
  completedata
  loadingdata
  rate
  recentdatafull
  text
  user_display_name
  link
  constructor(public service:SecurityProvider,public events:Events,public profilemedia:DashboardserviceProvider,public security:SecurityProvider,private nativePageTransitions: NativePageTransitions,public modalCtrl:ModalController,public popoverCtrl:PopoverController,public navCtrl: NavController, public navParams: NavParams) {
this.Title='Top Performers'
events.subscribe('star-rating:changed', (starRating) => {
  console.log('starrating'+starRating)
  this.rate=starRating
});
this.link='recentMedia'
}

followartist(artist_id)
{
  // let loading=this.loadingCtrl.create({
  //   spinner:'hide',
  //   content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
  //   cssClass:'transparent'
  // })
  // loading.present()
  
  Observable.of(null)
  .flatMap(()=>this.security.artistfollowed(artist_id)).subscribe(data=>{
    
    console.log(data.status)
    let modalfollow =this.modalCtrl.create(FollowedartistPage,{msg:data.status})
 modalfollow.present()
  })
 
}
loaddata(infiniteScroll?)
{
  
  if(this.choiceofintrest==1)
  {
     this.catid='subsubcategory_id'
  }
  else if(this.choiceofintrest==2)
  {
    this.catid='subcategory_id'
  }
  else if(this.choiceofintrest==3)
  {
    this.catid='category_id'
  }
  console.log('choice'+this.choiceofintrest)
  console.log('catype'+this.catype)
  Observable.of(null)
  .flatMap(()=>this.security.cattab(this.link,this.page,this.catype,this.intrest,this.catid)).subscribe(data=>{
    console.log(data.media)
    this.recentdatafull=data
    console.log('datamedia',data.media)
    this.loadingdata='off'
    if(data.status=='fail' && this.page==0)
    {
     // infiniteScroll.enable(false);
     this.completedata='Nothing to show here yet, be the first to upload :) '
    }
    else if(data.status=='fail'){
      this.completedata='No More Data'
    }
    else{
     this.completedata=''
    }
    this.profilerecentcharts=this.profilemedia.profilerecentcharts(data.media,this.page)
    console.log('profilecharts',this.profilerecentcharts)
    
  })
}
trendingload()
{
  if(this.choiceofintrest==1)
  {
     this.catid='subsubcategory_id'
  }
  else if(this.choiceofintrest==2)
  {
    this.catid='subcategory_id'
  }
  else if(this.choiceofintrest==3)
  {
    this.catid='category_id'
  }
  console.log('choice'+this.choiceofintrest)
  console.log('catype'+this.catype)
  Observable.of(null)
  .flatMap(()=>this.security.cattrendingchattab(this.catype,this.intrest,this.catid)).subscribe(data=>{
    console.log('data',data.media)
    this.loadingdata='off'
    if(data.status=='fail')
    {
      this.text='Nothing to show here yet, be the first to upload :)'
    }
    else
    {
      this.profilemedia.topperformers(data.playerList)
      this.playerlist=this.profilemedia.topperformersdata
      console.log(this.playerlist)
    }
    
  })
}
loadMore(infiniteScroll) {
  this.page++

  this.loaddata(infiniteScroll)

 
}

  ionViewDidLoad() {
    this.user_display_name=localStorage['firstname']
    this.loadingdata='on'
this.title=this.navParams.get('title')
    // alert('title'+this.title)
    this.choiceofintrest=this.navParams.get('choiceofintrest')
    console.log('choiceofintrest',this.choiceofintrest)
  if(this.choiceofintrest==1)
  {
this.intrest='subsubcategory'
this.subsub=this.navParams.get('subsub')
console.log('subsub',this.subsub)
this.id=this.navParams.get('id')

this.title=this.subsub[this.id].Subsubcategory.subsubcategory_name
this.catype=this.subsub[this.id].Subsubcategory.subsubcategory_id
}
  else if(this.choiceofintrest==2)
  {
    this.intrest='subcategory'
this.subsub=this.navParams.get('subsub')
console.log('subsub',this.subsub)
this.id=this.navParams.get('id')

this.title=this.subsub[this.id].Subcategory.subcategory_name
this.catype=this.subsub[this.id].Subcategory.subcategory_id
  
}
  else if(this.choiceofintrest==3)
  {
    this.intrest='category'
  
    this.subsub=this.navParams.get('subcat')
    console.log('subsub',this.subsub)
this.id=this.navParams.get('id')

  this.title=this.subsub[this.id].Category.category_name
  this.catype=this.subsub[this.id].Category.category_id
  console.log('cattype'+this.catype)
  console.log('title'+this.title)
  }
  //  this.loaddata()
    this.trendingload()
    console.log('ionViewDidLoad ChoosecatpagetabPage');
    this.type=this.navParams.get('type')

    this.Titlecat=this.navParams.get('title')
    console.log('titlecat'+this.Titlecat)
    if(this.Titlecat)
    {

    }
    else
    {
    this.Titlecat='Music'
    }

    if(this.type)
    {
      this.pet=this.type
     if(this.type=='Recent_Uploads')
     {
      this.link='recentMedia'
      this.loaddata()
     }
     else
     {
      this.link='trendingMedia'
      this.loaddata()
     }

    }
    else{
      this.pet='top_performers'
    }
  }
  onSegmentChanged(ev)
  {
    
    if(ev.value=='top_performers')
    {
      this.Title='Top Performers'
    }
    else if(ev.value=='Recent_Uploads')
    {
       this.Title='Recent Uploads'
       this.link='recentMedia'
       this.loaddata()
      //  alert('sd')
      //  this.navCtrl.push(ChoosecatpagetabPage,{type:ev.value,title:'Music'})
    }
    else if(ev.value=='Trending_Items')
    {
      this.Title='Trending Items'
      this.link='trendingMedia'
       this.loaddata()
    }
  }
  navigatetocomment()
{
  let options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 2
  
    
   }

 this.nativePageTransitions.slide(options)
  // let commentsbox=this.modalCtrl.create(CommentsboxPage)
  // commentsbox.present()
  // this.navCtrl.push(CommentsboxPage) 
  let commentsbox=this.modalCtrl.create(CommentsboxPage)
  commentsbox.present()
  // let modal=this.modalCtrl.create(CommentsboxPage)
  // modal.present()
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

navigatetomsg(id)
{

  console.log('recentdata',this.profilerecentcharts)
  let options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 2
  
    
   }
console.log('user_url',this.profilerecentcharts[id])
 this.nativePageTransitions.slide(options)
  let commentsbox=this.modalCtrl.create(CommentsboxPage,{
     usermediaid:this.profilerecentcharts[id].usermediaid,
     mediapic:this.profilerecentcharts[id].category_image_url,
     medianame:this.profilerecentcharts[id].usermedia_name,
     artforms:this.profilerecentcharts[id].artforms,
     id:id,
     user_display_name:this.profilerecentcharts[id].user_display_name,
     user_avatar:this.profilerecentcharts[id].user_avatar,
     small_image_url:this.profilerecentcharts[id].mediathumbnailuser,
     totalrating:this.profilerecentcharts[id].totalrating,
     userurl:this.profilerecentcharts[id].userurl,
     artist_id:this.profilerecentcharts[id].artist_id,
     rate:this.profilerecentcharts[id].rating
   })
  commentsbox.present()
  // this.navCtrl.push(CommentsboxPage) 
}

tapshow1(i)
{
  
 
 
    let popover = this.popoverCtrl.create(PopoverpagesharePage,
      {image:this.profilerecentcharts[i].category_image_url,
      artistname:this.profilerecentcharts[i].usermedia_name,
      user_url:this.profilerecentcharts[i].userurl
    })
      
    popover.present({
    ev:event
    });

    
  
  
}
navigatetomsgtop(id)
{
  // alert(id)
  let options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,
    slowdownfactor: 2
  
    
   }
console.log(this.playerlist[id].usermedia_path)
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
reportnavigate()
  {
   let modal=this.modalCtrl.create(ReportprobPage)
   modal.present()
  }
  openstar(usermedia_id)
  {
  console.log('usermedia'+usermedia_id)
  console.log('rate'+this.rate)
  
  if(usermedia_id)
  {
    Observable.of(null)
 .flatMap(()=>this.service.starmedia(this.rate,usermedia_id)).subscribe(data=>{
  let modal=this.modalCtrl.create(ViewtalentPage,{rate:this.rate})
  modal.present()
 })

}
  }
  // authtap()
  // {
  //   this.navCtrl.push(ArtistprofilepagePage)
    
  // }
  authtap(i,user_display_name)
  {
  //  alert('authtap')
    console.log('id'+i) 
    if(this.user_display_name==user_display_name)
    {
   
    }
     else
     {
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.recentdatafull})
     }
  }
  authtap1(i,user_display_name)
  {
    if(this.user_display_name==user_display_name)
    {
   
    }
    else
    {
    console.log('playerlist',this.playerlist)
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.playerlist,topid:1})
    }
  }
  viewvideo(id)
  {
    let modal=this.modalCtrl.create(ViewvideoplayPage,{
      data:this.profilerecentcharts,id:id
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
