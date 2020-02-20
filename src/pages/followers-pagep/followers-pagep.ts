import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import{ArtistprofilepagePage}from'../artistprofilepage/artistprofilepage'
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the FollowersPagepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followers-pagep',
  templateUrl: 'followers-pagep.html',
})
export class FollowersPagepPage {

  followersdata
  id
  followers
  followingdata
  rcentdata
  topid
  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  
    this.id=this.navParams.get('id')
    console.log(this.id)
    // this.followingdata=this.navParams.get('followingdata')
    // console.log('followingdata'+this.followingdata)
    // this.followersdata=this.navParams.get('followersdata')
    // console.log('followersdata'+this.followersdata)
    //console.log(JSON.parse(localStorage['followingdata']))
    if(this.id==1)
    {
      this.followers='Followers'
    
       this.followingdata=this.navParams.get('followersdata')
     
      console.log('followingdata'+this.followersdata)
    }
    else
    {
      this.followers='Following'
     
     this.followingdata=this.navParams.get('followingdata')
      console.log('follow',this.followingdata)
    }

  }

  ionViewDidLoad() {
    this.rcentdata=this.navParams.get('rcentdata')
   
    this.topid=this.navParams.get('topid')
 //   alert(this.topid)
    console.log(JSON.stringify(this.rcentdata))
    
   

    console.log('ionViewDidLoad FollowersPagepPage');
  }
  closemodal()
  {
    this.viewCtrl.dismiss()
  }
  viewprofilepage(i)
  {
  //  alert(i)
    this.navCtrl.push(ArtistprofilepagePage,{id:i,rcentdata:this.followingdata,topid:2})
  }

}
