import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrivhusRoutingModule } from './drivhus-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {NgxsModule} from "@ngxs/store";
import {DrivhusState} from "./state/drivhus.state";
import { ChartComponent } from './components/chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    DrivhusRoutingModule,
    NgxsModule.forFeature([DrivhusState]),    
    NgxEchartsModule,
    SharedModule
  ]
})
export class DrivhusModule { }
