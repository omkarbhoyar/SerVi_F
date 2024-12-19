import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  constructor(private clientService : ClientService){}

  bookServices : any;

  ngOnInit(){
    this.getMyBookings();
  }


  getMyBookings(){
    this.clientService.getMyBookings().subscribe(res => {
      this.bookServices = res;
    })
  }

}
