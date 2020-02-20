import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { TabspagePage } from '../tabspage/tabspage';

/**
 * Generated class for the HowtouploadpagesidemenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-howtouploadpagesidemenu',
  templateUrl: 'howtouploadpagesidemenu.html',
})
export class HowtouploadpagesidemenuPage {
  slides = [
    {
      title: "1. Register Using your email or Social Media",
      description: "1) Register as an artist – only artists can upload media.<br>2) Use Social media to login <br>3) or use an email password combination",
      image: 'assets/howtoupload/register.jpg',
    }, 
    {
      title: "2. In Your Profile Page, Select Upload",
      description: "1) You can upload Original Files or Youtube Links  <br>2) Original Files can be Images ,Audio or Video <br>3) For Youtube Upload, just paste your link, then press submit <br>4)For original files, select add file. You can also have an optional cover image for original files",
      image: 'assets/howtoupload/upload.jpg',
    }, 
    {
      title: "3. Select Your Categories",
      description: "1) Enter the Category: Sub Category: and if relevant, Sub Sub Category of your work <br>2)Then Press Upload ",
      image: 'assets/howtoupload/category.jpg' 
    },
    {
      title: "4. Share Your media on Facebook & to your Google Contacts",
      description: "Now time to get those votes – remember the most votes wins. So get everybody you know to vote.",
      image: 'assets/howtoupload/icon-128x128.png'
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowtouploadpagesidemenuPage');
  }
  skippage()
  {
    this.navCtrl.setRoot(TabspagePage)
  }
  navigatetotab(id)
  {
    console.log(id)
    this.navCtrl.setRoot(TabspagePage,{id:id})
  }
}
