import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../components/charts/chart.service';
import {
  radarChartData
} from '../../../data/charts';

@Component({
  selector: 'app-order-stock-radar-chart',
  templateUrl: './order-stock-radar-chart.component.html'
})
export class OrderStockRadarChartComponent implements OnInit {
  chartDataConfig: ChartService;
  radarChartData = radarChartData;

  constructor(private chartService: ChartService) {
    this.chartDataConfig = this.chartService;
  }

  ngOnInit() {
  }

}
