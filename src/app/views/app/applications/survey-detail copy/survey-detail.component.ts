import {  Component, OnInit, OnDestroy,ElementRef, HostListener, ViewChild, AfterContentInit , Renderer2 } from '@angular/core';
import { ISurvey, SurveyService } from '../survey/survey.service';
import { Colors } from './node_modules/src/app/constants/colors.service';
import { ChartService } from './node_modules/src/app/components/charts/chart.service';
import { ScrollableComponent } from './node_modules/src/app/views/app/ui/datatables/scrollable/scrollable.component'; 
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ApiService, IProduct } from './node_modules/src/app/data/api.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html'
})
export class SurveyDetailComponent implements OnInit, OnDestroy {
  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  chartDataConfig: ChartService;
  productDataConfig: ApiService;

  currentSurvey: ISurvey;
  colors = Colors.getColors();



  ColumnMode = ColumnMode;
  headerHeight = 30;
  rowHeight = 60;
  itemsPerPage = 15;
  currentPage = 0;

  isLoading: boolean;
  rows: IProduct[] = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'sales', name: 'Sales' },
    { prop: 'category', name: 'Category' },
    { prop: 'id', name: 'Id' }
  ];
  screenHeight: number;
  selected = [];
  temp = [];
  SelectionType = SelectionType;
  selectAllState = '';
  endOfTheList = false;




  ageChartData = {
    labels: ['12-24', '24-30', '30-40', '40-50', '50-60'],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3,
        this.colors.themeColor4,
        this.colors.themeColor5
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10,
        this.colors.themeColor4_10,
        this.colors.themeColor5_10
      ],
      borderWidth: 2,
      data: [15, 25, 20, 30, 14]
    }]
  };

  genderChartData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10
      ],
      borderWidth: 2,
      data: [85, 45, 20]
    }]
  };

  workChartData = {
    labels: [
      'Employed for wages',
      'Self-employed',
      'Looking for work',
      'Retired'
    ],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3,
        this.colors.themeColor4
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10,
        this.colors.themeColor4_10
      ],
      borderWidth: 2,
      data: [15, 25, 20, 8]
    }]
  };

  codingChartData = {
    labels: ['Python', 'JavaScript', 'PHP', 'Java', 'C#'],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3,
        this.colors.themeColor4,
        this.colors.themeColor5
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10,
        this.colors.themeColor4_10,
        this.colors.themeColor4_10
      ],
      borderWidth: 2,
      data: [15, 25, 20, 8, 25]
    }]
  };

  constructor(private surveyService: SurveyService, private chartService: ChartService, private renderer: Renderer2,private apiService: ApiService, private el: ElementRef) {
    this.chartDataConfig = this.chartService;
    this.productDataConfig = this.apiService;
  }

  ngOnInit() {
    ///  this.renderer.addClass(document.body, 'right-menu');
    this.onScroll(null);
      this.getItems();
    }
  
    ngAfterContentInit() {
    }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event?) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    this.getScreenSize();
    if ((!this.isLoading && pos === max) || (!this.isLoading && event === null)) {
      const limit = this.itemsPerPage;
      this.currentPage++;
      this.loadPage(limit);
    }
  }
  
  loadPage(limit: number) {
    this.isLoading = true;
   var daa =  this.apiService.getProducts(limit, this.currentPage).subscribe(
      data => {
        if (data.status) {
          this.isLoading = false;
          const rows = [...this.rows, ...data.data];
          this.rows = rows;
          this.temp = [...this.rows, ...data.data];
          this.setSelectAllState();
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
    console.log(daa);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    const temp = this.temp.filter(item => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) || !val) {
          return true;
        }
      }
    });
    this.rows = temp;
    this.table.offset = 0;
  }


  searchFilter(event) {
    const val = event.target.value.toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    const temp = this.temp.filter(item => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) || !val) {
          return true;
        }
      }
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.rows.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event) {
    if ($event.target.checked) {
      this.selected = [...this.rows];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }


  

  ngOnDestroy() {
  //  this.renderer.removeClass(document.body, 'right-menu');
  }
  getItems() {
    this.surveyService.getSurveyItems()
      .subscribe(items => {
        this.currentSurvey = items[0];
      });
  }

  addNewQuestion() {
    // this.currentSurvey.questions.push({
    //   id: this.currentSurvey.questions.length + 1,
    //   title: 'New Question',
    //   question: 'Question',
    //   answerType: 0,
    //   answers: []
    // });
  }
}
