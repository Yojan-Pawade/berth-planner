export type PlannerOrientation = 'horizontal' | 'vertical';
export type ViewMode = 'ONE_DAY' | 'TWO_DAY' | 'ONE_WEEK' | 'ONE_MONTH' | 'CUSTOM';
export type SlotCount = 4 | 6 | 12 | 24;

export interface TimelineConfig {
  totalDays: number;
  totalColumns: number;
  columnWidthPx: number;
  slotWidthPx: number;
  minutesPerSlot: number;
  pxPerMinute: number;
  totalContentWidthPx: number;
  slotLabels: string[];
  bollardSize:number;
}

export interface SlotMeta {
  minutesPerSlot: number;
  labels: string[];
}
