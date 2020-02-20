import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtprofilePage } from './artprofile';

@NgModule({
  declarations: [
    ArtprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(ArtprofilePage),
  ],
})
export class ArtprofilePageModule {}
