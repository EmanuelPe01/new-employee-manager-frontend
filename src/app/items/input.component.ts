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
      [readOnly]="desactivado"
      class = "input"
    />
  `,
})
export class InputComponent {
  @Input() placeHolder = ''
  @Input() type = ''
  @Input() control!: FormControl
  @Input() desactivado: boolean = false

}
