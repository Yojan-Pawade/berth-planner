import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';
import { fmt, m, y } from './berth-planner.utils';
import { PlannerOrientation } from './berth-planner.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-berth-planner',
  templateUrl: './berth-planner.component.html',
  styleUrl: './berth-planner.component.scss',
   animations: [
    trigger('dialogSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 1 }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(0%)', opacity: 0 }))
      ])
    ]),
  ],
})
export class BerthPlannerComponent extends BerthPlannerbaseService implements OnInit {

  private resizeObserver!: ResizeObserver;
  private resizeTimeout?: number;
  lastWidth:any;
  lastHeight :any;
  activeMenuFilter : Set<string> | null = null;  
  @ViewChild('plannerBody', { static: false }) plannerBody!: ElementRef<HTMLDivElement>;
  @ViewChild(MatMenuTrigger) filterMenuTrigger!: MatMenuTrigger;
  @ViewChild('toolTip') toolTip! :TemplateRef<any>; 
  @ViewChild('resourceFilterTrigger') resourceTypeFilter!: MatMenuTrigger;  

  constructor(
    timelineSvc: TimeLineService,
    protected dialog: MatDialog,
  ) {
    super(timelineSvc);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initBerthData();
  }
  
  ngAfterViewInit() {
    if (this.plannerBody?.nativeElement) {
      const el = this.plannerBody.nativeElement;

      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const bodyWidth = entry.contentRect.width;
          const bodyHeight = entry.contentRect.height;

         if (bodyWidth > 0 && bodyHeight > 0 && (bodyWidth !== this.lastWidth || bodyHeight !== this.lastHeight)) {
            this.lastWidth = bodyWidth;
            this.lastHeight = bodyHeight;
            this.timelineSvc.setPlannerWidthPx(bodyWidth);
            this.timelineSvc.setPlannerHeightPx(bodyHeight);
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = window.setTimeout(() => {
              console.log('triggered change layout');
               this.timelineConfig = this.timelineSvc.generateTimelineConfig();
              this.initBerthData();
            }, 300);
          }
        }
      });

      this.resizeObserver.observe(el);

      if (el.clientWidth > 0) {
        this.timelineSvc.setPlannerWidthPx(el.clientWidth);
        this.timelineSvc.setPlannerHeightPx(el.clientHeight);
        this.updateLayout();
      }
    }
  }

  toggleStatusFilter(code: string): void {
    const idx = this.pendingStatusFilter.indexOf(code);
    if (idx === -1) {
      this.pendingStatusFilter.push(code);
    } else {
      this.pendingStatusFilter.splice(idx, 1);
    }
  }

  onApplyFilters(): void {
    this.timelineSvc.initTimeline(this.pendingViewMode, this.pendingSlotCount);
    this.activeStatusFilter = [...this.pendingStatusFilter];
    this.updateLayout();
    this.initBerthData();
    this.filterMenuTrigger.closeMenu();
  }

  onResetFilters(): void {
    this.pendingViewMode = 'ONE_DAY';
    this.pendingSlotCount = 4;
    this.pendingStatusFilter = [];
  }

  onNext() {
    this.shiftTimeline('NEXT');
    this.initBerthData();
  }

  onPrev() {
    this.shiftTimeline('PREV');
    this.initBerthData();
  }

  setOrientation(o: PlannerOrientation): void {
    this._orientation.set(o);
    this.updateLayout();
    this.initBerthData();
  }

  increaseBerthScale(event: Event){
    event.stopPropagation();
    const bollarSize = this.timelineSvc.defaultBollardSize();
    this.timelineSvc.setBollardSize(bollarSize + 25);
  }

  decreaseBerthScale(event:Event){
    event.stopPropagation();
    const bollarSize = this.timelineSvc.defaultBollardSize();
    this.timelineSvc.setBollardSize(bollarSize - 25);
  }

  resetBerthScale(event:Event){
    event.stopPropagation();
    this.timelineSvc.setBollardSize(25);
  }

  get dateRangeLabel(): string {
    const start = this.timelineSvc.rangeStartDate();
    const end = this.timelineSvc.rangeEndDate();
    const mode = this.timelineSvc.viewMode();

    if (!start || !end) return '';

    switch (mode) {
      case 'ONE_DAY': return fmt(start);
      case 'TWO_DAY': return `${fmt(start)} – ${fmt(end)}`;
      case 'ONE_WEEK': return `${fmt(start)} – ${fmt(end)}`;
      case 'ONE_MONTH': return `${m(start)}-${y(start)}`;
      case 'CUSTOM': return `${fmt(start)} – ${fmt(end)}`;
      default: return '';
    }
  }

  get getGridHeight() {
    const totalBerthHeight = this.berthPlotingData.reduce((prev, curr) => prev + curr.total_row_height, 0);
    if (this.orientation() === 'horizontal') {
      return {
        height: totalBerthHeight + 55 + 'px',
      }
    }
    return {
      width: totalBerthHeight + this.berthNameWidth() + 'px',
    } 
  }

  showTooltip(event:Event , data:any , vesselData:any){
    event.stopPropagation();
    this.tootipData = {
      berth_name: data.berth_name,
      vessel_name: vesselData.vessel_name,
      status: vesselData.status.lookup_value,
      planned_start: new Date(vesselData.planned_start),
      planned_end: new Date(vesselData.planned_end),
      actual_start: vesselData.actual_start ? new Date(vesselData.actual_start) : null,
      actual_end: vesselData.actual_end ? new Date(vesselData.planned_start) : null,

    }
    this.dialog.open(this.toolTip ,{
      position :{ top:'0px' , right:'0px' },
      panelClass : 'tooltip-container',
    }).afterClosed().subscribe((it)=>{
      this.tootipData = null;
    })

    console.log('data',data , 'vessel',vesselData);
  }

  closeTooltip(event:Event){
    event.stopPropagation();
    this.dialog.closeAll();
  }

  isResourceTypeChecked(vesselId: string, resourceTypeId: string): boolean {
    const allowedSet = this.resourceTypefilterMap.get(vesselId);
    return allowedSet ? allowedSet.has(resourceTypeId) : false;
  }

  onResourceFilterChange(event: any, vesselId: string, resourceTypeId: string): void {

    if (this.activeMenuFilter) {
      if (event.checked) {
        this.activeMenuFilter.add(resourceTypeId);
      } else {
        this.activeMenuFilter.delete(resourceTypeId);
      }
    }
  }

  onMenuOpened(vesselId: string , berthId:string){
    const original = this.resourceTypefilterMap.get(vesselId)!;
    this.activeMenuFilter = new Set(original);
  }

  menuClose(event:Event){
    event.stopPropagation();
    this.resourceTypeFilter.closeMenu();
  }

  applyFilter(event : Event, vesselId: string , berthId:string): void {
    event.stopPropagation();
    this.resourceTypefilterMap.set(vesselId, this.activeMenuFilter!);
    this.applyResourceType(vesselId , berthId);
    this.activeMenuFilter = null;
    this.resourceTypeFilter.closeMenu();
  }
  
  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
