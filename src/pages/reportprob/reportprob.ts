import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import { from } from 'rxjs/observable/from';

/**
 * Generated class for the ReportprobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportprob',
  templateUrl: 'reportprob.html',
})
export class ReportprobPage {
report
loading
fakeUsers: Array<any> = new Array(4);
relationship
usermediaid
showbut
  constructor(public security:SecurityProvider,public loadingCtrl:LoadingController,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
 this.usermediaid=this.navParams.get('usermediaid')
  }
  close()
  {
   
       this.viewCtrl.dismiss()
         

  }
  ionViewDidLoad() {
    this.showbut=true
  this.getreporttags()
    console.log('ionViewDidLoad ReportprobPage');
  }
  getreporttags()
  {
      
    this.loading=false
     Observable.of(this.loading)
     .flatMap(()=>this.security.reportmedia()).subscribe(data=>{
       this.loading=true
            this.report=data.reportTypes
           })

  
          }

   done()
   {
    
    
//  let loading=this.loadingCtrl.create({
//       spinner:'hide',
//       content:'<img src="https://media.giphy.com/media/3dbzJ7r5tLLjRPufWl/giphy.gif">',
//       cssClass:'transparent'
//     })
//     loading.present()
this.showbut=false
     Observable.of(null)
     .flatMap(()=>this.security.reportsubmit(this.usermediaid,this.report[this.relationship])).subscribe(data=>{
      //  loading.dismiss()
      this.showbut=true
       this.viewCtrl.dismiss()

   })
   }         
         



}
