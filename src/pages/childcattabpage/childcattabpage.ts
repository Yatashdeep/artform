import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChoosecatpagetabPage } from '../choosecatpagetab/choosecatpagetab';

/**
 * Generated class for the ChildcattabpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-childcattabpage',
  templateUrl: 'childcattabpage.html',
})
export class ChildcattabpagePage {
  categorydata=[1,2,3,4,5,6,7,8,9,10]
  subcat
  id
  subsub
  title
  choiceofintrest
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subcat=this.navParams.get('subcat')
    this.id=this.navParams.get('id')
    this.subsub=this.subcat[this.id].Childrens
    this.title=this.subcat[this.id].Subcategory.subcategory_short_name
    console.log('subcat',this.subcat)
    console.log('subsub',this.subcat[this.id])
   console.log('length',this.subcat[this.id].Childrens.length)
  //  alert('hiii')
    // if(this.subcat[this.id].Childrens.length==0)
    // {
    //   this.navCtrl.push(ChoosecatpagetabPage,{type:'top_performers',title:this.title,subsub:this.subcat,id:this.id,choiceofintrest:this.choiceofintrest})    
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildcattabpagePage');
  }
  navigatetochoose(i,title)
  {
   
    this.choiceofintrest=1
    this.navCtrl.push(ChoosecatpagetabPage,{title:title,subsub:this.subsub,id:i,choiceofintrest:this.choiceofintrest})
  }
  onSegmentChanged(ev)
  {
    this.choiceofintrest=2
    this.navCtrl.push(ChoosecatpagetabPage,{type:ev.value,title:this.title,subsub:this.subcat,id:this.id,choiceofintrest:this.choiceofintrest})
  }
}
