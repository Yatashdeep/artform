import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubcattabpPage } from '../subcattabp/subcattabp';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
/**
 * Generated class for the CategorytabpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorytabpage',
  templateUrl: 'categorytabpage.html',
})
export class CategorytabpagePage {
catsound
id
category
loadingdata
fakeUsers: Array<any> = new Array(7);
  constructor(public navCtrl: NavController, public navParams: NavParams,public security:SecurityProvider) {
 this.id=this.navParams.get('id')

}

  ionViewDidLoad() {
    this.loadingdata='on'
    console.log('ionViewDidLoad CategorytabpagePage');
  //   this.catsound=[

  //     {
  //      'category':'Music',
  //     'img':'assets/tree-cat/music.png',

  //   'artform':'assets/profile/02_1_music.png'
  //  },
  //   {
  //    'category':'Dance',
  //    'img':'assets/tree-cat/dance.png',

  //     // 'form':['Hip Hop','Body Pop','BBoy/Breakdance','Irish','Salsa','Ballet','Trap Dance','Jazz','Modern','Swing','Belly','Country','Others'],
  //     'artform':'assets/profile/dance.png'
  //  },
  //   {
  //    'category':'Film',
  //    'img':'assets/tree-cat/film.png',
  
  //   //  'form':['Show Reel','Documentary','Movie Script','TV Script','Unreleases Films','Others'],
  //    'artform':'assets/profile/film.png'
  //   },
  //   {
  //    'category':'Photography',
  //    'img':'assets/tree-cat/camera.png',
  
  //   //  'form':['Aerial','Action','Animal','Architecture','Black and White','Commercial','Panoramic','Sports','Nature','Potrait','Long Exposure','Others'],
  //    'artform':'assets/profile/photography.png'
  //   },
  //   {
  //    'category':'Literature',
  //    'img':'assets/tree-cat/literature.png',
    
  //   //  'form':['Novel','Movie Script','TV Script','Comedy','Journalistic','Factual','Education','Poetry','Others'],
  //    'artform':'assets/profile/literature.png'
  //   },
  //   {
  //    'category':'Art',
  //    'img':'assets/tree-cat/art.png',

  //   //  'form':['Art','Design','Crafts','Others'],
  //    'artform':'assets/profile/art.png'
  //   },
  //   {
  //    'category':'Freestyle',
  //    'img':'assets/tree-cat/freestyle.png',
 
  //   //  'form':['Breakdance','Body Pop','BMX','Skateboarding','juggling','Parkour','Graffiti','Beatbox','Watersports','Rap','Skiing','Turntabilism','Football','Others'],
  //    'artform':'assets/profile/freestyle.png'
  //   },
  //   {
  //    'category':'Personality',
  //    'img':'assets/tree-cat/personality.png',
 
  //   //  'form':['Presenter','TV Presenter','Comedian','Radio Presenter','Event Presenter','Commentator','Impersonator','Mime','Others'],
  //    'artform':'assets/profile/personality.png'
  //   },
  //   {
  //    'category':'Other',
  //    'img':'assets/tree-cat/others.png',
     
  //   //  'form':['Animal Trick','Street Perform','Synchronised Act','Magician','Mime','Modeling','Others'],
  //    'artform':'assets/profile/others_bg.png'
  //   }
  //  ]
  //  this.loadcat()
 console.log('hicategory',localStorage['category'])
  this.category=JSON.parse(localStorage['category'])
  }
//   loadcat()
// {

//   Observable.of(null)
//   .flatMap(()=>this.security.getcategory()).subscribe(data=>{
// this.category=data.categories
// console.log('cat',this.category)
// this.loadingdata='off'
// })
// }
  cattap(i)
  {
    this.navCtrl.push(SubcattabpPage,{id:i,category:this.category})
  }

}
