import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

 login!:FormGroup;

 public auth = inject(AuthService);

 constructor(public fb:FormBuilder){}

ngOnInit(): void {
  this.login = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
}

public submit(){
  console.log(this.login.value,"form values");
  this.auth.login(this.login.value.email,this.login.value.password).catch((err)=>{
    console.log(err,"error")
  })
}

}
