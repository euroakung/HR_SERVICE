import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos'; 
import { nbLocale } from "ngx-bootstrap/locale";
defineLocale("th", nbLocale);
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent implements OnInit {
  
  form: FormGroup;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();


  bsInlineValue = new Date();


  constructor(private localeService: BsLocaleService) {
    this.localeService.use('th');
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    
  
  }

  ngOnInit() {
    this.form = new FormGroup({
      basicDate: new FormControl(new Date()),
    });
  }

}
