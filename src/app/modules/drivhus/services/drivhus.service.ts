import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CurrentTemperatureDto} from "../dto/currentTemperature.dto";
import {SocketDrivhus} from "../../../app.module";
import {wifiDto} from "../dto/wifi.dto";

@Injectable({
  providedIn: 'root'
})
export class DrivhusService {

  constructor(private drivhusSocket: SocketDrivhus) { }

  listenForCurrentTemperature(): Observable<CurrentTemperatureDto> {
    return this.drivhusSocket.fromEvent<CurrentTemperatureDto>('getCurrentTemperature')
  }

  listenForWifiStrength(): Observable<wifiDto> {
    return this.drivhusSocket.fromEvent<wifiDto>('getCurrentWifi')
  }
}
