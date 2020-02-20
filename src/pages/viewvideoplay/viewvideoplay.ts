import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the ViewvideoplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewvideoplay',
  templateUrl: 'viewvideoplay.html',
})
export class ViewvideoplayPage {
id
data
usertype
pathurl
iframe
pathsantiz
videoid
  constructor(public santizer:DomSanitizer,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,private youtube: YoutubeVideoPlayer) {
    this.iframe=false
  }

  ionViewDidLoad() {
    // if (Capacitor.platform === 'web') {
    //   this.initializeYoutubePlayerPluginWeb();
    // } else { // Native
    //   this.initializeYoutubePlayerPluginNative();
    // }
    this.id=this.navParams.get('id');
    this.data=this.navParams.get('data');
    var str=this.data[this.id].mediaplay
    var n=str.search('youtu.be');
    console.log(this.data[this.id].media_type)
    console.log('str',str)
    if(this.data[this.id].media_type!='youtube') {
      this.pathurl=this.data[this.id].mediaplay

      console.log('data',this.data[this.id])
      // this.iframe=true
      // var res = this.data[this.id].mediaplay.split("https://www.youtube.com/watch?v=");  
      // var youtubeurl='http://www.youtube.com/embed/'+res
      // var youtuberes=youtubeurl.replace(",", "");
      // this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes+'?autoplay=1');
      // this.pathurl=this.pathsantiz
    }
    else {
      this.iframe=true
      
     // var res = this.data[this.id].mediaplay.split("https://www.youtube.com/watch?v=");
    //  console.log('mediaplay',this.data[this.id].mediaplay)
//        var str=this.data[this.id].mediaplay
//        var n=str.search('http://youtu.be')
//       if(n!=-1)
//       {
//         console.log('if',res)
//         var res = this.data[this.id].mediaplay.split("http://youtu.be/");
//       }
//       else
//       {
//         console.log('else',res)
//       var res = this.data[this.id].mediaplay.split("https://youtu.be/");
//       }
//       var youtubeurl='http://www.youtube.com/embed/'+res
//       var youtuberes=youtubeurl.replace(",", "");
//      alert('youtuberes'+youtuberes)
//       // this.pathsantiz=this.santizer.bypassSecurityTrustUrl(this.pathurl);
//       // console.log('path'+this.pathsantiz) 
//       // this.pathurl=this.data[this.id].UserMedia.usermedia_path
// //      this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes);
//       this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes+'?autoplay=1');
//       this.pathurl=this.pathsantiz
var str1=this.data[this.id].mediaplay
var n1=str1.search('watch')
if(n1!=-1)
{
var res = this.data[this.id].mediaplay.split("https://www.youtube.com/watch?v=");
console.log('ifstatement'+res[1])
//this.videoid=res[1]
//  var res1=res.replace(","," ")
// console.log('elsestatement1'+res1)
 var youtubeurl='https://www.youtube.com/embed/'+res
var youtuberes=youtubeurl.replace(",", "");
 //alert(youtuberes)
console.log('youtubers11'+youtuberes)

// this.youtube.openVideo(res[1]); 
 this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes)

 //this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes)

}
else
{                                                         
  var res = this.data[this.id].mediaplay.split("https://youtu.be/");
   console.log('res',res[1])
 //  this.videoid=res[1]
    // var res1=res.replace(",","")
  //console.log('elsestatemen11t'+res1)
  // this.youtube.openVideo(res[1]);
   var youtubeurl='https://www.youtube.com/embed/'+res
   var youtuberes1=youtubeurl.replace(",", "");
 //   alert(youtuberes1)
  //  console.log(youtuberes1)
//  var youtuberes1=this.data[this.id].media_thumbnail_url
  // var res = this.data[this.id].media_thumbnail_url.split("https://www.youtube.com/watch?v=");
  // console.log('hope'+res)
  // var youtubeurl='https://www.youtube.com/embed/'+res
  // var youtuberes=youtubeurl.replace(",", "");
  // console.log('youtubers'+youtuberes)
// this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes)
  console.log('you11',youtuberes1)
  // this.youtube.openVideo(res);
   this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes1)
}
    }
    this.usertype=this.data[this.id].media_type
    console.log('ionViewDidLoad ViewvideoplayPage');
  }
  // initializeYoutubePlayerPluginWeb() {
  //   const options = {playerId: 'youtube-player', playerSize: {width: 640, height: 360}, videoId: 'tDW2C6rcH6M'};
  //   const result =  YoutubePlayerWeb.initialize(options);
  //   console.log('playerReady', result);
  // }
 
  //  destroyYoutubePlayerPluginWeb() {
  //   const result =  YoutubePlayerWeb.destroy('youtube-player');
  //   console.log('destroyYoutubePlayer', result);
  // }
 
  //  initializeYoutubePlayerPluginNative() {
 
  //   const { YoutubePlayer } = Plugins;
 
  //   const options = {width: 640, height: 360, videoId: 'tDW2C6rcH6M'};
  //   const playerReady =  YoutubePlayer.initialize(options);
  // }
  close(){
    this.viewCtrl.dismiss()
  }

}
