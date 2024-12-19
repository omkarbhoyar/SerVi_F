import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-singup-company',
  standalone: false,
  
  templateUrl: './singup-company.component.html',
  styleUrl: './singup-company.component.css'
})
export class SingupCompanyComponent {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstname: [null, [Validators.required]],

      phone: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]]
    }, { 
      validators: this.passwordMatcher // Add password matching validator
    });
  }

  // Custom Validator to match passwords
  passwordMatcher(group: FormGroup) {
    const password = group.get('password')?.value;
    const checkPassword = group.get('checkPassword')?.value;
    return password && checkPassword && password === checkPassword ? null : { 'passwordMismatch': true };
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  submitForm() {
    if (this.validateForm.valid) {
      console.log('Form Data Submitted:', this.validateForm.value);
  
      this.authService.registerCompany(this.validateForm.value).subscribe(
        res => {
          console.log('API Response:', res);
          this.snackBar.open('Signup successful!', 'Close', {horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000, 
          });

          // Optionally redirect after success
          this.router.navigate(['/login']);
        },
        error => {
          console.error('API Error:', error);
          this.snackBar.open('Signup failed. User already exists with the same email. Try again.', 'Close', { horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
                     });
        }
      );
    } else {
      console.warn('Form validation failed.');
      this.snackBar.open('Please fill in all required fields.', 'Close', { horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 10000,
        
      });
    }
  }
}
