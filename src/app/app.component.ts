import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Users } from "./models/user.interface";
import { NonWhiteSpaceValidator } from './validators/nonwhitespace.validator';

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
   styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
   public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
   public mobPattern: string = "^[0-9]{10}$";
   public pinPattern:string = "^[0-9]{6}$";
   public specialCharPattern: RegExp = new RegExp(/^[^*|\":<>[\]{}`\\()';@&$]+$/);
   public formGroup: FormGroup = new FormGroup({});
   public users: Users[] = [];
   public showErrors: boolean = false;

   constructor(private fb: FormBuilder) {}

   ngOnInit(): void {
      this.formGroup = this.fb.group({
         firstName: ['', [Validators.required, NonWhiteSpaceValidator.cannotContainSpace,
           Validators.minLength(3), Validators.maxLength(50),Validators.pattern(this.specialCharPattern)]],
         lastName: ['', [Validators.required, Validators.pattern(this.specialCharPattern),
           Validators.minLength(3), Validators.maxLength(50)]],
         email:['',[Validators.required, Validators.pattern(this.emailPattern), Validators.pattern(this.specialCharPattern)] ],
         contact: ['', [Validators.required, NonWhiteSpaceValidator.cannotContainSpace]],
         address: this.fb.group({
           street: ['', [Validators.required, Validators.pattern(this.specialCharPattern)]],
           city: ['', [Validators.required, Validators.pattern(this.specialCharPattern)]],
           state: ['', [Validators.required, Validators.pattern(this.specialCharPattern)]],
           zip: ['', [Validators.required, Validators.pattern(this.pinPattern),NonWhiteSpaceValidator.cannotContainSpace
           , Validators.pattern(this.specialCharPattern)]]
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
            zip,
         },
      };

      this.showErrors = true;

      if (this.formGroup.valid) this.users.push(user);
   }
}
