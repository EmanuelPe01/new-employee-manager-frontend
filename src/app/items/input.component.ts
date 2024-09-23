import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-input',
  styleUrls: ['./styles.css'],
  template: `
    <input 
      [placeholder]="placeHolder"
      [type]="type"
      [formControl]="control"
      class = "input"
    />
  `,
})
export class InputComponent {
  @Input() placeHolder = ''
  @Input() type = ''
  @Input() control!: FormControl

}
