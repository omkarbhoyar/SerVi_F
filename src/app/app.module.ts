import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SingupComponent } from './basic/components/singup/singup.component';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SingupCompanyComponent } from './basic/components/singup-company/singup-company.component';
import { IconDefinition, IconModule, IconService } from '@ant-design/icons-angular';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SnackbarService } from './snackbar.service'; 
import { SnackbarOptions } from './snackbar.interface';
import { SignupClientComponent } from './basic/components/singup-client/singup-client.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
const icons: IconDefinition[] = [UserOutline, LockOutline];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupClientComponent,
    SingupCompanyComponent,
    SingupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    IconModule,
    NzDatePickerModule
  ],
  providers: [IconService,{ provide: NZ_ICONS, useValue: icons },], // Add IconService to providers
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private iconService: IconService) {
    // Register icons using the IconService
    this.iconService.addIcon(UserOutline, LockOutline);
  }
}
