import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import productItems from 'src/app/data/products';
@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html'
})
export class ResponsiveComponent {
  @ViewChild('myTable') table: any;

  expanded: any = {};
  timeout: any;
  rows = productItems.slice(0, 20).map(({ title, sales, stock, category, date }) => ({ title, sales, stock, category, date }));
  itemsPerPage = 10;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'sales', name: 'Sales' },
    { prop: 'stock', name: 'Stock' },
    { prop: 'category', name: 'Category' },
    { prop: 'date', name: 'Date' }
  ];
  temp = [...this.rows];
  constructor() {

  }

  onPage(event) {
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
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

}
