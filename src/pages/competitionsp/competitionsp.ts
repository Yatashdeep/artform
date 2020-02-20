import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import { CompetitiondetailpagePage } from '../competitiondetailpage/competitiondetailpage';
/**
 * Generated class for the CompetitionspPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competitionsp',
  templateUrl: 'competitionsp.html',
})
export class CompetitionspPage {
competitionsarray=[1,2,3,4,5,6]
competitiondata
competitiondatafake:Array<any>=new Array(6);
boxshow:boolean
  constructor(public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.boxshow=true
    console.log('ionViewDidLoad CompetitionspPage');
Observable.of(null)
.flatMap(()=>this.security.Competitionapi()).subscribe(data=>{
  this.boxshow=false
  this.competitiondata=data.competitions
})
  }
  detailpage(i)
  {
  
this.navCtrl.push(CompetitiondetailpagePage,{competition_id:this.competitiondata[i].Competitions.competition_id})
  }

}
