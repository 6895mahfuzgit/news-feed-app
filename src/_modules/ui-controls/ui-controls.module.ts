import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  exports:[
    MatSliderModule,
    MatButtonToggleModule
  ]
})
export class UiControlsModule { }
