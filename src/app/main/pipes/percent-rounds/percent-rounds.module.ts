import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentRoundsPipe } from './percent-rounds.pipe';

@NgModule({
  exports: [PercentRoundsPipe],
  declarations: [PercentRoundsPipe],
  imports: [CommonModule],
})
export class PercentRoundsModule {}
