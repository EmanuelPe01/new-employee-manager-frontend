import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'custom-selector',
    styleUrls: ['./styles.css'],
    template: `
        <select name="select" class="input" [formControl]="control">
            <option selected disabled value="">{{placeHolder}}</option>
            <option *ngFor="let option of options" [value]="option.id">
                {{option.nombre}}
            </option>
        </select>
    `
})

export class SelectComponent {
    @Input() placeHolder = ''
    @Input() options: any = [] 
    @Input() control!: FormControl
}