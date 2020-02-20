import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the FollowedartistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followedartist',
  templateUrl: 'followedartist.html',
})
export class FollowedartistPage {
  msg
  errormsg
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
 
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowedartistPage');
    this.msg=this.navParams.get('msg')
    if(this.msg=='error')
    {
   
      this.errormsg=true
    }
    else
    {
      this.errormsg=false
   
    }
    console.log(this.msg)
  }
  close()
  {
    this.viewCtrl.dismiss()
  }

}
