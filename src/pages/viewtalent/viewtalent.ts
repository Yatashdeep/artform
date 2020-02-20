import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewtalentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewtalent',
  templateUrl: 'viewtalent.html',
})
export class ViewtalentPage {
  rate
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
 this.rate=this.navParams.get('rate')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewtalentPage');
  }
  close()
  {
    this.viewCtrl.dismiss()
  }

}
