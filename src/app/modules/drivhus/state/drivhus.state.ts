import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {CurrentTemperatureDto} from "../dto/currentTemperature.dto"
import {
  listenForCurrentTemperature,
  listenForWifiInfo,
  stopListeningForCurrentTemperature,
  stopListeningForWifiInfo,
  updateCurrentTemperature,
  updateWifiInfo,
} from './drivhus.action';
import {Subscription} from "rxjs";
import {DrivhusService} from "../services/drivhus.service";
import {wifiDto} from "../dto/wifi.dto";

export interface DrivhusStateModel {
  currentTemperature: CurrentTemperatureDto;
  wifiInfo: wifiDto;
}

@State<DrivhusStateModel>({
  name: 'drivhus',

})

@Injectable()
export class DrivhusState {
  private drivhusSubs: Subscription | undefined;

  constructor(private drivhusService: DrivhusService) {
  }

  @Selector()
  static currentTemperature(state: DrivhusStateModel): CurrentTemperatureDto {
    return state.currentTemperature;
  }

  @Selector()
  static wifiInfo(state: DrivhusStateModel): wifiDto {
    return state.wifiInfo;
  }

  @Action(listenForCurrentTemperature)
  listenForCurrentTemperature(ctx: StateContext<DrivhusStateModel>): void {
    this.drivhusSubs = this.drivhusService.listenForCurrentTemperature()
      .subscribe( currentTemp => {
        ctx.dispatch(new updateCurrentTemperature(currentTemp))
      })
  }

  @Action(stopListeningForCurrentTemperature)
  stopListeningForCurrentTemperature(ctx: StateContext<DrivhusStateModel>): void {
    if (this.drivhusSubs) {
      this.drivhusSubs.unsubscribe()
    }
  }

  @Action(updateCurrentTemperature)
  updateCurrentTemperature(ctx: StateContext<DrivhusStateModel>, uct: updateCurrentTemperature): void {
    const state = ctx.getState();
    const newState: DrivhusStateModel = {
      ...state,
      currentTemperature: uct.currentTemperature
    }
    ctx.setState(newState)
  }

  @Action(listenForWifiInfo)
  listenForWifiInfo(ctx: StateContext<DrivhusStateModel>): void {
    this.drivhusSubs = this.drivhusService.listenForWifiStrength()
      .subscribe(wifiInfo => {
        ctx.dispatch(new updateWifiInfo(wifiInfo))
      })
  }

  @Action(stopListeningForWifiInfo)
  stopListeningForWifiInfo(ctx: StateContext<DrivhusStateModel>): void {
    if (this.drivhusSubs) {
      this.drivhusSubs.unsubscribe()
    }
  }

  @Action(updateWifiInfo)
  updateWifiInfo(ctx: StateContext<DrivhusStateModel>, uwi: updateWifiInfo): void {
    const state = ctx.getState();
    const newState: DrivhusStateModel = {
      ...state,
      wifiInfo: uwi.wifiInfo
    }
    ctx.setState(newState)
  }
}
