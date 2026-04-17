import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
register!:FormGroup;

constructor(private fb:FormBuilder){}

public auth = inject(AuthService)

ngOnInit(){
  this.register = this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })
}

public submit(){
  console.log(this.register.value,"register form values",this.register.value.name);
  this.auth.register(this.register.value.email,this.register.value.password).catch((err)=>{
    console.log(err,"error")
  })
}
}
