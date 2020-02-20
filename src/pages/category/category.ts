import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Observable}from'rxjs'
import{SecurityProvider}from'../../providers/security/security'
import{ArtprofilePage}from'../artprofile/artprofile'
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  fakeUsers: Array<any> = new Array(4);
   catsound=[]
   subcat=[]
   count=0
   count1=0
   public items: any = [];
   catshow1:boolean
   categories
   addcategories=[]
   addsubCategories=[]
   addsubSubCategories=[]
   loading
   loader
   constructor(public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
 

this.catshow1=false
  }

  ionViewDidLoad() {
    this.loader=false
    this.loading=false
    console.log('ionViewDidLoad CategoryPage');
    Observable.of(null)
    .flatMap(()=>this.security.getcategory()).subscribe(data=>{
      this.categories=data.categories
      this.loading=true
    })




    this.catsound=[

      {
       'category':'Music',
      'img':'assets/tree-cat/music.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    'artform':'assets/profile/02_1_music.png',
    'expanded': true
   },
    {
     'category':'Dance',
     'img':'assets/tree-cat/dance.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
      // 'form':['Hip Hop','Body Pop','BBoy/Breakdance','Irish','Salsa','Ballet','Trap Dance','Jazz','Modern','Swing','Belly','Country','Others'],
      'artform':'assets/profile/dance.png',
      'expanded': false
   },
    {
     'category':'Film',
     'img':'assets/tree-cat/film.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Show Reel','Documentary','Movie Script','TV Script','Unreleases Films','Others'],
     'artform':'assets/profile/film.png',
     'expanded': false
    },
    {
     'category':'Photography',
     'img':'assets/tree-cat/camera.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Aerial','Action','Animal','Architecture','Black and White','Commercial','Panoramic','Sports','Nature','Potrait','Long Exposure','Others'],
     'artform':'assets/profile/photography.png',
     'expanded': false
    },
    {
     'category':'Literature',
     'img':'assets/tree-cat/literature.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Novel','Movie Script','TV Script','Comedy','Journalistic','Factual','Education','Poetry','Others'],
     'artform':'assets/profile/literature.png',
     'expanded': false
    },
    {
     'category':'Art',
     'img':'assets/tree-cat/art.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Art','Design','Crafts','Others'],
     'artform':'assets/profile/art.png',
     'expanded': false
    },
    {
     'category':'Freestyle',
     'img':'assets/tree-cat/freestyle.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Breakdance','Body Pop','BMX','Skateboarding','juggling','Parkour','Graffiti','Beatbox','Watersports','Rap','Skiing','Turntabilism','Football','Others'],
     'artform':'assets/profile/freestyle.png',
     'expanded': false
    },
    {
     'category':'Personality',
     'img':'assets/tree-cat/personality.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Presenter','TV Presenter','Comedian','Radio Presenter','Event Presenter','Commentator','Impersonator','Mime','Others'],
     'artform':'assets/profile/personality.png',
     'expanded': false
    },
    {
     'category':'Other',
     'img':'assets/tree-cat/others.png',
     'form':[{'artform':'Rock','img':'assets/tree-cat/rock.png'},
     {'artform':'Pop','img':'assets/tree-cat/pop.png'},{'artform':'Hip Hop','img':'assets/tree-cat/hip-hop.png'},
     {'artform':'Electronic','img':'assets/tree-cat/electronics.png'},
     {'artform':'Accoustic','img':'assets/tree-cat/acoustic.png'},
     {'artform':'ACappela','img':'assets/tree-cat/capella.png'},
     {'artform':'Jazz','img':'assets/tree-cat/jazz.png'}
     ,{'artform':'Reggae','img':'assets/tree-cat/reggae.png'},
     {'artform':'Metal','img':'assets/tree-cat/metal.png'},
     {'artform':'Classical','img':'assets/tree-cat/classical.png'},
     {'artform':'DJ','img':'assets/tree-cat/dj.png'},
     {'artform':'Instrumental','img':'assets/tree-cat/instrumental.png'},
     {'artform':'Others','img':'assets/tree-cat/others (2).png'},
     {'artform':'Covers','img':'assets/tree-cat/covers.png'},
     {'artform':'Castlepalooza','img':'assets/tree-cat/castle.png'}],
    //  'form':['Animal Trick','Street Perform','Synchronised Act','Magician','Mime','Modeling','Others'],
     'artform':'assets/profile/others_bg.png',
     'expanded': false
    }
   
   
   
   
   
   ]
   this.subcat=[
     {
       'category':'Indie Rock',
       'img':'assets/tree-cat/rock2.png',
      },
      {
       'category':'Hard Rock',
       'img':'assets/tree-cat/hard_rock.png',
      },
      {
       'category':'Grunge',
       'img':'assets/tree-cat/grunge.png',
      },
      {
       'category':'Country Rock',
       'img':'assets/tree-cat/country_rock.png',
      },
   
      {
       'category':'Punk',
       'img':'assets/tree-cat/punk.png',
      },
      {
       'category':'Instrumental Rock',
       'img':'assets/tree-cat/instrumental_rock.png',
      },
      {
       'category':'Accoustic',
       'img':'assets/tree-cat/acoustic.png',
      },
   
      {
       'category':'Electronic',
       'img':'assets/tree-cat/electronics2.png',
      },
      {
       'category':'Post Rock',
       'img':'assets/tree-cat/post_rock.png',
      },
      {
       'category':'Other',
       'img':'assets/tree-cat/others (2).png',
      }
   
   ]

   this.items = [
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false },
    { expanded: false }
  ];
  }
  expandItem(item,i): void {
    
    
    console.log('categories',item.Category.checked)
    // console.log('hi',item.checked)
    if (item.Category.checked) {
      item.Category.checked = false;
    } else {
      this.categories.map(listItem => {
        console.log(listItem,'--',item)
        if (item == listItem) {
          console.log()
          listItem.Category.checked = !listItem.Category.checked;
        } 
        // else {
        //   listItem.Category.checked = false;
        // }
        console.log('list',listItem)
        return listItem;
      });
    }
    console.log('cat',this.categories)
    
  }
  showsubcat(item,i)
  {
    
    
    if (item.Subcategory.checked) {
      item.Subcategory.checked = false;
    } else {

      this.categories.map(listItem => {
        console.log(listItem.Childrens[i],'--',item)
      if(listItem.Childrens[i])
      {

        if (item == listItem.Childrens[i]) {
          console.log()
          listItem.Childrens[i].Subcategory.checked = !listItem.Childrens[i].Subcategory.checked;
        } else {

          listItem.Childrens[i].Subcategory.checked = false;
        }
      }
      else
      {
        console.log('pika pika pikabu')
      }
        console.log('list',listItem)
        return listItem;
      });
    }
    console.log('cat',this.categories)
  }
  subsubcat(item,index,ids,ide)
  {
    //console.log(item) 
    if (item.Subsubcategory.checked) {  
     // item.Subsubcategory.checked = false;
     //Chetan's Code
      this.categories[index].Childrens[ids].Childrens[ide].Subsubcategory.checked =false;
      //End Chetan's Code
    } else {    
        //item.Subsubcategory.checked = true;
         //Chetan's Code 
        this.categories[index].Childrens[ids].Childrens[ide].Subsubcategory.checked =true;
        //End Chetan's Code 
        /*
     var itemMapElement= this.categories.map(listItem => {
       // console.log('listitem',listItem)
       // console.log('children',listItem.Childrens[ids].Childrens[ide])
       // console.log('matching',listItem.Childrens[ids].Childrens[ide],'--',item)
       console.log("chetan2==",listItem.Childrens[ids].Childrens[ide]);  
        //if (item == listItem.Childrens[ids].Childrens[ide]) {
         // console.log('checked',listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked)
         // listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked = !listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked;
        //}
        //  else {
        //          console.log('unchecked') 
        //   listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked = false;
        // }
       // console.log('list',listItem)
        return listItem;
      }); 
      */  
  }
  //console.log("chetan3==",itemMapElement);    
}
  // expandItem(item,i): void {
  //   console.log('hi',item)
  //   if (item.expanded) {
  //     item.expanded = false;
  //   } else {
  //     this.catsound.map(listItem => {
  //       if (item == listItem) {
  //         listItem.expanded = !listItem.expanded;
  //       } else {
  //         listItem.expanded = false;
  //       }
  //       console.log('list',listItem)
  //       return listItem;
  //     });
  //   }
  //   console.log('catsound',this.catsound)
  //    if(this.count%2==0)
  //   {
 
  //   var z=document.getElementById('tickshow').style.display='block'
  //   var x=document.getElementById('tickshow4').style.display='block'
  //   } 
  //   else{

  //     var z=document.getElementById('tickshow').style.display='none'
  //     var x=document.getElementById('tickshow4').style.display='none'
     
  //   }
  //   this.count++ 
  // }
  cattap(id)
  {
    // if(this.count%2==0)
    // {
    // var y=document.getElementById('showall').style.display='block'
    // var z=document.getElementById('tickshow').style.display='block'
    // var x=document.getElementById('tickshow4').style.display='block'
    // } 
    // else{
    //   var y=document.getElementById('showall').style.display='none'
    //   var z=document.getElementById('tickshow').style.display='none'
    //   var x=document.getElementById('tickshow4').style.display='none'
     
    // }
    // this.count++ 
  }
  addTalk()
  {
    this.loader=true
    console.log('loader',this.loader)
    this.addcategories=[]
    this.addsubCategories=[]
    this.addsubSubCategories=[]
    console.log('categories',this.categories)
    console.log('length'+this.categories.length)
    for(var i=0;i<this.categories.length;i++)
    {
     if(this.categories[i].Category.checked==true)
     {
          this.addcategories.push(this.categories[i].Category.category_id)
        
     
        }
        for(var j=0;j<this.categories[i].Childrens.length;j++)
        { 
          if(this.categories[i].Childrens[j].Subcategory.checked==true)
          {
              this.addsubCategories.push(this.categories[i].Childrens[j].Subcategory.subcategory_id)
          }
          for(var k=0;k<this.categories[i].Childrens[j].Childrens.length;k++)
          {
            if(this.categories[i].Childrens[j].Childrens[k].Subsubcategory.checked==true)
            {
       this.addsubSubCategories.push(this.categories[i].Childrens[j].Childrens[k].Subsubcategory.subsubcategory_id)
            }
          }
            }
     
    }
    console.log('cat',this.addcategories)
    console.log('sub',this.addsubCategories)
    console.log('sub sub',this.addsubSubCategories)
    Observable.of(null)
    .flatMap(()=>this.security.submitcat(this.addcategories,this.addsubCategories,this.addsubSubCategories)).subscribe(data=>{
     //  alert('hi'+JSON.stringify(data))
      this.loader=false
      this.navCtrl.setRoot(ArtprofilePage,{id:4})
      // this.navCtrl.pop()
    })
  }
  // showsubcat(){
    // if(this.count1%2==0)
    // {
    // var y=document.getElementById('showsub-cat').style.display='block'
    // var z=document.getElementById('tickshow2').style.display='block'
    // var z=document.getElementById('tickshow3').style.display='block'
    // this.catshow1=true
    // } 
    // else{
    //   var y=document.getElementById('showsub-cat').style.display='none'
    //   var z=document.getElementById('tickshow2').style.display='none'
    //   var z=document.getElementById('tickshow3').style.display='none'
    //   this.catshow1=false
    // }
    // this.count1++ 
  // }
}
