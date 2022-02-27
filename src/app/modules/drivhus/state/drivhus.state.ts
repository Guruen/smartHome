import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {CurrentTemperatureDto} from "../dto/currentTemperature.dto"
import {
  getTemperatureData,
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
import { temperature } from "../dto/temperature.dto";
import { take, tap } from "rxjs/operators";

export interface DrivhusStateModel {
  currentTemperature: CurrentTemperatureDto;
  wifiInfo: wifiDto;
  temperatureData: temperature[];
}

@State<DrivhusStateModel>({
  name: 'drivhus',

})

@Injectable()
export class DrivhusState {
  private currentTempSub: Subscription | undefined;
  private currentWifiSub: Subscription | undefined;

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

  @Selector()
  static temperatureData(state: DrivhusStateModel): temperature[] {
    return state.temperatureData
  }

  @Action(listenForCurrentTemperature)
  listenForCurrentTemperature(ctx: StateContext<DrivhusStateModel>): void {
    this.currentTempSub = this.drivhusService.listenForCurrentTemperature()
      .subscribe( currentTemp => {
        ctx.dispatch(new updateCurrentTemperature(currentTemp))
      })
  }

  @Action(stopListeningForCurrentTemperature)
  stopListeningForCurrentTemperature(ctx: StateContext<DrivhusStateModel>): void {
    if (this.currentTempSub) {
      this.currentTempSub.unsubscribe()
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
    this.currentWifiSub = this.drivhusService.listenForWifiStrength()
      .subscribe(wifiInfo => {
        ctx.dispatch(new updateWifiInfo(wifiInfo))
      })
  }

  @Action(stopListeningForWifiInfo)
  stopListeningForWifiInfo(ctx: StateContext<DrivhusStateModel>): void {
    if (this.currentWifiSub) {
      this.currentWifiSub.unsubscribe()
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

  @Action(getTemperatureData, { cancelUncompleted: true })
  getTemperatureData(ctx: StateContext<DrivhusStateModel>, filter: getTemperatureData): void {
    this.drivhusService.getTemperatureData(filter.date, filter.period)
      .pipe(
        take(1),
        tap(temperatureData => {
          ctx.patchState({temperatureData})
        })
      ).subscribe();
  }
}
