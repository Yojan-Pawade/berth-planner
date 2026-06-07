import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';
import { fmt, m, y } from './berth-planner.utils';
import { PlannerOrientation } from './berth-planner.model';

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

  ngAfterViewInit() {
    if (this.plannerBody?.nativeElement) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const el = entry.target as HTMLElement;

          const bodyWidth = Math.floor(entry.contentRect.width);
          const bodyHeight = Math.floor(entry.contentRect.height);
          this.timelineSvc.setPlannerWidthPx(bodyWidth);
          this.timelineSvc.setPlannerHeightPx(bodyHeight);
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

  setOrientation(o: PlannerOrientation): void {
    this._orientation.set(o);
    if (o == 'vertical') {
      this.timelineSvc.setBollarSize(35);
    } else {
      this.timelineSvc.setBollarSize(25);
    }
    this.updateLayout();
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
