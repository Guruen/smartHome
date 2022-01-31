import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
