import { Component , NgZone,trigger, state, style, transition, animate, keyframes,ViewChild } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { SecuritypanelPage } from '../securitypanel/securitypanel';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { DocumentViewer ,DocumentViewerOptions} from '@ionic-native/document-viewer';
import{InAppBrowser}from'@ionic-native/in-app-browser'

// Import Auth0Cordova and auth0.js
// import Auth0Cordova from '@auth0/cordova';
// import * as auth0 from 'auth0-js';
// const AUTH_CONFIG = {
//   // Needed for Auth0 (capitalization: ID):
//   clientID: 'KdbXm2xuxPuYK5hzTprGNRlbyEDtXbC0',
//   // Needed for Auth0Cordova (capitalization: Id):
//   clientId: 'KdbXm2xuxPuYK5hzTprGNRlbyEDtXbC0',
//   domain: 'dev-r3ooelc9.auth0.com',
//   callbackURL: location.href,
//   packageIdentifier: 'io.ionic.starter' // config.xml widget ID
// };
import { Pinterest, PinterestUser, PinterestPin, PinterestBoard } from '@ionic-native/pinterest';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  // Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  // checkremember='false'
  authenticated = false;
  message = '';
  scopes
  loading = true;
  user: any;
  loggedIn: boolean;
  id = 'qDuKsiwS5xw';
  playerVars = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;
  constructor(private iab: InAppBrowser,public document: DocumentViewer , public zone: NgZone,
   public pinterest:Pinterest,private http: HttpClient, private storage: Storage,public event:Events,public navCtrl: NavController) {
    // this.event.publish('user:created',this.checkremember,Date.now())
   
    // this.scopes=[
    //   this.pinterest.SCOPES.READ_PUBLIC
    // ]
    // this.storage.get('profile').then(user => this.user = user);
    // this.storage.get('access_token').then(token => this.accessToken = token);
    // this.storage.get('expires_at').then(exp => {
    //   this.loggedIn = Date.now() < JSON.parse(exp);
    //   this.loading = false;
    // });
    // this.getSuccessful()
    // this.iab.create('https://www.youtube.com/embed/xxCVVQUBWTo');
    // window.open('https://www.youtube.com/watch?v=xxCVVQUBWTo')
  }
 


 


  login() {
    // this.loading = true;
    // const options = {
    //   scope: 'openid profile offline_access'
    // };
    // // Authorize login request with Auth0: open login page and get auth results
    // this.Client.authorize(options, (err, authResult) => {
    //   if (err) {
    //     throw err;
    //   }
    //   // Set Access Token
    //   this.storage.set('access_token', authResult.accessToken);
    //   this.accessToken = authResult.accessToken;
    //   // Set Access Token expiration
    //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    //   this.storage.set('expires_at', expiresAt);
    //   // Set logged in
    //   this.loading = false;
    //   this.loggedIn = true;
    //   // Fetch user's profile info
    //   this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
    //     if (err) {
    //       throw err;
    //     }
    //     this.storage.set('profile', profile).then(val =>
    //       this.zone.run(() => this.user = profile)
    //     );
    //   });
    // });
  }

  logout() {
  //  var pdf='https://people.csail.mit.edu/virgi/whowins.pdf'
  //  const browser = this.iab.create(pdf,'_system', 'location=no');
    // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // }
    
    
    // this.document.viewDocument(pdf, 'application/pdf', options)
    // this.storage.remove('profile');
    // this.storage.remove('access_token');
    // this.storage.remove('expires_at');
    // this.accessToken = null;
    // this.user = null;
    // this.loggedIn = false;
  }

getmypins()
{
  this.pinterest.getMyPins()
  .then((pins: Array<PinterestPin>) => alert(JSON.stringify(pins)))
  .catch(err => alert(JSON.stringify(err)))
}

getme()
{
  this.pinterest.getMe()
  .then((user: PinterestUser) => alert(JSON.stringify(user)))
  .catch(err => alert(JSON.stringify((err))))
}
getmyboards()
{
  this.pinterest.getMyBoards()
  .then((boards: Array<PinterestBoard>) =>
   alert(JSON.stringify((boards))))
  .catch(err => alert(JSON.stringify((err))))
}
createpin()
{

var note='artform platform check out this work on'
var link='https://i.pinimg.com/236x/d5/21/5b/d5215b329fbb6833c0a78dce025fbe42.jpg'
var weblink='https://ionicframework.com/docs/v3/native/pinterest/#createPin'
var boardId='656470151872803217'
var createboard='Hope'
var desc='detail description'
  this.pinterest.createBoard(createboard, desc)
  .then((data)=>{
alert(JSON.stringify((data)))
this.pinterest.createPin(note, data.id, link, weblink).then((data)=>{
  alert(JSON.stringify(data))
})
.catch(err=>{
  alert(JSON.stringify(err))
})
  })
  .catch(err => alert(JSON.stringify((err))))



}





  navigatetoSecurity()
  {
 this.navCtrl.setRoot(SecuritypanelPage)
  }
  setAuthState(authenticated) {
    if(authenticated) {
      this.storage.set('my_token', 'myspecialheadertoken').then(() => {
        this.authenticated = true;
      });
    } else {
      this.storage.remove('my_token').then(() => {
        this.authenticated = false;
      });
    }
  }
 
  getSuccessful() {
    this.http.get('http://staging15api.bigcityexperiences.co.in/v1/user/home?program_id=1').subscribe(res => {
    alert(JSON.stringify(res))
    });
  }
 
  getFail() {
    this.http.get('https://notvalid.xy').subscribe(
      res => {}
      ,err => {
        this.message = err.message;
      }
    );
  }

}
