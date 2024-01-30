import {Component, Input} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    MatFormField,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatInput,
    NgForOf
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  @Input() options: string[] = [];
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';

  getFilteredOptions(): string[] {
    const input = this.control.value;
    if (!input) {
      return this.options;
    }
    const filterValue = input.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
