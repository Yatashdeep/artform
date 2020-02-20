import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { PrivacypPage } from '../privacyp/privacyp';
import { TabspagePage } from '../tabspage/tabspage';
import { Observable } from 'rxjs';
import{SecuritypanelPage}from'../../pages/securitypanel/securitypanel'
import{SecurityProvider}from'../../providers/security/security'
/**
 * Generated class for the GetintouchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getintouch',
  templateUrl: 'getintouch.html',
})
export class GetintouchPage {
  Name
  Email
  Message
  checkremember
  status='Get in Touch'
  constructor(public alertCtrl:AlertController,public service:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  save()
  {
    if(this.checkremember==true)
    {
      this.status='Sending..'
    Observable.of(null)
    .flatMap(()=>this.service.getinTouch(this.Name,this.Email,this.Message)).subscribe(data=>{
      this.status='Get in Touch'
      // this.navCtrl.setRoot(SecuritypanelPage)
      let alert = this.alertCtrl.create({
        title: data.message,
        buttons: [
          {
            text: 'Ok',
            handler: data => {
             
            }
          }
         
        ]
      });
      alert.present();
    })
  }
  else
  {
    let alert = this.alertCtrl.create({
      title:'Please Accept the Privacy Policy !',
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetintouchPage');
  }
  navigatetopolicy()
  {
    this.navCtrl.setRoot(PrivacypPage)
  }
  navigatetotab(id)
  {
    console.log(id)
    this.navCtrl.setRoot(TabspagePage,{id:id})
  }

}