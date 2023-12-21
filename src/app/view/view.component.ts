// src/app/view/view.component.ts
import { Component } from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {TableComponent} from "../table/table.component";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    EditorComponent,
    TableComponent,
  ],
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  showEditor = false;

  onItemClicked(employee: any) {
    this.showEditor = true;
    console.log(employee); // to check if the clicked employee data is received
  }
}
