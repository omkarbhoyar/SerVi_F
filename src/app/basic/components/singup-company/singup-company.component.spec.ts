import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupCompanyComponent } from './singup-company.component';

describe('SingupCompanyComponent', () => {
  let component: SingupCompanyComponent;
  let fixture: ComponentFixture<SingupCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingupCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingupCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
