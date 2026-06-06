import { Injectable, OnInit } from '@angular/core';
import { TimeLineService } from './timeline.service';
import { TimelineConfig } from '../berth-planner.model';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  private readonly BERTH_NAME_PERCENT = 15;
  private readonly TIMELINE_PERCENT = 85;

  timelineConfig!: TimelineConfig;
  timeline: Date[] = [];
  rawBerthData:any[]=[];
  BerthMap:Map<string,any> = new Map();
  berthPlotingData :any[] = []
  startDateRange!: Date | null;
  endDateRange!: Date | null;

  constructor(public timelineSvc: TimeLineService) {}

    ngOnInit(): void {
    this._init();
  }

  _init() {
    this.timelineSvc.initTimeline('ONE_WEEK', 6);
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
  }

  prepareBollards(st: number, ed: number, inc: number ,ac_st:number , ac_ed:number) {
    const labels: String[] = [];
    for (let i = st; i <= ed; i += inc) {
      labels.push(i.toString());
    }
    const layoutHeight = (Math.floor((ac_ed - ac_st)/inc + 1)) * this.timelineSvc.bollardSize();
    
    const topPx = Math.floor((ac_st - st)/inc) * this.timelineSvc.bollardSize();

    return{
      labels,
      layoutHeight,
      topPx
    }

  }

}