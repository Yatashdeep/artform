import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Pinterest, PinterestUser, PinterestPin, PinterestBoard } from '@ionic-native/pinterest';
declare var window
/**
 * Generated class for the PopoverpagesharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popoverpageshare',
  templateUrl: 'popoverpageshare.html',
})
export class PopoverpagesharePage {
  image
  artistname
  user_url
  scopes
  createboard
  desc
  note
  usermedia
  constructor(public alertCtrl:AlertController,public pinterest:Pinterest,public socialshare:SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverpagesharePage');
    this.image=this.navParams.get('image')
    this.artistname=this.navParams.get('artistname')
    this.user_url=this.navParams.get('user_url')
      this.usermedia=this.navParams.get('usermediaid')
    console.log(this.image+'--'+this.artistname+'---'+this.user_url)
    console.log('hi')
  }
  shareviafb()
  {
  
   // this.socialshare.shareViaFacebookWithPasteMessageHint(this.artistname+'-artform platform check out this work on',null,this.user_url).then((data) => {
      // Success
      this.socialshare.shareViaFacebookWithPasteMessageHint(this.artistname+'-artform platform check out this work on',null,'artformplatform.com/users/art/'+this.usermedia).then((data) => {
    }).catch((e) => {
   
    })
  
  }
  shareviatwitter()
  {
  //  this.socialshare.shareViaTwitter(this.artistname+'-artform platform check out this work on',null,this.user_url).then((data)=>{
      // alert('data'+data)
      this.socialshare.shareViaTwitter(this.artistname+'-artform platform check out this work on',null,'artformplatform.com/users/art/'+this.usermedia).then((data)=>{
    }).catch((e)=>{
      alert('Application is not installed .Please install the application.')

    })
  }
  shareviaothers()
  {
    this.scopes = [
      this.pinterest.SCOPES.READ_PUBLIC,
      this.pinterest.SCOPES.WRITE_PUBLIC,
      this.pinterest.SCOPES.READ_RELATIONSHIPS,
      this.pinterest.SCOPES.WRITE_RELATIONSHIPS
    ];
    this.pinterest.login(this.scopes)
  .then(res => 
{
  let alert = this.alertCtrl.create({
    title: 'Create Board',
    inputs: [
      {
        name: 'CreateBoard',
        placeholder: 'Enter Board name'
      }
    ],
    buttons: [
      {
        text: 'Send',
        handler: data => {
          
          this.createboardcall(data.CreateBoard)
        }
      }
     
    ]
  });
  alert.present();
 
}
    )
  .catch(err => 
    alert('Error loggin in'+ err));
    // this.socialshare.share(this.artistname+'-artform platform check out this work on'+this.user_url,null,null).then((data)=>{
    //   console.log(data)
    // }).catch((e)=>{
    //   // alert('error'+e)
    // })
  }
  createboardcall(CreateBoard)
  {
    this.desc='ArtForm'
    this.note=this.artistname+'-artform platform check out this work on'
      this.pinterest.createBoard(CreateBoard, this.desc)
      .then((data)=>{
    // alert(JSON.stringify((data)))
   // this.pinterest.createPin(this.note, data.id, this.image, this.user_url).then((data)=>{
      // alert(JSON.stringify(data))
      this.pinterest.createPin(this.note, data.id, this.image,'artformplatform.com/users/art/'+this.usermedia).then((data)=>{
      let alert = this.alertCtrl.create({
        title: 'Pin Shared Successfully !',
        buttons: [
          {
            text: 'Close',
            handler: data => {
              
              
            }
          }
         
        ]
      });
      alert.present();
    })
    .catch(err=>{
      alert(JSON.stringify(err))
    })
      })
      .catch(err => alert(JSON.stringify((err))))
  }
  shareviawattsapp()
  {
    alert('user_url'+this.user_url)
   // this.socialshare.shareViaWhatsApp('artformplatform.com/users/art/'+this.usermedia,null,null).then((data)=>{
  // this.socialshare.shareViaWhatsApp(this.artistname+'-artform platform check out this work on' +this.user_url,null,null).then((data)=>{
      // alert('data'+data)
      this.socialshare.shareViaWhatsApp(this.artistname+'-artform platform check out this work on artformplatform.com/users/art/'+this.usermedia,null,null).then((data)=>{
    }).catch((e)=>{
      // alert('error'+e)

    })
  }
  shareviamail()
  {
    alert(this.usermedia)
     this.socialshare.shareViaEmail(this.artistname+'-artform platform check out this work on artformplatform.com/users/art/'+this.usermedia, 'Check Out This!', null, null, null, null).then((data)=>{
  // this.socialshare.shareViaEmail('artformplatform.com/users/art/'+this.usermedia, 'Check Out This!', null, null, null, null).then((data)=>{
    console.log(data)
    }).catch((e)=>{
      // alert('error'+e)
    })
 
    
  }
  

}
