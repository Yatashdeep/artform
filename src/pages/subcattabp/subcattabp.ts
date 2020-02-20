import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChildcattabpagePage } from '../childcattabpage/childcattabpage';
import { ChoosecatpagetabPage } from '../choosecatpagetab/choosecatpagetab';

/**
 * Generated class for the SubcattabpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcattabp',
  templateUrl: 'subcattabp.html',
})
export class SubcattabpPage {
categorydata=[1,2,3,4,5,6,7,8,9,10]
id  
category
subcat
title
choiceofintrest=3
constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcattabpPage');
    this.id=this.navParams.get('id')
    this.category=this.navParams.get('category') 
    this.title=this.category[this.id].Category.category_name  
    console.log('title'+this.title)  
    this.subcat=this.category[this.id].Childrens
  }
  navigatetosubcat(i,text)
  {
    if(this.subcat[i].Childrens.length==0)
    {
      this.choiceofintrest=2
      this.navCtrl.push(ChoosecatpagetabPage,{type:'top_performers',
      title:text,
      subsub:this.subcat,
      id:i,
      choiceofintrest:this.choiceofintrest})
  
    }
    else
    {
    this.navCtrl.push(ChildcattabpagePage,{subcat:this.subcat,
      id:i,})
    }
  }
  onSegmentChanged(ev)
  {
   
    this.navCtrl.push(ChoosecatpagetabPage,{type:ev.value,title:this.title,
    subcat:this.category,
    id:this.id,
    choiceofintrest:this.choiceofintrest
  })
  }

}
