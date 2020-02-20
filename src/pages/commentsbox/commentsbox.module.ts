import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsboxPage } from './commentsbox';

@NgModule({
  declarations: [
    CommentsboxPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsboxPage),
  ],
})
export class CommentsboxPageModule {}
