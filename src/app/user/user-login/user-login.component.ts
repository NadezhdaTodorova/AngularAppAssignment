import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  error: string;
  isLoading = false;
  constructor(public userService: UserService,  private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.userService.enterUser(form.value.email, form.value.password, true)
      .subscribe(userData => {
        this.isLoading = false;
        this.router.navigate(['/items']);
      },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        }
      );
    form.reset();
  }
}
