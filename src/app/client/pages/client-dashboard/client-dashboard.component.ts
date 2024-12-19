import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  standalone: false,

  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css',
})
export class ClientDashboardComponent {
  ads: any = [];
  valitateForm!: FormGroup;

  constructor(private clientService: ClientService,private fb : FormBuilder) {}
  ngOnInit() {
    this.getAllAds();
    this.clientService.getAllAds().subscribe(
      (response) => {
        console.log('Response from getAllAds:', response);
      },
      (error) => {
        console.error('Error fetching ads:', error);
      }
    );

    this.valitateForm = this.fb.group({
      service : [null , [Validators.required]]
    })
  }



  searchAdByName(){
    this.clientService.searchAdByName(this.valitateForm.get(['service']).value).subscribe(res =>{
      this.ads=res;
    })
  }

  getAllAds() {
    this.clientService.getAllAds().subscribe((res) => {
      this.ads = res;
    });
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,' + img;
  }
}
