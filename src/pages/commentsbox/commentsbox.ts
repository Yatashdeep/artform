import { Component } from '@angular/core';
import { Events,IonicPage, NavController, NavParams,ViewController,AlertController,ModalController ,PopoverController} from 'ionic-angular';
import { ArtistprofilepagePage } from '../artistprofilepage/artistprofilepage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import{PopoverpagesharePage}from'../popoverpageshare/popoverpageshare'
import{FollowedartistPage}from'../followedartist/followedartist'
import{ReportprobPage}from'../reportprob/reportprob'
import{ViewtalentPage}from'../viewtalent/viewtalent'

import { from } from 'rxjs/observable/from';
/**
 * Generated class for the CommentsboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commentsbox',
  templateUrl: 'commentsbox.html',
})
export class CommentsboxPage {
  datalist=[1,2,3,4]
  loading
  commentdata
  usermediaid
  fakeUsers: Array<any> = new Array(4);
  comments
  loadingsend:boolean
  userid
  send
  message
  mediacomment_id
  loadingsend1:boolean
  deleteid
  replyloader
  replyid
  editsend
  editmediacomment_id
  subeditmediacomment_id
  loadingeditsend
  editdeleteid
  category_image_url
  usermedia_name
  artforms
  id
  user_avatar
  user_display_name
  small_image_url
  totalrating
  userurl
  artist_id
  rate
  actualrate
  constructor(public event:Events,public modalCtrl:ModalController,public popoverCtrl:PopoverController,public alertCtrl:AlertController,public security:SecurityProvider,private nativePageTransitions: NativePageTransitions,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    event.subscribe('star-rating:changed', (starRating) => {
      this.actualrate=starRating
    });
    
    alert('usermedia'+localStorage['usermedia'])
    
  }
share()
{
  let popover = this.popoverCtrl.create(PopoverpagesharePage,
    {
    image:this.category_image_url,
    artistname:this.user_display_name,
     user_url:this.userurl
  })
  popover.present()
}
followuser()
{
  Observable.of(null)
    .flatMap(()=>this.security.artistfollowed(this.artist_id)).subscribe(data=>{
      
      console.log(data.status)
      let modalfollow =this.modalCtrl.create(FollowedartistPage,{msg:data.status})
   modalfollow.present()
    })
}
reportnavigate()
{

 let modal=this.modalCtrl.create(ReportprobPage,{usermediaid:this.usermediaid})
 modal.present()
}
votesuccefully()
{
  Observable.of(null)
  .flatMap(()=>this.security.starmedia(this.actualrate,this.usermediaid)).subscribe(data=>{
   let modal=this.modalCtrl.create(ViewtalentPage,{rate:this.actualrate})
   modal.present()
  })
}

  ionViewDidLoad() {
    
    this.userid=localStorage['userid']
    this.loadingsend=true
    this.send=false
    this.loadingsend1=true
    this.replyloader=true
    this.editsend=false
     this.loadingeditsend=true
    console.log('ionViewDidLoad CommentsboxPage');
    this.loading=false
    if(localStorage['usermedia'])
    {
      this.usermediaid=localStorage['usermedia']
    }
    else
    {
    this.usermediaid=this.navParams.get('usermediaid')
    }
    this.category_image_url=this.navParams.get('mediapic')
    console.log('mediapic'+this.category_image_url)
    this.usermedia_name=this.navParams.get('medianame')
    this.artforms=this.navParams.get('artforms')
    this.user_display_name=this.navParams.get('user_display_name')
    this.user_avatar=this.navParams.get('user_avatar')
    this.small_image_url=this.navParams.get('small_image_url')
    this.totalrating=this.navParams.get('totalrating')
    this.userurl=this.navParams.get('userurl')
    this.artist_id=this.navParams.get('artist_id')
    this.rate=this.navParams.get('rate')
    console.log('rate',this.rate)
    this.id=this.navParams.get('id')+1
    alert('this.usermediaid'+this.usermediaid)
    Observable.of(this.loading)
    .flatMap(()=>this.security.comments(this.usermediaid)).subscribe(data=>{
      alert('data'+JSON.stringify(data))
      this.loading=true         
       this.commentdata=data.comments    
       console.log('comments',this.commentdata)
          })


  }
  updateeditsubcomment(mediacomment_id,submediacomment_id,message)
  {
    console.log(mediacomment_id)
    console.log(submediacomment_id)

this.comments=message
this.editsend=true
    this.subeditmediacomment_id=submediacomment_id
    this.editmediacomment_id=mediacomment_id


  }
  editsendbutton()
  {
    this.loadingsend=false
    this.editsend=false
    this.send=false
    Observable.of(this.loadingsend)
        .flatMap(()=>this.security.editsubcomments(this.comments,this.subeditmediacomment_id,this.usermediaid,this.editmediacomment_id)).subscribe(data=>{
                
         this.refreshmsg()
           console.log('comments',this.commentdata)
              })
  }
  editcomment(mediacomment_id,message)
  {
    this.comments=message
    this.send=true
    this.mediacomment_id=mediacomment_id
    
    // Observable.of(this.loading)
    // .flatMap(()=>this.security.editcomments(this.comments,mediacomment_id,this.usermediaid)).subscribe(data=>{
    //   this.loading=true         
        
    //    console.log('comments',this.commentdata)
    //       })
  }

  sendbutton1()
  {
    this.loadingsend=false
    this.send=false
Observable.of(this.loading)
    .flatMap(()=>this.security.editcomments(this.comments,this.mediacomment_id,this.usermediaid)).subscribe(data=>{
      this.loading=true         
      this.refreshmsg()
       console.log('comments',this.commentdata)
          })
  }
  deletesubcomment(id)
  {
    this.loadingeditsend=false
    this.editdeleteid=id
    Observable.of(this.loadingeditsend)
    .flatMap(()=>this.security.deletesubcomments(id)).subscribe(data=>{
      
      this.editdeletemsg()
          })
  }
  editdeletemsg()
  {
    
    Observable.of(this.loadingeditsend)
    .flatMap(()=>this.security.comments(this.usermediaid)).subscribe(data=>{
      this.loadingeditsend=true
      this.commentdata=data.comments 
          })
  }
  close()
  {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 500,
      slowdownfactor: -1
      
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.pop();

  }
  profilepic()
  {
    this.navCtrl.push(ArtistprofilepagePage)
  }
  sendbutton()
  {
    this.loadingsend=false
    Observable.of(this.loadingsend)
    .flatMap(()=>this.security.addcomments(this.usermediaid,this.comments)).subscribe(data=>{
           this.refreshmsg()          
   
          })
  }
  refreshmsg() {
    console.log('ionViewDidLoad CommentsboxPage');
    
    this.usermediaid=this.navParams.get('usermediaid')
    Observable.of(this.loadingsend)
    .flatMap(()=>this.security.comments(this.usermediaid)).subscribe(data=>{
      this.loadingsend=true
       this.commentdata=data.comments    
       this.comments=''
       console.log('comments',this.commentdata)
          })


  }
  deletecomment(mediacomment_id,id)
  {
    this.loadingsend1=false
    this.deleteid=id
    console.log(this.deleteid)
    Observable.of(this.loadingsend1)
    .flatMap(()=>this.security.deletecomments(mediacomment_id)).subscribe(data=>{
      this.deletemsg()
      
          })
  }
  deletemsg() {

    
    this.usermediaid=this.navParams.get('usermediaid')
    Observable.of(this.loadingsend1)
    .flatMap(()=>this.security.comments(this.usermediaid)).subscribe(data=>{
      this.loadingsend1=true
      this.commentdata=data.comments 
          })


  }
  subcomment(mediacomment_id,displayname,i)
  {
    // this.usermediaid
    // Observable.of(this.loadingsend1)
    // .flatMap(()=>this.security.subcomments(this.usermediaid,mediacomment_id,this.comments)).subscribe(data=>{
      
    //       })
    let alert=this.alertCtrl.create({
      title:'Reply to '+displayname,
      inputs:[
        {
         name:'comments',
         placeholder:'Enter Reply..' 
        }
      ],
      buttons:[
        {
          text:'Cancel',
          role:'cancel',
          handler:data=>{

          }
        },
        {
        text:'Ok',
        handler:data=>{
          console.log(data.comments)
          this.replymsg(mediacomment_id,data.comments,i)
        }
        }  
      ]
    })
    alert.present()
  }
  replymsg(mediacomment_id,comments,i)
  {
    this.replyid=i
    this.usermediaid
    this.replyloader=false
    Observable.of(this.replyloader)
   .flatMap(()=>this.security.subcomments(this.usermediaid,mediacomment_id,comments)).subscribe(data=>{
      this.refreshreply()
          }) 
  }
  refreshreply()
  {
    this.usermediaid=this.navParams.get('usermediaid')
    Observable.of(this.replyloader)
    .flatMap(()=>this.security.comments(this.usermediaid)).subscribe(data=>{
      this.replyloader=true
      this.replyid=null
      this.commentdata=data.comments 
          })
  }
  
}
