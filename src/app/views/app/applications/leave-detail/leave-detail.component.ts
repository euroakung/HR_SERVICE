import {  Component, OnInit, OnDestroy,ElementRef, HostListener, ViewChild, AfterContentInit , Renderer2 } from '@angular/core';
 
import { Colors } from 'src/app/constants/colors.service'; 
import { ScrollableComponent } from 'src/app/views/app/ui/datatables/scrollable/scrollable.component'; 
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
 
import { SelectDataService, Person } from 'src/app/containers/forms/select/select.data.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { FormGroup ,FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap, filter, map } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thBeLocale } from 'ngx-bootstrap/locale';  
import { timeRequired} from 'src/app/containers/form-validations/custom.validators'; 

import { ActivatedRoute  } from '@angular/router';
import { allowedNodeEnvironmentFlags } from 'process'; 
import { DatePipe } from '@angular/common';
 
import { LeaveService, ILeave }  from '../leave/leave.service'
import { ApiAproverService, IApproveResponse } from 'src/app/data/approver.service'; 
import { ApiCountryService } from 'src/app/data/country.service';

import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ApiInformService } from 'src/app/data/inform.service';
import { environment } from 'src/environments/environment'; 


defineLocale('th-be', thBeLocale);
@Component({ 
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html'
})
export class LeaveDetailComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  model: any = {};
  @ViewChild('form') form: FormGroup;
  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
 
public loading = false;
  leaveItems = [];
  ColumnMode = ColumnMode;
  headerHeight = 30;
  rowHeight = 60;
  itemsPerPage = 15;
  currentPage = 0;
  requestBarcodenum= '';
  isLoading: boolean; 
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


  //https://localhost:44346/api/Approver
  //githubUsers$: Observable<any[]>;
  //this.githubUsers$ = this.selectDataService.getGithubAccounts('anjm');
  

   
  githubUsers$: Observable<any[]>;
//   selectedApprover: IApproveResponse[] = [];
//    selectedleader:   IApproveResponse[] = [];
//    selectedInform:  IApproveResponse[] = [];
// ;
//   selecteddirector:  IApproveResponse[] = [];

selectedApprover:Observable<any[]>;
   selectedleader:  Observable<any[]>;
   selectedInform: Observable<any[]>;
;
  selecteddirector: Observable<any[]>;
  selectedCountry: Observable<any[]>;
 pipe = new DatePipe('en-US');
 now = Date.now();
  datePipe: any;
  facultyId = '';
  constructor(private localeService: BsLocaleService,   private renderer: Renderer2,   private el: ElementRef, private selectDataService: SelectDataService, private leaveService:LeaveService, private formBuilder: FormBuilder,private route:  ActivatedRoute ,private apiAproverService :ApiAproverService,private apiCountry :ApiCountryService,private authenticationService :AuthenticationService,private apiInformService:ApiInformService) {
   
   this.localeService.use('th-be');
  
 
  }

 


  ngOnInit() {
    this.renderer.addClass(document.body, 'right-menu');
//alert(this.pipe.transform(this.now, 'dd/MM/yyyy'));
this.facultyId =    this.authenticationService.currentUserValue.facultyId 

this.selectedleader = this.apiAproverService.getApprove(environment.approverList.leader,this.facultyId,false)  ; //หัวหน้างาน
this.selecteddirector = this.apiAproverService.getApprove(environment.approverList.director,this.facultyId,false) ; //ผอ/คณบดี
this.selectedApprover = this.apiAproverService.getApprove(environment.approverList.approve, this.facultyId,true) ; //อธิก่าร/รองอธิการ /ผอ/คณบดี
 this.selectedInform =  this.apiInformService.getInform() ;

 
///this.getApproveItems('8,9,10,15',this.facultyId,false);

  this.selectedCountry = this.apiCountry.getCountry() ;


    this.route.paramMap.subscribe(params => {
  
       
    //  console.log(this.leaveItems);
    // alert(data.json());
    // alert( this.leaveItems['endDate']);

    
    this.registerForm = this.formBuilder.group({
      Writing: ['มหาวิทยาลัยพะเยา', Validators.required],
      Subject: ["", Validators.required],
      Inform: ["1", Validators.required],
      LeaveAbroad: [false,""],
      Cause: ["",Validators.required],
      Country: ["",""],
      StartDate: ["", [Validators.required]],
      StartDateFull: [true,""],
      EndDate: ["", Validators.required],
      EndDateFull: [true,""],
      leader: ["", Validators.required],
      director: ["",""],
      approve: ["",Validators.required],
      Contact: ["", Validators.required] ,
      documentation: [''],
      PersonId: [localStorage.getItem('personId'), Validators.required] 
  } );

      
    

    this.leaveService.getLeaveItemsById(params.get('id')).subscribe(res => {
      var data = res[0];
      this.requestBarcodenum  = data.requestBarcodenum;
      this.registerForm.get('Writing').setValue(data.writing);
      this.registerForm.get('Subject').setValue(data.leaveType);
      this.registerForm.get('Inform').setValue(data.inform);
      this.registerForm.get('Cause').setValue(data.cause);
      this.registerForm.get('Country').setValue(data.country);
      this.registerForm.get('LeaveAbroad').setValue(data.leaveAbroad);
      this.registerForm.get('StartDate').setValue(this.pipe.transform(new Date(data.startDate),"dd/MM/yyyy"));//dd/mm/yyyy
      this.registerForm.get('EndDate').setValue(this.pipe.transform(new Date(data.startDate),"dd/MM/yyyy"));//dd/mm/yyyy
  
      this.registerForm.get('StartDateFull').setValue(data.startDateFull);
      this.registerForm.get('EndDateFull').setValue(data.endDateFull );


      this.registerForm.get('leader').setValue(data.leader);
      this.registerForm.get('director').setValue(data.director);
      this.registerForm.get('approve').setValue(data.approve);
      this.registerForm.get('Contact').setValue(data.leaveContact);
      
 
      

    });

   
      // console.log(this.leaveItems);
     //  alert(this.leaveItems.length)
 
    });
  
 }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true; 
 //   console.log(this.registerForm.value);
///check LeaveAbroad condition
if (this.registerForm.value.LeaveAbroad){ 
this.registerForm.get('Country').setValidators([Validators.required]); 
this.registerForm.get('Country').updateValueAndValidity();
this.registerForm.get('director').setValidators([Validators.required]); 
this.registerForm.get('director').updateValueAndValidity(); 
}else{
this.registerForm.get('Country').clearValidators();
this.registerForm.get('Country').updateValueAndValidity(); 
this.registerForm.get('director').clearValidators();
this.registerForm.get('director').updateValueAndValidity();
}





    if (this.registerForm.invalid) {
     
      //   this.leaveService.createLeave(this.registerForm.value).subscribe();
    return false;
    }else{

      
      //console.log(this.registerForm.value);



   //   //   this.leaveService.createLeave(this.registerForm.value).subscribe();
      this.leaveService.createLeave(this.registerForm.value).subscribe(() => {
        // this.router.navigate(['/']);
      }, (error) => {
        // this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        // this.buttonDisabled = false;
        // this.buttonState = "";
      });

      return true;
    }

    

   

    // display form values on success
  //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}
onChangeAboard() { 
  ///check LeaveAbroad condition
  if (this.registerForm.value.LeaveAbroad){ 
    this.registerForm.get('Country').setValidators([Validators.required]); 
    this.registerForm.get('Country').updateValueAndValidity();
    this.registerForm.get('director').setValidators([Validators.required]); 
    this.registerForm.get('director').updateValueAndValidity(); 
    }else{
      this.registerForm.get('Country').clearValidators();
      this.registerForm.get('Country').updateValueAndValidity(); 
      this.registerForm.get('director').clearValidators();
      this.registerForm.get('director').updateValueAndValidity();
    }
   
        if (this.registerForm.invalid) {
            return;
        }
   
    }
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
 
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('documentation').setValue(file);
    }
  }

  // getLeaderItems(execId:string,facultyId :string,approve:boolean) { 
  //   this.apiAproverService.getApprove(execId,facultyId,approve) 
  //     .subscribe(items => {
  //       this.selectedleader = items;
  //     });
  // }


  // getDirectorItems(execId:string,facultyId :string,approve:boolean) { 
  //   this.apiAproverService.getApprove(execId,facultyId,approve) 
  //     .subscribe(items => {
  //       this.selecteddirector = items;
  //     });
  // }
  // getApproveItems(execId:string,facultyId :string,approve:boolean) { 
  //   this.apiAproverService.getApprove(execId,facultyId,approve) 
  //     .subscribe(items => {
  //       this.selectedApprover = items;
  //     });
  // }
  // this.peopleAsyncSearch = concat(
  //   of([]), // default items
  //   this.peopleInputAsyncSearch.pipe(
  //     distinctUntilChanged(),
  //     tap(() => this.peopleLoadingAsyncSearch = true),
  //     switchMap(term => this.selectDataService.getPeople(term).pipe(
  //       catchError(() => of([])), // empty list on error
  //       tap(() => this.peopleLoadingAsyncSearch = false)
  //     ))
  //   )
  // );
   ///select//

   trackByFn(item: Person) {
    return item.id;
  }
  addTagFn(addedName) {
    return { name: addedName, tag: true };
  }

    ///select//
  
    ngAfterContentInit() {
    }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
  }
  @HostListener('window:scroll', ['$event'])




  ngOnDestroy() {
   this.renderer.removeClass(document.body, 'right-menu');
  }
   

 
} 