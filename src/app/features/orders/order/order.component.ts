import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  order!:FormGroup;

  constructor(private fb: FormBuilder,private router:Router){}

  ngOnInit(): void {
    this.order = this.fb.group({
      fullName:['',[Validators.required]],
      mobile:['',[Validators.required]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      pincode:['',[Validators.required]]
    })
  }
  
  public submit(){
     localStorage.setItem("order",JSON.stringify(this.order.value));
     this.router.navigate(['/app/order-history']);
  }
  
}
