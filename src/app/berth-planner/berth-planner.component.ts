import { Component, ElementRef, ViewChild } from '@angular/core';
import { BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';

@Component({
  selector: 'app-berth-planner',
  templateUrl: './berth-planner.component.html',
  styleUrl: './berth-planner.component.scss'
})
export class BerthPlannerComponent extends BerthPlannerbaseService {
  private resizeObserver!: ResizeObserver;
  @ViewChild('plannerWrapper') plannerWrapper!: ElementRef<HTMLDivElement>;
  constructor(timelineSvc: TimeLineService) {
    super(timelineSvc);
  }

  ngAfterViewInit() {

  }


}
