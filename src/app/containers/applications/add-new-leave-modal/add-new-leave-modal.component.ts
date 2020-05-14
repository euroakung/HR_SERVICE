 


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
@Component({
  selector: 'app-add-new-leave-modal',
  templateUrl: './add-new-leave-modal.component.html',
  styles: []
})
export class AddNewLeaveModalComponent implements OnInit  {
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

/////select///


  @ViewChild('template', { static: true }) template: TemplateRef<any>;
  //private modalService: BsModalService,
  constructor(private localeService: BsLocaleService,private modalService: BsModalService, private chartService: ChartService, private renderer: Renderer2,private apiService: ApiService, private el: ElementRef,private selectDataService: SelectDataService,private formBuilder: FormBuilder) {
    
    this.people = selectDataService.people;
  //  console.log(locales);
   this.localeService.use('th-be');

   }
   leave_type_name: string;
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      txtwrite: ['มหาวิทยาลัยพะเยา', Validators.required],
      subject: ['', Validators.required],
      inform: ['1', Validators.required],
      leave_aboard: [false, Validators.required],
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

  }

  show(leaveType:number) { 
    
    this.registerForm.get('subject').setValue(leaveType ); 
    ///แสดงประเภทการลาตามที่ทำการเลือก
    this.leave_type_name = leaveType.toString();
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true; 
     //   console.log(this.registerForm.value);
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
 

}
