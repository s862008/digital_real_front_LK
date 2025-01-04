import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumberOfRoomsPipe } from './number-of-rooms.pipe';

@NgModule({
  exports: [NumberOfRoomsPipe],
  declarations: [NumberOfRoomsPipe],
  imports: [CommonModule],
})
export class NumberOfRoomsModule {}
