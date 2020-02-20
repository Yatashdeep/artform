import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabspagePage } from '../tabspage/tabspage';

/**
 * Generated class for the HowitworkspPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-howitworksp',
  templateUrl: 'howitworksp.html',
})
export class HowitworkspPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowitworkspPage');
  }
  navigatetotab(id)
  {
    console.log(id)
    this.navCtrl.setRoot(TabspagePage,{id:id})
  }

}
