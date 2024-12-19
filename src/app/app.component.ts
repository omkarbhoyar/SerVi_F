import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { Router } from '@angular/router';
import { ClientDashboardComponent } from './client/pages/client-dashboard/client-dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SerVi';


  isClintLoggedIn : boolean = UserStorageService.isClintLoggedIn();
  isCompanyLoggedIn : boolean = UserStorageService.isCompanyLoggedIn();

  constructor(private router : Router){

  }

  ngOnInit(){
    this.router.events.subscribe(event =>{
    this.isClintLoggedIn   = UserStorageService.isClintLoggedIn();
    this.isCompanyLoggedIn  = UserStorageService.isCompanyLoggedIn();
    
  })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
    }

}
