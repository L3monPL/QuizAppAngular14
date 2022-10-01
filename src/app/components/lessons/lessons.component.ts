import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.takeValueFromUrl()
  }

  takeValueFromUrl(){
    this.route.paramMap.subscribe(params => {
      var id = params.get('code');
      console.log(id);
    });
  }
  
  

}
