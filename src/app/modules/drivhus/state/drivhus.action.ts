import {CurrentTemperatureDto} from "../dto/currentTemperature.dto";
import {wifiDto} from "../dto/wifi.dto";

export class listenForCurrentTemperature{
  static readonly type = '[Drivhus] Listen for Current Temperature'
}

export class stopListeningForCurrentTemperature{
  static readonly type = '[Drivhus] Stop Listening for Current Temperature'
}

export class updateCurrentTemperature{
  constructor(public currentTemperature: CurrentTemperatureDto) {
  }
  static readonly type = '[Drivhus] Update Current Temperature'
}

export class listenForWifiInfo{
  static readonly  type = '[Drivhus] Listen for WiFi Strength'
}

export class stopListeningForWifiInfo{
  static readonly type = '[Drivhus] Stop Listening for WiFi Strength'
}

export class updateWifiInfo{
  constructor(public wifiInfo: wifiDto) {

  }
  static readonly type = '[Drivhus] Update WiFi Strength'
}
