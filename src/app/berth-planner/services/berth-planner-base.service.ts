import { Injectable, OnInit } from '@angular/core';
import { TimelineConfig, TimeLineService } from './timeline.service';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  private readonly BERTH_NAME_PERCENT = 20;
  private readonly TIMELINE_PERCENT = 80;

  timelineConfig!: TimelineConfig;
  timeline: Date[] = [];
  startDateRange!: Date | null;
  endDateRange!: Date | null;

  constructor(public timelineSvc: TimeLineService) {}

  ngOnInit(): void {
    this._init();
  }

  _init() {
    this.timelineSvc.initTimeline('ONE_MONTH', 24);
    this.updateLayout();
  }

  berthNameWidth = () => Math.floor(this.timelineSvc.plannerWidthPx() * this.BERTH_NAME_PERCENT / 100);
  timelineWidth = () => Math.floor(this.timelineSvc.plannerWidthPx() * this.TIMELINE_PERCENT / 100);

  shiftTimeline(direction: 'NEXT' | 'PREV'): void {
    this.timelineSvc.navigate(direction);
    this.updateLayout();
  }

  updateLayout(): void {
    this.startDateRange = this.timelineSvc.rangeStartDate();
    this.endDateRange = this.timelineSvc.rangeEndDate();
    this.timelineConfig = this.timelineSvc.generateTimelineConfig();
    console.log('timelineConfig',this.timelineConfig);
    this.generateTimelineDays();
  }

  private generateTimelineDays(): void {
    if (!this.startDateRange || !this.endDateRange) {
      this.timeline = [];
      return;
    }

    this.timeline = [];
    const current = new Date(this.startDateRange);

    while (current <= this.endDateRange) {
      this.timeline.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    console.log(this.timeline);
  }
}