import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrivhusRoutingModule } from './drivhus-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {NgxsModule} from "@ngxs/store";
import {DrivhusState} from "./state/drivhus.state";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DrivhusRoutingModule,
    NgxsModule.forFeature([DrivhusState]),
    SharedModule
  ]
})
export class DrivhusModule { }
