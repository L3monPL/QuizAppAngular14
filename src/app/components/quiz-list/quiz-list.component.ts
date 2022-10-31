import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {


  constructor(
    // public categoryRest: CategoryRestService
    public categoryManagerService: CategoryManagerRestService
  ) { }

  ngOnInit(): void {
    
  }


 

}
