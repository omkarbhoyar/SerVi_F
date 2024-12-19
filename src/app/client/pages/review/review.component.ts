import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SnackbarOptions } from '../../../snackbar.interface';
import { SnackbarService } from '../../../snackbar.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { error } from '@ant-design/icons-angular';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  bookId!: number;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private activatedroute: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.bookId = this.activatedroute.snapshot.params['id'];

    this.validateForm = this.fb.group({
      rating : [null,Validators.required],
      review: [null,Validators.required] 

    })
    console.log("hi");

    
  }

  giveReview(){
    const reviewDTO = {
      rating : this.validateForm.get("rating").value,
      review : this.validateForm.get("review").value,
      userId : UserStorageService.getUserId(),
      bookId : this.bookId
    }

    this.clientService.giveReview(reviewDTO).subscribe(res =>{
      const snackbarOptions  : SnackbarOptions ={message : 'Review Posted Succesfully'};
      this.snackbarService.openSnackbar(snackbarOptions)
      this.router.navigateByUrl("/client/bookings");
    },(error)=>{
      const snackbarOptions : SnackbarOptions = {message : 'Error occure whil;e posting the review'};
      this.snackbarService.openSnackbar(snackbarOptions);
    }
  )
  }
}
