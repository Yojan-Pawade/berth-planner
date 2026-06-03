import { ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { TimeLineService, TimelineSize } from './timeline.service';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  private readonly BERTH_NAME_PERCENT = 15;
  private readonly TIMELINE_PERCENT = 85;
  timeLineSize!: TimelineSize;
  timeline = [];
  startDateRange!: Date | null;
  endDateRange!: Date | null;
  constructor(
    public timelineSvc: TimeLineService
  ) {
  }

  ngOnInit(): void {
    this._init();
  }

  _init() {
    this.initTimeLine();
  }

  berthNameWidth = () => Math.floor(this.timelineSvc.timeLineContainerWidth() * this.BERTH_NAME_PERCENT / 100);
  timelineWidth = () => Math.floor(this.timelineSvc.timeLineContainerWidth() * this.TIMELINE_PERCENT / 100);

  initTimeLine() {
    this.timelineSvc.setViewMode('ONE_DAY');
    this.startDateRange = this.timelineSvc.rangeStartDate();
    this.endDateRange = this.timelineSvc.rangeStartDate();
    this.timeLineSize = this.timelineSvc.generateTimelineSize();

  }


}
