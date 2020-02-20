import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabspagePage } from '../tabspage/tabspage';

/**
 * Generated class for the PrivacypPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacyp',
  templateUrl: 'privacyp.html',
})
export class PrivacypPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacypPage');
  }
  navigatetotab(id)
  {
    console.log(id)
    this.navCtrl.setRoot(TabspagePage,{id:id})
  }

}
