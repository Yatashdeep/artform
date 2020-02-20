import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import{Observable}from'rxjs'
import{SecurityProvider}from'../../providers/security/security'
import{TabspagePage}from'../tabspage/tabspage'
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the SelectuploadcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectuploadcategory',
  templateUrl: 'selectuploadcategory.html',
})
export class SelectuploadcategoryPage {
  fakeUsers: Array<any> = new Array(4);
  categories
  addcategories=[]
  addsubCategories=[]
  addsubSubCategories=[]
  loadingdata
  constructor(public app: App,public security:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   alert('hi')
    this.loadingdata=false
    console.log('ionViewDidLoad SelectuploadcategoryPage');
    Observable.of(null)
    .flatMap(()=>this.security.getcategory()).subscribe(data=>{
      this.loadingdata=true
        console.log(data)
        this.categories=data.categories
         console.log(this.categories)
         for(var i=0;i<this.categories.length;i++)
         {
            this.categories[i].Category.checked=false
            console.log(this.categories[i].Childrens.length)
            for(var j=0;j<this.categories[i].Childrens.length;j++)
            {
             this.categories[i].Childrens[j].Subcategory.checked=false
            for(var k=0;k<this.categories[i].Childrens[j].Childrens.length;k++)
            {
                  this.categories[i].Childrens[j].Childrens[k].Subsubcategory.checked=false
            }
            }
         } 
    })
  }
 
  expandItem(item,i): void {
    
    
    console.log('categories',item.Category.checked)
    // console.log('hi',item.checked)
    this.verifycheckforcat()
    if (item.Category.checked) {
      item.Category.checked = false;
    } else {
      this.categories.map(listItem => {
        console.log(listItem,'--',item)
        if (item == listItem) {
          console.log()
          listItem.Category.checked = !listItem.Category.checked;
        } 
        else {
          listItem.Category.checked = false;
        }
        console.log('list',listItem)
        return listItem;
      });
    }
    console.log('cat',this.categories)
    
  }

  verifycheckforcat()
  {

    for(var x=0;x<this.categories.length;x++)
    {
   console.log('checked'+this.categories[x].Category.checked)
   for(var j=0;j<this.categories[x].Childrens.length;j++)
            {
             this.categories[x].Childrens[j].Subcategory.checked=false
            
            }
    }
  }





  showsubcat(item,i)
  {
alert('showsubcat')
    console.log('index'+i)
    console.log('categories',item.Subcategory.checked)
    // console.log('hi',item.checked)
    this.verifycheckforsub()
    if (item.Subcategory.checked) {
      console.log('ifcattrue')
      console.log('check'+item.Subcategory.checked)
      item.Subcategory.checked = false;
    } else {
      this.categories.map(listItem => {
        console.log(listItem.Childrens[i],'--',item)
        console.log('checkboolean'+listItem.Childrens[i].Subcategory.checked)
        console.log('hope'+item.Subcategory.checked)
        
        if (item == listItem.Childrens[i]) {
          console.log('subtrue'+listItem.Childrens[i].Subcategory.checked)
          listItem.Childrens[i].Subcategory.checked = !listItem.Childrens[i].Subcategory.checked;
        } 
        else {
           console.log('sub'+listItem.Childrens[i].Subcategory.checked)
          listItem.Childrens[i].Subcategory.checked = false;
        }
        console.log('list',listItem)
        return listItem;
      });
    }
    console.log('cat',this.categories)
  }
  verifycheckforsub()
  {
    for(var x=0;x<this.categories.length;x++)
    {
   console.log('checked'+this.categories[x].Category.checked)
   for(var j=0;j<this.categories[x].Childrens.length;j++)
            {
             this.categories[x].Childrens[j].Subcategory.checked=false
            
            }
    }
  }
  subsubcat(item,ids,ide)
  {
    alert(ide)
    console.log('---',ide,'-88--'+ids)
    console.log(item)
    this.verifycheckforsubsub()
    if (item.Subsubcategory.checked) {
      item.Subsubcategory.checked = false;
    } else {
      this.categories.map(listItem => {
        console.log('listitem',listItem)
        console.log('children',listItem.Childrens[ids].Childrens[ide])
        console.log('matching',listItem.Childrens[ids].Childrens[ide],'--',item)
        if (item == listItem.Childrens[ids].Childrens[ide]) {
          console.log('checked',listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked)
          listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked = !listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked;
        }
         else {
                 console.log('unchecked') 
          listItem.Childrens[ids].Childrens[ide].Subsubcategory.checked = false;
        }
        console.log('list',listItem)
        return listItem;
      });
  }
  console.log(this.categories)
}
verifycheckforsubsub()
{
  for(var i=0;i<this.categories.length;i++)
  {
          console.log(this.categories[i].Childrens.length)
     for(var j=0;j<this.categories[i].Childrens.length;j++)
     {
      
     for(var k=0;k<this.categories[i].Childrens[j].Childrens.length;k++)
     {
           this.categories[i].Childrens[j].Childrens[k].Subsubcategory.checked=false
     }
     }
  } 
}
save()
{

   
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
    console.log('cat',this.addcategories[0])
    console.log('sub',this.addsubCategories[0])
    console.log('sub sub',this.addsubSubCategories[0])
    localStorage['category']=this.addcategories[0]
    localStorage['subcategory']=this.addsubCategories[0]
    localStorage['subsubcategory']=this.addsubSubCategories[0]
//this.app.getActiveNav().popToRoot()
this.navCtrl.pop()

}

}
