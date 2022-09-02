import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRightPanelComponent } from './profile-right-panel.component';

describe('ProfileRightPanelComponent', () => {
  let component: ProfileRightPanelComponent;
  let fixture: ComponentFixture<ProfileRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRightPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
