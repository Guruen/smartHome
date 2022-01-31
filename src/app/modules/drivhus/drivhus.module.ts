import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrivhusRoutingModule } from './drivhus-routing.module';
import { DashboardComponent } from './drivhus/pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DrivhusRoutingModule
  ]
})
export class DrivhusModule { }
