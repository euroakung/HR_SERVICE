import { Component, OnInit, ViewChild, OnDestroy, Renderer2 } from '@angular/core';
import { AddNewLeaveModalComponent } from 'src/app/containers/applications/add-new-leave-modal/add-new-leave-modal.component';
import { LeaveService, ILeave } from  './leave.service'
import { ContextMenuComponent } from 'ngx-contextmenu';
@Component({
    selector: 'app-leave',
    templateUrl:  './leave.component.html'
  })
  export class LeaveComponent implements OnInit, OnDestroy {

    columns = [
        { prop: 'title', name: 'Title' },
        { prop: 'sales', name: 'Sales' },
        { prop: 'stock', name: 'Stock' },
        { prop: 'category', name: 'Category' },
        { prop: 'id', name: 'Id' }
      ];
      itemsPerPage = 10;
      itemOptionsPerPage = [5, 10, 20];
      selected = [];
       temp = [];
      selectAllState = '';
      itemOrder = 'Title';
      itemOptionsOrders = ['Title', 'Category', 'Status', 'Label'];
      displayOptionsCollapsed = false;
    
      leaveItems: ILeave[] = [];
      @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
      @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddNewLeaveModalComponent;
    
      constructor(private leaveService: LeaveService, private renderer: Renderer2) { }
    
      ngOnInit() {
        this.renderer.addClass(document.body, 'right-menu');
        this.getItems();
      }
    
      ngOnDestroy() {
        this.renderer.removeClass(document.body, 'right-menu');
      }
    
      getItems() {
        this.leaveService.getLeaveItems()
          .subscribe(items => {
            this.leaveItems = items;
            
          });
      }
    
      showAddNewModal(leavetype: number) {
        this.addNewModalRef.show(leavetype);
      }
    
      isSelected(p: ILeave) {
        return this.selected.findIndex(x => x.id === p.id) > -1;
      }
      onSelect(item: ILeave) {
        if (this.isSelected(item)) {
          this.selected = this.selected.filter(x => x.id !== item.id);
        } else {
          this.selected.push(item);
        }
        this.setSelectAllState();
      }
    
      setSelectAllState() {
        if (this.selected.length === this.leaveItems.length) {
          this.selectAllState = 'checked';
        } else if (this.selected.length !== 0) {
          this.selectAllState = 'indeterminate';
        } else {
          this.selectAllState = '';
        }
      }
    
      selectAll($event) {
        if ($event.target.checked) {
          this.selected = [...this.leaveItems];
        } else {
          this.selected = [];
        }
        this.setSelectAllState();
      }

      updateFilter(event) {
        alert("dddd");
        const val = event.target.value.toLowerCase().trim();
        const count = this.columns.length;
        const keys = Object.keys(this.temp[0]);
        const temp = this.leaveItems.filter(item => {
          for (let i = 0; i < count; i++) {
            if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) || !val) {
              return true;
            }
          }
        });
         
      }
    
    
    }
    