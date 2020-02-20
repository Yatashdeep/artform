import { Component ,ViewChild, style} from '@angular/core';
import { IonicPage, NavController, NavParams,Tabs ,Events} from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ArtprofilePage } from '../artprofile/artprofile';
import { UploadmediaPage } from '../uploadmedia/uploadmedia';
import { CompetitionspPage } from '../competitionsp/competitionsp';
import { CategorytabpagePage } from '../categorytabpage/categorytabpage';
import{Observable}from'rxjs'
import{SecurityProvider}from'../../providers/security/security'

/**
 * Generated class for the TabspagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()


@Component({
  selector: 'page-tabspage',
  templateUrl: 'tabspage.html',
})
export class TabspagePage {
  custompropic1='https://www.artformplatform.com/images/user-comment.png'
  tab1Root: any = DashboardPage;
  tab2Root: any = UploadmediaPage;
  tab3Root:any=CategorytabpagePage;
  tab4Root:any=CompetitionspPage;
  tab5Root:any=ArtprofilePage;
  @ViewChild('myTabs') tabRef: Tabs;
id
backgroundurl
custompropic12
followingdata
followersdata
profile_pic
  constructor(public event:Events,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.custompropic12='https://i.stack.imgur.com/S0qie.png'
    // this.profile_pic=localStorage['profile_pic']
    // let tabbar = this.tabRef._tabbar.nativeElement;
  // let element = tabbar.childNodes[tabbar.childElementCount-1];
  // if(element) {
  //   element.removeChild(element.childNodes[1]);
  //   let img = document.createElement("img");
  //   img.setAttribute("class", "tab-icon-custom");
  //   img.setAttribute("src",this.profile_pic );
  //   element.insertBefore(img, element.childNodes[1]);
  // } 
  }

  ionViewWillEnter() {
 
    // this.tabRef.select(2);
    this.event.subscribe('user:image',(profile_pic,firtsname,time)=>{
      console.log('profile_pic',profile_pic)
      console.log('firstname',firtsname)
      this.profile_pic=profile_pic
     localStorage['profile_pic']=profile_pic
  console.log('profile_pic',this.profile_pic)
  let tabbar = this.tabRef._tabbar.nativeElement;
  let element = tabbar.childNodes[tabbar.childElementCount-1];
  if(element) {
    element.removeChild(element.childNodes[1]);
    let img = document.createElement("img");
    img.setAttribute("class", "tab-icon-custom");
    img.setAttribute("src",this.profile_pic );
    element.insertBefore(img, element.childNodes[1]);
  }  
    })
    if(localStorage['status']=='true')
    {
        this.id=4
    }
   
    else
    {

    this.id=this.navParams.get('id')
    }

    console.log(this.id)
    this.tabRef.select(this.id);
    console.log('ionViewDidLoad TabspagePage');
 
      



  }
  
   clicktap()
   {
    var x= <HTMLElement>document.getElementById("hope")
    x.style.backgroundColor = "red";
   }
   myMethod()
   {

// this.navCtrl.setRoot(this.navCtrl.getActive().component);
//   Observable.of(null)
//   .flatMap(()=>this.security.getfollowing()).subscribe(data=>{
//     console.log('followingusers',data.list)
    
// this.followingdata=data.list
// this.event.publish('user:following',this.followingdata)
  
  
//   })
//   Observable.of(null)
// .flatMap(()=>this.security.getfollow()).subscribe(data=>{
//   console.log('datausers',data.list)
//   console.log('hii')
//  this.followersdata=data.list
//  this.event.publish('user:followersdata',this.followersdata)
//   console.log('followersdata',this.followersdata)
//  })
  }
  tapped() {
  if(localStorage.getItem('setactive'))
  {
   
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // alert('hii')
    // this.navCtrl.setRoot(TabspagePage,{id:1})
    // localStorage.removeItem('setactive')

  }
  }

}
