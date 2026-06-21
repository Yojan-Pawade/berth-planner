import { Injectable, OnInit, signal } from '@angular/core';
import { TimeLineService } from './timeline.service';
import { PlannerOrientation, SlotCount, TimelineConfig, ViewMode } from '../berth-planner.model';
import { BERTH_PLANNER_DATA, BOLLARD_MAX_SIZE, BOLLARD_MIN_SIZE, BOLLARD_STEP_SIZE, EDGE_MARGIN, RESOURCE_BAR_SIZE, SLOT_SIZE, TITLE_SIZE, VESSEL_STATUS } from '../berth-planner.utils';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit {
  _orientation = signal<PlannerOrientation>('horizontal');
  readonly orientation = this._orientation.asReadonly();
  readonly Math = Math;
  readonly BOLLARD_MAX_SIZE = BOLLARD_MAX_SIZE;
  readonly BOLLARD_MIN_SIZE = BOLLARD_MIN_SIZE;
  
  _VesselStatusFilter = single<string[]>();
  vesselStatusList: any[] = [];
  pendingStatusFilter: string[] = [];
  activeStatusFilter: string[] = [];
  
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
  resourceTypefilterMap: Map<string, Set<string>> = new Map();
  berthPlotingData: any[] = []
  startDateRange!: Date | null;
  endDateRange!: Date | null;

  constructor(public timelineSvc: TimeLineService) { }

  ngOnInit(): void {
    this._init();
    this.vesselStatusList = VESSEL_STATUS;
  }

  _init() {
    this.timelineSvc.initTimeline(this.pendingViewMode, this.pendingSlotCount);
    this.updateLayout();
  }

  isStatusSelected(code: string): boolean {
    return this.pendingStatusFilter.includes(code);
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
    this.resourceTypefilterMap.clear();
    this.rawBerthData = BERTH_PLANNER_DATA;
    const isVertical = this._orientation() === 'vertical';

    const pxPerMinuteHorizontal = this.timelineConfig.pxPerMinute;
    const pxPerMinuteVertical = this.timelineConfig.pxPerMinuteVertical;

    const rangeStart = this.timelineSvc.rangeStartDate();
    const rangeEnd = this.timelineSvc.rangeEndDate();
    const filteredBerthData = this.rawBerthData
      .map((berth: any) => {
        const vessels = (berth.vessels || []).filter((vessel: any) => {
          if (!rangeStart || !rangeEnd) {
            return (this.activeStatusFilter.length === 0 || this.activeStatusFilter.includes(vessel.status?.lookup_code));
          }
          const vesselStart = new Date(vessel.planned_start);
          const vesselEnd = new Date(vessel.planned_end);
          const inRange = (vesselStart <= rangeEnd && vesselEnd >= rangeStart);
          const statusMatch = (this.activeStatusFilter.length === 0 || this.activeStatusFilter.includes(vessel.status?.lookup_code));
          return inRange && statusMatch;
        });

        return {
          ...berth,
          vessels,
        };
      })
      .filter((berth: any) => berth.vessels.length > 0);

    this.berthPlotingData = filteredBerthData.map((berthItem: any) =>
      this.processSingleBerth(berthItem, this.timelineConfig.bollardSize, isVertical, pxPerMinuteHorizontal, pxPerMinuteVertical)
    );
    console.log('final berth data', this.berthPlotingData);
  }


  /*private InitResources(
    data: any[],
    pxPerMinuteHorizontal: number,
    pxPerMinuteVertical: number,
    isVertical: boolean,
    vesselLeft: number,
    vesselTop: number,
    vesselWidth: number,
    vesselHeight: number
  ) {
    let availableSpace: number;
    if (isVertical) {
      availableSpace = vesselWidth - TITLE_SIZE - EDGE_MARGIN;
    } else {
      availableSpace = vesselHeight - TITLE_SIZE - EDGE_MARGIN;
    }

    const maxBarsFit = Math.max(0, Math.floor((availableSpace) / SLOT_SIZE));
    // console.log('max BAR FIRTS',maxBarsFit ,availableSpace, data , Math.floor((availableSpace) / SLOT_SIZE));

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
        res_width_px = Math.min(res_width_px, (vesselWidth - 1.5) - res_left_px);
        res_height_px = RESOURCE_BAR_SIZE;
        res_top_px = vesselHeight - EDGE_MARGIN - res_height_px - (index * SLOT_SIZE);
      } else {
        const resTimeLayout = this.timelineSvc.calcBarLayoutVertical(resStart, resEnd, pxPerMinuteVertical)!;
        res_top_px = resTimeLayout.topPx - vesselTop;
        res_height_px = resTimeLayout.heightPx;

        res_top_px = Math.max(0, res_top_px);
        res_height_px = Math.min(res_height_px, (vesselHeight - 2) - res_top_px);

        res_width_px = RESOURCE_BAR_SIZE;
        res_left_px = vesselWidth - EDGE_MARGIN - res_width_px - (index * SLOT_SIZE);
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
  } */


  private timelayoutCalc(startTimestamp: Date, endTimestamp: Date, bollardLayout: any, pxPerMinuteHorizontal: number = 0, pxPerMinuteVertical: number = 0) {
    let left_px: number, width_px: number, top_px: number, height_px: number
    const isVertical = this._orientation() === 'vertical';
    if (isVertical) {
      const timeLayout = this.timelineSvc.calcBarLayoutVertical(startTimestamp, endTimestamp, pxPerMinuteVertical)!;
      top_px = timeLayout.topPx;
      height_px = timeLayout.heightPx;
      left_px = bollardLayout.offsetPx;
      width_px = bollardLayout.sizePx;

    } else {
      const timeLayout = this.timelineSvc.calcBarLayout(startTimestamp, endTimestamp, pxPerMinuteHorizontal)!;
      left_px = timeLayout.leftPx;
      width_px = timeLayout.widthPx;
      top_px = bollardLayout.offsetPx;
      height_px = bollardLayout.sizePx;
    }
    return { left_px, width_px, top_px, height_px };
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
    let availableSpace: number;
    if (isVertical) {
      availableSpace = vesselWidth - TITLE_SIZE - EDGE_MARGIN;
    } else {
      availableSpace = vesselHeight - TITLE_SIZE - EDGE_MARGIN;
    }

    const maxRowsFit = Math.max(0, Math.floor(availableSpace / SLOT_SIZE));

    const sortedData = [...data].sort(
      (a, b) => new Date(a.planned_start).getTime() - new Date(b.planned_start).getTime()
    );



    const rowLastEndPx: number[] = [];
    const processedResources: any[] = [];
    let hiddenCount = 0;

    for (const resourceItem of sortedData) {
      const resStart = new Date(resourceItem.planned_start);
      const resEnd = new Date(resourceItem.planned_end);

      let res_left_px: number, res_width_px: number, res_top_px: number, res_height_px: number;
      let startPx: number, endPx: number;

      if (!isVertical) {
        const resTimeLayout = this.timelineSvc.calcBarLayout(resStart, resEnd, pxPerMinuteHorizontal)!;
        res_left_px = resTimeLayout.leftPx - vesselLeft;
        res_width_px = resTimeLayout.widthPx;
        res_left_px = Math.max(0, res_left_px);
        res_width_px = Math.min(res_width_px, (vesselWidth - 2) - res_left_px);
        res_height_px = RESOURCE_BAR_SIZE;

        startPx = res_left_px;
        endPx = res_left_px + res_width_px;
      } else {
        const resTimeLayout = this.timelineSvc.calcBarLayoutVertical(resStart, resEnd, pxPerMinuteVertical)!;
        res_top_px = resTimeLayout.topPx - vesselTop;
        res_height_px = resTimeLayout.heightPx;
        res_top_px = Math.max(0, res_top_px);
        res_height_px = Math.min(res_height_px, (vesselHeight - 2) - res_top_px);
        res_width_px = RESOURCE_BAR_SIZE;

        startPx = res_top_px;
        endPx = res_top_px + res_height_px;
      }

      let targetRow = -1;
      // console.log('rowLastEndPx', rowLastEndPx);
      for (let row = 0; row < rowLastEndPx.length; row++) {
        if (startPx > rowLastEndPx[row]) {
          targetRow = row;
          break;
        }
      }
      if (targetRow === -1) {
        if (rowLastEndPx.length < maxRowsFit) {
          targetRow = rowLastEndPx.length;
          rowLastEndPx.push(0);
        } else {
          hiddenCount++;
          continue;
        }
      }
      rowLastEndPx[targetRow] = endPx;

      if (!isVertical) {
        res_top_px = vesselHeight - EDGE_MARGIN - RESOURCE_BAR_SIZE - (targetRow * SLOT_SIZE);
      } else {
        res_left_px = vesselWidth - EDGE_MARGIN - RESOURCE_BAR_SIZE - (targetRow * SLOT_SIZE);
      }

      processedResources.push({
        id: resourceItem.id,
        resource_name: resourceItem.resource_name,
        left_px: res_left_px!,
        width_px: res_width_px,
        top_px: res_top_px!,
        height_px: res_height_px,
        resStart,
        resEnd
      });
    }

    return { resources: processedResources, hiddenCount };
  }

  private processSingleBerth(
    berthItem: any,
    bollardSize: number,
    isVertical: boolean,
    pxPerMinuteHorizontal: number,
    pxPerMinuteVertical: number
  ) {
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

      const bollardLayout = this.calculateVesselLayout(
        berthItem.avail_bollards_st,
        berthItem.bollards_increment,
        vesselItem.bollards_start,
        vesselItem.bollards_end,
        bollardSize
      );

      const { left_px, width_px, top_px, height_px } = this.timelayoutCalc(
        startTimestamp, endTimestamp, bollardLayout, pxPerMinuteHorizontal, pxPerMinuteVertical
      );

      let allResourceTypes: any[] = [];
      const seenTypes = new Set<string>();

      vesselItem.resources.forEach((resource: any) => {
        const typeId = resource.resource_type?.id || resource.resource_type_id;
        const typeDesc = resource.resource_type?.description || resource.resource_name || 'Resource';

        if (typeId && !seenTypes.has(typeId)) {
          allResourceTypes.push({
            title: typeDesc,
            value: typeId
          });
          seenTypes.add(typeId);
        }
      });

      if (!this.resourceTypefilterMap.has(vesselItem.id)) {
        this.resourceTypefilterMap.set(vesselItem.id, new Set<string>(seenTypes));
      }

      const allowedResTypes = this.resourceTypefilterMap.get(vesselItem.id)!;
      const filteredResources = vesselItem.resources.filter((resource: any) => {
        return !allowedResTypes.has(resource.resource_type_id)
      }
      );

      const { resources: processedResources, hiddenCount } = this.InitResources(
        filteredResources,
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
        allResourceTypes,
        hiddenCount
      };
    });

    const totalBollards = berthBollardLabels.length;
    const total_row_height = totalBollards * bollardSize;

    return {
      id: berthItem.berth_id,
      berth_name: berthItem.berth_name,
      bollard_labels: berthBollardLabels,
      bollard_size: bollardSize,
      vessels: processedVessels,
      total_row_height,
      total_bollard_px: total_row_height,
    };
  }



  berthZoomIn(berthID: any) {
    const ind = this.berthPlotingData.findIndex((it: any) => it.id === berthID);
    if (ind === -1) return;

    const currentBerth = this.berthPlotingData[ind];
    if (currentBerth.bollard_size >= BOLLARD_MAX_SIZE) return;

    const newBollardSize = currentBerth.bollard_size + BOLLARD_STEP_SIZE;

    const rawBerthItem = this.rawBerthData.find((it: any) => it.berth_id === berthID);
    if (!rawBerthItem) return;

    const isVertical = this._orientation() === 'vertical';
    const pxPerMinuteHorizontal = this.timelineConfig.pxPerMinute;
    const pxPerMinuteVertical = this.timelineConfig.pxPerMinuteVertical;

    const updatedBerth = this.processSingleBerth(
      rawBerthItem,
      newBollardSize,
      isVertical,
      pxPerMinuteHorizontal,
      pxPerMinuteVertical
    );

    this.berthPlotingData = [
      ...this.berthPlotingData.slice(0, ind),
      updatedBerth,
      ...this.berthPlotingData.slice(ind + 1)
    ];
  }

  berthZoomOut(berthID: any) {
    const ind = this.berthPlotingData.findIndex((it: any) => it.id === berthID);
    if (ind === -1) return;

    const currentBerth = this.berthPlotingData[ind];
    if (currentBerth.bollard_size <= BOLLARD_MIN_SIZE) return;

    const newBollardSize = currentBerth.bollard_size - BOLLARD_STEP_SIZE;

    const rawBerthItem = this.rawBerthData.find((it: any) => it.berth_id === berthID);
    if (!rawBerthItem) return;

    const isVertical = this._orientation() === 'vertical';
    const pxPerMinuteHorizontal = this.timelineConfig.pxPerMinute;
    const pxPerMinuteVertical = this.timelineConfig.pxPerMinuteVertical;

    const updatedBerth = this.processSingleBerth(
      rawBerthItem,
      newBollardSize,
      isVertical,
      pxPerMinuteHorizontal,
      pxPerMinuteVertical
    );

    this.berthPlotingData = [
      ...this.berthPlotingData.slice(0, ind),
      updatedBerth,
      ...this.berthPlotingData.slice(ind + 1)
    ];
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

  private calculateVesselLayout(
    availStart: number,
    increment: number,
    vesselStart: number,
    vesselEnd: number,
    bollardsSize: number
  ) {
    const singleBollardRowHeightPx = bollardsSize;
    const offsetPx = Math.floor((vesselStart - availStart) / increment) * singleBollardRowHeightPx;
    const sizePx = (Math.floor((vesselEnd - vesselStart) / increment) + 1) * singleBollardRowHeightPx;

    return {
      offsetPx,
      sizePx
    };
  }

}