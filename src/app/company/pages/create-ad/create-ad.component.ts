import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { error } from '@ant-design/icons-angular';
import { SnackbarService } from '../../../snackbar.service';
import { SnackbarOptions } from '../../../snackbar.interface';

@Component({
  selector: 'app-create-ad',
  standalone: false,

  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent {
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  postAd() {
    const formData: FormData = new FormData();

    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);

    this.companyService.postAd(formData).subscribe(
      (res) => {
        const snackbarOptions: SnackbarOptions = {
          message: 'Ad Posted Succesfull !',
        };
        this.snackbarService.openSnackbar(snackbarOptions);
        this.router.navigateByUrl('/company/ads')
      },
      (error) => {
        const snackbarOptions: SnackbarOptions = {
          message: 'UnExpected Error while posting the Ad !',
        };
        this.snackbarService.openSnackbar(snackbarOptions);
      }
    );
  }
}
