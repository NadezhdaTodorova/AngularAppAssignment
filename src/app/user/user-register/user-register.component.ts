import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  error: string;
  isLoading = false;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm){
    if(!form.valid){
      return;
    } 
    this.isLoading = true;
    this.userService.saveUser(form.value.email, form.value.password, true)
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
