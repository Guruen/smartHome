import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CurrentTemperatureDto} from "../dto/currentTemperature.dto";
import {SocketDrivhus} from "../../../app.module";
import {wifiDto} from "../dto/wifi.dto";
import { temperature } from '../dto/temperature.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrivhusService {

  constructor(private drivhusSocket: SocketDrivhus, private http: HttpClient) { }

  listenForCurrentTemperature(): Observable<CurrentTemperatureDto> {
    return this.drivhusSocket.fromEvent<CurrentTemperatureDto>('getCurrentTemperature')
  }

  listenForWifiStrength(): Observable<wifiDto> {
    return this.drivhusSocket.fromEvent<wifiDto>('getCurrentWifi')
  }

  getTemperatureData(date: string, period: string): Observable<temperature[]> {
    const headers = new HttpHeaders()
    .append('content-type', 'application/json')
    .append('Access-Control-Allow-Origin', 'https://bbrandt.dk');

    const url = environment.drivhusBackendUrl + '/drivhus?date='+date+'&period='+period;

    return this.http.get<temperature[]>(url, {headers: headers})
  }
}
