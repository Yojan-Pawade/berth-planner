import { Injectable, OnInit, signal } from '@angular/core';
import { TimeLineService } from './timeline.service';
import { PlannerOrientation, SlotCount, TimelineConfig, ViewMode } from '../berth-planner.model';
import { BERTH_PLANNER_DATA } from '../berth-planner.utils';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  _orientation = signal<PlannerOrientation>('horizontal');
  readonly orientation = this._orientation.asReadonly();
  readonly Math = Math;

  pendingViewMode: ViewMode = 'ONE_MONTH';
  pendingSlotCount: SlotCount = 4;


  private readonly BERTH_NAME_PERCENT = 15;
  private readonly BERTH_NAME_HEIGHT_PERCENT = 12;
  private readonly TIMELINE_PERCENT = 85;

  tootipData: any = null
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
    this.timelineSvc.initTimeline(this.pendingViewMode, this.pendingSlotCount);
    this.updateLayout();
  }

  berthNameWidth = () => Math.floor(this.timelineSvc.plannerWidthPx() * this.BERTH_NAME_PERCENT / 100);
  berthNameHeight = () => Math.floor(this.timelineSvc.plannerHeightPx() * this.BERTH_NAME_HEIGHT_PERCENT / 100);
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
    const isVertical = this._orientation() === 'vertical';

    const pxPerMinuteHorizontal = this.timelineConfig.pxPerMinute;
    const pxPerMinuteVertical = this.timelineConfig.pxPerMinuteVertical;

    const rangeStart = this.timelineSvc.rangeStartDate();
    const rangeEnd = this.timelineSvc.rangeEndDate();

    const filteredBerthData = this.rawBerthData.filter((berthItem: any) => {
      if (!rangeStart || !rangeEnd) return true;
      return (berthItem.vessels || []).some((vessel: any) => {
        const vesselStart = new Date(vessel.planned_start);
        const vesselEnd = new Date(vessel.planned_end);
        return vesselStart <= rangeEnd && vesselEnd >= rangeStart;
      });
    });

    this.berthPlotingData = filteredBerthData.map((berthItem: any) => {
      const berthBollardLabels: string[] = [];
      for (let i = berthItem.avail_bollards_st; i <= berthItem.avail_bollards_ed; i += berthItem.bollards_increment) {
        berthBollardLabels.push(`${i}`);
      }

      const processedVessels = (berthItem.vessels || []).map((vesselItem: any) => {
        const plannedStart = new Date(vesselItem.planned_start);
        const plannedEnd = new Date(vesselItem.planned_end);
        const actualEnd = vesselItem.actual_end ? new Date(vesselItem.actual_end) : null;

        const startTimestamp = plannedStart;
        const endTimestamp = (actualEnd !== null && actualEnd.getTime() > plannedEnd.getTime())
          ? actualEnd : plannedEnd;

        const bollardLayout = this.calculateVesselVerticalLayout(
          berthItem.avail_bollards_st,
          berthItem.bollards_increment,
          vesselItem.bollards_start,
          vesselItem.bollards_end
        );

        let left_px: number, width_px: number, top_px: number, height_px: number;

        if (!isVertical) {
          const timeLayout = this.timelineSvc.calcBarLayout(startTimestamp, endTimestamp, pxPerMinuteHorizontal)!;
          left_px = timeLayout.leftPx;
          width_px = timeLayout.widthPx;
          top_px = bollardLayout.offsetPx;
          height_px = bollardLayout.sizePx;
        } else {
          const timeLayout = this.timelineSvc.calcBarLayoutVertical(startTimestamp, endTimestamp, pxPerMinuteVertical)!;
          top_px = timeLayout.topPx;
          height_px = timeLayout.heightPx;
          left_px = bollardLayout.offsetPx;
          width_px = bollardLayout.sizePx;
        }

        const { resources: processedResources, hiddenCount } = this.InitResources(
          vesselItem.resources,
          pxPerMinuteHorizontal,
          pxPerMinuteVertical,
          isVertical,
          left_px,
          top_px,
          width_px,
          height_px,
        );

        return {
          id: vesselItem.id,
          vessel_name: vesselItem.vessel_name,
          status: vesselItem.status,
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
          resources: processedResources,
          hiddenCount
        };
      });

      const totalBollards = berthBollardLabels.length;
      const total_row_height = totalBollards * this.timelineSvc.bollardSize();

      return {
        id: berthItem.berth_id,
        berth_name: berthItem.berth_name,
        bollard_labels: berthBollardLabels,
        vessels: processedVessels,
        total_row_height,
        total_bollard_px: total_row_height,
      };
    });
  }


  private InitResources(
    data: any[],
    pxPerMinuteHorizontal: number,
    pxPerMinuteVertical: number,
    isVertical: boolean,
    vesselLeft: number,
    vesselTop: number,
    vesselWidth: number,
    vesselHeight: number
  ) {
    const TITLE_SIZE = 10;
    const RESOURCE_BAR_SIZE = 8;
    const BAR_GAP = 5;
    const EDGE_MARGIN = 8;

    const slotSize = RESOURCE_BAR_SIZE + BAR_GAP;

    let availableSpace: number;
    if (isVertical) {
      availableSpace = vesselWidth - TITLE_SIZE - EDGE_MARGIN;
    } else {
      availableSpace = vesselHeight - TITLE_SIZE - EDGE_MARGIN;
    }

    const maxBarsFit = Math.max(0, Math.floor((availableSpace + BAR_GAP) / slotSize));

    const totalResources = data.length;
    const visibleCount = Math.min(totalResources, maxBarsFit);
    const hiddenCount = totalResources - visibleCount;
    const visibleResources = data.slice(0, visibleCount);

    const processedResources = visibleResources.map((resourceItem: any, index: number) => {
      const resStart = new Date(resourceItem.planned_start);
      const resEnd = new Date(resourceItem.planned_end);

      let res_left_px: number, res_width_px: number, res_top_px: number, res_height_px: number;

      if (!isVertical) {
        const resTimeLayout = this.timelineSvc.calcBarLayout(resStart, resEnd, pxPerMinuteHorizontal)!;
        res_left_px = resTimeLayout.leftPx - vesselLeft;
        res_width_px = resTimeLayout.widthPx;
        res_left_px = Math.max(0, res_left_px);
        res_width_px = Math.min(res_width_px, (vesselWidth - 2) - res_left_px);
        res_height_px = RESOURCE_BAR_SIZE;
        res_top_px = vesselHeight - EDGE_MARGIN - res_height_px - (index * slotSize);
      } else {
        const resTimeLayout = this.timelineSvc.calcBarLayoutVertical(resStart, resEnd, pxPerMinuteVertical)!;
        res_top_px = resTimeLayout.topPx - vesselTop;
        res_height_px = resTimeLayout.heightPx;

        res_top_px = Math.max(0, res_top_px);
        res_height_px = Math.min(res_height_px, (vesselHeight - 2) - res_top_px);

        res_width_px = RESOURCE_BAR_SIZE;
        res_left_px = vesselWidth - EDGE_MARGIN - res_width_px - (index * slotSize);
      }

      return {
        id: resourceItem.id,
        resource_name: resourceItem.resource_name,
        left_px: res_left_px,
        width_px: res_width_px,
        top_px: res_top_px,
        height_px: res_height_px,
        resStart,
        resEnd
      };
    });

    return { resources: processedResources, hiddenCount };
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