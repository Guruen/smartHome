import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { temperature } from '../../dto/temperature.dto';
import { getTemperatureData } from '../../state/drivhus.action';
import { DrivhusState } from '../../state/drivhus.state';

@Component({
  selector: 'drivhus-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Select(DrivhusState.temperatureData) temperatureData$!: Observable<temperature[]>;
  tempDataArray!: any[][];
  options: any;
  xAxisMin: string = '';
  xAxisMax: string = '';

  date = new Date();
  selectedPeriod: string = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.setScale(this.date, 'day');
    this.temperatureData$.subscribe(data => {
      if (data) {
        this.tempDataArray = data.map(t => [t.timestamp, t.temperature_inside_1, t.temperature_inside_2, t.temperature_water, t.temperature_outside]);
        this.setChartOptions();
      }
    });
  }

  ngOnDestroy(): void { }

  getTemperatureData(date: string, period: string): void {
    this.store.dispatch(new getTemperatureData(date, period))
  }

  selectPeriod(period: string): void {
    this.setScale(this.date, period)
  }

  setChartOptions() {

    this.options = {
      legend: {
        show: true,
      },
      tooltip: {
        trigger: 'axis',
      },
      dataset: {
        source: this.tempDataArray,
        dimensions: ['timestamp', 'inside_1', 'inside_2', 'water', 'outside'],
      },
      xAxis: {
        type: 'time',
        min: this.xAxisMin,
        max: this.xAxisMax,
        axisLabel: {
          formatter: {
            hour: '{HH}:{mm}',
            day: '{d}. {MMM}',
            month: '{MMM}',
            year: '{MMM}',
          },
          showMinLabel: 'true',
          showMaxLabel: 'true',
        },
       },
      yAxis: {
        type: 'value',
        name: '°C',
        nameLocation: 'center',
        nameTextStyle: {
          padding: [0, 0, 10, 0],
          fontWeight: 'bold',
        },
      },
      series: [
        {
          name: 'Indenfor 1',
          type: 'line',
          encode: {
            x: 'timestamp',
            y: 'inside_1'
          },
          z: 4,
          symbol: 'none',
        },
        {
          name: 'Indenfor 2',
          type: 'line',
          encode: {
            x: 'timestamp',
            y: 'inside_2'
          },
          z: 3,
          symbol: 'none',
        },
        {
          name: 'Vand',
          type: 'line',
          encode: {
            x: 'timestamp',
            y: 'water'
          },
          z: 2,
          symbol: 'none',
        },
        {
          name: 'Udenfor',
          type: 'line',
          encode: {
            x: 'timestamp',
            y: 'outside'
          },
          z: 1,
          symbol: 'none',
        },
      ],
    };
  }

  setScale(date: Date, period: string): void {
    const monthNames = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December' ];
    const dayNames = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];
    switch (period) {
      case "day":
        const day = date.getDay();
        if (day == 0)
        {
          this.selectedPeriod = dayNames[6] +' d. '+ date.toLocaleDateString();
        } else {
        this.selectedPeriod = dayNames[day-1] +' d. '+ date.toLocaleDateString();
        }
        this.xAxisMin = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' 00:00';
        this.xAxisMax = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' 23:59';
        this.getTemperatureData(date.toDateString(), period);
        break;
      case 'month':
        this.selectedPeriod = monthNames[date.getMonth()] +' '+ date.getFullYear();
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0)
        this.xAxisMin = date.getFullYear()+'-'+(date.getMonth()+1)+'-1'
        this.xAxisMax = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+lastDayOfMonth.getDate()
        this.getTemperatureData(date.toDateString(), period);
        break;
      case 'year':
        this.selectedPeriod = date.getFullYear()+'';
        this.xAxisMin = date.getFullYear()+'-1'
        this.xAxisMax = date.getFullYear()+'-12'
        this.getTemperatureData(date.toDateString(), period);
        break;
      default:
        break;
    }
  }

}
