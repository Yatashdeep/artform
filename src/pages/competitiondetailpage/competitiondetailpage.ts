import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import { DocumentViewer } from '@ionic-native/document-viewer';
import{InAppBrowser}from'@ionic-native/in-app-browser'

/**
 * Generated class for the CompetitiondetailpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competitiondetailpage',
  templateUrl: 'competitiondetailpage.html',
})
export class CompetitiondetailpagePage {
  competition_id
  competitiondata
  CompetitionsMediaurl
  CompetitionsCoverMediaurl
  titlecompetition
  competitionsarray=[1,2,3,4,5,6]
  carousel
  carouselshow:boolean
  gallery
  attachments
  loadingtext:boolean
  constructor(public iab: InAppBrowser,public document: DocumentViewer ,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.competition_id=this.navParams.get('competition_id')
    console.log(this.competition_id)
  }

  ionViewDidLoad() {
    this.loadingtext=true
    console.log('ionViewDidLoad CompetitionspPage');
    this.carouselshow=true
Observable.of(null)
.flatMap(()=>this.security.getcompetition(this.competition_id)).subscribe(data=>{
  this.loadingtext=false
  this.competitiondata=data.competitions.Competitions.content
  console.log('carousel',data.competitions.Competitions.media.carousel)
  this.CompetitionsMediaurl=data.competitions.Competitions.media.featured.CompetitionsMedia.url
  this.carousel=data.competitions.Competitions.media.carousel
  this.gallery=data.competitions.Competitions.media.gallery
  this.attachments=data.competitions.Competitions.media.attachments
  console.log('gallery',this.gallery)
  console.log('attachements',this.attachments)
  if(!this.carousel)
  {
   this.carouselshow=false
  }
  
  // this.CompetitionsCoverMediaurl=data.competitions.Competitions.media.carousel.CompetitionsMedia.url
  // this.CompetitionsMediaurl=data.competitions.Competitions.media.featured.CompetitionsMedia.url
  this.titlecompetition=data.competitions.Competitions.title
  console.log(this.titlecompetition)
  console.log('competitionsmedia'+this.CompetitionsMediaurl)
  console.log('competitionscover'+this.CompetitionsCoverMediaurl)
})
  }
  openpdf(pdf){
    //  alert(pdf)
     const browser = this.iab.create(pdf,'_system', 'location=no');
     // const options: DocumentViewerOptions = {
    //   title: 'My PDF'
    // }
    
    
    // this.document.viewDocument(pdf, 'application/pdf', options)
    // window.open(pdf)
  }

}
