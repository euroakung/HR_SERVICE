import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-list-page-header',
  templateUrl: './list-page-header.component.html'
})
export class ListPageHeaderComponent implements OnInit {
  displayOptionsCollapsed = false;

  @Input() showOrderBy = true;
  @Input() showSearch = true;
  @Input() showItemsPerPage = true;
  @Input() showDisplayMode = true;
  @Input() displayMode = 'list';
  @Input() selectAllState = '';
  @Input() itemsPerPage = 10;
  @Input() itemOptionsPerPage = [5, 10, 20];
  @Input() itemOrder = { label: 'Product Name', value: 'title' };
  @Input()  itemOptionsOrders = [{ label: 'Product Name', value: 'title' }, { label: 'Category', value: 'category' }, { label: 'Status', value: 'status' }];

  @Output() changeDisplayMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewItem: EventEmitter<any> = new EventEmitter();
  @Output() selectAllChange: EventEmitter<any> = new EventEmitter();
  @Output() searchKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() itemsPerPageChange: EventEmitter<any> = new EventEmitter();
  @Output() changeOrderBy: EventEmitter<any> = new EventEmitter();

  @ViewChild('search') search: any;
  constructor() { }

  ngOnInit() {
  }

  onSelectDisplayMode(mode: string) {
    this.changeDisplayMode.emit(mode);
  }
  onAddNewItem() {
    this.addNewItem.emit(null);
  }
  selectAll(event) {
    this.selectAllChange.emit(event);
  }
  onChangeItemsPerPage(item) {
    this.itemsPerPageChange.emit(item);
  }

  onChangeOrderBy(item) {
    this.itemOrder = item;
    this.changeOrderBy.emit(item);
  }

  onSearchKeyUp($event){
    this.searchKeyUp.emit($event);
  }
}
