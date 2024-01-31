import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";


@Component({
  selector: 'app-formfield',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.css'],
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage: string = '';
  @Input() formControl: FormControl = new FormControl();
  @Input() disabled: boolean = false;
}
