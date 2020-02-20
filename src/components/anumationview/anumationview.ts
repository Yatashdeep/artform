import { Component } from '@angular/core';
/**
 * Generated class for the AnumationviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'anumationview',
  templateUrl: 'anumationview.html'
})
export class AnumationviewComponent {

  text: string;

  constructor() {
    console.log('Hello AnumationviewComponent Component');
    this.text = 'Hello World';
  }

}
