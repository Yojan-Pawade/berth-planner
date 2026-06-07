import { Injectable, OnInit } from '@angular/core';
import { TimeLineService } from './timeline.service';
import { TimelineConfig } from '../berth-planner.model';
import { BERTH_PLANNER_DATA} from '../berth-planner.utils';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  private readonly BERTH_NAME_PERCENT = 15;
  private readonly TIMELINE_PERCENT = 85;

  timelineConfig!: TimelineConfig;
  timeline: Date[] = [];
  rawBerthData: any[] = [];
  BerthMap: Map<string, any> = new Map();
  berthPlotingData: any[] = []
  startDateRange!: Date | null;
  endDateRange!: Date | null;

  constructor(public timelineSvc: TimeLineService) { }

  ngOnInit(): void {
    this._init();
  }

  _init() {
    this.timelineSvc.initTimeline('ONE_WEEK', 24);
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
    this.generateTimelineDays();
  }
  async initBerthData() {
    this.rawBerthData = BERTH_PLANNER_DATA;
    this.berthPlotingData = this.rawBerthData.map((berthItem: any) => {
      const berthBollardLabels: string[] = [];
      for (let i = berthItem.avail_bollards_st; i <= berthItem.avail_bollards_ed; i += berthItem.bollards_increment) {
        berthBollardLabels.push(`${i}`);
      }
      const processedVessels = (berthItem.vessels || []).map((vesselItem: any) => {
        const plannedStart = new Date(vesselItem.planned_start);
        const plannedEnd = new Date(vesselItem.planned_end);
        const actualEnd = vesselItem.actual_end ? new Date(vesselItem.actual_end) : null;
        const pxPerMinute = this.timelineConfig.pxPerMinute;

        const startTimestamp = plannedStart;
        const endTimestamp = (actualEnd !== null && (actualEnd.getTime() > plannedEnd.getTime())) ? actualEnd : plannedEnd;

        const outerBoundingLayout = this.timelineSvc.calcBarLayout(startTimestamp, endTimestamp, pxPerMinute)!;

        const verticalLayout = this.calculateVesselVerticalLayout(
          berthItem.avail_bollards_st,
          berthItem.bollards_increment,
          vesselItem.bollards_start,
          vesselItem.bollards_end
        );

        return {
          id: vesselItem.id,
          vessel_name: vesselItem.vessel_name,
          bollards_start: vesselItem.bollards_start,
          bollards_end: vesselItem.bollards_end,
          left_px: outerBoundingLayout.leftPx,
          width_px: outerBoundingLayout.widthPx,
          top_px: verticalLayout.layoutTopMargin,
          height_px: verticalLayout.layoutHeight,
          planned_start : plannedStart,
          planned_end : plannedEnd,
          actual_start : vesselItem.actual_start,
          actual_end: actualEnd
        };
      });

      const totalBerthHeight = berthBollardLabels.length * this.timelineSvc.bollardSize();

      return {
        id: berthItem.berth_id,
        berth_name: berthItem.berth_name,
        bollard_labels: berthBollardLabels,
        vessels: processedVessels,
        total_row_height: totalBerthHeight
      };
    });
    console.log(this.berthPlotingData);


    const newApproach = this.rawBerthData.map((item: any) => {
      // Date handling
      const plannedStart = new Date(item.planned_start);
      const plannedEnd = new Date(item.planned_end);
      const actualStart = item.actual_start ? new Date(item.actual_start) : null;
      const actualEnd = item.actual_end ? new Date(item.actual_end) : null;
      const pxPerMinute = this.timelineConfig.pxPerMinute;

      // ploting calculations
      const startTimestamps = plannedStart;
      const endTimestamps = (actualEnd !== null && (actualEnd.getTime() > plannedEnd?.getTime())) ? actualEnd : plannedEnd;
      const berthLayout = this.timelineSvc.calcBarLayout(startTimestamps, endTimestamps, pxPerMinute)!;
      const plannedLayout = this.timelineSvc.calcBarLayout(plannedStart!, plannedEnd!, pxPerMinute)!;
      let actualLayout: any | null = null;
      if (actualStart && actualEnd) {
        actualLayout = this.timelineSvc.calcBarLayout(actualStart, actualEnd, pxPerMinute)!;
      }

      // bollards calculation
      const bollardconfig = this.prepareBollards(item.avail_bollards_st, item.avail_bollards_ed, item.bollards_increment, item.bollards_start, item.bollards_end)

      return {
        id: item.id,
        berth_name: item.berth_name,
        bollard_start: item.bollards_start,
        bollard_end: item.bollards_end,
        planned_start: plannedStart,
        planned_end: plannedEnd,
        actual_start: actualStart,
        actual_end: actualEnd,
        bollard_labels: bollardconfig.labels,
      };
    });
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

  private calculateVesselVerticalLayout(
    availStart: number,
    increment: number,
    vesselStart: number,
    vesselEnd: number
  ) {
    const singleBollardRowHeightPx = this.timelineSvc.bollardSize();
    const layoutTopMargin = Math.floor((vesselStart - availStart) / increment) * singleBollardRowHeightPx;
    const layoutHeight = (Math.floor((vesselEnd - vesselStart) / increment) + 1) * singleBollardRowHeightPx;

    return {
      layoutTopMargin,
      layoutHeight
    };
  }


  prepareBollards(st: number, ed: number, inc: number, ac_st: number, ac_ed: number) {
    const labels: String[] = [];
    for (let i = st; i <= ed; i += inc) {
      labels.push(i.toString());
    }
    const layoutHeight = (Math.floor((ac_ed - ac_st) / inc + 1)) * this.timelineSvc.bollardSize();
    const topPx = Math.floor((ac_st - st) / inc) * this.timelineSvc.bollardSize();
    return {
      labels,
      layoutHeight,
      topPx
    }

  }

}