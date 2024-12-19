import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { SnackbarService } from '../../../snackbar.service';
import { SnackbarOptions } from '../../../snackbar.interface';
import { error } from '@ant-design/icons-angular';

@Component({
  selector: 'app-company-dashboard',
  standalone: false,
  
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
  
})
export class CompanyDashboardComponent {

  bookings : any;
  constructor(private companyService : CompanyService,private snackbarService : SnackbarService){}


  ngOnInit(){
    this.getAllBookings();
  } 


  getAllBookings(){
    this.companyService.getAllAdsBookings().subscribe(res =>{
      console.log(res);
      this.bookings=res;
      
    })
  }

  changeBookingStatus(bookingId : number , status : string){
    this.companyService.changeBookingStatus(bookingId,status).subscribe(res =>{
      const snackbarOptions: SnackbarOptions={message:'Bookijng Status Changed Successfully',};
      this.snackbarService.openSnackbar(snackbarOptions);
    },
    (error)=>{
      const snackbarOptions : SnackbarOptions={
        message : 'Error Found While changing the status',
      };
    }
  );
  }

}
