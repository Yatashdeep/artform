import { Component } from '@angular/core';

/**
 * Generated class for the LoaderdataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loaderdata',
  templateUrl: 'loaderdata.html'
})
export class LoaderdataComponent {
  fakeUsers: Array<any> = new Array(100);
  text: string;

  constructor() {
    console.log('Hello LoaderdataComponent Component');
    this.text = 'Hello World';
  }

}
