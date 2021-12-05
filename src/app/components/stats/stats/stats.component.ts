import {Component, OnInit} from '@angular/core';
import {EventDriverService} from "../../../services/event-driver.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  counter: number = 0;

  constructor(private _eventDrivenService: EventDriverService) {
  }

  ngOnInit(): void {
    this._eventDrivenService.sourceEventSubjectObservable.subscribe(
      (response) => {
        this.counter += 1;
      }
    )
  }

}
