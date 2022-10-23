import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit {

  ranking = [
    {
      name: 'Mikołaj',
      points: 999
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
