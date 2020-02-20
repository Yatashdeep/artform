import { Component } from '@angular/core';
import { App,AlertController,LoadingController,IonicPage, NavController, NavParams ,ModalController,PopoverController,Events} from 'ionic-angular';
import { InboxpagePage } from '../inboxpage/inboxpage';
import { EditprofilepagePage } from '../editprofilepage/editprofilepage';
import { CategoryPage } from '../category/category';
import { UploadmediaPage } from '../uploadmedia/uploadmedia';
import { CommentsboxPage } from '../commentsbox/commentsbox';
import { PopoverpagesharePage } from '../popoverpageshare/popoverpageshare';
import { ReportprobPage } from '../reportprob/reportprob';
import { FollowedartistPage } from '../followedartist/followedartist';
import { ArtistprofilepagePage } from '../artistprofilepage/artistprofilepage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import{Observable}from'rxjs'
import{SecurityProvider}from'../../providers/security/security'
import{DashboardserviceProvider}from'../../providers/dashboardservice/dashboardservice'
import { from } from 'rxjs/observable/from';
import { ViewvideoplayPage } from '../viewvideoplay/viewvideoplay';
import { ViewtalentPage } from '../viewtalent/viewtalent';
import{FollowersPagepPage}from'../followers-pagep/followers-pagep'
import{SecuritypanelPage}from'../../pages/securitypanel/securitypanel'
/**
 * Generated class for the ArtprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artprofile',
  templateUrl: 'artprofile.html',
})
export class ArtprofilePage { 
  fakedata=[1,2,3,4]
  showcat:boolean
  showshare:boolean
count=1
playlist
artistprop
title
charttitle
profile_pic
firtsname
follower
following
latestchart
profilerecentcharts
page=0
countload
categorytag
catid
loaderitem:boolean
type
loadingrecentdata
banner
user
rate
loadercover
profileuser
followingdata
followersdata
user_display_name
  constructor(public app:App,public alertCtrl:AlertController,public events:Events,public profilemedia:DashboardserviceProvider,public security:SecurityProvider,public loadingCtrl:LoadingController,public event:Events,private nativePageTransitions: NativePageTransitions,public popoverCtrl:PopoverController,public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
     this.loadercover=false
    this.showcat=true
this.showshare=false 
this.playlist='latest'

// this.profile_pic=localStorage['image1']
// this.banner=localStorage['banner']
this.profile_pic=localStorage.getItem('image1')
this.banner=localStorage.getItem('banner')
// alert(this.profile_pic)
// alert(this.banner)
// events.subscribe('user:image',(profile_pic,firtsname,time)=>{
//   alert('profile_pic'+profile_pic)
//   console.log('firstname',firtsname)
//   this.profile_pic=profile_pic
//   this.firtsname=firtsname
// })
events.subscribe('user:banner',(bannerimgsrc,firtsname,time)=>{
  this.banner=bannerimgsrc
// alert(this.banner)
})
events.subscribe('star-rating:changed', (starRating) => {
  console.log('starrating'+starRating)
  this.rate=starRating
});


// this.getfollowing()
// this.getfollow()
this.loadcat()

// if(localStorage['followingdata'])
// {
// this.followingdata=JSON.parse(localStorage['followingdata'])
// }

// if(localStorage['followersdata'])
// {
// this.followersdata=JSON.parse(localStorage['followersdata'])
// }
// events.subscribe('user:following',(followingdata)=>{
  
// this.followingdata=followingdata
// console.log(this.followingdata)  
// this.following=this.followingdata.length
// // alert(this.banner)
// })
// events.subscribe('user:followersdata',(followersdata)=>{

// this.followersdata=followersdata
// this.follower=this.followersdata.length
// console.log(this.followersdata)
// // alert(this.banner)
// })
}
loadcat()
{

  Observable.of(null)
  .flatMap(()=>this.security.getcategory()).subscribe(data=>{
localStorage['category']=JSON.stringify(data.categories)


})
}
// getfollowing()
// {
//   Observable.of(null)
//   .flatMap(()=>this.security.getfollowing()).subscribe(data=>{
//     console.log('followingusers',data.list)
    
// this.followingdata=data.list

  
  
//   })
// }
// getfollow(){

//   Observable.of(null)
// .flatMap(()=>this.security.getfollow()).subscribe(data=>{
//   console.log('datausers',data.list)
//   console.log('hii')
//  this.followersdata=data.list
//   console.log('followersdata',this.followersdata)


// })
// }
movetofollowers(id){
  //   Observable.of(null)
//   .flatMap(()=>this.security.getfollowing()).subscribe(data=>{
//     console.log('followingusers',data.list)
    
// this.followingdata=data.list
// this.event.publish('user:following',this.followingdata)
  
  
//   })
if(id==1)
{
  Observable.of(null)
.flatMap(()=>this.security.getfollow('')).subscribe(data=>{
  console.log('datausers',data.list)
  console.log('hii')
 this.followersdata=data.list
 this.event.publish('user:followersdata',this.followersdata)
  console.log('followersdata',this.followersdata)
  let popover = this.modalCtrl.create(FollowersPagepPage,{rcentdata:this.latestchart,topid:1,followersdata:this.followersdata,id:id,followingdata:this.followingdata});
  popover.present({
    
  });
 })
}
else
{
      Observable.of(null)
  .flatMap(()=>this.security.getfollowing('')).subscribe(data=>{
    console.log('followingusers',data.list)
    
this.followingdata=data.list
this.event.publish('user:following',this.followingdata)
  
let popover = this.modalCtrl.create(FollowersPagepPage,{rcentdata:this.latestchart,topid:1,followersdata:this.followersdata,id:id,followingdata:this.followingdata});
popover.present({
  
});
  })
 
}
}
songtype(id)
{

  this.countload=0
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
  if(this.playlist=='recent')
  {
   this.recentcharts()
   this.profilemedia.sortcatprofile=1
  }
  else
  {
this.usercharts()

  }
}
changeplaylist(id)
{
 console.log(id)
  this.type=''
  
}
  ionViewDidLoad() {
   
    this.user_display_name=localStorage['firstname']
    this.loaderitem=false
    this.loadingrecentdata=false
   var usertype =localStorage['usertype']
  //  alert(localStorage['usertype'])

     if(usertype==3)
     {
    this.artistprop='inactive'
    this.title='Profile'
        this.charttitle='Latest'
        this.type='in Music'
     }
    else 
    {
      this.artistprop='active'
      this.title='Artist Profile'
      this.charttitle='Artist'
      
    }
    
    console.log('ionViewDidLoad ArtprofilePage');
    this.usercharts()
    this.recentcharts()
  }
 
 usercharts()
 {
   
//   let loading=this.loadingCtrl.create({
//     spinner:'hide',
//     content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
//     cssClass:'transparent' 
//   })
//  loading.present()
// this.banner='assets/Dashboard/thumbnail.png'
this.loaderitem=true
 Observable.of(this.loaderitem)
 .flatMap(()=>this.security.charts(this.catid)).subscribe(data=>{
    console.log('userdata',data.user) 
   this.user=data.user
  //  alert(data.user.user_profile_avatar)
   this.loaderitem=false

   console.log('user_display_name'+data.user.user_display_name)
  //  alert('banerr'+this.banner)
   if(data.status!='fail')
   {
this.firtsname=data.user.user_display_name
if(this.profile_pic)
{
  // alert('ssss'+this.profile_pic)
}
else
{
  this.event.publish('user:image',data.user.user_avatar,data.user.user_display_name,Date.now())
  this.profile_pic=data.user.user_avatar
}


this.follower=data.user.user_followers.length
this.following=data.user.user_following.length
if(data.user.user_banner)
{
  if(this.banner)
  {
    //  alert('sssdsds'+this.banner)
  }
else
{
this.banner=data.user.user_banner
// alert('bnner'+this.banner)
}
}
else
{
// this.banner='assets/profile/Lighthouse.png'

}
this.latestchart=this.profilemedia.latestcharts(data.playerList)
console.log('latest',this.latestchart)
   }
   else
   {

    this.firtsname=data.user.user_display_name
    this.profile_pic=data.user.user_avatar
    if(data.user.user_banner)
// {
// this.banner=data.user.user_banner
// // alert('bnner'+this.banner)
// }
// else
// {
// this.banner='assets/profile/Lighthouse.png'
// }
this.banner=data.user.user_banner
    this.follower=data.user.user_followers.length
    this.following=data.user.user_following.length
    // this.firtsname= localStorage['name']
    // this.profile_pic='assets/tabsicon/propic.jpg'
    this.latestchart=[]
   }
   this.loadercover=true
 })
} 
recentcharts(infiniteScroll?)
{


  // this.loadingrecentdata=true
 Observable.of(null)
 .flatMap(()=>this.security.artistprofilerecent(this.page,this.catid)).subscribe(data=>{
  // this.loadingrecentdata=false
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
    document.getElementById('categorylist').style.height='336px'
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
// let contactmodal=this.modalCtrl.create(EditprofilepagePage,{user:this.user})
// contactmodal.present() 
this.navCtrl.push(EditprofilepagePage,{user:this.user})
}
changeprefrence()
{
  this.navCtrl.push(CategoryPage)
}
uploadnavigate()
{
  this.navCtrl.push(UploadmediaPage,{id:1})
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
openstar(usermediaid)
{
  console.log('usermedia'+usermediaid)
  console.log('rate'+this.rate)
  
  if(usermediaid)
  {
    let modal=this.modalCtrl.create(ViewtalentPage,{rate:this.rate})
    modal.present() 
    Observable.of(null)
 .flatMap(()=>this.security.starmedia(this.rate,usermediaid)).subscribe(data=>{
  
 })

}
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






tapshow1(i)
{
  console.log('latestchart',this.latestchart)
  let popover = this.popoverCtrl.create(PopoverpagesharePage,{image:this.latestchart[i].category_image_url,
    artistname:this.latestchart[i].usermedia_name,
    user_url:this.latestchart[i].userurl
  } 
     );
    
popover.present({
ev:event
});
}
tapshow2(i)
{
  console.log('id',i)
  console.log('profilerecentcharts',this.profilerecentcharts)
  let popover = this.popoverCtrl.create(PopoverpagesharePage,{image:null,
    artistname:this.profilerecentcharts[i].usermedia_name,
    user_url:this.profilerecentcharts[i].userurl
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
// view media files

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
  followedartist(artist_id,user_display_name)
  {
    console.log(user_display_name+''+this.user_display_name)
    if(this.user_display_name!=user_display_name)
    {
    Observable.of(null)
    .flatMap(()=>this.security.artistfollowed(artist_id)).subscribe(data=>{
      
      console.log(data.status)
      let modalfollow =this.modalCtrl.create(FollowedartistPage,{msg:data.status})
   modalfollow.present()
   
    })
  }
  }
  artistpro(i){
    // this.navCtrl.push(ArtistprofilepagePage)
    
    if(localStorage['usertype']==2)
    {

    }
    else{
    console.log('latestcharts',this.latestchart)
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.latestchart,topid:1})
    }
  }
  uploadfile()
  {
    if(localStorage['usertype']==2)
    {
      this.navCtrl.push(UploadmediaPage,{id:1})
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
    let loading=this.loadingCtrl.create({
      spinner:'hide',
     //  content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
     content:'',
      cssClass:'transparent' 
    })
   loading.present()
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.security.changeusertype()).subscribe(data=>{
      loading.dismiss()
     // this.navCtrl.setRoot(SecuritypanelPage)
     this.app.getRootNav().setRoot(SecuritypanelPage)
    })
  }
  artistpro1(i){
    // this.navCtrl.push(ArtistprofilepagePage)
    //  alert(localStorage['usertype'])
    
    if(localStorage['usertype']==2)
    {

    }
    else{
    console.log('latestcharts',this.profilerecentcharts)
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.profilerecentcharts,topid:1})
    }
  }
  tapshow3()
  {
 
    let popover = this.popoverCtrl.create(PopoverpagesharePage,
      {image:this.profileuser.user_avatar,
      artistname:this.profileuser.user_display_name,
      user_url:this.profileuser.user_url
    })
    // let ev = {
    //   target : {
    //     getBoundingClientRect : () => {
    //       return {
    //         top: 37,
    //         right:20,
            
    //       };
    //     }
    //   }
    // };
    popover.present({
    ev:event
    });

    
  
  }

// Delete Function Here
  DeleteMedia(UsrMediaID,index,artist) {
    let alert = this.alertCtrl.create({
      title: 'Do you want to delete this ?',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            let loading=this.loadingCtrl.create({
              spinner:'hide',
              content:'',
              cssClass:'transparent' 
              });  
             loading.present();
              Observable.of(loading).flatMap(loading=>loading.present())
              .flatMap(()=>this.security.getDeleteMedia(UsrMediaID)).subscribe(data=>{
                loading.dismiss(); 
                for(var i=0;i<this.latestchart.length;i++)
                {
                  console.log('latestchart',this.latestchart)
                  console.log('latestchart',this.latestchart[i].usermediaid)
                    if(this.latestchart[i].usermediaid==UsrMediaID)
                    {
                      this.latestchart.splice(i, 1);
                    }
                }
                for(var j=0;j<this.profilerecentcharts.length;j++)
                {
                  console.log('profilecharts',this.profilerecentcharts)
                  console.log('profilerecentcharts',this.profilerecentcharts[j].usermediaid)
                    if(this.profilerecentcharts[j].usermediaid==UsrMediaID)
                    {
                      this.profilerecentcharts.splice(j, 1);
                    }
                }


               // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                // if(artist=='artist') {
                //   if (index > -1) {
                //     this.latestchart.splice(index, 1);
                //   } 
                // }
                // if(artist=='recent') {
                //   if (index > -1) {
                //     this.profilerecentcharts.splice(index, 1);
                //   }
                // }
              });
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
// End of delete function..

}
