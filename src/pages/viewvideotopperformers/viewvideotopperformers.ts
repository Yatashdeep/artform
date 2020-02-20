import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
/**
 * Generated class for the ViewvideotopperformersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewvideotopperformers',
  templateUrl: 'viewvideotopperformers.html',
})
export class ViewvideotopperformersPage {
  data
  id
  usertype
  mediatype
  usermedia_type
  pathsantiz
  iframe
  constructor(private youtube: YoutubeVideoPlayer,public santizer:DomSanitizer,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
   
    this.iframe=false
    console.log('ionViewDidLoad ViewvideotopperformersPage');
    this.data=this.navParams.get('data')
    this.id=this.navParams.get('id')
    
    this.mediatype=this.data[this.id].media_thumbnail_url
    this.usermedia_type=this.data[this.id].usermedia_type
    console.log('mediatype',this.mediatype)
    console.log('usermedia',this.usermedia_type)
    this.videotap()
  }
  close()
  {
    this.viewCtrl.dismiss()
  }
  videotap()
  {
   
    
    if(this.usermedia_type=='youtube')
    {
      // alert('url'+this.data[this.id].media_thumbnail_url)
      this.iframe=true
      var str=this.data[this.id].media_thumbnail_url
      var n=str.search('watch')
       
      if(n!=-1)
      {
    var res = this.data[this.id].media_thumbnail_url.split("https://www.youtube.com/watch?v=");
      console.log('ifstatement'+res[1])
      this.youtube.openVideo(res[1]); 
      // var youtubeurl='https://www.youtube.com/embed/'+res
      // var youtuberes=youtubeurl.replace(",", "");
      // console.log('youtubers'+youtuberes)
    //  this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes)

      // this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes+'?autoplay=1')
      }
      else
      {                                                         
        var res = this.data[this.id].media_thumbnail_url.split("https://youtu.be/");
        console.log('elsestatement'+res[1])
        this.youtube.openVideo(res[1]); 
        // var youtubeurl='https://www.youtube.com/embed/'+res
        // var youtuberes1=youtubeurl.replace(",", "");
      //  var youtuberes1=this.data[this.id].media_thumbnail_url
        // var res = this.data[this.id].media_thumbnail_url.split("https://www.youtube.com/watch?v=");
        // console.log('hope'+res)
        // var youtubeurl='https://www.youtube.com/embed/'+res
        // var youtuberes=youtubeurl.replace(",", "");
        // console.log('youtubers'+youtuberes)
      //  this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes)
        // console.log('you',youtuberes1)
        // this.pathsantiz=this.santizer.bypassSecurityTrustResourceUrl(youtuberes1+'?autoplay=1')
      }
    }
    else
    {

    }
    
    }
}
