import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { YoutubePlayerMiniModule }  from 'ng2-youtube-player-mini'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import{SecuritypanelPage}from'../pages/securitypanel/securitypanel'
import { TabspagePage } from '../pages/tabspage/tabspage';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { StarRatingModule } from 'ionic3-star-rating';
import{ArtprofilePage}from'../pages/artprofile/artprofile'
import{InboxpagePage}from'../pages/inboxpage/inboxpage'
import{CreateconversationpagePage}from'../pages/createconversationpage/createconversationpage'
import { EditprofilepagePage } from '../pages/editprofilepage/editprofilepage';
import{CategoryPage}from'../pages/category/category'
import{UploadmediaPage}from'../pages/uploadmedia/uploadmedia'
import { ReportprobPage } from '../pages/reportprob/reportprob';
import { GetintouchPage } from '../pages/getintouch/getintouch';
import{AboutuspPage}from'../pages/aboutusp/aboutusp'
import { HowitworkspPage } from '../pages/howitworksp/howitworksp';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import{PrivacypPage}from'../pages/privacyp/privacyp'
import { CommunitygudelinesPage } from '../pages/communitygudelines/communitygudelines';
import { CompetitionspPage } from '../pages/competitionsp/competitionsp';
import{CategorytabpagePage}from'../pages/categorytabpage/categorytabpage'
import { SubcattabpPage } from '../pages/subcattabp/subcattabp';
import { ChildcattabpagePage } from '../pages/childcattabpage/childcattabpage';
import { ChoosecatpagetabPage } from '../pages/choosecatpagetab/choosecatpagetab';
import { CommentsboxPage } from '../pages/commentsbox/commentsbox';
import { ArtistprofilepagePage } from '../pages/artistprofilepage/artistprofilepage';
import { EditproartistpagPage } from '../pages/editproartistpag/editproartistpag';
import{PopoverpagesharePage}from'../pages/popoverpageshare/popoverpageshare'
import { ViewtalentPage } from '../pages/viewtalent/viewtalent';
import { AnumationviewComponent } from '../components/anumationview/anumationview';
import { HowtouploadpagesidemenuPage } from '../pages/howtouploadpagesidemenu/howtouploadpagesidemenu';
import { FollowedartistPage } from '../pages/followedartist/followedartist';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ViewvideoplayPage } from '../pages/viewvideoplay/viewvideoplay';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SecurityProvider } from '../providers/security/security';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{ HttpModule}from'@angular/http'
import { DashboardserviceProvider } from '../providers/dashboardservice/dashboardservice';
import{LoaderdataComponent}from'../components/loaderdata/loaderdata'
import{ViewvideotopperformersPage}from'../pages/viewvideotopperformers/viewvideotopperformers'
import { from } from 'rxjs/observable/from';
import{MyInterceptor}from'./my-inceptor'
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { IonicStorageModule ,Storage} from '@ionic/storage';
import{ComponentsExpandableComponent}from'../components/components-expandable/components-expandable'
import { SocialSharing } from '@ionic-native/social-sharing';
import{ChatinboxreplyPage}from'../pages/chatinboxreply/chatinboxreply'
import{Camera,CameraOptions}from'@ionic-native/camera'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser'
import {RlTagInputModule} from 'angular2-tag-input';
import { File } from '@ionic-native/file';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { Pinterest, PinterestUser, PinterestPin, PinterestBoard } from '@ionic-native/pinterest';
import{ProgressbarComponent}from'../components/progressbar/progressbar'
import{SelectuploadcategoryPage}from'../pages/selectuploadcategory/selectuploadcategory'
import{CompetitiondetailpagePage}from'../pages/competitiondetailpage/competitiondetailpage'
import { DocumentViewer } from '@ionic-native/document-viewer';
 import{InAppBrowser}from'@ionic-native/in-app-browser'
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import{CommunitypopoverPage}from'../pages/communitypopover/communitypopover'
import{FollowersPagepPage}from'../pages/followers-pagep/followers-pagep';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { Deeplinks } from '@ionic-native/deeplinks';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SecuritypanelPage,
    TabspagePage,
    DashboardPage,
    ArtprofilePage,
    InboxpagePage,
    CreateconversationpagePage,
    EditprofilepagePage,
    CategoryPage,
    UploadmediaPage,
    ReportprobPage,
    GetintouchPage,
    AboutuspPage,
    HowitworkspPage,
    TermsandconditionsPage,
    PrivacypPage,
    CommunitygudelinesPage,
    CompetitionspPage,
    CategorytabpagePage,
    SubcattabpPage,
    ChildcattabpagePage,
    ChoosecatpagetabPage,
    CommentsboxPage,
    ArtistprofilepagePage,
    EditproartistpagPage,
    PopoverpagesharePage,
    ViewtalentPage,
    AnumationviewComponent,
    HowtouploadpagesidemenuPage,
    FollowedartistPage,
    ViewvideoplayPage,
    LoaderdataComponent,
    ViewvideotopperformersPage,
    ComponentsExpandableComponent,
    ChatinboxreplyPage,
    ProgressbarComponent,
    SelectuploadcategoryPage,
    CompetitiondetailpagePage,
    CommunitypopoverPage,
    FollowersPagepPage
  ],
  imports: [
    RlTagInputModule,
    BrowserModule,
    StarRatingModule,
     HttpClientModule,
     HttpModule,
     IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularCropperjsModule,
    JwSocialButtonsModule,
    YoutubePlayerMiniModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    
    MyApp,
    HomePage,
    SecuritypanelPage,
    TabspagePage,
    DashboardPage,
    ArtprofilePage,
    InboxpagePage,
    CreateconversationpagePage,
    EditprofilepagePage,
    CategoryPage,
    UploadmediaPage,
    ReportprobPage,
    GetintouchPage,
    AboutuspPage,
    HowitworkspPage,
    TermsandconditionsPage,
    PrivacypPage,
    CommunitygudelinesPage,
    CompetitionspPage,
    CategorytabpagePage,
    SubcattabpPage,
    ChildcattabpagePage,
    ChoosecatpagetabPage,
    CommentsboxPage,
    ArtistprofilepagePage,
    EditproartistpagPage,
    PopoverpagesharePage,
    ViewtalentPage,
    AnumationviewComponent,
    HowtouploadpagesidemenuPage,
    FollowedartistPage,
    ViewvideoplayPage,
    LoaderdataComponent,
    ViewvideotopperformersPage,
    ChatinboxreplyPage,
    SelectuploadcategoryPage,
    CompetitiondetailpagePage,
    CommunitypopoverPage,
    FollowersPagepPage
  ],
  providers: [
    Deeplinks,
    InAppBrowser,
    DocumentViewer,
    File,
    FileChooser,
    FileTransfer,
    Camera,
    SocialSharing,
    Facebook,
    GooglePlus,
    TwitterConnect,
    NativePageTransitions,
    StatusBar,
    SplashScreen,
      Pinterest, 
      YoutubeVideoPlayer,
     {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide:HTTP_INTERCEPTORS,useClass:InterceptorProvider,multi:true},
    SecurityProvider,
    DashboardserviceProvider,
   
  ]
})
export class AppModule {}
