import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../models';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html'
})
export class ViewsComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router,private authenticationService: AuthenticationService) {
    // If you have landing page, remove below line and implement it here.
    
   // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.router.navigateByUrl('/app');
   
  }

  ngOnInit() {

      

  }

}
