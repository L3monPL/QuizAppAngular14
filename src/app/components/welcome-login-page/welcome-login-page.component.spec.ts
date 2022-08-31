import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLoginPageComponent } from './welcome-login-page.component';

describe('WelcomeLoginPageComponent', () => {
  let component: WelcomeLoginPageComponent;
  let fixture: ComponentFixture<WelcomeLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
