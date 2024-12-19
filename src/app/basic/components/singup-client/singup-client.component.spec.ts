import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupClientComponent } from './singup-client.component';



describe('SingupClintComponent', () => {
  let component: SignupClientComponent;
  let fixture: ComponentFixture<SignupClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
