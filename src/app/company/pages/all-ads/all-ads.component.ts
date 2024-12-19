import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../snackbar.service';
import { SnackbarOptions } from '../../../snackbar.interface';

@Component({
  selector: 'app-all-ads',
  standalone: false,

  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.css',
})
export class AllAdsComponent {
  ads: any;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getAllAdsByUserID();
  }

  getAllAdsByUserID() {
    this.companyService.getAllAdsByUserId().subscribe((res) => {
      this.ads = res;
    });
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }

  deleteAd(adId: any) {
    this.companyService.deletAd(adId).subscribe((res) => {
      const snackbarOptions: SnackbarOptions = {
        message: 'Ad Deleted Succesfull !',
      };
      this.snackbarService.openSnackbar(snackbarOptions);
      this.getAllAdsByUserID();
     
    },
    (error) => {
      const snackbarOptions: SnackbarOptions = {
        message: 'UnExpected Error while Deleting the Ad !',
      };
      this.snackbarService.openSnackbar(snackbarOptions);
    }
  
  );
  }
}
