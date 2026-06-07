export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const d = (date: Date) => String(date.getDate()).padStart(2, '0');
export const m = (date: Date) => MONTHS[date.getMonth()];
export const y = (date: Date) => date.getFullYear();
export const fmt = (date: Date) => `${d(date)}-${m(date)}-${y(date)}`;

export const BERTH_PLANNER_DATA = [
  {
    berth_id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    berth_name: 'Berth A',
    avail_bollards_st: 1,
    avail_bollards_ed: 11,
    bollards_increment: 2,
    vessels: [
      {
        id: 'a1b2c3d4-0001-4e5f-a678-9b0c1d2e3f4a',
        vessel_name: 'Alpha Voyager',
        bollards_start: 3,
        bollards_end: 9,
        planned_start: '2026-06-01T06:00:00.000Z',
        planned_end: '2026-06-01T14:00:00.000Z',
        actual_start: '2026-06-02T06:30:00.000Z',
        actual_end: '2026-06-02T14:15:00.000Z',
      },
      {
        id: '2c5e4d1a-8b9c-4f0e-a123-bc4d5e6f7a8b',
        vessel_name: 'Oceanic Express',
        bollards_start: 1,
        bollards_end: 7,
        planned_start: '2026-06-04T08:00:00.000Z',
        planned_end: '2026-06-04T20:00:00.000Z',
        actual_start: null,
        actual_end: null
      }
    ]
  },
  {
    berth_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    berth_name: 'Berth B',
    avail_bollards_st: 1,
    avail_bollards_ed: 25,
    bollards_increment: 4,
    vessels: [
      {
        id: 'a1b2c3d4-0003-4e5f-a678-9b0c1d2e3f4c',
        vessel_name: 'Pacific Trader',
        bollards_start: 9,
        bollards_end: 17,
        planned_start: '2026-06-02T08:00:00.000Z',
        planned_end: '2026-06-02T20:00:00.000Z',
        actual_start: '2026-06-02T08:00:00.000Z',
        actual_end: '2026-06-02T20:00:00.000Z',
      },
      {
        id: '3d6f7e8a-9b0c-4d1e-a234-cd5e6f7a8b9c',
        vessel_name: 'Atlantic Quest',
        bollards_start: 5,
        bollards_end: 21,
        planned_start: '2026-06-03T10:00:00.000Z',
        planned_end: '2026-06-03T18:00:00.000Z',
        actual_start: null,
        actual_end: null,
      },
      {
        id: 'a1b2c3d4-0004-4e5f-a678-9b0c1d2e3f4d',
        vessel_name: 'Northern Star',
        bollards_start: 1,
        bollards_end: 25,
        planned_start: '2026-06-04T00:00:00.000Z',
        planned_end: '2026-06-04T12:00:00.000Z',
        actual_start: null,
        actual_end: null,
      }
    ]
  },
  {
    berth_id: 'e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b',
    berth_name: 'Berth C',
    avail_bollards_st: 4,
    avail_bollards_ed: 26,
    bollards_increment: 6,
    vessels: [
      {
        id: 'a1b2c3d4-0005-4e5f-a678-9b0c1d2e3f4e',
        vessel_name: 'Mariner Titan',
        bollards_start: 4,
        bollards_end: 10,
        planned_start: '2026-06-03T14:00:00.000Z',
        planned_end: '2026-06-03T22:00:00.000Z',
        actual_start: '2026-06-03T14:45:00.000Z',
        actual_end: '2026-06-03T22:30:00.000Z',
      },
      {
        id: 'a1b2c3d4-0006-4e5f-a678-9b0c1d2e3f4f',
        vessel_name: 'Cargo Carrier',
        bollards_start: 4,
        bollards_end: 16,
        planned_start: '2026-06-05T06:00:00.000Z',
        planned_end: '2026-06-05T18:00:00.000Z',
        actual_start: null,
        actual_end: null,
      }
    ]
  },
  {
    berth_id: '8f7e6d5c-4b3a-2f1e-0d9c-8b7a6f5e4d3c',
    berth_name: 'Berth D',
    avail_bollards_st: 2,
    avail_bollards_ed: 22,
    bollards_increment: 4,
    vessels: [
      {
        id: 'a1b2c3d4-0007-4e5f-a678-9b0c1d2e3f4g',
        vessel_name: 'Horizon Orion',
        bollards_start: 2,
        bollards_end: 10,
        planned_start: '2026-06-04T08:00:00.000Z',
        planned_end: '2026-06-04T16:00:00.000Z',
        actual_start: '2026-06-04T08:15:00.000Z',
        actual_end: '2026-06-04T16:45:00.000Z',
      },
      {
        id: 'a1b2c3d4-0008-4e5f-a678-9b0c1d2e3f4h',
        vessel_name: 'Cape Pioneer',
        bollards_start: 6,
        bollards_end: 14,
        planned_start: '2026-06-06T10:00:00.000Z',
        planned_end: '2026-06-06 lifestyle-22:00:00.000Z',
        actual_start: null,
        actual_end: null,
      }
    ]
  },
  {
    berth_id: '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
    berth_name: 'Berth E',
    avail_bollards_st: 1,
    avail_bollards_ed: 16,
    bollards_increment: 3,
    vessels: [
      {
        id: 'a1b2c3d4-0009-4e5f-a678-9b0c1d2e3f4i',
        vessel_name: 'Global Eagle',
        bollards_start: 1,
        bollards_end: 7,
        planned_start: '2026-06-05T00:00:00.000Z',
        planned_end: '2026-06-05T08:00:00.000Z',
        actual_start: '2026-06-05T00:20:00.000Z',
        actual_end: '2026-06-05T08:10:00.000Z',
      },
      {
        id: 'a1b2c3d4-0010-4e5f-a678-9b0c1d2e3f4j',
        vessel_name: 'Solar Crest',
        bollards_start: 4,
        bollards_end: 13,
        planned_start: '2026-06-07T06:00:00.000Z',
        planned_end: '2026-06-07T14:00:00.000Z',
        actual_start: null,
        actual_end: null,
      }
    ]
  },
  {
    berth_id: 'f3e2d1c0-b9a8-7654-3210-abcdefabcdef',
    berth_name: 'Berth F',
    avail_bollards_st: 1,
    avail_bollards_ed: 13,
    bollards_increment: 4,
    vessels: [
      {
        id: 'a1b2c3d4-0011-4e5f-a678-9b0c1d2e3f4k',
        vessel_name: 'Falcon Crest',
        bollards_start: 5,
        bollards_end: 13,
        planned_start: '2026-06-06T12:00:00.000Z',
        planned_end: '2026-06-06T20:00:00.000Z',
        actual_start: '2026-06-06T12:30:00.000Z',
        actual_end: null,
      },
      {
        id: 'a1b2c3d4-0012-4e5f-a678-9b0c1d2e3f4l',
        vessel_name: 'Dawn Runner',
        bollards_start: 1,
        bollards_end: 9,
        planned_start: '2026-06-08T08:00:00.000Z',
        planned_end: '2026-06-08T16:00:00.000Z',
        actual_start: null,
        actual_end: null,
      }
    ]
  }
];