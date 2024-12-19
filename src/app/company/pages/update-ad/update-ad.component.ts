import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { SnackbarService } from '../../../snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarOptions } from '../../../snackbar.interface';

@Component({
  selector: 'app-update-ad',
  standalone: false,
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.css']
})
export class UpdateAdComponent {
  adId: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  validateForm: FormGroup;
  existingImage: string | null = null;
  imgChanged = false;

  constructor(
    private companyService: CompanyService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.adId = this.activatedroute.snapshot.params['id'];
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getAdById();
    
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.existingImage = null;
    this.imgChanged =true;
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  updateAd() {
    const formData: FormData = new FormData();

    if(this.imgChanged && this.selectedFile){
      formData.append('img', this.selectedFile);
    }

    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.companyService.updateAd(this.adId,formData).subscribe(
      (res) => {
        const snackbarOptions: SnackbarOptions = {
          message: 'Ad Updated Succesfull !',
        };
        this.snackbarService.openSnackbar(snackbarOptions);
        this.router.navigateByUrl('/company/ads')
      },
      (error) => {
        console.error('Error posting ad:', error);
        const snackbarOptions: SnackbarOptions = {
          message: 'Unexpected error occurred while Updating the ad. Please try again.',
        };
        this.snackbarService.openSnackbar(snackbarOptions);
      }
      
    );
  }

  getAdById(): void {
    this.companyService.getAdById(this.adId).subscribe(
      (res) => {
        console.log('Ad Details:', res);
        this.validateForm.patchValue(res); 
        this.existingImage = res.returnedImg.includes('http') 
        ? res.returnedImg : 'data:image/jpeg;base64,' + res.returnedImg;
      },
      (err) => {
        console.error('Error fetching ad:', err); 
      }
    );
  }

  
 

}
