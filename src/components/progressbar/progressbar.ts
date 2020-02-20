import { Component,Input } from '@angular/core';
import { from } from 'rxjs/observable/from';
/**
 * Generated class for the ProgressbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progressbar',
  templateUrl: 'progressbar.html'
})
export class ProgressbarComponent {
@Input('progress') progress;
  text: string;

  constructor() {
    console.log('Hello ProgressbarComponent Component');
    this.text = 'Hello World';
  }

}
