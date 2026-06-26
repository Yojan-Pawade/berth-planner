import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { TimeLineService } from './timeline.service';
import { PlannerOrientation, SlotCount, TimelineConfig, ViewMode } from '../berth-planner.model';
import { BERTH_PLANNER_DATA, BERTH_SCALE_LABEL, BOLLARD_MAX_SIZE, BOLLARD_MIN_SIZE, BOLLARD_STEP_SIZE, EDGE_MARGIN, RESOURCE_BAR_SIZE, RESOURCE_TYPE, RESOURCE_TYPE_COLORS, SLOT_SIZE, TITLE_SIZE, VESSEL_STATUS } from '../berth-planner.utils';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BerthPlannerbaseService implements OnInit, OnDestroy {
  _orientation = signal<PlannerOrientation>('horizontal');
  readonly orientation = this._orientation.asReadonly();
  readonly Math = Math;
  readonly BOLLARD_MAX_SIZE = BOLLARD_MAX_SIZE;
  readonly BOLLARD_MIN_SIZE = BOLLARD_MIN_SIZE;
  readonly BERTH_SCALE_LABEL = BERTH_SCALE_LABEL;
  readonly RESOURCE_TYPE_COLORS = RESOURCE_TYPE_COLORS;

  _VesselStatusFilter = single<string[]>();
  vesselStatusList: any[] = [];
  pendingStatusFilter: string[] = [];
  activeStatusFilter: string[] = [];

  pendingResourceTypeFilter: string[] = [];
  activeResourceTypeFilter: string[] = [];
  resourceTypeList: any[] = [];

  pendingViewMode: ViewMode = 'ONE_MONTH';
  pendingSlotCount: SlotCount = 12;


  private readonly BERTH_NAME_PERCENT = 15;
  private readonly BERTH_NAME_HEIGHT_PERCENT = 12;
  private readonly TIMELINE_PERCENT = 85;

  tootipData: any = null
  timelineConfig!: TimelineConfig;
  timeline: Date[] = [];
  rawBerthData: any[] = [];
  berthMap: Map<string, any> = new Map();
  resourceMap: Map<string, any> = new Map();
  vesselMap: Map<string, any> = new Map();
  resourceTypefilterMap: Map<string, Set<string>> = new Map();
  berthPlotingData: any[] = []
  startDateRange!: Date | null;
  endDateRange!: Date | null;

  constructor(public timelineSvc: TimeLineService) { }

  ngOnInit(): void {
    this._init();
    this.vesselStatusList = VESSEL_STATUS;
    this.resourceTypeList = RESOURCE_TYPE;
  }

  _init() {
    this.timelineSvc.initTimeline(this.pendingViewMode, this.pendingSlotCount);
    this.updateLayout();
  }

  isStatusSelected(code: string): boolean {
    return this.pendingStatusFilter.includes(code);
  }

  isResourceTypeGlobalSelected(id: string): boolean {
    return this.pendingResourceTypeFilter.length === 0 || this.pendingResourceTypeFilter.includes(id);
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

      let resourceObj = {
        id: resourceItem.id,
        resource_name: resourceItem.resource_name,
        left_px: res_left_px!,
        width_px: res_width_px,
        top_px: res_top_px!,
        height_px: res_height_px,
        resStart,
        resEnd,
        resource_type: resourceItem.resource_type,
        color: RESOURCE_TYPE_COLORS[resourceItem.resource_type.code],
        work_completed : resourceItem.work_completed
      }

      this.resourceMap.set(resourceObj.id, resourceObj);

      processedResources.push(resourceObj);
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
        const typeId = resource.resource_type.id;
        const typeDesc = resource.resource_type?.description || resource.resource_name || 'Resource';

        if (typeId && !seenTypes.has(typeId)) {
          allResourceTypes.push({ title: typeDesc, value: typeId });
          seenTypes.add(typeId);
        }
      });

      if (!this.resourceTypefilterMap.has(vesselItem.id)) {
        if (this.activeResourceTypeFilter.length === 0) {
          this.resourceTypefilterMap.set(vesselItem.id, new Set<string>(seenTypes));
        } else {
          const intersected = new Set<string>(
            [...seenTypes].filter(id => this.activeResourceTypeFilter.includes(id))
          );
          this.resourceTypefilterMap.set(vesselItem.id, intersected);
        }
      }

      const allowedResTypes = this.resourceTypefilterMap.get(vesselItem.id)!;
      const filteredResources = vesselItem.resources.filter((resource: any) => {
        return allowedResTypes.has(resource.resource_type.id)
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

      let vesselObj = {
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
      this.vesselMap.set(vesselObj.id, vesselObj);
      return vesselObj;
    });

    const totalBollards = berthBollardLabels.length;
    const total_row_height = totalBollards * bollardSize;

    let berthObj = {
      id: berthItem.berth_id,
      berth_name: berthItem.berth_name,
      bollard_labels: berthBollardLabels,
      bollard_size: bollardSize,
      vessels: processedVessels,
      total_row_height,
      total_bollard_px: total_row_height,
    };
    this.berthMap.set(berthObj.id, berthObj);
    return berthObj;
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

    let newBollardSize = currentBerth.bollard_size - BOLLARD_STEP_SIZE;
    if (newBollardSize < BOLLARD_MIN_SIZE) newBollardSize = BOLLARD_MIN_SIZE;

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

  applyResourceType(vesselId: string, berthId: string) {
    const berthIndex = this.berthPlotingData.findIndex((it: any) => it.id === berthId);
    if (berthIndex === -1) return;

    const berthObj = this.berthPlotingData[berthIndex];
    const vesselIndex = berthObj.vessels.findIndex((it: any) => it.id === vesselId);
    if (vesselIndex === -1) return;

    const vesselObj = berthObj.vessels[vesselIndex];

    const rawBerthItem = this.rawBerthData.find((it: any) => it.berth_id === berthId);
    if (!rawBerthItem) return;

    const rawVesselItem = rawBerthItem.vessels.find((it: any) => it.id === vesselId);
    if (!rawVesselItem) return;
    // console.log('raw vessels', rawVesselItem);

    const allowedResTypes = this.resourceTypefilterMap.get(vesselId)!;
    // console.log('resource toyes',allowedResTypes);
    const filteredResources = rawVesselItem.resources.filter((resource: any) => {
      return allowedResTypes.has(resource.resource_type.id);
    });
    // console.log('filtered resources', filteredResources);

    const { resources: processedResources, hiddenCount } = this.InitResources(
      filteredResources,
      this.timelineConfig.pxPerMinute,
      this.timelineConfig.pxPerMinuteVertical,
      this.orientation() === 'vertical',
      vesselObj.left_px,
      vesselObj.top_px,
      vesselObj.width_px,
      vesselObj.height_px,
    );

    const updatedVessel = {
      ...vesselObj,
      resources: processedResources,
      hiddenCount
    };

    const updatedVessels = [
      ...berthObj.vessels.slice(0, vesselIndex),
      updatedVessel,
      ...berthObj.vessels.slice(vesselIndex + 1)
    ];

    const updatedBerth = {
      ...berthObj,
      vessels: updatedVessels
    };

    this.berthPlotingData = [
      ...this.berthPlotingData.slice(0, berthIndex),
      updatedBerth,
      ...this.berthPlotingData.slice(berthIndex + 1)
    ];

    this.vesselMap.set(updatedVessel.id, updatedVessel);
    this.berthMap.set(updatedBerth.id, updatedBerth);
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

  calcRequiredBollardSizeForAllResources(
    data: any[],
    pxPerMinuteHorizontal: number,
    pxPerMinuteVertical: number,
    isVertical: boolean,
    vesselLeft: number,
    vesselTop: number,
    vesselWidth: number,
    vesselHeight: number,
    berthId: any,
    bollard_st: number,
    bollard_ed: number
  ): number {
    const sortedData = [...data].sort(
      (a, b) => new Date(a.planned_start).getTime() - new Date(b.planned_start).getTime()
    );

    const rowLastEndPx: number[] = [];

    for (const resourceItem of sortedData) {
      const resStart = new Date(resourceItem.planned_start);
      const resEnd = new Date(resourceItem.planned_end);

      let startPx: number, endPx: number;

      if (!isVertical) {
        const resTimeLayout = this.timelineSvc.calcBarLayout(resStart, resEnd, pxPerMinuteHorizontal)!;
        let res_left_px = Math.max(0, resTimeLayout.leftPx - vesselLeft);
        const res_width_px = Math.min(resTimeLayout.widthPx, (vesselWidth - 2) - res_left_px);
        startPx = res_left_px;
        endPx = res_left_px + res_width_px;
      } else {
        const resTimeLayout = this.timelineSvc.calcBarLayoutVertical(resStart, resEnd, pxPerMinuteVertical)!;
        let res_top_px = Math.max(0, resTimeLayout.topPx - vesselTop);
        const res_height_px = Math.min(resTimeLayout.heightPx, (vesselHeight - 2) - res_top_px);
        startPx = res_top_px;
        endPx = res_top_px + res_height_px;
      }

      // find first fitting row
      let targetRow = -1;
      for (let row = 0; row < rowLastEndPx.length; row++) {
        if (startPx > rowLastEndPx[row]) {
          targetRow = row;
          break;
        }
      }

      if (targetRow === -1) {
        targetRow = rowLastEndPx.length;
        rowLastEndPx.push(0);
      }

      rowLastEndPx[targetRow] = endPx;
    }

    const rowsNeeded = rowLastEndPx.length;

    // availableSpace = bollardSize - TITLE_SIZE - EDGE_MARGIN
    // maxRowsFit = floor(availableSpace / SLOT_SIZE) >= rowsNeeded
    // bollardSize >= (rowsNeeded * SLOT_SIZE) + TITLE_SIZE + EDGE_MARGIN
    // Edge case check for vessel plots on how many bollards , so we can decide one bollard final size
    const bollards = this.berthMap.get(berthId).bollard_labels;
    const i = bollards.indexOf(String(bollard_st));
    const j = bollards.indexOf(String(bollard_ed));
    const requiredBollardSize = ((rowsNeeded * SLOT_SIZE) + TITLE_SIZE + EDGE_MARGIN) / (Math.abs(j - i) + 1);

    return Math.min(requiredBollardSize, BOLLARD_MAX_SIZE);
  }

  autoFitBerthResources(berthId: string) {
    const rangeStart = this.timelineSvc.rangeStartDate();
    const rangeEnd = this.timelineSvc.rangeEndDate();
    const berthIndex = this.berthPlotingData.findIndex((it: any) => it.id === berthId);
    if (berthIndex === -1) return;

    const rawBerthItem = this.rawBerthData.find((it: any) => it.berth_id === berthId);
    if (!rawBerthItem) return;

    const isVertical = this._orientation() === 'vertical';
    const pxPerMinuteHorizontal = this.timelineConfig.pxPerMinute;
    const pxPerMinuteVertical = this.timelineConfig.pxPerMinuteVertical;
    const currentBerth = this.berthPlotingData[berthIndex];

    let maxRequiredBollardSize = this.timelineConfig.bollardSize;

    const filteredVessels = (rawBerthItem.vessels || []).filter((vessel: any) => {
      if (!rangeStart || !rangeEnd) {
        return this.activeStatusFilter.length === 0
          || this.activeStatusFilter.includes(vessel.status?.lookup_code);
      }
      const vesselStart = new Date(vessel.planned_start);
      const vesselEnd = new Date(vessel.planned_end);
      const inRange = vesselStart <= rangeEnd && vesselEnd >= rangeStart;
      const statusMatch = this.activeStatusFilter.length === 0
        || this.activeStatusFilter.includes(vessel.status?.lookup_code);
      return inRange && statusMatch;
    });

    const filteredBerthItem = {
        ...rawBerthItem,
        vessels: filteredVessels
    };

    for (const vesselItem of filteredVessels) {
      const bollardLayout = this.calculateVesselLayout(
        rawBerthItem.avail_bollards_st,
        rawBerthItem.bollards_increment,
        vesselItem.bollards_start,
        vesselItem.bollards_end,
        currentBerth.bollard_size
      );

      const { left_px, width_px, top_px, height_px } = this.timelayoutCalc(
        new Date(vesselItem.planned_start),
        new Date(vesselItem.planned_end),
        bollardLayout,
        pxPerMinuteHorizontal,
        pxPerMinuteVertical
      );

      const allowedResTypes = this.resourceTypefilterMap.get(vesselItem.id);
      const filteredResources = allowedResTypes
        ? vesselItem.resources.filter((r: any) => allowedResTypes.has(r.resource_type.id))
        : vesselItem.resources;

      const required = this.calcRequiredBollardSizeForAllResources(
        filteredResources,
        pxPerMinuteHorizontal,
        pxPerMinuteVertical,
        isVertical,
        left_px,
        top_px,
        width_px,
        height_px,
        berthId,
        vesselItem.bollards_start,
        vesselItem.bollards_end,
      );

      maxRequiredBollardSize = Math.max(maxRequiredBollardSize, required);
    }

    const updatedBerth = this.processSingleBerth(
      filteredBerthItem,
      maxRequiredBollardSize,
      isVertical,
      pxPerMinuteHorizontal,
      pxPerMinuteVertical
    );

    this.berthPlotingData = [
      ...this.berthPlotingData.slice(0, berthIndex),
      updatedBerth,
      ...this.berthPlotingData.slice(berthIndex + 1)
    ];
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

  ngOnDestroy() {
    this.berthMap.clear();
    this.resourceMap.clear();
    this.vesselMap.clear();
    this.resourceTypefilterMap.clear();
  }

}