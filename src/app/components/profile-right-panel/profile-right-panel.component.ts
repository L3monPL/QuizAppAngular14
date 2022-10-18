import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-profile-right-panel',
  templateUrl: './profile-right-panel.component.html',
  styleUrls: ['./profile-right-panel.component.scss']
})
export class ProfileRightPanelComponent implements OnInit {

  @Output() hideReightPanel = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  hideRightPanel(){
    this.hideReightPanel.emit(true)
    console.log('hide')
  }

}
