import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

 login!:FormGroup;

 constructor(public fb:FormBuilder){}

ngOnInit(): void {
  this.login = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
}

public submit(){
  console.log(this.login.value,"form values")
}

}
