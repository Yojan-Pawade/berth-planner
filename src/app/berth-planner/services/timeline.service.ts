import { Injectable, computed, signal } from '@angular/core';

export type ViewMode = 'ONE_DAY' | 'TWO_DAY' | 'ONE_WEEK' | 'ONE_MONTH' | 'CUSTOM';
export type SlotCount = 4 | 6 | 12 | 24;

export interface TimelineConfig {
  rangeStartDate: Date | null;
  rangeEndDate: Date | null;
  viewMode: ViewMode;
  selectedDayTimeSlot: SlotCount;
  containerWidth: number;
  needsHorizontalScroll: boolean;
}

export interface TimelineSize {
  totalDays: number;
  totalColumns: number;
  columnWidthPx: number;
  slotWidthPx: number;
  minutesPerSlot: number;
  pxPerMinute: number;
  totalContentWidthPx: number;
}

@Injectable({ providedIn: 'root' })
export class TimeLineService {

  readonly todayDate = new Date();

  readonly dayTimeSlots = [
    { value: 4 as SlotCount, label: '4 Slots' },
    { value: 6 as SlotCount, label: '6 Slots' },
    { value: 12 as SlotCount, label: '12 Slots' },
    { value: 24 as SlotCount, label: '24 Slots' },
  ];

  private readonly MIN_DAY_WIDTH_SCROLL = 60;

  private readonly _rangeStartDate = signal<Date | null>(null);
  private readonly _rangeEndDate = signal<Date | null>(null);
  private readonly _viewMode = signal<ViewMode>('ONE_WEEK');
  private readonly _slotCount = signal<SlotCount>(4);
  private readonly _timelineContainerWidth = signal<number>(0);

  readonly rangeStartDate = this._rangeStartDate.asReadonly();
  readonly rangeEndDate = this._rangeEndDate.asReadonly();
  readonly viewMode = this._viewMode.asReadonly();
  readonly slotCount = this._slotCount.asReadonly();
  readonly timeLineContainerWidth = this._timelineContainerWidth.asReadonly();
  readonly slotMinMap = new Map<number, number>([
    [4, 360],
    [6, 240],
    [12, 120],
    [24, 60]
  ]);

  private readonly MS_PER_MINUTE = 1000 * 60;
  private readonly MS_PER_HOUR = 1000 * 60 * 60;
  private readonly MS_PER_DAY = 1000 * 60 * 60 * 24;

  readonly config = computed<TimelineConfig>(() => {
    const rangeStartDate = this._rangeStartDate();
    const rangeEndDate = this._rangeEndDate();
    const viewMode = this._viewMode();
    const selectedDayTimeSlot = this._slotCount();
    const containerWidth = this._timelineContainerWidth();
    const needsHorizontalScroll = viewMode === 'ONE_MONTH' || viewMode === 'CUSTOM';

    return {
      rangeStartDate,
      rangeEndDate,
      viewMode,
      selectedDayTimeSlot,
      containerWidth,
      needsHorizontalScroll,
    };
  });


  setViewMode(mode: ViewMode): void {
    this._viewMode.set(mode);
    if (mode !== 'CUSTOM') {
      this._dateRangeForMode(mode);
    }
  }

  setSlotCount(slots: SlotCount): void {
    this._slotCount.set(slots);
  }

  setCustomRange(start: Date, end: Date): void {
    this._viewMode.set('CUSTOM');
    this._rangeStartDate.set(start);
    this._rangeEndDate.set(end);
  }

  setContainerWidth(px: number): void {
    this._timelineContainerWidth.set(px);
  }


  generateTimelineSize(): TimelineSize {
    const containerWidth = this._timelineContainerWidth();
    const slotCount = this._slotCount();
    const viewMode = this._viewMode();
    const start = this._rangeStartDate();
    const end = this._rangeEndDate();

    const totalDays = this._daysBetween(start, end);
    const totalColumns = totalDays * slotCount;

    const isFitMode = viewMode === 'ONE_DAY'
      || viewMode === 'TWO_DAY'
      || viewMode === 'ONE_WEEK';

    const columnWidthPx = isFitMode
      ? Math.floor(containerWidth / totalDays)
      : this.MIN_DAY_WIDTH_SCROLL;

    const slotWidthPx = columnWidthPx / slotCount;

    const minutesPerSlot = this.slotMinMap.get(slotCount)!;

    const pxPerMinute = slotWidthPx / minutesPerSlot;

    const totalContentWidthPx = totalDays * columnWidthPx;

    return {
      totalDays,
      totalColumns,
      columnWidthPx,
      slotWidthPx,
      minutesPerSlot,
      pxPerMinute,
      totalContentWidthPx,
    };
  }

  private _dateRangeForMode(mode: ViewMode): void {
    const start = new Date(this.todayDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);

    switch (mode) {
      case 'ONE_DAY': end.setDate(start.getDate() + 1); break;
      case 'TWO_DAY': end.setDate(start.getDate() + 2); break;
      case 'ONE_WEEK': end.setDate(start.getDate() + 7); break;
      case 'ONE_MONTH': end.setMonth(start.getMonth() + 1); break;
    }

    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);

    this._rangeStartDate.set(start);
    this._rangeEndDate.set(end);
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
      leftPx: Math.round(leftMinutes * pxPerMinute),
      widthPx: Math.round(widthMinutes * pxPerMinute),
    };
  }


  private _daysBetween(start: Date | null, end: Date | null): number {
    if (!start || !end) return 0;
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / this.MS_PER_DAY));
  }
}