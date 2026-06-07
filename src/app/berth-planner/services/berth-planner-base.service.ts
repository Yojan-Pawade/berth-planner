import { Injectable, OnInit, signal } from '@angular/core';
import { TimeLineService } from './timeline.service';
import { PlannerOrientation, TimelineConfig } from '../berth-planner.model';
import { BERTH_PLANNER_DATA} from '../berth-planner.utils';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  _orientation = signal<PlannerOrientation>('horizontal');
  readonly orientation = this._orientation.asReadonly();

  private readonly BERTH_NAME_PERCENT = 15;
  private readonly BERTH_NAME_HEIGHT_PERCENT = 12;
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
    this.timelineSvc.initTimeline('ONE_MONTH', 6);
    this.updateLayout();
  }

  berthNameWidth = () => Math.floor(this.timelineSvc.plannerWidthPx() * this.BERTH_NAME_PERCENT / 100);
  berthNameHeight = () => Math.floor(this.timelineSvc.plannerHeightPx()* this.BERTH_NAME_HEIGHT_PERCENT / 100); 
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

  async initBerthData() {
    this.rawBerthData = BERTH_PLANNER_DATA;
    const isVertical = this._orientation() === 'vertical';
    this.berthPlotingData = this.rawBerthData.map((berthItem: any) => {
      const berthBollardLabels: string[] = [];
      for (let i = berthItem.avail_bollards_st; i <= berthItem.avail_bollards_ed; i += berthItem.bollards_increment) {
        berthBollardLabels.push(`${i}`);
      }
      const processedVessels = (berthItem.vessels || []).map((vesselItem: any) => {
        const plannedStart = new Date(vesselItem.planned_start);
        const plannedEnd = new Date(vesselItem.planned_end);
        const actualEnd = vesselItem.actual_end ? new Date(vesselItem.actual_end) : null;

        const pxPerMinuteHorizontal = this.timelineConfig.pxPerMinute;
        const pxPerMinuteVertical = this.timelineConfig.pxPerMinuteVertical;

        const startTimestamp = plannedStart;
        const endTimestamp = (actualEnd !== null && (actualEnd.getTime() > plannedEnd.getTime())) ? actualEnd : plannedEnd;

        const bollardLayout = this.calculateVesselVerticalLayout(
          berthItem.avail_bollards_st,
          berthItem.bollards_increment,
          vesselItem.bollards_start,
          vesselItem.bollards_end
        );
        let left_px: number, width_px: number, top_px: number, height_px: number;
        if (!isVertical) {
          const timeLayout = this.timelineSvc.calcBarLayout(
            startTimestamp, endTimestamp, pxPerMinuteHorizontal
          )!;
          left_px = timeLayout.leftPx;
          width_px = timeLayout.widthPx;
          top_px = bollardLayout.offsetPx;
          height_px = bollardLayout.sizePx;

        } else {
          const timeLayout = this.timelineSvc.calcBarLayoutVertical(
            startTimestamp, endTimestamp, pxPerMinuteVertical
          )!;
          top_px = timeLayout.topPx;
          height_px = timeLayout.heightPx;
          left_px = bollardLayout.offsetPx;
          width_px = bollardLayout.sizePx;
        }

        return {
          id: vesselItem.id,
          vessel_name: vesselItem.vessel_name,
          bollards_start: vesselItem.bollards_start,
          bollards_end: vesselItem.bollards_end,
          left_px,
          width_px,
          top_px,
          height_px,
          planned_start: plannedStart,
          planned_end: plannedEnd,
          actual_start: vesselItem.actual_start,
          actual_end: actualEnd,
        };
      });

      const totalBerthHeight = berthBollardLabels.length * this.timelineSvc.bollardSize();
      const totalBollards = berthBollardLabels.length;
      const total_row_height = totalBollards * this.timelineSvc.bollardSize();
      return {
        id: berthItem.berth_id,
        berth_name: berthItem.berth_name,
        bollard_labels: berthBollardLabels,
        vessels: processedVessels,
        total_row_height,
        total_bollard_px: totalBollards * this.timelineSvc.bollardSize()
      };
    });
    console.log(this.berthPlotingData);
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
    const offsetPx = Math.floor((vesselStart - availStart) / increment) * singleBollardRowHeightPx;
    const sizePx = (Math.floor((vesselEnd - vesselStart) / increment) + 1) * singleBollardRowHeightPx;

    return {
      offsetPx,
      sizePx
    };
  }

}