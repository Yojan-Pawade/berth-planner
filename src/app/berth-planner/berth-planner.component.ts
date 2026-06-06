import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';
import { BERTH_STATIC_DATA, fmt, m, y } from './berth-planner.utils';

@Component({
  selector: 'app-berth-planner',
  templateUrl: './berth-planner.component.html',
  styleUrl: './berth-planner.component.scss'
})
export class BerthPlannerComponent extends BerthPlannerbaseService implements OnInit {
  private resizeObserver!: ResizeObserver;
  @ViewChild('plannerBody', { static: false }) plannerBody!: ElementRef<HTMLDivElement>;
  constructor(timelineSvc: TimeLineService) {
    super(timelineSvc);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initBerthData();
  }

  async initBerthData() {
  this.rawBerthData = BERTH_STATIC_DATA;

    this.berthPlotingData = this.rawBerthData.map((item: any) => {
      // Date handling
      const plannedStart =  new Date(item.planned_start);
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

      // console.log(actualLayout , plannedLayout , bollardconfig);

      return {
        id: item.id,
        berth_name: item.berth_name,
        bollard_start: item.bollards_start,
        bollard_end: item.bollards_end,
        planned_start: plannedStart,
        planned_end: plannedEnd,
        actual_start: actualStart,
        actual_end: actualEnd,
        bollard_labels : bollardconfig.labels,
        layout_top_margin:bollardconfig.topPx,
        layout_height: bollardconfig.layoutHeight,
        planned_left_margin: plannedLayout.leftPx,
        planned_width:plannedLayout.widthPx,
        actual_left_margin: actualLayout?.leftPx ?? null,
        actualEnd_width:actualLayout?.widthPx ?? null,
        layout_width: berthLayout.widthPx
      };
    });
  console.log(this.berthPlotingData );
}

  ngAfterViewInit() {
    if (this.plannerBody?.nativeElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const bodyWidth = Math.floor(entry.contentRect.width);
          const bodyHeight = Math.floor(entry.contentRect.height);
          this.timelineSvc.setPlannerWidthPx(bodyWidth);
          this.timelineSvc.setPlannerHeightPx(bodyHeight);
          this.updateLayout();
        }
      });

      this.resizeObserver.observe(this.plannerBody.nativeElement);
    }
  }


  onNext() {
    this.shiftTimeline('NEXT');
    this.initBerthData();
  }

  onPrev() {
    this.shiftTimeline('PREV');
    this.initBerthData();
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


  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
