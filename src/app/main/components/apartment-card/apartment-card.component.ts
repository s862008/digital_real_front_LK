import { Component, Input } from '@angular/core';
import { ApartmentShortCard } from '../../../core/models/apartment';

@Component({
  selector: 'app-apartment-card',
  templateUrl: './apartment-card.component.html',
  styleUrl: './apartment-card.component.css',
})
export class ApartmentCardComponent {
  @Input() public apartmentItem: ApartmentShortCard | undefined;
}
