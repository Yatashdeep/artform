import { Component } from '@angular/core';
import { ModalController,LoadingController,IonicPage, NavController, NavParams ,AlertController,Tabs,Events } from 'ionic-angular';
import { TabspagePage } from '../tabspage/tabspage';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';
import{FormBuilder,FormGroup,Validator, Validators,AbstractControl }from'@angular/forms'
import { Facebook } from '@ionic-native/facebook';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import { from } from 'rxjs/observable/from';
import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { EditprofilepagePage } from '../editprofilepage/editprofilepage';
import{CommunitypopoverPage}from'../communitypopover/communitypopover'
/**
 * Generated class for the SecuritypanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-securitypanel',
  templateUrl: 'securitypanel.html',
})
export class SecuritypanelPage {
  user:boolean
  userData: any;
  signupform
  radiocheck
  email
  password
  checkremember
  private oauth: OauthCordova = new OauthCordova();
  private apiResponse;
    private instagramProvider: Instagram = new Instagram({
        clientId: "9640f8cde2f3436d8853c34c799a3e34",      // Register you client id from https://www.instagram.com/developer/
        redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
        responseType: 'token',   // Use token only 
        appScope: ['basic','public_content'] 

        /*
        appScope options are 

        basic - to read a user’s profile info and media
        public_content - to read any public profile info and media on a user’s behalf
        follower_list - to read the list of followers and followed-by users
        comments - to post and delete comments on a user’s behalf
        relationships - to follow and unfollow accounts on a user’s behalf
        likes - to like and unlike media on a user’s behalf

        */ 
    });
  constructor(public modalCtrl:ModalController,public event:Events,public service:SecurityProvider,public loadingCtrl:LoadingController,public facebook:Facebook, public formBuilder:FormBuilder,private googlePlus: GooglePlus, private twitter: TwitterConnect,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
     console.log('status'+localStorage['status'])
     this.apiResponse = [];
     if(localStorage['status']=='true')
    {
           this.email= localStorage['email']
           this.password=localStorage['password']
           console.log('pika pika pikabu')
           this.checkremember=true
    }
    else
    {
      this.email=''
      this.password=''
      console.log('chika chika')
    }


    let emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    let passwordRegex=/^[_A-z]*((-|\s)*[_A-z])*$/;
    this.signupform=formBuilder.group({
    email:['',Validators.compose([Validators.maxLength(50),Validators.pattern(emailRegex),Validators.minLength(1),Validators.required])],
  //  password:['',Validators.compose([Validators.maxLength(30),Validators.pattern(passwordRegex),Validators.minLength(3),Validators.required])],
  password:['',Validators.compose([Validators.maxLength(30),Validators.minLength(3),Validators.required])],
  confirmPassword: ['', Validators.required],
  }, {
    validator: SecuritypanelPage.MatchPassword
  }) 
    
 
  }
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
     if(password != confirmPassword) {
         console.log('false');
         AC.get('confirmPassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }
 instagramlogin()
{
  this.oauth.logInVia(this.instagramProvider).then((success) => {

    console.log(JSON.stringify(success));

    /* Returns User uploaded Photos */
    this.service.getInstagramUserInfo(success).subscribe(response =>{ 
      this.apiResponse=response.data
    this.instalogin(this.apiResponse)
    });

}, (error) => {

    console.log(JSON.stringify(error));
});
}
instalogin(apiResponse)
{
// alert('response'+JSON.stringify(apiResponse))
// alert('hi'+apiResponse[0])
// alert('id'+apiResponse[0].user.id)
// alert('fullname'+apiResponse[0].user.username)
// alert('profilepicture'+apiResponse[0].user.profile_picture)
let loading=this.loadingCtrl.create({
  spinner:'hide',
  content:'',
  cssClass:'transparent'
})
loading.present()
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(()=>this.service.sociallogininsta(
  apiResponse[0].user.id,apiResponse[0].user.username,apiResponse[0].user.profile_picture
)).subscribe(data=>{
  loading.dismiss()
  localStorage['sessionId']=data.sessionId 
  localStorage['userid']=data.user.user_id
  if(this.checkremember==true)
  {
   
   console.log(apiResponse[0].user.profile_picture+'profile pic firtsname'+apiResponse[0].user.profile_picture)

   this.event.publish('user:image',apiResponse[0].user.profile_picture,apiResponse[0].user.username,Date.now())
   this.event.publish('user:created',this.checkremember,Date.now())
   
   
  }
  else
  {
    console.log(apiResponse[0].user.profile_picture+'profile pic firtsname'+apiResponse[0].user.profile_picture)
   this.event.publish('user:image',apiResponse[0].user.profile_picture,apiResponse[0].user.username,Date.now())
   this.event.publish('user:created',this.checkremember,Date.now())
  }
  this.sociallogin()
// alert('data'+JSON.stringify(data))
})
}




  loginUser(): void {
    
    this.googlePlus.login({
      'webClientId': '863534362265-cf4n55pnfu3mmhuj85k4u604pnf5vkc5.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
  // alert('token'+res.accessToken)
  this.logingoogle(res.userId,res.email,res.displayName,res.givenName,res.imageUrl)    
  })
      .catch(err => alert('error'+err));
  }
  logingoogle(socialid,email,displayname,firtsname,profile_pic)
  {
    // alert(socialid+''+email+''+displayname+''+firtsname+''+profile_pic)
    let loading=this.loadingCtrl.create({
      spinner:'hide',
      // content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
      content:'',
      cssClass:'transparent'
    })
    loading.present()
    Observable.of(loading).flatMap(loading=>loading.present())
    .flatMap(()=>this.service.sociallogingoogle(
      socialid,email,displayname,firtsname,profile_pic
    )).subscribe(data=>{
      loading.dismiss()
      localStorage['sessionId']=data.sessionId 
      localStorage['userid']=data.user.user_id
      if(this.checkremember==true)
      {
       
       console.log(profile_pic+'profile pic firtsname'+profile_pic)
    
       this.event.publish('user:image',profile_pic,displayname,Date.now())
       this.event.publish('user:created',this.checkremember,Date.now())
       
       
      }
      else
      {
        console.log(profile_pic+'profile pic firtsname'+profile_pic)
       this.event.publish('user:image',profile_pic,displayname,Date.now())
       this.event.publish('user:created',this.checkremember,Date.now())
      }
      this.event.publish('user:image',profile_pic,displayname,Date.now())
      this.sociallogin()
  // alert('data'+JSON.stringify(data))
    })
  }





  loginWithFB() {
    // alert(this.checkremember)
    this.facebook.login(['email', 'public_profile']).then((response) => {
      // alert('res'+response)
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        // alert(profile['id']+''+profile['email']+''+profile['first_name']+''+profile['picture_large']['data']['url']+''+ profile['name']+profile['last_name'])
        // this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        var email=profile['email']
        var profile_pic=profile['picture_large']['data']['url'] 
        var first_name=profile['first_name']
        var profile_name=profile['name']
        var last_name=profile['last_name']
        var socialid=profile['id']
    
        this.loggedfbuser(socialid,email,profile_pic,first_name,profile_name,last_name)
      });
   }, error => {
      alert(JSON.stringify(error))
    });
  

}
loggedfbuser(socialid,email,profile_pic,first_name,profile_name,last_name)
{
  // alert(socialid+''+email+''+profile_pic+''+first_name+''+profile_name+''+last_name)
  let loading=this.loadingCtrl.create({
    spinner:'hide',
    // content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
    content:'',
    cssClass:'transparent'
  })
  loading.present()
  Observable.of(loading).flatMap(loading=>loading.present())
  .flatMap(()=>this.service.sociallogin(
    socialid,email,profile_pic,first_name,profile_name,last_name
  )).subscribe(data=>{
    //  alert('data'+JSON.stringify(data))
    // alert(data.token)
    localStorage['xtoken']=data.token
      console.log('sessionId',data.sessionId)
      console.log('user_id',data.user.user_id)
    localStorage['sessionId']=data.sessionId  
    localStorage['userid']=data.user.user_id
   
    if(this.checkremember==true)
    {
     
     console.log(profile_pic+'profile pic firtsname'+first_name)

     this.event.publish('user:image',profile_pic,first_name,Date.now())
     this.event.publish('user:created',this.checkremember,Date.now())
     
     
    }
    else
    {
      console.log(profile_pic+'profile pic firtsname'+first_name)
     this.event.publish('user:image',profile_pic,first_name,Date.now())
     this.event.publish('user:created',this.checkremember,Date.now())
    }

    loading.dismiss()
    this.event.publish('user:image',profile_pic,first_name,Date.now())
    this.sociallogin()
// alert('data'+JSON.stringify(data))
  })
}
  ionViewDidLoad() {
    this.radiocheck="2"
    console.log('ionViewDidLoad SecuritypanelPage');
    this.user=false
    document.getElementById('reg').style.backgroundColor="transparent"
    document.getElementById('regp').style.color="#fff"
    document.getElementById('log').style.backgroundColor="#fff"   
    document.getElementById('logp').style.color="#000"
    // document.getElementById('strip-box').style.border='2px solid #ffff !important'
 
  }
  navigatebar(id){
    if(id==2)
    {
     document.getElementById('log').style.backgroundColor="transparent"   
     document.getElementById('logp').style.color="#fff"
     document.getElementById('reg').style.backgroundColor="#fff"
      document.getElementById('regp').style.color="#000"
      this.user=true
    }
    else{
      document.getElementById('reg').style.backgroundColor="transparent"
      document.getElementById('regp').style.color="#fff"
      document.getElementById('log').style.backgroundColor="#fff"   
      document.getElementById('logp').style.color="#000"
      this.user=false
    }
  }
  checkalert(){
    let alert = this.alertCtrl.create({
     title: 'Forget Password',
     inputs: [
       {
         name: 'Email',
         placeholder: 'Email'
       }
     ],
     buttons: [
       {
         text: 'Send',
         handler: data => {
           this.forgetpass(data.Email)
         }
       }
      
     ]
   });
   alert.present();
 }
 forgetpass(email)
 {
  let loading=this.loadingCtrl.create({
    spinner:'hide',
    // content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
    content:'',
    cssClass:'transparent' 
  })
 loading.present()
 Observable.of(loading).flatMap(loading=>loading.present())
 .flatMap(()=>this.service.forgetpass(email)).subscribe(data=>{
   console.log(data)
   if(data.status=='success')
   {
   let alert = this.alertCtrl.create({
     title: 'Email Sent to your account ',
 
     buttons: [
       {
         text: 'Ok',
         handler: data => {
           this.user=false
         }
       }
      
     ]
   });
   alert.present();
 }
 else{
   let alert = this.alertCtrl.create({
     title: 'Email not found !',
    
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
 
 loading.dismiss()
 })
 
 }
 navigatetotab(){
  let popover = this.modalCtrl.create(CommunitypopoverPage,{cssClass: 'contact-popover'});
  popover.present({
    
  });
  popover.onDidDismiss(data => {
    console.log('MODAL DATA', data);
    if(data==1)
    {
        this.navigatetotab1()
    }
   });
}

 navigatetotab1()
 {
  
 let loading=this.loadingCtrl.create({
   spinner:'hide',
  //  content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
  content:'',
   cssClass:'transparent' 
 })
loading.present()
Observable.of(loading).flatMap(loading=>loading.present())
.flatMap(()=>this.service.signin(this.signupform,this.radiocheck)).subscribe(data=>{
  console.log(data)
  if(data.status=='success')
  {
  let alert = this.alertCtrl.create({
    title: 'Register Successfull. Please check your e-mail, and confirm account to activate before login. ',

    buttons: [
      {
        text: 'Ok',
        handler: data => {
          this.user=false
        }
      }
     
    ]
  });
  alert.present();
}
else{
  let alert = this.alertCtrl.create({
    title: 'Email already exist !',
   
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

loading.dismiss()
})

  //  this.navCtrl.setRoot(TabspagePage,{id:0})
  //  this.navCtrl.parent.select(1)
  // this.navCtrl.parent.select(2);
 }
 twLogin()
 {
  this.twitter.login().then((data) => {
    
  // alert('hope'+JSON.stringify(data))
  this.twitter.showUser().then(user =>{

    //  alert('success'+JSON.stringify(user))
    //   alert("user_id"+user.id) 
    //   alert("user_name"+user.name)
    //   alert("display_name"+user.screen_name)
    //   alert("profile_image_url"+user.profile_image_url)  
       this.sociallogintwitter(user.id,user.name,user.screen_name,user.profile_image_url)


      }, err =>{
      
        // default twitter image is too small https://developer.twitter.com/en/docs/accounts-and-users/user-profile-images-and-banners
        var profile_image = err.profile_image_url_https.replace('_normal','');
        
          // alert(err.name)
          //  alert(err.screen_name)
          // alert(err.followers_count)
          // alert(profile_image)
        
  
  }
), error => {
    alert(error)
  }
},error=>{
 
alert('Please install the twitter application to login with twitter')
})

 
}
sociallogintwitter(socialid,displayName,firtsname,profile_pic)
{
  let loading=this.loadingCtrl.create({
    spinner:'hide',
    // content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
    content:'',
    cssClass:'transparent'
  })
  loading.present()
  Observable.of(loading).flatMap(loading=>loading.present())
  .flatMap(()=>this.service.sociallogintwitter(
    socialid,displayName,firtsname,profile_pic
  )).subscribe(data=>{
    loading.dismiss()
    
    localStorage['sessionId']=data.sessionId 
    localStorage['userid']=data.user.user_id
    this.event.publish('user:image',profile_pic,firtsname,Date.now())
    this.sociallogin()
// alert('data'+JSON.stringify(data))
  })
}
 cleardata()
 {
   this.signupform.reset()
  
  
 }
sociallogin()
{
  
  let prompt = this.alertCtrl.create({
    title: 'Choose',
    message: 'Login as ',
    inputs : [
    {
        type:'radio',
        label:'User',
        value:'3'
    },
    {
        type:'radio',
        label:'Artist',
        value:'2'
    }],
    buttons : [
    {
        text: "Cancel",
        handler: data => {
        console.log("cancel clicked");
        }
    },
    {
        text: "Ok",
        handler: data => {
        console.log("search clicked",data);
        localStorage['usertype']=data
        if(localStorage['usertype']==2)
        {
         
          this.changetype()
          this.islogged()
          // this.navCtrl.setRoot(TabspagePage,{id:0})
        }
        else
        {
          this.islogged()
          // this.navCtrl.setRoot(TabspagePage,{id:0})
        
          
        }
       
      
        }
    }]});
    prompt.present();
  // if(localStorage['usertype']==2)
  // {
  //   this.navCtrl.setRoot(TabspagePage,{id:0})
  //   this.islogged()
  // }
  // else
  // {

  
  // localStorage['usertype']=3
  // this.navCtrl.setRoot(TabspagePage,{id:0})
  //       this.islogged()
  // }
      }
      changetype()
  {
    Observable.of(null)
    .flatMap(()=>this.service.changeusertype()).subscribe(data=>{
      
     // this.navCtrl.setRoot(SecuritypanelPage)
    
    // this.navCtrl.setRoot(ArtprofilePage,{id:4})
    })
  }
 
islogged()
{
//   let loading=this.loadingCtrl.create({
//     spinner:'hide',
//     content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
//     cssClass:'transparent' 
//   })
//  loading.present()
this.navCtrl.setRoot(TabspagePage,{id:4})
 Observable.of(null)
 .flatMap(()=>this.service.islogged()).subscribe(data=>{
  
  
   console.log(data)
 })
}

 navigatetotabsubmit()
 {
  //  if(localStorage['usertype'])
  //  {

  //   this.loginuser(localStorage['usertype'])
  // }
  // else
  // {
    let prompt = this.alertCtrl.create({
      title: 'Choose',
      message: 'Login as ',
      inputs : [
      {
          type:'radio',
          label:'User',
          value:'3'
      },
      {
          type:'radio',
          label:'Artist',
          value:'2'
      }],
      buttons : [
      {
          text: "Cancel",
          handler: data => {
          console.log("cancel clicked");
          }
      },
      {
          text: "Ok",
          handler: data => {
          console.log("search clicked",data);
          this.loginuser(data)
          }
      }]});
      prompt.present();
  // }

 }
 loginuser(usertype)
 {

  let loading=this.loadingCtrl.create({
    spinner:'hide',
    content:'',
    // content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
    cssClass:'transparent' 
  })
 loading.present()
 Observable.of(loading).flatMap(loading=>loading.present())
 .flatMap(()=>this.service.login(this.email,this.password,usertype)).subscribe(data=>{
  //  localStorage['usertype']=data.usertypeid
    localStorage['xtoken']=data.token
  
   
   if(data.status=='success' && usertype==data.usertypeid)
   {
    localStorage['sessionId']=data.sessionId  
    localStorage['userid']=data.user.user_id
    var firtsname=data.user.user_display_name
    console.log('sessionId',data.sessionId)
    var profile_pic='assets/tabsicon/propic.jpg'
    localStorage['image']=profile_pic
             localStorage['name']=data.user.user_display_name
  //  let alert = this.alertCtrl.create({
  //    title: 'Register Successfull !',
 
  //    buttons: [
  //      {
  //        text: 'Ok',
  //        handler: data => {
          localStorage['usertype']=usertype
           if(this.checkremember==true)
           {
            // var firtsname=this.email
            console.log(profile_pic+'profile pic firtsname'+firtsname)
      
            this.event.publish('user:image',profile_pic,firtsname,Date.now())
            this.event.publish('user:created',this.checkremember,Date.now())
            
            // localStorage['email']=this.email
            // localStorage['password']=this.password
            
           }
           else
           {
             console.log(profile_pic+'profile pic firtsname'+firtsname)
            this.event.publish('user:image',profile_pic,firtsname,Date.now())
            this.event.publish('user:created',this.checkremember,Date.now())
           }
           this.islogged()
          
           
  //        }
  //      }
      
  //    ]
  //  });
  //  alert.present();
 }

 else if(data.status=='fail'){

if(data.message=='<strong>Error!</strong> Please activate your account before login. Please check your e-mail, and confirm account.')
{
  let alert = this.alertCtrl.create({
    title: 'Please activate your account before login. Please check your e-mail, and confirm account. !',
   
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
else
{
   let alert = this.alertCtrl.create({
     title: 'Wrong Email-Id or Password !',
    
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
 }
 else if(usertype!=data.usertypeid)
 {
  let alert = this.alertCtrl.create({
    title: 'Wrong User-type Selected!',
   
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
 
 loading.dismiss()
 })
 }


}
