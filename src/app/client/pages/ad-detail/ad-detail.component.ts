import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { SnackbarOptions } from '../../../snackbar.interface';
import { SnackbarService } from '../../../snackbar.service';

@Component({
  selector: 'app-ad-detail',
  standalone: false,
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css'],
})
export class AdDetailComponent implements OnInit {
  adId: string | null = null;
  avatarUrl: any;
  ad: any;
  validateForm!: FormGroup;
  isBooking: unknown;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.validateForm = this.fb.group({
      bookingDate: [null, [Validators.required]], 
    });
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      bookingDate: [null, [Validators.required]], // Ensure the name matches
    });
    this.activatedRoute.params.subscribe((params) => {
      this.adId = params['adId'];
    });
  
    this.getAdDetailsByAdId();
  }
  
  
  

  getAdDetailsByAdId() {
    this.clientService.getAdDetailsByAdId(this.adId).subscribe((res) => {
      console.log(res);
      this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
      this.ad = res.adDTO;
    });
  }

  bookService() {
    const bookingDate = this.validateForm.get('bookingDate')?.value; // Ensure safe access
    const bookServiceDTO = {
      bookDate: bookingDate,
      adId: this.adId,
      userId: UserStorageService.getUserId(),
    };
    this.clientService.bookService(bookServiceDTO).subscribe((res) => {
      const snackbarOptions: SnackbarOptions = {
        message: 'Service Booked Successfully!',
      };
      this.snackbarService.openSnackbar(snackbarOptions);
      console.log(res+"***");
      console.log(bookingDate+"+++")
      this.router.navigateByUrl('/client/bookings');
    });
    console.log("Service booked!");
  }
  
}
