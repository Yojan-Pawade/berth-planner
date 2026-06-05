import { Component, ElementRef, ViewChild } from '@angular/core';
import { BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';

@Component({
  selector: 'app-berth-planner',
  templateUrl: './berth-planner.component.html',
  styleUrl: './berth-planner.component.scss'
})
export class BerthPlannerComponent extends BerthPlannerbaseService {
  private resizeObserver!: ResizeObserver;
  @ViewChild('plannerBody', { static: false }) plannerBody!: ElementRef<HTMLDivElement>;
  constructor(timelineSvc: TimeLineService) {
    super(timelineSvc);
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


  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
