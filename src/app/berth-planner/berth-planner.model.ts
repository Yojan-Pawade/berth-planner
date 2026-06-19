export type PlannerOrientation = 'horizontal' | 'vertical';
export type ViewMode = 'ONE_DAY' | 'TWO_DAY' | 'ONE_WEEK' | 'ONE_MONTH' | 'CUSTOM';
export type SlotCount = 4 | 6 | 12 | 24;

export interface TimelineConfig {
  totalDays: number;
  totalColumns: number;

  // HORIZONTAL LAYOUT CALC
  columnWidthPx: number;
  slotWidthPx: number;
  totalContentWidthPx: number;
  pxPerMinute: number;

  // VERTICLE LAYOUT CALC
  columnHeightPx: number;
  slotHeightPx: number;
  totalContentHeightPx: number;
  pxPerMinuteVertical: number; 

  minutesPerSlot: number;    
  slotLabels: string[];
  
  // BOLLARD CONFIGS
  bollardSize: number;
  bollardStep: number;
  minBollard: number;
  maxBollard: number; 
}

export interface SlotMeta {
  minutesPerSlot: number;
  labels: string[];
}
