import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryRestService } from 'src/app/services/category-rest.service';

@Component({
  selector: 'app-quick-quiz-panel-list',
  templateUrl: './quick-quiz-panel-list.component.html',
  styleUrls: ['./quick-quiz-panel-list.component.scss']
})

export class QuickQuizPanelListComponent implements OnInit {


  constructor(
    public categoryRest: CategoryRestService
  ) { }

  ngOnInit(): void {
    
  }


}
