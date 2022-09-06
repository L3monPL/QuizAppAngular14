import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickQuizPanelListComponent } from './quick-quiz-panel-list.component';

describe('QuickQuizPanelListComponent', () => {
  let component: QuickQuizPanelListComponent;
  let fixture: ComponentFixture<QuickQuizPanelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickQuizPanelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickQuizPanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
