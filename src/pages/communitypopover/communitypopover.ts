import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CommunitypopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-communitypopover',
  templateUrl: 'communitypopover.html',
})
export class CommunitypopoverPage {

  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunitypopoverPage');
  }
backtap(id)
{
this.viewCtrl.dismiss(id)
}
}
