import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserDataService } from 'src/app/services/global-services/user-data.service';


@Component({
  selector: 'app-profile-right-panel',
  templateUrl: './profile-right-panel.component.html',
  styleUrls: ['./profile-right-panel.component.scss']
})
export class ProfileRightPanelComponent implements OnInit {

  @Output() hideReightPanel = new EventEmitter<boolean>()


  constructor(
    public userData: UserDataService
  ) { }

  ngOnInit(): void {
  }

  hideRightPanel(){
    this.hideReightPanel.emit(true)
    console.log('hide')
  }

}
