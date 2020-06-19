
import { Component, OnInit, OnDestroy, ElementRef, TemplateRef, HostListener, ViewChild, AfterContentInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  @ViewChild('form') form: FormGroup;
  // emailModel = 'demo@vien.com';
  // passwordModel = 'demovien11222222222';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthenticationService, private notifications: NotificationsService, private router: Router, private formBuilder: FormBuilder, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      txtUserName: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.authService.logout();



    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';


    //  this.buttonDisabled = false;
    //     this.buttonState = '';
    //     this.notifications.create('ผิดพลาด', "dfsdf", NotificationType.Warn, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });

    // this.authService.signIn(  this.loginForm.value.txtUserName,  this.loginForm.value.txtPassword).subscribe((user) => {

    // ///  console.log(user);
    // localStorage.setItem('token')

    //   this.router.navigate(['/']);
    // }, (error) => {
    //   this.buttonDisabled = false;
    //   this.buttonState = '';
    //   this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    // });

    this.authService.login(this.loginForm.value.txtUserName, this.loginForm.value.txtPassword)
      .pipe(first())
      .subscribe(
        (res: any) => { 
          
          this.router.navigate(['/']);
        },
        error => {  
          this.buttonDisabled = false;
          this.buttonState = '';
          this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        });

  }
}
