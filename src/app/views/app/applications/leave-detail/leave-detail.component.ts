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

import { approvE } from 'src/app/models';
import { LeaveService, ILeave }  from '../leave/leave.service'
import { ApiAproverService } from 'src/app/data/approver.service'; 
import { ApiCountryService } from 'src/app/data/country.service';

import { AuthenticationService } from 'src/app/shared/authentication.service';



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
  
  selectedCountry: Observable<any[]>;

  selectedApprover:Observable<any[]>;
  selectedleader: Observable<any[]>; 
;
  selecteddirector: Observable<any[]>;;

 pipe = new DatePipe('en-US');
 now = Date.now();
  datePipe: any;
  facultyId = '';
  constructor(private localeService: BsLocaleService,   private renderer: Renderer2,   private el: ElementRef, private selectDataService: SelectDataService, private leaveService:LeaveService, private formBuilder: FormBuilder,private route:  ActivatedRoute ,private apiAproverService :ApiAproverService,private apiCountry :ApiCountryService,private authenticationService :AuthenticationService) {
   
   this.localeService.use('th-be');
  
 
  }

 


  ngOnInit() {
   
//alert(this.pipe.transform(this.now, 'dd/MM/yyyy'));
this.facultyId =    this.authenticationService.currentUserValue.facultyId 

 this.selectedleader = this.apiAproverService.getApprove('8,9,10,15',this.facultyId,false) ; //หัวหน้างาน
 this.selecteddirector = this.apiAproverService.getApprove('4,5,6,7,16,17,18,19',this.facultyId,false) ; //ผอ/คณบดี
 this.selectedApprover = this.apiAproverService.getApprove('4,5,6,7,16,17,18,19', this.facultyId,true) ; //อธิก่าร/รองอธิการ /ผอ/คณบดี
 /// this.selectedApprover =  this.apiAproverService.getApprove() ;

 


  this.selectedCountry = this.apiCountry.getCountry() ;


    this.route.paramMap.subscribe(params => {
  
       
    //  console.log(this.leaveItems);
    // alert(data.json());
    // alert( this.leaveItems['endDate']);

    this.registerForm = this.formBuilder.group({
      txtwrite: ['มหาวิทยาลัยพะเยา', Validators.required],
      subject: ['', Validators.required],
      inform: ['', Validators.required],
      leave_aboard: [false, Validators.required],
      txtCause: ['', Validators.required], 
      leave_country: ['',""],
      date_from: ['', [Validators.required]],
      leave_fullday_date_from: [true,""],
      date_end: ['', Validators.required],
      leave_fullday_date_end: [true,""],
      leader: ['', Validators.required],
      director: ['',""],
      approve: ['',Validators.required],
      leave_contact: ['', Validators.required] 
    } );
        

      
    

    this.leaveService.getLeaveItemsById(params.get('id')).subscribe(res => {
      var data = res[0];
     
      this.registerForm.get('txtwrite').setValue(data.writing);
      this.registerForm.get('subject').setValue(data.leaveType);
      this.registerForm.get('inform').setValue(data.inform);
      this.registerForm.get('txtCause').setValue(data.cause);
      
      this.registerForm.get('leave_aboard').setValue(((data.leaveAbroad == 'T')?true:false));
      this.registerForm.get('date_from').setValue(this.pipe.transform(new Date(data.startDate),"dd/MM/yyyy"));//dd/mm/yyyy
      this.registerForm.get('date_end').setValue(this.pipe.transform(new Date(data.startDate),"dd/MM/yyyy"));//dd/mm/yyyy
 
      this.registerForm.get('leave_fullday_date_from').setValue(((data.startDateFull == 'T')?true:false));
      this.registerForm.get('leave_fullday_date_end').setValue(((data.endDateFull == 'T')?true:false));


      this.registerForm.get('leader').setValue(data.cause);
      this.registerForm.get('director').setValue(data.cause);
      this.registerForm.get('approve').setValue(data.cause);
      this.registerForm.get('leave_contact').setValue(data.leaveContact);
      






    });

   
      // console.log(this.leaveItems);
     //  alert(this.leaveItems.length)
 
    });
 
   
    

      // this.companiesNames.forEach((c, i) => {
      //   this.companies.push({ id: i, name: c });
      // });

    ///  const firstParam: string = this.route.sna.queryParamMap.get('firstParamKey');

  
     /// let id = this.route.snapshot.params.id;
  

      ///////form/////

      
        ///////form/////
    ///select///

  

    // this.peopleLoading = true;
    // this.selectDataService.getPeople().subscribe(x => {
    //   this.people = x;
    //   this.peopleLoading = false;
    // });

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
 }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

    onSubmit() {
    this.submitted = true; 
 ///check leave_aboard condition
 if (this.registerForm.value.leave_aboard){ 
  this.registerForm.get('leave_country').setValidators([Validators.required]); 
  this.registerForm.get('leave_country').updateValueAndValidity();
  this.registerForm.get('director').setValidators([Validators.required]); 
  this.registerForm.get('director').updateValueAndValidity();

   

  }else{
    this.registerForm.get('leave_country').clearValidators();
    this.registerForm.get('leave_country').updateValueAndValidity();

    this.registerForm.get('director').clearValidators();
    this.registerForm.get('director').updateValueAndValidity();
  }

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
      //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onChangeAboard() { 
///check leave_aboard condition
    if (this.registerForm.value.leave_aboard){ 
    this.registerForm.get('leave_country').setValidators([Validators.required]); 
    this.registerForm.get('leave_country').updateValueAndValidity();
    this.registerForm.get('director').setValidators([Validators.required]); 
    this.registerForm.get('director').updateValueAndValidity();

     

    }else{
      this.registerForm.get('leave_country').clearValidators();
      this.registerForm.get('leave_country').updateValueAndValidity();

      this.registerForm.get('director').clearValidators();
      this.registerForm.get('director').updateValueAndValidity();
    }


      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
    //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
 

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
  //  this.renderer.removeClass(document.body, 'right-menu');
  }
   

 
} 