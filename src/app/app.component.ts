import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  public users: Users[] = [];
  public showErrors: boolean = false;

  constructor(private fb: FormBuilder) {
 
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      }),
    });
  }  

  onSubmit(): void {
    const { firstName, lastName } = this.formGroup.value;
    const { street, city, state, zip } = this.formGroup.get("address")?.value;

    
    const user: Users = {
      firstName,
      lastName,
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
