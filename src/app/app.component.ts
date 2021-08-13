import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  emailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobPattern:string = "^[0-9]{10}$";
  formGroup: FormGroup = new FormGroup({});
  public users: Users[] = [];
  public showErrors: boolean = false;

  constructor(private fb: FormBuilder) {
 
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required]],
      email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
      contact: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required, Validators.pattern(this.mobPattern)]]
      }),
    });
  }  

  onSubmit(): void {
    const { firstName, lastName, email, contact } = this.formGroup.value;
    const { street, city, state, zip } = this.formGroup.get("address")?.value;

    
    const user: Users = {
      firstName,
      lastName,
      email,
      contact,
      address: {
        street,
        city,
        state,
        zip
      }
    }
    
    this.showErrors = true;

    if (this.formGroup.valid)
      this.users.push(user);

  }
}
