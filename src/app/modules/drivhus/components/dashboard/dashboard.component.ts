import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DrivhusState} from "../../state/drivhus.state";
import {Select, Store} from "@ngxs/store";
import {CurrentTemperatureDto} from "../../dto/currentTemperature.dto";
import {
  listenForCurrentTemperature,
  listenForWifiInfo,
  stopListeningForCurrentTemperature, stopListeningForWifiInfo
} from "../../state/drivhus.action";
import {wifiDto} from "../../dto/wifi.dto";

@Component({
  selector: 'drivhus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Select(DrivhusState.currentTemperature) currentTemperature$: Observable<CurrentTemperatureDto> | undefined;
  @Select(DrivhusState.wifiInfo) wifiInfo$: Observable<wifiDto> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new listenForWifiInfo())
    this.store.dispatch(new listenForCurrentTemperature())
  }

  ngOnDestroy(): void {
    this.store.dispatch(new stopListeningForWifiInfo())
    this.store.dispatch(new stopListeningForCurrentTemperature())
  }

}
