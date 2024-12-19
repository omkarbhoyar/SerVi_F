import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component'; // Only import ClientRoutingModule
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { ReviewComponent } from './pages/review/review.component';

@NgModule({
  declarations: [ClientComponent, ClientDashboardComponent, AdDetailComponent, MyBookingsComponent, ReviewComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    MatDividerModule,
    FormsModule,
    NzDatePickerModule
  ],
})
export class ClientModule {}
