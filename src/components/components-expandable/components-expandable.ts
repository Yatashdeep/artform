import { Component,Renderer2 ,AfterViewInit,ViewChild,Input,ElementRef} from '@angular/core';

/**
 * Generated class for the ComponentsExpandableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components-expandable',
  templateUrl: 'components-expandable.html'
})
export class ComponentsExpandableComponent {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = null;
  text: string;

  constructor(public render:Renderer2) {
    console.log('Hello ComponentsExpandableComponent Component');
    this.text = 'Hello World';
  }
  ngAfterViewInit() {
    this.render.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }

}
