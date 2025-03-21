import {Component, Input} from '@angular/core';
import {ApartmentFull} from "../../../core/models/apartment";

@Component({
  selector: 'app-apartment-parametrs',
  templateUrl: './apartment-parametrs.component.html',
  styleUrl: './apartment-parametrs.component.css'
})
export class ApartmentParametrsComponent {
  @Input() apartment!: ApartmentFull;
}
