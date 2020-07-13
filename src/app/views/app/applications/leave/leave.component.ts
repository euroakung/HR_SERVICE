import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { AddNewLeaveModalComponent } from  "src/app/containers/applications/leave-modal/add-leave-modal/add-new-leave-modal.component";
import { LeaveService, ILeave } from "./leave.service";
import { ContextMenuComponent } from "ngx-contextmenu";
import { DatatableComponent,ColumnMode } from '@swimlane/ngx-datatable';
import { AddNewLeaveSickModalComponent } from 'src/app/containers/applications/leave-modal/add-leave-modal/add-new-sick-modal.component';


import { AddNewLeaveHelpWifeModalComponent } from 'src/app/containers/applications/leave-modal/add-leave-modal/add-new-helpwife-modal.component';
import { AddNewLeaveOrdinationModalComponent } from 'src/app/containers/applications/leave-modal/add-leave-modal/add-new-ordination-modal.component';


@Component({
  selector: "app-leave",
  templateUrl: "./leave.component.html",
})
export class LeaveComponent implements OnInit, OnDestroy {
  columns = [
    { prop: "category", name: "category" },
    { prop: "detail", name: "detail" },
    { prop: "label", name: "label" },
    { prop: "labelColor", name: "labelColor" },
    { prop: "id", name: "Id" },
  ];
  itemsPerPage = 10;
  itemOptionsPerPage = [5, 10, 20];
  selected = [];
  temp = [];
  selectAllState = "";
  itemOrder = "เลขคำขอ";
  itemOptionsOrders = ["ประเภทการลา", "วันที่ลา", "สถานะ", "เลขคำขอ"];
  displayOptionsCollapsed = false;
 
  //rows = ILeave.slice(0, 20).map(({ title, sales, stock, category, id }) => ({ title, sales, stock, category, id }));
  leaveItems = [];
  @ViewChild('myTable') table: any;
  @ViewChild("basicMenu") public basicMenu: ContextMenuComponent;


  @ViewChild("addNewModalRef", { static: true })    
  addNewModalRef: AddNewLeaveModalComponent ; 

  @ViewChild('addNewSickModalRef', { static: true }) 
  addNewSickModalRef: AddNewLeaveSickModalComponent;


  @ViewChild('addNewOrdinationModalRef', { static: true }) 
  addNewOrdinationModalRef: AddNewLeaveOrdinationModalComponent;



  @ViewChild('addNewHelpWifeModalRef', { static: true }) 
  addNewHelpWifeModalRef: AddNewLeaveHelpWifeModalComponent;


  // @ViewChild('addNewHajjModalRef', { static: true }) 
  // addNewHajjModalRef: AddNewLeaveSickModalComponent;


  rows: any[] = [];
  expanded: any = {};
  timeout: any;  

  constructor(
    private leaveService: LeaveService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body, "right-menu");
    this.getItems();
    this.fetch((data) => {
      this.rows = data;
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "right-menu");
  }

  getItems() {
    this.leaveService.getLeaveItems().subscribe((data: any[]) => {
      this.leaveItems = data;
    });
    
  }

  showAddNewModal(leavetype: number) { 
    if  (leavetype == 2 ||leavetype == 4  ){  
      ///ลาป่วย ลาคลอดบุตร
      this.addNewSickModalRef.show(leavetype); 
    }else  if  (leavetype == 5 ){  
       ///ลาอุปสมบท
      this.addNewOrdinationModalRef.show(leavetype); 
    }  else  if  (leavetype == 6 ){  
      ///ลาพิธีฮัจย์
    // this.addNewHajjModalRef.show(leavetype); 
   }else  if  (leavetype == 11   ){  
      //ลาไปช่วยเหลือภริยาที่คลอดบุตร
      this.addNewHelpWifeModalRef.show(leavetype); 
    }else  if  (leavetype == 1 ||leavetype == 3   ){
      ///ลากิจส่วนตัว 3 ลาพักผ่อน 1
      alert ('dasdasd');
      this.addNewModalRef.show(leavetype); 
    }
  }
 
  isSelected(p: ILeave) {
    return this.selected.findIndex((x) => x.id === p.RequestId) > -1;
  }
  onSelect(item: ILeave) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter((x) => x.id !== item.RequestId);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.leaveItems.length) {
      this.selectAllState = "checked";
    } else if (this.selected.length !== 0) {
      this.selectAllState = "indeterminate";
    } else {
      this.selectAllState = "";
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
    const val = event.target.value.toLowerCase().trim();
    const count = this.columns.length;
    console.log(this.temp);

    const keys = Object.keys(this.temp[0]);
    console.log(this.leaveItems);

    const temp = this.leaveItems.filter((item) => {
      // for (let i = 0; i < count; i++) {
      //   if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) || !val) {
      //     return true;
      //   }
      // }
    });
  }
  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`);

  //   req.onload = () => {
  //     const data = JSON.parse(req.response);
  //     cb(data);
  //   };

  //   req.send();
  // }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET',`http://swimlane.github.io/ngx-datatable/assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
