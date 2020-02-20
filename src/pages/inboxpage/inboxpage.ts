import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { CreateconversationpagePage } from '../createconversationpage/createconversationpage';
import { Observable } from 'rxjs';
import{SecurityProvider}from'../../providers/security/security'
import { from } from 'rxjs/observable/from';
import { ChatinboxreplyPage } from '../chatinboxreply/chatinboxreply';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the InboxpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inboxpage',
  templateUrl: 'inboxpage.html',
})
export class InboxpagePage {
fakedata=[1,2,3,4]
page=1
inboxdata1
date
inboxdata2=[]
inboxdata=[]
loader
totalpages
fakeUsers: Array<any> = new Array(4);
loading
messagefilter
messagefilter2
titletrim
titletrim2
flag
text
message
messageactive
  constructor(public modalCtrl:ModalController,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
 this.loader=true
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxpagePage');
    this.flag=2
   this.loaddata()
   
  }
  
  loaddata(infiniteScroll?)
  {
    console.log('hii')
    if(this.flag==1)
    {
     this.loading=true
     console.log('loading'+this.loading)
    }
    {
      this.loading=false
    }
   
    Observable.of(null)
    .flatMap(()=>this.security.inboxapi(this.page)).subscribe(data=>{
      console.log('data',data.status)

      if(data.status=='fail')
      {
this.message='Welcome To Inbox'
this.messageactive=true
      }
      this.loading=true
      this.inboxdata1=data.conversations
      // this.inboxdata2.push(this.inboxdata1)
      // this.inboxdata=this.inboxdata2[0]
      this.totalpages=data.totalPages
        if(this.totalpages==this.page)
        {
          
          this.loader=false
          this.text='No More Data'
        }
       this.inboxdata=this.inboxdatatest(data.conversations)
       console.log('inboxdata',this.inboxdata)
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        
    })
  }
 inboxdatatest(conversations)
 {
  for(var i=0;i<conversations.length;i++)
  {
    // conversations[7].LastMessage.Messages.message
    this.messagefilter=conversations[i].LastMessage.Messages.message
    this.messagefilter2=this.messagefilter.substring(1,this.messagefilter.length-1)
    this.titletrim=conversations[i].Conversations.title
    this.titletrim2=this.titletrim.substring(1,this.titletrim.length-1)

   this.inboxdata2.push(
     {
       user_profile_avatar:conversations[i].Users.user_profile_avatar,
       user_display_name:conversations[i].Users.user_display_name,
       title:this.titletrim2,
       last_message:conversations[i].Conversations.last_message,
       message:this.messagefilter2,
       conversation_id:conversations[i].Conversations.conversation_id,
       messageCount:conversations[i][0].messageCount   
      })



  }
  
return this.inboxdata2
 }
  
  loadMore(infiniteScroll) {
    this.loading=true
    this.page++
    this.flag=1
   
    console.log(this.page)
    console.log(this.totalpages)
   
    this.loaddata(infiniteScroll)
  //   if(this.totalpages>=this.page)
  //   {
  //     this.loaddata(infiniteScroll)
  //   }
  //   else
  //   {
  //     this.loader=false
   
  //  console.log('falsee')
  //   }
  
   
  }
  openmsg(id)
  {
    this.navCtrl.push(ChatinboxreplyPage,{id:id})
  }
  tapshow()
  {
    this.navCtrl.push(CreateconversationpagePage)
  }
  


}
