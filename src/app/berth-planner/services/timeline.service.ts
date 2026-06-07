import { Injectable, signal } from '@angular/core';
import { SlotCount, SlotMeta, TimelineConfig, ViewMode } from '../berth-planner.model';

@Injectable({ providedIn: 'root' })
export class TimeLineService {
  readonly todayDate = new Date();

  private readonly MIN_COLUMN_WIDTH_4_SLOT  = 120;
  private readonly MIN_COLUMN_WIDTH_6_SLOT  = 180;
  private readonly MIN_COLUMN_WIDTH_12_SLOT = 300;
  private readonly MIN_COLUMN_WIDTH_24_SLOT = 600;

  readonly slotMetaMap = new Map<SlotCount, SlotMeta>([
    [4, { minutesPerSlot: 360, labels: ['12a', '6', '12p', '18'] }],
    [6, { minutesPerSlot: 240, labels: ['12a', '4', '8', '12p', '16', '20'] }],
    [12, { minutesPerSlot: 120, labels: ['12a', '2', '4', '6', '8', '10', '12p', '14', '16', '18', '20', '22'] }],
    [24, { minutesPerSlot: 60, labels: ['12a', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12p', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'] }],
  ]);

  private readonly _rangeStartDate = signal<Date | null>(null);
  private readonly _rangeEndDate = signal<Date | null>(null);
  private readonly _viewMode = signal<ViewMode>('ONE_WEEK');
  private readonly _slotCount = signal<SlotCount>(4);
  private readonly _bollardSize = signal<number>(25)
  
  private readonly _plannerWidthPx = signal<number>(1200);
  private readonly _plannerHeightPx = signal<number>(0);

  readonly rangeStartDate = this._rangeStartDate.asReadonly();
  readonly rangeEndDate = this._rangeEndDate.asReadonly();
  readonly viewMode = this._viewMode.asReadonly();
  readonly slotCount = this._slotCount.asReadonly();
  readonly bollardSize = this._bollardSize.asReadonly();
  
  readonly plannerWidthPx = this._plannerWidthPx.asReadonly();
  readonly plannerHeightPx = this._plannerHeightPx.asReadonly();

  private readonly MS_PER_MINUTE = 1000 * 60;
  private readonly MS_PER_DAY = 1000 * 60 * 60 * 24;

  initTimeline(mode: ViewMode, slots: SlotCount = 4): void {
    this._slotCount.set(slots);
    this._viewMode.set(mode);
    if (mode !== 'CUSTOM') {
      const { start, end } = this.resolveDateRange(mode, this.todayDate);
      this._rangeStartDate.set(start);
      this._rangeEndDate.set(end);
    }
  }

  navigate(direction: 'NEXT' | 'PREV'): void {
    const mode = this._viewMode();
    const current = this._rangeStartDate();
    if (mode === 'CUSTOM' || !current) return;

    const ref = new Date(current);
    const step = direction === 'NEXT' ? 1 : -1;

    switch (mode) {
      case 'ONE_DAY': ref.setDate(ref.getDate() + step); break;
      case 'TWO_DAY': ref.setDate(ref.getDate() + (step * 2)); break;
      case 'ONE_WEEK': ref.setDate(ref.getDate() + (step * 7)); break;
      case 'ONE_MONTH': ref.setMonth(ref.getMonth() + step); break;
    }

    const { start, end } = this.resolveDateRange(mode, ref);
    this._rangeStartDate.set(start);
    this._rangeEndDate.set(end);
  }

  generateTimelineConfig(): TimelineConfig {
    const containerWidth = this._plannerWidthPx() * 85 / 100;
    const containerHeight = this._plannerHeightPx()*90 /100;
    const slotCount = this._slotCount();
    const start = this._rangeStartDate();
    const end = this._rangeEndDate();
    const bollardSize = this._bollardSize();

    const totalDays = this._daysBetween(start, end);
    const totalColumns = totalDays * slotCount;

    const viewMode = this._viewMode();
    // Horizontal Calc
    let columnWidthPx: number;
    if (viewMode === 'ONE_DAY' || viewMode === 'TWO_DAY') {
      columnWidthPx = containerWidth / totalDays;

    } else if (viewMode === 'ONE_MONTH' || viewMode === 'CUSTOM') {
      columnWidthPx = slotCount === 24 ? this.MIN_COLUMN_WIDTH_24_SLOT
        : slotCount === 12 ? this.MIN_COLUMN_WIDTH_12_SLOT
          : slotCount === 6 ? this.MIN_COLUMN_WIDTH_6_SLOT
            : this.MIN_COLUMN_WIDTH_4_SLOT;

    } else {
      columnWidthPx = slotCount === 24 ? this.MIN_COLUMN_WIDTH_24_SLOT
        : slotCount === 12 ? this.MIN_COLUMN_WIDTH_12_SLOT
          : containerWidth / totalDays;
    }

    const slotWidthPx = columnWidthPx / slotCount;
    const minutesPerSlot = this.slotMetaMap.get(slotCount)!.minutesPerSlot;
    const pxPerMinute = slotWidthPx / minutesPerSlot;
    const totalContentWidthPx = totalDays * columnWidthPx;

    // Verticla layout Calc
    let columnHeightPx: number;
    if (viewMode === 'ONE_DAY' || viewMode === 'TWO_DAY') {
      columnHeightPx = containerHeight / totalDays;
    } else if (viewMode === 'ONE_MONTH' || viewMode === 'CUSTOM' || viewMode === 'ONE_WEEK' ) {
      columnHeightPx = slotCount === 24 ? this.MIN_COLUMN_WIDTH_24_SLOT
        : slotCount === 12 ? this.MIN_COLUMN_WIDTH_12_SLOT
          : slotCount === 6 ? this.MIN_COLUMN_WIDTH_6_SLOT
            : this.MIN_COLUMN_WIDTH_4_SLOT;
    } else {
      columnHeightPx = slotCount === 24 ? this.MIN_COLUMN_WIDTH_24_SLOT
        : slotCount === 12 ? this.MIN_COLUMN_WIDTH_12_SLOT
          : containerHeight / totalDays;
    }

    const slotHeightPx = columnHeightPx / slotCount;
    const totalContentHeightPx = totalDays * columnHeightPx;
    const pxPerMinuteVertical = slotHeightPx / minutesPerSlot;
    const slotLabels = this.slotMetaMap.get(slotCount)!.labels;

    return {
      totalDays,
      totalColumns,
      columnWidthPx,
      slotWidthPx,
      totalContentWidthPx,
      columnHeightPx,
      slotHeightPx,
      totalContentHeightPx,
      minutesPerSlot,
      pxPerMinute,
      pxPerMinuteVertical,
      slotLabels,
      bollardSize,
    };
  }

  resolveDateRange(mode: Exclude<ViewMode, 'CUSTOM'>, referenceDate?: Date): { start: Date; end: Date } {
    const ref = new Date(referenceDate ?? this.todayDate);
    ref.setHours(0, 0, 0, 0);
    let start = new Date(ref);
    let end = new Date(ref);

    switch (mode) {
      case 'ONE_DAY': break;
      case 'TWO_DAY': end.setDate(ref.getDate() + 1); break;
      case 'ONE_WEEK': {
        const day = ref.getDay();
        const diffToMonday = day === 0 ? -6 : 1 - day;
        start.setDate(ref.getDate() + diffToMonday);
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        break;
      }
      case 'ONE_MONTH': {
        start = new Date(ref.getFullYear(), ref.getMonth(), 1);
        end = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
        break;
      }
    }
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }



  calcBarLayout(
    itemStart: Date,
    itemEnd: Date,
    pxPerMinute: number
  ): { leftPx: number; widthPx: number } | null {
    const rangeStartDate = this._rangeStartDate();
    if (!rangeStartDate || pxPerMinute === 0) return null;

    const leftMinutes = (itemStart.getTime() - rangeStartDate.getTime()) / this.MS_PER_MINUTE;
    const widthMinutes = (itemEnd.getTime() - itemStart.getTime()) / this.MS_PER_MINUTE;

    return {
      leftPx: leftMinutes * pxPerMinute,
      widthPx: widthMinutes * pxPerMinute,
    };
  }

  calcBarLayoutVertical(
    itemStart: Date,
    itemEnd: Date,
    pxPerMinuteVertical: number
  ): { topPx: number; heightPx: number } | null {
    const rangeStartDate = this._rangeStartDate();
    if (!rangeStartDate || pxPerMinuteVertical === 0) return null;
    const topMinutes = (itemStart.getTime() - rangeStartDate.getTime()) / this.MS_PER_MINUTE;
    const heightMinutes = (itemEnd.getTime() - itemStart.getTime()) / this.MS_PER_MINUTE;
    return {
      topPx: topMinutes * pxPerMinuteVertical,
      heightPx: heightMinutes * pxPerMinuteVertical,
    };
  }

  setBollarSize(size:number){
    this._bollardSize.set(size);
  }

  setSlots(slot:SlotCount){
    this._slotCount.set(slot);
  }

  setPlannerWidthPx(width: number): void {
    this._plannerWidthPx.set(width);
  }
  
  setPlannerHeightPx(height: number): void {
    this._plannerHeightPx.set(height);
  }

  private _daysBetween(start: Date | null, end: Date | null): number {
    if (!start || !end) return 0;
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / this.MS_PER_DAY));
  }
}