import { Component,ViewChild } from '@angular/core';
import { Platform ,Nav,MenuController,Events,LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SecuritypanelPage } from '../pages/securitypanel/securitypanel';
import { TabspagePage } from '../pages/tabspage/tabspage';
import{CreateconversationpagePage}from'../pages/createconversationpage/createconversationpage'
import { EditprofilepagePage } from '../pages/editprofilepage/editprofilepage';
import { CategoryPage } from '../pages/category/category';
import { ArtprofilePage } from '../pages/artprofile/artprofile';
import { UploadmediaPage } from '../pages/uploadmedia/uploadmedia';
import { ReportprobPage } from '../pages/reportprob/reportprob';
import { GetintouchPage } from '../pages/getintouch/getintouch';
import { AboutuspPage } from '../pages/aboutusp/aboutusp';
import { HowitworkspPage } from '../pages/howitworksp/howitworksp';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { PrivacypPage } from '../pages/privacyp/privacyp';
import{CommunitygudelinesPage}from'../pages/communitygudelines/communitygudelines'
import { CompetitionspPage } from '../pages/competitionsp/competitionsp';
import{CategorytabpagePage}from'../pages/categorytabpage/categorytabpage'
import { SubcattabpPage } from '../pages/subcattabp/subcattabp';
import { ChildcattabpagePage } from '../pages/childcattabpage/childcattabpage';
import { ChoosecatpagetabPage } from '../pages/choosecatpagetab/choosecatpagetab';
import { CommentsboxPage } from '../pages/commentsbox/commentsbox';
import { EditproartistpagPage } from '../pages/editproartistpag/editproartistpag';
import { ViewtalentPage } from '../pages/viewtalent/viewtalent';
import { HowtouploadpagesidemenuPage } from '../pages/howtouploadpagesidemenu/howtouploadpagesidemenu';
import { FollowedartistPage } from '../pages/followedartist/followedartist';
import { ViewvideoplayPage } from '../pages/viewvideoplay/viewvideoplay';
import{SecurityProvider}from'../providers/security/security'
import { from } from 'rxjs/observable/from';
import{Observable}from'rxjs/Rx'
import { DashboardPage } from '../pages/dashboard/dashboard';
import{InboxpagePage}from'../pages/inboxpage/inboxpage'
import { SelectuploadcategoryPage } from '../pages/selectuploadcategory/selectuploadcategory';
import { Deeplinks } from '@ionic-native/deeplinks';
// import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =HomePage;
  @ViewChild(Nav)nav:Nav
  @ViewChild(Nav) navChild:Nav;
  pages: Array<{title: string, component: any,logo:string}>;

  imageprofilepic='assets/imgs/logo_sign_in.png'
  username
  icon1;
  icon2;
  icon3;
  icon4;
  icon5;
  icon6;
  icon7;
  icon8;
  icon9;
  profile_pic
  firtsname
  usermedia
  constructor(public deeplinks: Deeplinks,public security:SecurityProvider,public loadingCtrl:LoadingController,public event:Events,public menuCtrl:MenuController,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.profile_pic=localStorage['profile_pic']
    this.firtsname=localStorage['firstname']
    this.icon1='assets/Menu/menu/about.png'
  this.icon2='assets/Menu/menu/upload.png'
  this.icon3='assets/Menu/menu/setting.png'
  this.icon4='assets/Menu/menu/mail.png'
  this.icon5='assets/Menu/menu/facebook.png'
  this.icon6='assets/Menu/menu/file.png'
  this.icon7='assets/Menu/menu/privacy.png'
  this.icon8='assets/Menu/menu/guidance.png'
  this.icon9='assets/Menu/menu/signIn.png'
  event.subscribe('user:created',(user,time)=>{
    console.log('pikabu'+user)
    localStorage['status']=user
  })
  event.subscribe('user:image',(profile_pic,firtsname,time)=>{
    console.log('profile_pic',profile_pic)
    console.log('firstname',firtsname)
    this.profile_pic=profile_pic
    this.firtsname=firtsname
    localStorage['firstname']=firtsname
    localStorage['profile_pic']=profile_pic

    
  })
  // alert(localStorage['status'])
  if(localStorage['status']=='true')
  {
    // this.navCtrl.setRoot(TabspagePage,{id:4})
    this.rootPage=TabspagePage
  }
  else 
  {
   
    this.rootPage=HomePage
  }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.deeplinks.routeWithNavController(this.navChild,{
        '/users/art/:usermedia':CommentsboxPage
      }).subscribe((match)=>{
        alert('successfully'+JSON.stringify(match));
        alert('args'+match.$args.usermedia)
        localStorage['usermedia']=match.$args.usermedia
        // this.usermedia=match.$args.usermedia
       //event.publish('usermediaid:created', this.usermedia);
      },(nomatch)=>{
        alert('unmatched'+nomatch)
      })
      statusBar.styleDefault();
      splashScreen.hide();

      // (window as any).handleOpenURL = (url: string) => {
      //   Auth0Cordova.onRedirectUri(url);
      // }
    });
   
    this.pages = [
      { title: 'About US', component:AboutuspPage, logo:this.icon1},
      {title: 'How to Upload',component:HowtouploadpagesidemenuPage,logo:this.icon2},
      { title: 'How it Works?', component:HowitworkspPage, logo:this.icon3},
      { title: 'Get in Touch', component:GetintouchPage, logo:this.icon4},
      // {title: 'Connect',component:TabspagePage,logo:this.icon5},
      {title: 'Terms and Conditions',component:TermsandconditionsPage,logo:this.icon6},
      { title: 'Privacy Policy', component:PrivacypPage, logo:this.icon7},
      {title: 'Community Guidelines',component:CommunitygudelinesPage,logo:this.icon8},
      {title: 'Sign Out',component:HomePage,logo:this.icon9}
      ];
      
  }
  openPage(page){
    
    console.log(page.title)
    if(page.title=='Sign Out')
    {
      localStorage.removeItem('image1')
      localStorage.removeItem('banner')
      this.nav.setRoot(page.component) 
      this.menuCtrl.close()
      // let loading=this.loadingCtrl.create({
      //   spinner:'hide',
      //   content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
      //   cssClass:'transparent'
      // })
      // loading.present()
      Observable.of(null)
      .flatMap(()=>this.security.loggedout()).subscribe(data=>{
    
        localStorage['status']=false
        
      })
    }
    else
    {
      this.nav.setRoot(page.component) 
      this.menuCtrl.close()
    }
   
    }
    closemenu()
    {
      this.menuCtrl.close()
    }
    ionViewDidLoad() {
      var x=document.getElementById(3+'_img').style.marginLeft='-7px'
    }
    navigatetotab()
    {
      this.nav.setRoot(TabspagePage)
      this.menuCtrl.close()
    }
}

