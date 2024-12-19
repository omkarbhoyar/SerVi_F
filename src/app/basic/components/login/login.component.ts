import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SnackbarService } from '../../../snackbar.service';
import { SnackbarOptions } from '../../../snackbar.interface';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.authService
      .login(
        this.validateForm.get(['userName'])!.value,
        this.validateForm.get(['password'])!.value
      )
      .subscribe(
        (res) => {
          const snackbarOptions: SnackbarOptions = {
            message: 'Login Succesfull!',
          };
          this.snackbarService.openSnackbar(snackbarOptions);
          console.log(res);

          console.log('Is Clint Logged In:',UserStorageService.isClintLoggedIn()
          );

          console.log('Is Company Logged In:',UserStorageService.isCompanyLoggedIn()
          );

          if (UserStorageService.isClintLoggedIn()) {
            this.router.navigateByUrl('client/dashboard');
          } else if (UserStorageService.isCompanyLoggedIn()) {
            this.router.navigateByUrl('company/dashboard');
          }
        },
        (error) => {
          const snackbarOptions: SnackbarOptions = {
            message: 'Wrong Password or username please enter correct one !',
          };
          this.snackbarService.openSnackbar(snackbarOptions);
        }
      );
  }
}
