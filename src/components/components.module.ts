import { NgModule } from '@angular/core';
import { AnumationviewComponent } from './anumationview/anumationview';
import { LoaderdataComponent } from './loaderdata/loaderdata';
import { ComponentsExpandableComponent } from './components-expandable/components-expandable';
import { ProgressbarComponent } from './progressbar/progressbar';
@NgModule({
	declarations: [AnumationviewComponent,
    LoaderdataComponent,
    ComponentsExpandableComponent,
    ProgressbarComponent],
	imports: [],
	exports: [AnumationviewComponent,
    LoaderdataComponent,
    ComponentsExpandableComponent,
    ProgressbarComponent]
})
export class ComponentsModule {}
