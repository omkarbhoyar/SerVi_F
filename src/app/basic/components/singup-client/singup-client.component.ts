import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../snackbar.service';
import { SnackbarOptions } from '../../../snackbar.interface';

@Component({
  selector: 'app-signup-client',
  standalone: false,
  templateUrl: './singup-client.component.html',
  styleUrls: ['./singup-client.component.css']
})
export class SignupClientComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
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

  
  submitForm() {
    if (this.validateForm.valid) {
      console.log('Form Data Submitted:', this.validateForm.value);
      
      this.authService.registerClint(this.validateForm.value).subscribe(
        res => {
          console.log('API Response:', res);
          const snackbarOptions: SnackbarOptions = { message: 'Signup Successful!' };
          this.snackbarService.openSnackbar(snackbarOptions);
      
          // Optionally redirect after success
          this.router.navigate(['/login']);
        },
        error => {
          console.error('API Error:', error);
          const snackbarOptions: SnackbarOptions = { message: 'Email already exists! Please try a new email!' };
          this.snackbarService.openSnackbar(snackbarOptions);
        }
      );
      
     
    }
  }
}
