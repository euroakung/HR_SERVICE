 


import {  Component, OnInit, OnDestroy,ElementRef,TemplateRef, HostListener, ViewChild, AfterContentInit , Renderer2 } from '@angular/core';
 
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Colors } from 'src/app/constants/colors.service';
import { ChartService } from 'src/app/components/charts/chart.service';
import { ScrollableComponent } from 'src/app/views/app/ui/datatables/scrollable/scrollable.component'; 
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ApiService, IProduct } from 'src/app/data/api.service';
import { SelectDataService, Person } from 'src/app/containers/forms/select/select.data.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { FormGroup ,FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { concat, Observable, of, Subject } from 'rxjs';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thBeLocale } from 'ngx-bootstrap/locale';  
import {timeRequired} from 'src/app/containers/form-validations/custom.validators'; 
import { ApiAproverService } from 'src/app/data/approver.service';
import { ApiCountryService } from 'src/app/data/country.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ApiInformService } from 'src/app/data/inform.service';
import { DatePipe } from '@angular/common';
import { LeaveService, ILeaveType } from 'src/app/views/app/applications/leave/leave.service'; 
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-new-helpwife-modal',
  templateUrl: './add-new-helpwife-modal.component.html', 
  styles: []
})
export class AddNewLeaveHelpWifeModalComponent implements OnInit  {
  modalRef: BsModalRef; 
  registerForm: FormGroup;
  submitted = false;
  productDataConfig: ApiService;
  @ViewChild('form') form: FormGroup;
  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;


  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };
  categories = [
    { label: 'Cakes', value: 'chocolate' },
    { label: 'Cupcakes', value: 'vanilla' },
    { label: 'Desserts', value: 'strawberry' }
  ];





/////select///

people: Person[];
selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';
selectedPeople = [{ name: 'Karyn Wright' }];

selectedCompanies;
companies: any[] = [];
companiesNames = ['Uber', 'Microsoft', 'Flexigen'];

peopleAsync: Observable<Person[]>;
selectedPersonIdAsync = '5a15b13c605403381eec5019';

githubUsers$: Observable<any[]>;
selectedUsers = [];

peopleLoading = false;

peopleAsyncSearch: Observable<Person[]>;
peopleLoadingAsyncSearch = false;
peopleInputAsyncSearch = new Subject<string>();
selectedPersonsAsyncSearch = [{ name: 'Karyn Wright' }, { name: 'Other' }];

selectedApprover:Observable<any[]>;
   selectedleader:  Observable<any[]>;
   selectedInform: Observable<any[]>;
;
  selecteddirector: Observable<any[]>;
  selectedCountry: Observable<any[]>; 

  leaveType: Observable<any[]>; 

  pipe = new DatePipe('en-US');
  now = Date.now();
   datePipe: any;
   facultyId = "";
   leaveTypeName = "";

/////select///


  @ViewChild('template', { static: true }) template: TemplateRef<any>;
  //private modalService: BsModalService,
  constructor(private localeService: BsLocaleService,private modalService: BsModalService, private chartService: ChartService, private renderer: Renderer2,private apiService: ApiService, private el: ElementRef,private selectDataService: SelectDataService,private formBuilder: FormBuilder,private apiAproverService :ApiAproverService,private apiCountry :ApiCountryService,private authenticationService :AuthenticationService,private apiInformService:ApiInformService,  private leaveService: LeaveService) {
    
    this.people = selectDataService.people;
  //  console.log(locales);
   this.localeService.use('th-be');

   }

  ngOnInit() { 
    this.registerForm = this.formBuilder.group({
      Writing: ['มหาวิทยาลัยพะเยา', Validators.required],
      Subject: ["", Validators.required],
      Inform: ["1", Validators.required],
      // LeaveAbroad: [false,""],
      Cause: ["",Validators.required],
      BirthDate: ["",Validators.required],
      StartDate: ["", [Validators.required]], 
      EndDate: ["", Validators.required], 
      WifeName: ["", Validators.required], 
      leader: ["", Validators.required], 
      approve: ["",Validators.required],
      Contact: ["", Validators.required] ,
      documentation: [''],
      PersonId: [localStorage.getItem('personId'), Validators.required] 
  } );

  this.facultyId =    this.authenticationService.currentUserValue.facultyId  
  this.selectedleader = this.apiAproverService.getApprove(environment.approverList.leader,this.facultyId,false)  ; //หัวหน้างาน
  // this.selecteddirector = this.apiAproverService.getApprove(environment.approverList.director,this.facultyId,false) ; //ผอ/คณบดี
  this.selectedApprover = this.apiAproverService.getApprove(environment.approverList.approve, this.facultyId,true) ; //อธิก่าร/รองอธิการ /ผอ/คณบดี
  this.selectedInform =  this.apiInformService.getInform() ; 
  this.selectedCountry = this.apiCountry.getCountry() ; 
 
  }

  show(leaveType:number) { 
    this.registerForm.get('Subject').setValue( leaveType.toString() );  
    ///แสดงประเภทการลาตามที่ทำการเลือก 
    this.leaveService.getLeaveTypeItems(leaveType.toString()).subscribe(res => {
      var data = res[0]; 
       this.leaveTypeName = data.leaveTypeNameTh
    } );
 ///alert(this.leaveService.getLeaveTypeItems(leaveType.toString()));
    
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true; 
    
 
        if (this.registerForm.invalid) {
         
          //   this.leaveService.createLeave(this.registerForm.value).subscribe();
        return false;
        }else{
 
          
       //   console.log(this.registerForm.value);
          //   this.leaveService.createLeave(this.registerForm.value).subscribe();
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
      // stop here if form is invalid
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


}
