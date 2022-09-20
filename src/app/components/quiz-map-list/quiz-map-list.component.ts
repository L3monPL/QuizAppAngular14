import { Component, OnInit } from '@angular/core';
import { QuizMapServiceService } from 'src/app/services/quiz-map-service.service';

@Component({
  selector: 'app-quiz-map-list',
  templateUrl: './quiz-map-list.component.html',
  styleUrls: ['./quiz-map-list.component.scss']
})
export class QuizMapListComponent implements OnInit {


  constructor(
    public quizMapService: QuizMapServiceService
  ) { }

  ngOnInit(): void {
  }


}
