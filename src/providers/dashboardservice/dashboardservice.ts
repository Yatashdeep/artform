import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Http,Headers,RequestOptions}from'@angular/http'
import * as moment from 'moment';
/*
  Generated class for the DashboardserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()


export class DashboardserviceProvider {
recentdataarray=[]
dublicaterecentdataarray=[]
returnrecentdata
usermedia_path
userprofile
artforms
mediarating
caticon
postedago
usermedia_play
topperformersdata=[]
topartforms
displaythumbnail
user_avatar
userdisplayimage
mediathumbnail
toptype
totalrating
user_avatartop
latestchart=[]
toptypeprofile
mediathumbnailuser
recentartist=[]
recentmediathumbnailuser
recenttoptypeprofile
backimage
sortcatprofile=0
rate
covermediathumbnail
userurl
artformscharts
userurl1
artforms1
  constructor(public http:Http) {
   
  }
  latestcharts(data)
  {
console.log('data',data)
this.latestchart=[]
for(var i=0;i<data.length;i++)
{
  if(data[i].Subcategory.subcategory_image)
  {
 if(data[i].Subsubcategory.subsubcategory_image)
 {
   this.mediathumbnailuser=data[i].Subsubcategory.subsubcategory_small_image_url
 }
 else
 {
   this.mediathumbnailuser=data[i].Subcategory.subcategory_small_image_url
 }
  }
  else
  {
   this.mediathumbnailuser=data[i].Category.subcategory_small_image_url
  }
  if(data[i].UserMedia.usermedia_category.names[2])
{
 
  this.toptypeprofile=data[i].UserMedia.usermedia_category.names[0]+'/'+data[i].UserMedia.usermedia_category.names[1]+'/'+data[i].UserMedia.usermedia_category.names[2]

}  
else if(data[i].UserMedia.usermedia_category.names[1])
{
 
  this.toptypeprofile=data[i].UserMedia.usermedia_category.names[0]+'/'+data[i].UserMedia.usermedia_category.names[1]

}
else if(data[i].UserMedia.usermedia_category.names[0])
{
 
  this.toptypeprofile=data[i].UserMedia.usermedia_category.names[0]

}
// if(data[i].Subsubcategory.subsubcategory_url)
// {
// this.userurl=data[i].Subsubcategory.subsubcategory_url
// }
// else if(data[i].Category.category_url)
// {
//   if(data[i].Subcategory.subcategory_url)
//   {
//  this.userurl=data[i].Subcategory.subcategory_url
//   }
//   else
//   {
//  this.userurl=data[i].Category.category_url
//   }
  
// }
this.userurl=data[i].UserMedia.usermedia_url
if(data[i].Subcategory.subcategory_name)
{
if(data[i].Subsubcategory.subsubcategory_name)
{
this.artformscharts=data[i].Category.category_name+'/'+data[i].Subcategory.subcategory_name+'/'+data[i].Subsubcategory.subsubcategory_name
}
else
{
 this.artformscharts=data[i].Category.category_name+'/'+data[i].Subcategory.subcategory_name
}
}
else
{
 this.artformscharts=data[i].Category.category_name
}

this.latestchart.push({
   media_thumbnail_url:data[i].UserMedia.media_thumbnail_url,
   user_display_name:data[i].Users.user_display_name,  
   usermedia_posted:data[i].UserMedia.usermedia_posted,
   user_avatar:data[i].Users.user_avatar,
   usermedia_name:data[i].UserMedia.usermedia_name,
   toptypeprofile:this.toptypeprofile,
   totalRating:data[i].UserMedia.media_ratings.totalRating,
   user_profile_avatar:data[i].Users.user_profile_avatar,
   mediathumbnailuser:this.mediathumbnailuser,
   userurl:this.userurl,
   artist_id:data[i].Users.user_id,
   mediaplay:data[i].UserMedia.media_url,
   media_type:data[i].UserMedia.usermedia_type,
   usermediaid:data[i].UserMedia.usermedia_id,
   category_image_url: data[i].UserMedia.media_thumbnail_url,
   artforms:this.artformscharts,
   user_url:data[i].UserMedia.usermedia_url,
   rating:data[i].UserMedia.media_ratings.rate,
   
})

}
return this.latestchart
  }
  profilerecentcharts(data,page)
  {
console.log('datarecent',this.sortcatprofile)
console.log('recentartist',this.recentartist)
console.log('page'+page)
// this.recentartist=[]
if(page==0){
  this.recentartist=[]
}
if(this.sortcatprofile==1)
{
  this.recentartist=[]
}
for(var i=0;i<data.length;i++)
{
  console.log('ee',data[i].UserMedia.media_thumbnail_url)
  // if(data[i].Subsubcategory.subsubcategory_url)
  // {
  // this.userurl1=data[i].Subsubcategory.subsubcategory_url
  // }
  // else if(data[i].Category.category_url)
  // {
  //   if(data[i].Subcategory.subcategory_url)
  //   {
  //  this.userurl1=data[i].Subcategory.subcategory_url
  //   }
  //   else
  //   {
  //  this.userurl1=data[i].Category.category_url
  //   }
    
  // }
  this.userurl1=data[i].UserMedia.usermedia_url
  if (data[i].UserMedia.media_thumbnail_url.indexOf('mp3') > -1 || data[i].UserMedia.media_thumbnail_url.indexOf('MP3') > -1)
  {
    this.backimage='assets/Dashboard/thumbnail.png'
  }
  else
  {
    this.backimage=data[i].UserMedia.media_thumbnail_url
  }

  if(data[i].Subcategory.subcategory_image)
  {
 if(data[i].Subsubcategory.subsubcategory_image)
 {
   this.recentmediathumbnailuser=data[i].Subsubcategory.subsubcategory_small_image_url
 }
 else
 {
   this.recentmediathumbnailuser=data[i].Subcategory.subcategory_small_image_url
 }
  }
  else
  {
   this.recentmediathumbnailuser=data[i].Category.subcategory_small_image_url
  }
  if(data[i].UserMedia.usermedia_category.names[2])
{
 
  this.recenttoptypeprofile=data[i].UserMedia.usermedia_category.names[0]+'/'+data[i].UserMedia.usermedia_category.names[1]+'/'+data[i].UserMedia.usermedia_category.names[2]

}  
else if(data[i].UserMedia.usermedia_category.names[1])
{
 
  this.recenttoptypeprofile=data[i].UserMedia.usermedia_category.names[0]+'/'+data[i].UserMedia.usermedia_category.names[1]

}
else if(data[i].UserMedia.usermedia_category.names[0])
{
 
  this.recenttoptypeprofile=data[i].UserMedia.usermedia_category.names[0]

}
if(data[i].Subcategory.subcategory_name)
    {
   if(data[i].Subsubcategory.subsubcategory_name)
   {
   this.artforms1=data[i].Category.category_name+'/'+data[i].Subcategory.subcategory_name+'/'+data[i].Subsubcategory.subsubcategory_name
   }
   else
   {
     this.artforms1=data[i].Category.category_name+'/'+data[i].Subcategory.subcategory_name
   }
    }
    else
    {
     this.artforms1=data[i].Category.category_name
    }
 
  //   if(data[i].Subcategory.subcategory_image)
  //   {
  //  if(data[i].Subsubcategory.subsubcategory_image)
  //  {
  //    this.covermediathumbnail=data[i].Subsubcategory.subsubcategory_small_image_url
  //    this.mediathumbnail=data[i].Subsubcategory.subsubcategory_image_url
  //  }
  //  else
  //  {
  //    this.covermediathumbnail=data[i].Subcategory.subcategory_small_image_url
  //    this.mediathumbnail=data[i].Subcategory.subcategory_image_url
  //  }
  //   }
  //   else
  //   {
  //    this.covermediathumbnail=data[i].Category.category_small_image_url    
  //    this.mediathumbnail=data[i].Category.category_image_url
  //   }
 


     
this.recentartist.push({
   media_thumbnail_url:this.backimage,
   user_display_name:data[i].Users.user_display_name,  
   usermedia_posted:data[i].UserMedia.usermedia_posted,
   user_avatar:data[i].Users.user_avatar,
   usermedia_name:data[i].UserMedia.usermedia_name,
   toptypeprofile:this.recenttoptypeprofile,
   totalRating:data[i].UserMedia.media_ratings.totalRating,
   user_profile_avatar:data[i].Users.user_profile_avatar,
   mediathumbnailuser:this.recentmediathumbnailuser,
   userurl:this.userurl1,
   artist_id:data[i].Users.user_id,
   usermediaid:data[i].UserMedia.usermedia_id,
   category_image_url: data[i].UserMedia.media_thumbnail_url,
   artforms:this.artforms1,
   rating:data[i].UserMedia.media_ratings.rate,
   mediaplay:data[i].UserMedia.media_url,
   media_type:data[i].UserMedia.usermedia_type
})

}
return this.recentartist
  }
//  recentdatadublicate(recentdata,mediarating)
//  {



// for(var i=0;i<recentdata.length;i++)
// {

  
//   this.postedago=moment(recentdata[i].UserMedia.usermedia_date, "YYYYMMDD").fromNow()
  

//  if(recentdata[i].subsubcategory.subsubcategory_image)
//  {
//    console.log('recent',recentdata[i].subsubcategory.subsubcategory_image)
// this.caticon='https://www.demo.artformplatform.com/assets/subsubcategory_icons/'+recentdata[i].subsubcategory.subsubcategory_small_image
//  }
//  else if(recentdata[i].subcategory.subcategory_image)
//  {
//  console.log('recent',recentdata[i].subcategory.subcategory_image)
//   this.caticon='https://www.demo.artformplatform.com/assets/subcategory_icons/'+recentdata[i].subcategory.subcategory_small_image
//  }
//  else if(recentdata[i].category.category_image)
//  {
//    console.log('recent',recentdata[i].category.category_small_image)
//   this.caticon='https://www.demo.artformplatform.com/assets/category_icons/'+recentdata[i].category.category_small_image
//  }
   

//  if(recentdata[i].subcategory.subcategory_name)
//  {
// if(recentdata[i].subsubcategory.subsubcategory_name)
// {
// this.artforms=recentdata[i].category.category_name+'/'+recentdata[i].subcategory.subcategory_name+'/'+recentdata[i].subsubcategory.subsubcategory_name
// }
// else
// {
//   this.artforms=recentdata[i].category.category_name+'/'+recentdata[i].subcategory.subcategory_name
// }
//  }
//  else
//  {
//   this.artforms=recentdata[i].category.category_name
//  }

// console.log('media',mediarating[i][0].media_rating)
// if(mediarating[i][0].media_rating)
// {
//  this.mediarating=mediarating[i][0].media_rating
// } 
// else
// {
//   this.mediarating=0
// }


//  if(recentdata[i].UserMedia.usermedia_type=='image/jpeg')
//  { 
 
 
//   if(recentdata[i].UserMedia.usermedia_path)
//   {
//      this.usermedia_path='https://demo.artformplatform.com/'+recentdata[i].UserMedia.usermedia_path
//   }
//   else
//   {
//      this.usermedia_path='https://er006ogq00-flywheel.netdna-ssl.com/wp-content/uploads/2018/02/default-3.jpg'
//   }
 
//  if(recentdata[i].Users.user_image)
//  {
//   this.userprofile='https://www.demo.artformplatform.com/assets/websiteuser/'+recentdata[i].Users.user_image
//  }
//  else
//  {
//   this.userprofile='assets/tabsicon/propic.jpg'
//  }



// this.recentdataarray.push(
//   {'usermedia_path':this.usermedia_path,
//    'usermedia_play':'https://demo.artformplatform.com/'+recentdata[i].UserMedia.usermedia_path,
//     'usermedia_type': recentdata[i].UserMedia.usermedia_type,
//     'user_image':this.userprofile,
//     'user_display_name':recentdata[i].Users.user_display_name,
//     'usermedia_name':recentdata[i].UserMedia.usermedia_name,
//     'artforms':this.artforms,
//     'mediarating':this.mediarating,
//     'caticon':this.caticon,
//     'postedtime':this.postedago,
//     'category_id':recentdata[i].UserMedia.category_id

// })
 

// }

//  else
//  {
//   if(recentdata[i].Users.user_image)
//   {
//    this.userprofile='https://www.demo.artformplatform.com/assets/websiteuser/'+recentdata[i].Users.user_image
//   }
//   else
//   {
//    this.userprofile='assets/tabsicon/propic.jpg'
//   }
//   if(recentdata[i].UserMedia.video_thumbnail)
//   {
//      this.usermedia_path='https://demo.artformplatform.com/'+recentdata[i].UserMedia.video_thumbnail
//   }
//   else
//   {
//      this.usermedia_path='https://er006ogq00-flywheel.netdna-ssl.com/wp-content/uploads/2018/02/default-3.jpg'
//   }
//   var str=recentdata[i].UserMedia.usermedia_path
//   var n=str.search('youtube')
//   console.log('pika'+n)
//   if(n==-1)
//   {
    
//     this.usermedia_play='https://demo.artformplatform.com/'+recentdata[i].UserMedia.usermedia_path
//   }
//   else
//   {
//     this.usermedia_play=recentdata[i].UserMedia.usermedia_path
//   }
//   this.recentdataarray.push(
//     {'usermedia_path':this.usermedia_path,
//     'usermedia_play':this.usermedia_play,
//     'usermedia_type':recentdata[i].UserMedia.usermedia_type,
//     'user_image':this.userprofile,
//     'user_display_name':recentdata[i].Users.user_display_name,
//     'usermedia_name':recentdata[i].UserMedia.usermedia_name,
//     'artforms':this.artforms,
//     'mediarating':this.mediarating,
//     'caticon':this.caticon,
//     'postedtime':this.postedago,
//     'category_id':recentdata[i].UserMedia.category_id
//   }) 
//  }
// }
// this.dublicaterecentdataarray=this.recentdataarray
// console.log(this.dublicaterecentdataarray)
//  }

 sortcat(id)
 {


  console.log('----',this.dublicaterecentdataarray)
  
  this.recentdataarray=[]

  console.log(this.recentdataarray)
   for(var i=0;i<this.dublicaterecentdataarray.length;i++)
   {
    if(this.dublicaterecentdataarray[i].category_id==id)
    {
      this.recentdataarray.push({
     
        category_image_url:this.dublicaterecentdataarray[i].category_image_url,
        user_avatar:this.dublicaterecentdataarray[i].user_avatar,
        small_image_url:this.dublicaterecentdataarray[i]. small_image_url,
        user_display_name:this.dublicaterecentdataarray[i].user_display_name,
        usermedia_posted:this.dublicaterecentdataarray[i].usermedia_posted,
        usermedia_name:this.dublicaterecentdataarray[i].usermedia_name,
        rating:this.dublicaterecentdataarray[i].rating,
        artforms:this.dublicaterecentdataarray[i].artforms,
       mediaplay:this.dublicaterecentdataarray[i].mediaplay,
       media_type:this.dublicaterecentdataarray[i].media_type,
       usermediaid:this.dublicaterecentdataarray[i].usermediaid,
       user_url:this.dublicaterecentdataarray[i].user_url,
       totalrating:this.dublicaterecentdataarray[i].totalrating
      }) 
    }
   }
   console.log('hope',this.recentdataarray)

 }

topperformers(topperformersdata)
{
  this.topperformersdata=[]
  for(var i=0;i<topperformersdata.length;i++)
  {
    if(topperformersdata[i].Subcategory.subcategory_image)
 {
if(topperformersdata[i].Subsubcategory.subsubcategory_image)
{
  this.covermediathumbnail=topperformersdata[i].Subsubcategory.subsubcategory_small_image_url
  this.mediathumbnail=topperformersdata[i].Subsubcategory.subsubcategory_image_url
}
else
{
  this.covermediathumbnail=topperformersdata[i].Subcategory.subcategory_small_image_url
  this.mediathumbnail=topperformersdata[i].Subcategory.subcategory_image_url
}
 }
 else
 {
  this.covermediathumbnail=topperformersdata[i].Category.category_small_image_url    
  this.mediathumbnail=topperformersdata[i].Category.category_image_url
 }


if(topperformersdata[i].UserMedia.usermedia_category.names[2])
{
 
 this.toptype=topperformersdata[i].UserMedia.usermedia_category.names[0]+'/'+topperformersdata[i].UserMedia.usermedia_category.names[1]+'/'+topperformersdata[i].UserMedia.usermedia_category.names[2]

}
else if(topperformersdata[i].UserMedia.usermedia_category.names[1])
{
  this.toptype=topperformersdata[i].UserMedia.usermedia_category.names[0]+'/'+topperformersdata[i].UserMedia.usermedia_category.names[1]
}
else
{
  this.toptype=topperformersdata[i].UserMedia.usermedia_category.names[0]
}
console.log('---'+this.toptype)
console.log('--topperformers'+topperformersdata[i].Users.user_image)

if(topperformersdata[i].Users.user_image)
{
  this.user_avatartop=topperformersdata[i].Users.user_avatar
}else
{
  this.user_avatartop='https://www.demo.artformplatform.com/images/user-comment.png'
}



this.totalrating=topperformersdata[i].UserMedia.media_ratings.totalAllRating
this.rate=topperformersdata[i].UserMedia.media_ratings.rateAll
if(topperformersdata[i].UserMedia.usermedia_type=='image/jpeg')
  { 
    this.topperformersdata.push({
      // 'usermedia_path':this.mediathumbnail,
      'usermedia_path':topperformersdata[i].UserMedia.media_thumbnail_url,
      'user_display_name':topperformersdata[i].Users.user_display_name,
      'user_avatar':this.user_avatartop,
      'usermedia_name':topperformersdata[i].UserMedia.usermedia_name,
      'toptype':this.toptype,
      'totalrating':this.totalrating,
      'media_thumbnail_url':topperformersdata[i].UserMedia.media_url,
      'usermedia_type':topperformersdata[i].UserMedia.usermedia_type,
      'user_image':topperformersdata[i].Users.user_image,
      'artist_id':topperformersdata[i].Users.user_id,
      'rate':this.rate,
      'usermedia_id':topperformersdata[i].UserMedia.usermedia_id,
      'usermedia_url':topperformersdata[i].UserMedia.usermedia_url,
      'covermediathumbnail':this.covermediathumbnail
      // 'covermediathumbnail':this.covermediathumbnail
      // 'usermedia_play':this.usermedia_play,
      // 'usermedia_type':recentdata[i].UserMedia.usermedia_type,
      // 'user_image':this.userprofile,
      // 'user_display_name':recentdata[i].Users.user_display_name,
      // 'usermedia_name':topperformersdata[i].UserMedia.usermedia_name,
      // 'artforms':this.artforms,
      // 'mediarating':topperformersdata[i][0].totalrating,
      // 'caticon':this.caticon,
      // 'postedtime':this.postedago,
      // 'category_id':recentdata[i].UserMedia.category_id
    })
  }
  else
  {
   this.topperformersdata.push({
    // 'usermedia_path':this.mediathumbnail,
    'usermedia_path':topperformersdata[i].UserMedia.media_thumbnail_url,
    'user_display_name':topperformersdata[i].Users.user_display_name,
    'user_avatar':topperformersdata[i].Users.user_avatar,
    'usermedia_name':topperformersdata[i].UserMedia.usermedia_name,
    'toptype':this.toptype,
    'totalrating':this.totalrating,
    'media_thumbnail_url':topperformersdata[i].UserMedia.media_url,
    'usermedia_type':topperformersdata[i].UserMedia.usermedia_type,
    'artist_id':topperformersdata[i].Users.user_id,
    'rate':this.rate,
    'usermedia_id':topperformersdata[i].UserMedia.usermedia_id,
    'usermedia_url':topperformersdata[i].UserMedia.usermedia_url,
    'covermediathumbnail':this.covermediathumbnail
    // 'usermedia_play':this.usermedia_play,
    // 'usermedia_type':recentdata[i].UserMedia.usermedia_type,
    // 'user_image':this.userprofile,
    // 'user_display_name':recentdata[i].Users.user_display_name,
    // 'usermedia_name':topperformersdata[i].UserMedia.usermedia_name,
    // 'artforms':this.artforms,
    // 'mediarating':topperformersdata[i][0].totalrating,
    // 'caticon':this.caticon,
    // 'postedtime':this.postedago,
    // 'category_id':recentdata[i].UserMedia.category_id
    })
  }
  }
  console.log('ss',this.topperformersdata)
}

 recentdata(mediadata){
   for(var i=0;i<mediadata.length;i++)
   {
     if(mediadata[i].UserMedia.media_thumbnail_url!='https://www.demo.artformplatform.com/files/373/6139-3460-1486638426.jpg')
     {
       console.log('mediatype',mediadata[i].UserMedia.usermedia_type)
    if(mediadata[i].UserMedia.usermedia_type!='audio/mpeg'&& mediadata[i].UserMedia.usermedia_type!='audio/mp3' )
     {
      this.displaythumbnail=mediadata[i].UserMedia.media_thumbnail_url
      console.log('--',this.displaythumbnail)

     }
    //  else if(mediadata[i].UserMedia.usermedia_type=='audio/mpeg')
    //  {
    //   this.displaythumbnail='assets/Dashboard/thumbnail.png'
    //   console.log('hello',this.displaythumbnail)
    //  }
    //  else if( mediadata[i].UserMedia.usermedia_type=='audio/mp3')
    //  {
    //   this.displaythumbnail='assets/Dashboard/thumbnail.png'
    //   console.log('hello22',this.displaythumbnail)
    //  }
    }
    else{
      this.displaythumbnail='assets/Dashboard/thumbnail.png'
    }
    if(mediadata[i].Users.user_avatar=='https://www.demo.artformplatform.com/assets/websiteuser/')
    {
      this.user_avatar='https://www.demo.artformplatform.com/images/user-comment.png'
    }
    else
    {
      this.user_avatar=mediadata[i].Users.user_avatar
    }

    if(mediadata[i].Subsubcategory.subsubcategory_image)
    {
   
   this.caticon='https://www.demo.artformplatform.com/assets/subsubcategory_icons/'+mediadata[i].Subsubcategory.subsubcategory_small_image
    }
    else if(mediadata[i].Subcategory.subcategory_image)
    {
    
     this.caticon='https://www.demo.artformplatform.com/assets/subcategory_icons/'+mediadata[i].Subcategory.subcategory_small_image
    }
    else if(mediadata[i].Category.category_image)
    {
     
     this.caticon='https://www.demo.artformplatform.com/assets/category_icons/'+mediadata[i].Category.category_small_image
    }
    if(mediadata[i].Users.user_display_name==" ")
    {
      this.userdisplayimage='unknown'
    }
    else
    {
      this.userdisplayimage=mediadata[i].Users.user_display_name
    }
    if(mediadata[i].Subcategory.subcategory_name)
    {
   if(mediadata[i].Subsubcategory.subsubcategory_name)
   {
   this.artforms=mediadata[i].Category.category_name+'/'+mediadata[i].Subcategory.subcategory_name+'/'+mediadata[i].Subsubcategory.subsubcategory_name
   }
   else
   {
     this.artforms=mediadata[i].Category.category_name+'/'+mediadata[i].Subcategory.subcategory_name
   }
    }
    else
    {
     this.artforms=mediadata[i].Category.category_name
    }
    
  this.recentdataarray.push({
    // category_image_url:this.displaythumbnail,
    category_image_url:mediadata[i].UserMedia.media_thumbnail_url,
    user_avatar:this.user_avatar,
    small_image_url:this.caticon,
    user_display_name:this.userdisplayimage,
    usermedia_posted:mediadata[i].UserMedia.usermedia_posted,
    usermedia_name:mediadata[i].UserMedia.usermedia_name,
    rating:mediadata[i].UserMedia.media_ratings.rateAll,
    artforms:this.artforms,
   mediaplay:mediadata[i].UserMedia.media_url,
   media_type:mediadata[i].UserMedia.usermedia_type,
   category_id:mediadata[i].UserMedia.category_id,
   artist_id:mediadata[i].Users.user_id,
   usermediaid:mediadata[i].UserMedia.usermedia_id,
   user_url:mediadata[i].UserMedia.usermedia_url,
   totalrating:mediadata[i].UserMedia.media_ratings.totalRating
  }
  
  ) 


   }
   console.log('hopedata'+this.recentdataarray) 
   this.dublicaterecentdataarray=this.recentdataarray
 }







}
