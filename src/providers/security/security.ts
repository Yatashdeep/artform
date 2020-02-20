import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ENV}from'../../app/env'
import{Http,Headers,RequestOptions}from'@angular/http'
import{Observable}from'rxjs/rx'
import { Cookie } from 'ng2-cookies/ng2-cookies';
/*
  Generated class for the SecurityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()





export class SecurityProvider {

  constructor(public http: Http) {
    console.log('Hello SecurityProvider Provider');
  }
  getfollowing(artist_id)
{
 
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
if(artist_id)
{
  return this.http.get('https://www.artformplatform.com/api/followers/followingList.json?user_id='+artist_id,requestOptions)
  .map((data)=>{
   return data.json()
  })
}
else
{
  return this.http.get('https://www.artformplatform.com/api/followers/followingList.json',requestOptions)
  .map((data)=>{
   return data.json()
  })
}
}


getfollow(artist_id)
{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  if(artist_id)
  {
    return this.http.get('https://www.artformplatform.com/api/followers/followersList.json?user_id='+artist_id,requestOptions)
    .map((data)=>{
     return data.json()
    })
  }
  else
  {
  return this.http.get('https://www.artformplatform.com/api/followers/followersList.json',requestOptions)
  .map((data)=>{
   return data.json()
  })
}
}





charts(catid)
{
  
 if(localStorage['usertype']==3)
 {
  
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  console.log(requestOptions)
if(catid)
{
  return this.http.get('https://www.artformplatform.com/api/player/charts.json?artist_id='+localStorage['userid']+'&category_id='+catid,requestOptions)
  .map((data)=>{
   return data.json()
  })
}
else
{
  return this.http.get('https://www.artformplatform.com/api/player/charts.json?artist_id='+localStorage['userid'],requestOptions)
.map((data)=>{
 return data.json()
})
}


 }


  else{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  console.log(requestOptions)
  if(catid)
{
  return this.http.get('https://www.artformplatform.com/api/player/charts.json?artist_id='+localStorage['userid']+'&category_id='+catid,requestOptions)
  .map((data)=>{
   return data.json()
  })
}
else
{
 // return this.http.get('https://www.demo.artformplatform.com/site.json',requestOptions)
   return this.http.get('https://www.artformplatform.com/api/player/charts.json?artist_id='+localStorage['userid'],requestOptions)
.map((data)=>{
 return data.json()
})
}
  }
}

artistcharts(artistid)
{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  return this.http.get('https://www.artformplatform.com/api/player/charts.json?artist_id='+artistid,requestOptions)
  .map((data)=>{
   return data.json()
  })
}

  signin(signupdata,radiocheck)
  {
    let param={
        "txtUsername": signupdata.controls["email"].value,
  "txtPassword": signupdata.controls["password"].value,
  "txtConfirmPassword":signupdata.controls["confirmPassword"].value ,
  "txtUsertype": parseInt(radiocheck),
  "txtMobile":1
    }
    return this.http.post(ENV.mainApi+'/register.json',param)
   .map((data)=>{
     return data.json()
   })
  }
getcompetition(competition_id){
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  return this.http.get('https://www.artformplatform.com/api/competitions/view/'+competition_id+'.json',requestOptions)
  .map((data)=>{
   return data.json()
  })
}
comments(usermediaid)
{
 let params= {
    "usermedia_id":usermediaid
    }
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  //  headers.append('COOKIE','CAKEPHP='+sessionId)
  // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  console.log(requestOptions)
  return this.http.post('https://www.artformplatform.com/api/comments/tree.json',params,requestOptions)
.map((data)=>{
 return data.json()
})
}











  islogged()
  {
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let sessionId=localStorage['sessionId']
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    headers.append('X-Cookie','CAKEPHP='+sessionId)
    //  headers.append('COOKIE','CAKEPHP='+sessionId)
    // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
    let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
    console.log(requestOptions)
    return this.http.get(ENV.mainApi+'/isLogged.json',requestOptions)
 .map((data)=>{
   return data.json()
 })
  }



  login(email,password,usertype)
  {
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    let requestOptions=new RequestOptions({headers:headers})
    let param={
      "txtUsername":email,
  "txtPassword": password,
  "txtUsertype": usertype
     }
   return this.http.post(ENV.mainApi+'/login.json',param)
   .map((data)=>{
     return data.json()
   })



  }
  getInstagramUserInfo(response)
  {
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + response.access_token + '&count=5')
    .map((data) =>
     data.json()
     );
  }
  youtubeshare(youtubeinput)
  {
    let param=
{
	'yt_url': youtubeinput
}
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let sessionId=localStorage['sessionId']
    let userToken = localStorage['xtoken'];
     headers.append('X-JSON-WEB-TOKEN', userToken);
    headers.append('X-Cookie','CAKEPHP='+sessionId)
    //  headers.append('COOKIE','CAKEPHP='+sessionId)
    // let requestOptions=new RequestOptions({headers:headers,withCredentials: true})
    let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
    console.log('param',param)
    return this.http.post('https://www.artformplatform.com/api/upload/social.json',param,requestOptions)
    .map((data) =>
     data.json()
     );
  }
  changeusertype()
  {
   
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let sessionId=localStorage['sessionId']
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    headers.append('X-Cookie','CAKEPHP='+sessionId)
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get(" https://www.artformplatform.com/api/user/becomeAnArtist.json",requestOptions)
    .map((data)=>{
      return data.json()
    })
  }
  cattrendingchattab(cattab,intrest,catid)
  {
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let sessionId=localStorage['sessionId']
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    headers.append('X-Cookie','CAKEPHP='+sessionId)
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get("https://www.artformplatform.com/api/player/topTen.json?&category_type="+intrest+"&"+'category_id'+"="+cattab+"&isotope_loader=1&page=0&limit=24",requestOptions)
    //  return this.http.get("https://www.demo.artformplatform.com/site.json?&category="+intrest+"&"+catid+"="+cattab+"&isotope_loader=1&page=0&limit=24",requestOptions)
    .map((data)=>{
      return data.json()
    })
  }
  forgetpass(email)
  {
    let param={
      "txtUsername":email
     }
     let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    let requestOptions=new RequestOptions({headers:headers})
   return this.http.post(ENV.mainApi+'/forgotPassowrd.json',param)
  //  return this.http.get('https://www.demo.artformplatform.com/recent-uploads.json',requestOptions)
   .map((data)=>{
     return data.json()
   })
  }
  recentupload()
  {

    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let sessionId=localStorage['sessionId']
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    headers.append('X-Cookie','CAKEPHP='+sessionId)
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get('https://www.artformplatform.com/recent-uploads.json',requestOptions)
   .map((data)=>{
     return data.json()
   })
  }
  trending_items()
  {
    let  headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let sessionId=localStorage['sessionId']
    let userToken = localStorage['xtoken'];
    headers.append('X-JSON-WEB-TOKEN', userToken);
    headers.append('X-Cookie','CAKEPHP='+sessionId)
    let requestOptions=new RequestOptions({headers:headers})
    return this.http.get('https://www.artformplatform.com/trending.json',requestOptions)
   .map((data)=>{
     return data.json()
   })
    

  }
loadmore(page,link,tag,catid)
{
   
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
 if(tag==0)
 {
   
  return this.http.get("https://www.artformplatform.com/api/media/"+link+".json?&isotope_loader=1&onlyFirstCategory=undefined&page="+page+"&limit=8",requestOptions)
 // return this.http.get("https://www.artformplatform.com/api/media/"+link+".json?onlyFirstCategory=undefined&isotope_loader=1&item_class=col-xs-12%20col-sm-6%20col-md-4%20col-lg-3&page="+page+"&limit=8",requestOptions)
 .map((data)=>{
   return data.json()
 })
 }
 else
 {
  return this.http.get("https://www.artformplatform.com/api/media/"+link+".json?&category=category&category_id="+catid+"&isotope_loader=1&page="+page+"&limit=8",requestOptions)  
 // return this.http.get("https://www.artformplatform.com/api/media/"+link+".json?&category=category&category_id="+catid+"&isotope_loader=1&item_class=col-xs-12%20col-sm-6%20col-md-4%20col-lg-3&page="+page+"&limit=8",requestOptions)
  .map((data)=>{
    return data.json()
  })
 }



}
cattab(link,page,cattab,intrest,catid)
{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
 return this.http.get("https://www.artformplatform.com/api/media/"+link+".json?&category="+intrest+"&"+"category_id"+"="+cattab+"&isotope_loader=1&page="+page+"&limit=24",requestOptions)
  //  return this.http.get("https://www.artformplatform.com/api/media/recentMedia.json?&category="+intrest+"&"+"category_id"+"="+cattab+"&isotope_loader=1&page="+page+"&limit=24",requestOptions)
  .map((data)=>{
    return data.json()
  })
}

artistprofilerecent(page,catid)
{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
  if(catid)
  {
return this.http.get("https://www.artformplatform.com/api/media/recentMedia.json?exclude_ids=[]&onlyFirstCategory=1&category=category&category_id="+catid+"&isotope_loader=1&page_user_id="+localStorage['userid']+"&page="+page+"&limit=8",requestOptions)
  .map((data)=>{
    return data.json()
  })
}
else
{
  return this.http.get("https://www.artformplatform.com/api/media/recentMedia.json?exclude_ids=[]&onlyFirstCategory=1&isotope_loader=1&page_user_id="+localStorage['userid']+"&page="+page+"&limit=8",requestOptions)
  .map((data)=>{
    return data.json()
  }) 
}
}
artistprofilerecentchats(page,catid,userid)
{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
  if(catid)
  {
    return this.http.get("https://www.artformplatform.com/api/media/recentMedia.json?exclude_ids=[]&onlyFirstCategory=1&category=category&category_id="+catid+"&isotope_loader=1&page_user_id="+userid+"&page="+page+"&limit=8",requestOptions)   

  .map((data)=>{
    return data.json()
  })
}
else
{
  return this.http.get("https://www.artformplatform.com/api/media/recentMedia.json?exclude_ids=[]&onlyFirstCategory=1&isotope_loader=1&page_user_id="+userid+"&page="+page+"&limit=8",requestOptions)
  .map((data)=>{
    return data.json()
  }) 
}
}

uploadmedia(medianame,categoryId,subcategoryId,subsubcategoryId,usermediaId)
{
  if(categoryId=='undefined')
  {
    categoryId=0
  }
  else if(subcategoryId=='undefined')
  {
    subcategoryId=0
  }
  else if(subsubcategoryId=='undefined')
  {
    subsubcategoryId=0
  }

  //  alert( medianame+'sdsd' // optional
  //  +categoryId+'sdsd' // optional
  //  +subcategoryId+'sdsd' // optional
  //   +'sdsd'+subsubcategoryId+'sdsd'+ // optional
  //  usermediaId)
  let params=
  {
    "mediaName": medianame, // optional
    "categoryId":categoryId, // optional
    "subcategoryId":subcategoryId, // optional
    "subsubcategoryId":subsubcategoryId, // optional
    "usermediaId":usermediaId // required
  }

  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
 // alert('sessionId'+localStorage['sessionId'])
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post('https://www.artformplatform.com/api/media/updateMediaDetails.json',params,requestOptions).map((data)=>{
    return data.json()
  })
}
uploadcovercrop(coverimgsrc,usermediaId)
{
  var coverdata={"x":219.4319999999999,"y":104.60000000000002,"height":836.8000000000001,"width":1481.1360000000002,"rotate":0}
  let params=
  {
    "cover_src": coverimgsrc,
  // data from cropper.js
    "usermedia_id":	usermediaId // required // optional
  }

  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post('https://www.artformplatform.com/api/media/cropCover.json',params,requestOptions).map((data)=>{
    return data.json()
  })
}








sociallogininsta(id,username,profile_picture)
{
  let param={
    "user_social_Id":id,
    "user_display_name":username,
    "user_fname":"",
    "user_lname":"",
    "user_emailid":"",
    "user_image":profile_picture,
    "user_cropped_image":"",
    "user_verified":"1",
    "user_social_type":"Instagram",
    "usertype_id":"3",
    "user_sex":""
    }
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/social.json',param,requestOptions)
 .map((data)=>{
   return data.json()
 })
}

sociallogingoogle(socialid,email,displayname,firtsname,profile_pic)
{
  let param={
    "user_social_Id":socialid,
    "user_display_name":displayname,
    "user_fname":firtsname,
    "user_lname":"",
    "user_emailid":email,
    "user_image":profile_pic,
    "user_cropped_image":"",
    "user_verified":"1",
    "user_social_type":"google",
    "usertype_id":"3",
    "user_sex":""
    }
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/social.json',param,requestOptions)
 .map((data)=>{
   return data.json()
 })
}
sociallogintwitter(socialid,displayName,firtsname,profile_pic)
{
  let param={
    "user_social_Id":socialid,
    "user_display_name":displayName,
    "user_fname":firtsname,
    "user_lname":"",
    "user_emailid":"",
    "user_image":profile_pic,
    "user_cropped_image":"",
    "user_verified":"1",
    "user_social_type":"twitter",
    "usertype_id":"3",
    "user_sex":""
    }
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/social.json',param,requestOptions)
 .map((data)=>{
   return data.json()
 }) 
}
sociallogin(socialid,email,profile_pic,first_name,profile_name,last_name)
{
  let param={
    "user_social_Id":socialid,
    "user_display_name":profile_name,
    "user_fname":first_name,
    "user_lname":last_name,
    "user_emailid":email,
    "user_image":profile_pic,
    "user_cropped_image":"",
    "user_verified":"1",
    "user_social_type":"facebook",
    "usertype_id":"3",
    "user_sex":""
    }
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.post(ENV.mainApi+'/social.json',param,requestOptions)
 .map((data)=>{
   return data.json()
 })
}
topperformers()
{
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers})
  return this.http.get("https://www.artformplatform.com/api/player/topTen.json",requestOptions)
  // return this.http.get("https://www.artformplatform.com/site.json",requestOptions)
 .map((data)=>{
   return data.json()
 })
} 


artistfollowed(artist_id)
{
  let param={
    artist_id:artist_id,
    
  }
  let  headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  let sessionId=localStorage['sessionId']

  headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false});
console.log(requestOptions)
  return this.http.post('https://www.artformplatform.com/api/followers/followUnfollow.json',param,requestOptions)
 .map((data)=>{
   return data.json()
 })   
}
reportmedia()
{
 
 let headers=new Headers();
 headers.append('Content-Type', 'application/json');
 headers.append('Accept','application/json');
 headers.append('Access-Control-Allow-Origin','*');
 let sessionId=localStorage['sessionId']
 let userToken = localStorage['xtoken'];
 headers.append('X-JSON-WEB-TOKEN', userToken);
 headers.append('X-Cookie','CAKEPHP='+sessionId)     
let requestOptions=new RequestOptions({headers:headers})
return this.http.get('https://www.artformplatform.com/api/media/getReportTypes.json',requestOptions)
.map((data)=>{
  return data.json()
})
}
Competitionapi()
{
  let headers=new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origin','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)     
 let requestOptions=new RequestOptions({headers:headers})
 return this.http.get('https://www.artformplatform.com/api/competitions.json',requestOptions)
 .map((data)=>{
   return data.json()
 })

}
 loggedout()
 {
   let headers=new Headers();
   headers.append('Content-Type','application/json');
   headers.append('Accept','application/json');
   headers.append('Access-Control-Allow-Origion','*');
   let sessionId=localStorage['sessionId']
   let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
   headers.append('X-Cookie','CAKEPHP='+sessionId)
   let requestOptions=new RequestOptions({headers:headers})
   return this.http.get('https://www.artformplatform.com/api/users/logout.json',requestOptions)
   .map((data)=>{
     return data.json()
   })
 }
 reportsubmit(mediaid,type)
 {
   let param=
   {
    "media_id": mediaid,// fill with the usermedia ID that you want to report
    "type": type // fill with the report type value (value === text)
  }
   let headers=new Headers();
   headers.append('Content-Type','application/json');
   headers.append('Accept','application/json');
   headers.append('Access-Control-Allow-Origion','*');
   let sessionId=localStorage['sessionId']
   let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
   headers.append('X-Cookie','CAKEPHP='+sessionId)
  let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
  return this.http.post('https://www.artformplatform.com/api/media/report.json',param,requestOptions)
  .map((data)=>{
     return data.json()
  })



 }
 editcomments(comments,mediacomment_id,usermediaid)
 {
  let param=
  {
    "usermedia_comment": comments,
    "mediacomment_id": mediacomment_id,
    "usermedia_id": usermediaid
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/comments/update.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
 }
 addcomments(usermedia,comments)
 {
  let param=
  {
    "usermedia_id": usermedia,
    "usermedia_comment": comments
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/comments/create.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
 }
 deletecomments(mediacomment_id)
 {
  let param=
  {
    "mediacomment_id": mediacomment_id
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/comments/delete.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
 }
 subcomments(usermediaid,mediacomment_id,comments)
 {
  let param=
  {
    "usermedia_id": usermediaid,
    "mediacomment_id": mediacomment_id,
    "usermedia_comment": comments
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/subcomments/create.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
 }
 editsubcomments(comments,subeditmediacomment_id,usermediaid,editmediacomment_id)
 {
  let param=
  {
    "usermedia_comment": comments,
    "mediasubcomment_id":subeditmediacomment_id ,
    "mediacomment_id": editmediacomment_id,
    "usermedia_id": usermediaid
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/subcomments/update.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
 }
 deletesubcomments(id)
 {
  let param=
  {
    "mediasubcomment_id": id
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/subcomments/delete.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
 }
starmedia(rate,usermedia_id)
{
  let param=
  {
    "rate": rate,
    "usermedia_id": usermedia_id
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/media/rate.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
}
inboxapi(page)
{
  
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.get('https://www.artformplatform.com/api/messages/inbox.json?page='+page+'&limit=8',requestOptions)
 .map((data)=>{
    return data.json()
 })
}
markasread(conversationId)
{
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.get('https://www.artformplatform.com/api/messages/read.json?conversationId='+conversationId,requestOptions)
 .map((data)=>{
    return data.json()
 })
}
createconversation(id,page)
{
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.get('https://www.artformplatform.com/api/messages/conversation.json?conversationId='+id+'&page='+page+'&limit=8',requestOptions)
 .map((data)=>{
    return data.json()
 })
}
replytoconv(conversationid,comments)
{
  let param=
  {
  	"conversationId": conversationid,
	"message":comments
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 return this.http.post('https://www.artformplatform.com/api/messages/reply.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
}
conversation(idtags,title,Message)
{
  let param=
  {
    "title": title,
    "message": Message,
    "recipients": idtags
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 console.log('requestoptions',requestOptions)
 return this.http.post('https://www.artformplatform.com/api/messages/create.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
}
editprofile(  user_fname,
user_lname,
  user_display_name,
user_mobileno,
  user_nationality,
user_city,
  user_sex,
  user_biography,
  user_birth)
{
  let param=
  {
    "user_fname": user_fname,
    "user_lname": user_lname,
    "user_display_name": user_display_name,
    "user_mobileno":user_mobileno,
    "user_nationality": user_nationality,
    "user_city": user_city,
    "user_sex": user_sex,
    "user_biography": user_biography,
    "user_birth": user_birth
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 console.log('requestoptions',requestOptions)
 return this.http.post('https://www.artformplatform.com/api/user/edit.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
}
getrecipients(value)
{
  let param=
  {
    "term": value
  }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 console.log('requestoptions',requestOptions)
 return this.http.post('https://www.artformplatform.com/api/messages/getRecipients.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
}
getcategory()
{
 
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 console.log('requestoptions',requestOptions)
// alert('requestoptions'+JSON.stringify(requestOptions))
 console.log(JSON.stringify(requestOptions))
// return this.http.get('https://www.artformplatform.com/api/categories/getUserCategories.json',requestOptions)
return this.http.get('https://www.artformplatform.com/api/categories/getCategoriesTree.json',requestOptions)
 .map((data)=>{
    return data.json()
 })
}
submitcat(addcategories,addsubCategories,addsubSubCategories)
{
 // alert('submitcat')
  let param=
  {
    "categories" : addcategories, // selected categories
    "subCategories" : addsubCategories,// selected subcategories
    "subSubCategories" : addsubSubCategories  // selected subsubcategories
    }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
// alert('requestoptions'+JSON.stringify(requestOptions))
 console.log(JSON.stringify(requestOptions))
 return this.http.post('https://www.artformplatform.com/api/categories/saveUserCategories.json',param,requestOptions)
 .map((data)=>{
//alert('data'+data)
    return data.json()
 })
}


getinTouch(Name,email,message){
  let param={
    "name":Name,
    "email":email,
    "message":message
  }
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId']
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId)
 let requestOptions=new RequestOptions({headers:headers,withCredentials:false})
 console.log('requestoptions',requestOptions)
 return this.http.post('https://www.artformplatform.com/api/forms/contact.json',param,requestOptions)
 .map((data)=>{
    return data.json()
 })
}


// Delete Function Here
getDeleteMedia(UsrMediaID) {
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  headers.append('Access-Control-Allow-Origion','*');
  let sessionId=localStorage['sessionId'];
  let userToken = localStorage['xtoken'];
  headers.append('X-JSON-WEB-TOKEN', userToken);
  headers.append('X-Cookie','CAKEPHP='+sessionId);
 let requestOptions=new RequestOptions({ headers:headers, withCredentials:false });
 return this.http.get('https://www.artformplatform.com/api/media/deleteMedia/'+UsrMediaID+'.json',requestOptions).map((data)=>{
    return data.json()
 });
}
// End of delete function..

}
