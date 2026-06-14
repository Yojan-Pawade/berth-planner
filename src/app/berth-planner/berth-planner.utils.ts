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
    planned_start: '2026-06-01T06:00:00.000Z',
    vessels: [
      {
        id: 'a1-v1',
        vessel_name: 'Alpha Voyager',
        bollards_start: 3,
        bollards_end: 9,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-01T06:00:00.000Z',
        planned_end: '2026-06-02T06:00:00.000Z',
        actual_start: '2026-06-01T06:30:00.000Z',
        actual_end: '2026-06-02T06:45:00.000Z',
        resources: [
          { id: 'a1-v1-r1', resource_name: 'Crane 1', planned_start: '2026-06-01T06:00:00.000Z', planned_end: '2026-06-02T06:45:00.000Z' },
          { id: 'a1-v1-r2', resource_name: 'Tugboat A', planned_start: '2026-06-01T06:15:00.000Z', planned_end: '2026-06-02T07:00:00.000Z' }
        ]
      },
      {
        id: 'a1-v2',
        vessel_name: 'Oceanic Express',
        bollards_start: 1,
        bollards_end: 7,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-04T08:00:00.000Z',
        planned_end: '2026-06-05T08:00:00.000Z',
        actual_start: '2026-06-04T08:10:00.000Z',
        actual_end: '2026-06-05T08:20:00.000Z',
        resources: [
          { id: 'a1-v2-r1', resource_name: 'Crane 2', planned_start: '2026-06-04T08:00:00.000Z', planned_end: '2026-06-05T08:00:00.000Z' },
          { id: 'a1-v2-r2', resource_name: 'Pilot A', planned_start: '2026-06-04T08:15:00.000Z', planned_end: '2026-06-05T08:15:00.000Z' }
        ]
      },
      {
        id: 'a1-v3',
        vessel_name: 'Northern Light',
        bollards_start: 3,
        bollards_end: 9,
        status: { lookup_code: 'IN_PROGRESS', lookup_value: 'In Progress' },
        planned_start: '2026-06-08T10:00:00.000Z',
        planned_end: '2026-06-09T10:00:00.000Z',
        actual_start: '2026-06-08T10:20:00.000Z',
        actual_end: null,
        resources: [
          { id: 'a1-v3-r1', resource_name: 'Crane 1', planned_start: '2026-06-08T10:00:00.000Z', planned_end: '2026-06-09T10:00:00.000Z' },
          { id: 'a1-v3-r2', resource_name: 'Tugboat A', planned_start: '2026-06-08T10:15:00.000Z', planned_end: '2026-06-09T10:15:00.000Z' }
        ]
      },
      {
        id: 'a1-v3-conflict',
        vessel_name: 'Conflict Titan',
        bollards_start: 7, // OVERLAP: Breaks yard logic, occupies bollards 5-11 while Northern Light is at 3-9
        bollards_end: 11,
        status: { lookup_code: 'ARRIVED', lookup_value: 'Arrived' },
        planned_start: '2026-06-08T21:00:00.000Z', 
        planned_end: '2026-06-09T23:00:00.000Z',
        actual_start: '2026-06-08T11:15:00.000Z',
        actual_end: null,
        resources: [
          { id: 'a1-vc-r1', resource_name: 'Crane 2', planned_start: '2026-06-08T11:00:00.000Z', planned_end: '2026-06-09T11:00:00.000Z' }
        ]
      },
      {
        id: 'a1-v4',
        vessel_name: 'Pacific Dawn',
        bollards_start: 1,
        bollards_end: 7,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-14T00:00:00.000Z',
        planned_end: '2026-06-15T00:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'a1-v4-r1', resource_name: 'Crane 2', planned_start: '2026-06-14T00:00:00.000Z', planned_end: '2026-06-15T00:00:00.000Z' },
          { id: 'a1-v4-r2', resource_name: 'Pilot B', planned_start: '2026-06-14T00:15:00.000Z', planned_end: '2026-06-15T00:15:00.000Z' }
        ]
      },
      {
        id: 'a1-v5',
        vessel_name: 'Solar Wind',
        bollards_start: 3,
        bollards_end: 11,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-19T12:00:00.000Z',
        planned_end: '2026-06-20T12:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'a1-v5-r1', resource_name: 'Crane 1', planned_start: '2026-06-19T12:00:00.000Z', planned_end: '2026-06-20T12:30:00.000Z' },
          { id: 'a1-v5-r2', resource_name: 'Tugboat A', planned_start: '2026-06-19T12:15:00.000Z', planned_end: '2026-06-20T12:45:00.000Z' }
        ]
      },
      {
        id: 'a1-v6',
        vessel_name: 'Sea Hawk',
        bollards_start: 1,
        bollards_end: 7,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-24T06:00:00.000Z',
        planned_end: '2026-06-25T06:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'a1-v6-r1', resource_name: 'Crane 2', planned_start: '2026-06-24T06:00:00.000Z', planned_end: '2026-06-25T06:00:00.000Z' },
          { id: 'a1-v6-r2', resource_name: 'Pilot A', planned_start: '2026-06-24T06:15:00.000Z', planned_end: '2026-06-25T06:15:00.000Z' }
        ]
      }
    ]
  },
  {
    berth_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    berth_name: 'Berth B',
    avail_bollards_st: 1,
    avail_bollards_ed: 25,
    bollards_increment: 4,
    planned_start: '2026-06-02T08:00:00.000Z',
    vessels: [
      {
        id: 'b1-v1',
        vessel_name: 'Pacific Trader',
        bollards_start: 9,
        bollards_end: 17,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-02T08:00:00.000Z',
        planned_end: '2026-06-03T08:00:00.000Z',
        actual_start: '2026-06-02T08:00:00.000Z',
        actual_end: '2026-06-03T08:00:00.000Z',
        resources: [
          { id: 'b1-v1-r1', resource_name: 'Forklift 1', planned_start: '2026-06-02T08:00:00.000Z', planned_end: '2026-06-03T08:00:00.000Z' },
          { id: 'b1-v1-r2', resource_name: 'Crane 3', planned_start: '2026-06-02T08:15:00.000Z', planned_end: '2026-06-03T08:15:00.000Z' }
        ]
      },
      {
        id: 'b1-v2',
        vessel_name: 'Atlantic Quest',
        bollards_start: 5,
        bollards_end: 21,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-06T10:00:00.000Z',
        planned_end: '2026-06-07T10:00:00.000Z',
        actual_start: '2026-06-06T10:00:00.000Z',
        actual_end: '2026-06-07T10:30:00.000Z',
        resources: [
          { id: 'b1-v2-r1', resource_name: 'Tugboat B', planned_start: '2026-06-06T10:00:00.000Z', planned_end: '2026-06-07T10:00:00.000Z' },
          { id: 'b1-v2-r2', resource_name: 'Pilot C', planned_start: '2026-06-06T10:15:00.000Z', planned_end: '2026-06-07T10:15:00.000Z' }
        ]
      },
      {
        id: 'b1-v3',
        vessel_name: 'Northern Star',
        bollards_start: 1,
        bollards_end: 25,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-11T00:00:00.000Z',
        planned_end: '2026-06-12T00:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'b1-v3-r1', resource_name: 'Crane 4', planned_start: '2026-06-11T00:00:00.000Z', planned_end: '2026-06-12T01:00:00.000Z' },
          { id: 'b1-v3-r2', resource_name: 'Forklift 2', planned_start: '2026-06-11T00:15:00.000Z', planned_end: '2026-06-12T01:15:00.000Z' }
        ]
      },
      {
        id: 'b1-v4',
        vessel_name: 'Horizon Blue',
        bollards_start: 9,
        bollards_end: 17,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-16T14:00:00.000Z',
        planned_end: '2026-06-17T14:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'b1-v4-r1', resource_name: 'Tugboat B', planned_start: '2026-06-16T14:00:00.000Z', planned_end: '2026-06-17T14:00:00.000Z' },
          { id: 'b1-v4-r2', resource_name: 'Pilot D', planned_start: '2026-06-16T14:15:00.000Z', planned_end: '2026-06-17T14:15:00.000Z' }
        ]
      },
      {
        id: 'b1-v5',
        vessel_name: 'Cape Star',
        bollards_start: 5,
        bollards_end: 21,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-21T06:00:00.000Z',
        planned_end: '2026-06-22T06:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'b1-v5-r1', resource_name: 'Crane 3', planned_start: '2026-06-21T06:00:00.000Z', planned_end: '2026-06-22T06:20:00.000Z' },
          { id: 'b1-v5-r2', resource_name: 'Forklift 1', planned_start: '2026-06-21T06:15:00.000Z', planned_end: '2026-06-22T06:35:00.000Z' }
        ]
      },
      {
        id: 'b1-v6',
        vessel_name: 'Ocean Rider',
        bollards_start: 1,
        bollards_end: 13,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-27T18:00:00.000Z',
        planned_end: '2026-06-28T18:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'b1-v6-r1', resource_name: 'Tugboat B', planned_start: '2026-06-27T18:00:00.000Z', planned_end: '2026-06-28T18:00:00.000Z' },
          { id: 'b1-v6-r2', resource_name: 'Pilot C', planned_start: '2026-06-27T18:15:00.000Z', planned_end: '2026-06-28T18:15:00.000Z' }
        ]
      }
    ]
  },
  {
    berth_id: 'e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b',
    berth_name: 'Berth C',
    avail_bollards_st: 4,
    avail_bollards_ed: 26,
    bollards_increment: 6,
    planned_start: '2026-06-03T14:00:00.000Z',
    vessels: [
      {
        id: 'c1-v1',
        vessel_name: 'Mariner Titan',
        bollards_start: 4,
        bollards_end: 10,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-03T14:00:00.000Z',
        planned_end: '2026-06-04T14:00:00.000Z',
        actual_start: '2026-06-03T14:45:00.000Z',
        actual_end: '2026-06-04T14:30:00.000Z',
        resources: [
          { id: 'c1-v1-r1', resource_name: 'Crane 5', planned_start: '2026-06-03T14:00:00.000Z', planned_end: '2026-06-04T14:30:00.000Z' },
          { id: 'c1-v1-r2', resource_name: 'Tugboat C', planned_start: '2026-06-03T14:15:00.000Z', planned_end: '2026-06-04T14:45:00.000Z' }
        ]
      },
      {
        id: 'c1-v2',
        vessel_name: 'Cargo Carrier',
        bollards_start: 16,
        bollards_end: 26,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-07T06:00:00.000Z',
        planned_end: '2026-06-08T06:00:00.000Z',
        actual_start: '2026-06-07T06:00:00.000Z',
        actual_end: '2026-06-08T05:50:00.000Z',
        resources: [
          { id: 'c1-v2-r1', resource_name: 'Forklift 3', planned_start: '2026-06-07T06:00:00.000Z', planned_end: '2026-06-08T06:00:00.000Z' },
          { id: 'c1-v2-r2', resource_name: 'Pilot D', planned_start: '2026-06-07T06:15:00.000Z', planned_end: '2026-06-08T06:15:00.000Z' }
        ]
      },
      {
        id: 'c1-v3',
        vessel_name: 'Thunder Wave',
        bollards_start: 4,
        bollards_end: 16,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-12T20:00:00.000Z',
        planned_end: '2026-06-13T20:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'c1-v3-r1', resource_name: 'Crane 5', planned_start: '2026-06-12T20:00:00.000Z', planned_end: '2026-06-13T20:45:00.000Z' },
          { id: 'c1-v3-r2', resource_name: 'Tugboat C', planned_start: '2026-06-12T20:15:00.000Z', planned_end: '2026-06-13T21:00:00.000Z' }
        ]
      },
      {
        id: 'c1-v4',
        vessel_name: 'Iron Dolphin',
        bollards_start: 16,
        bollards_end: 26,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-18T08:00:00.000Z',
        planned_end: '2026-06-19T08:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'c1-v4-r1', resource_name: 'Forklift 3', planned_start: '2026-06-18T08:00:00.000Z', planned_end: '2026-06-19T08:00:00.000Z' },
          { id: 'c1-v4-r2', resource_name: 'Pilot E', planned_start: '2026-06-18T08:15:00.000Z', planned_end: '2026-06-19T08:15:00.000Z' }
        ]
      },
      {
        id: 'c1-v5',
        vessel_name: 'Blue Horizon',
        bollards_start: 4,
        bollards_end: 10,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-23T16:00:00.000Z',
        planned_end: '2026-06-24T16:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'c1-v5-r1', resource_name: 'Crane 5', planned_start: '2026-06-23T16:00:00.000Z', planned_end: '2026-06-24T16:10:00.000Z' },
          { id: 'c1-v5-r2', resource_name: 'Tugboat C', planned_start: '2026-06-23T16:15:00.000Z', planned_end: '2026-06-24T16:25:00.000Z' }
        ]
      },
      {
        id: 'c1-v6',
        vessel_name: 'Storm Rider',
        bollards_start: 16,
        bollards_end: 26,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-28T10:00:00.000Z',
        planned_end: '2026-06-29T10:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'c1-v6-r1', resource_name: 'Forklift 3', planned_start: '2026-06-28T10:00:00.000Z', planned_end: '2026-06-29T10:00:00.000Z' },
          { id: 'c1-v6-r2', resource_name: 'Pilot D', planned_start: '2026-06-28T10:15:00.000Z', planned_end: '2026-06-29T10:15:00.000Z' }
        ]
      }
    ]
  },
  {
    berth_id: '8f7e6d5c-4b3a-2f1e-0d9c-8b7a6f5e4d3c',
    berth_name: 'Berth D',
    avail_bollards_st: 2,
    avail_bollards_ed: 22,
    bollards_increment: 4,
    planned_start: '2026-06-01T08:00:00.000Z',
    vessels: [
      {
        id: 'd1-v1',
        vessel_name: 'Horizon Orion',
        bollards_start: 2,
        bollards_end: 10,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-01T08:00:00.000Z',
        planned_end: '2026-06-02T08:00:00.000Z',
        actual_start: '2026-06-01T08:15:00.000Z',
        actual_end: '2026-06-02T08:45:00.000Z',
        resources: [
          { id: 'd1-v1-r1', resource_name: 'Crane 6', planned_start: '2026-06-01T08:00:00.000Z', planned_end: '2026-06-02T08:45:00.000Z' },
          { id: 'd1-v1-r2', resource_name: 'Tugboat D', planned_start: '2026-06-01T08:15:00.000Z', planned_end: '2026-06-02T09:00:00.000Z' }
        ]
      },
      {
        id: 'd1-v2',
        vessel_name: 'Cape Pioneer',
        bollards_start: 14,
        bollards_end: 22,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-05T10:00:00.000Z',
        planned_end: '2026-06-06T10:00:00.000Z',
        actual_start: '2026-06-05T10:15:00.000Z',
        actual_end: '2026-06-06T10:00:00.000Z',
        resources: [
          { id: 'd1-v2-r1', resource_name: 'Forklift 4', planned_start: '2026-06-05T10:00:00.000Z', planned_end: '2026-06-06T10:00:00.000Z' },
          { id: 'd1-v2-r2', resource_name: 'Pilot E', planned_start: '2026-06-05T10:15:00.000Z', planned_end: '2026-06-06T10:15:00.000Z' }
        ]
      },
      {
        id: 'd1-v3',
        vessel_name: 'Arctic Breeze',
        bollards_start: 2,
        bollards_end: 14,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-10T16:00:00.000Z',
        planned_end: '2026-06-11T16:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'd1-v3-r1', resource_name: 'Crane 6', planned_start: '2026-06-10T16:00:00.000Z', planned_end: '2026-06-11T16:30:00.000Z' },
          { id: 'd1-v3-r2', resource_name: 'Tugboat D', planned_start: '2026-06-10T16:15:00.000Z', planned_end: '2026-06-11T16:45:00.000Z' }
        ]
      },
      {
        id: 'd1-v4',
        vessel_name: 'Desert Wind',
        bollards_start: 14,
        bollards_end: 22,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-15T00:00:00.000Z',
        planned_end: '2026-06-16T00:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'd1-v4-r1', resource_name: 'Forklift 4', planned_start: '2026-06-15T00:00:00.000Z', planned_end: '2026-06-16T00:00:00.000Z' },
          { id: 'd1-v4-r2', resource_name: 'Pilot F', planned_start: '2026-06-15T00:15:00.000Z', planned_end: '2026-06-16T00:15:00.000Z' }
        ]
      },
      {
        id: 'd1-v5',
        vessel_name: 'Thunder Mist',
        bollards_start: 2,
        bollards_end: 10,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-20T12:00:00.000Z',
        planned_end: '2026-06-21T12:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'd1-v5-r1', resource_name: 'Crane 6', planned_start: '2026-06-20T12:00:00.000Z', planned_end: '2026-06-21T12:15:00.000Z' },
          { id: 'd1-v5-r2', resource_name: 'Tugboat D', planned_start: '2026-06-20T12:15:00.000Z', planned_end: '2026-06-21T12:30:00.000Z' }
        ]
      },
      {
        id: 'd1-v6',
        vessel_name: 'Silver Arrow',
        bollards_start: 14,
        bollards_end: 22,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-26T06:00:00.000Z',
        planned_end: '2026-06-27T06:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'd1-v6-r1', resource_name: 'Forklift 4', planned_start: '2026-06-26T06:00:00.000Z', planned_end: '2026-06-27T06:00:00.000Z' },
          { id: 'd1-v6-r2', resource_name: 'Pilot E', planned_start: '2026-06-26T06:15:00.000Z', planned_end: '2026-06-27T06:15:00.000Z' }
        ]
      }
    ]
  },
  {
    berth_id: '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
    berth_name: 'Berth E',
    avail_bollards_st: 1,
    avail_bollards_ed: 16,
    bollards_increment: 3,
    planned_start: '2026-06-02T00:00:00.000Z',
    vessels: [
      {
        id: 'e1-v1',
        vessel_name: 'Global Eagle',
        bollards_start: 1,
        bollards_end: 7,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-02T00:00:00.000Z',
        planned_end: '2026-06-03T00:00:00.000Z',
        actual_start: '2026-06-02T00:20:00.000Z',
        actual_end: '2026-06-03T00:10:00.000Z',
        resources: [
          { id: 'e1-v1-r1', resource_name: 'Crane 7', planned_start: '2026-06-02T00:00:00.000Z', planned_end: '2026-06-03T00:10:00.000Z' },
          { id: 'e1-v1-r2', resource_name: 'Tugboat E', planned_start: '2026-06-02T00:15:00.000Z', planned_end: '2026-06-03T00:25:00.000Z' }
        ]
      },
      {
        id: 'e1-v2',
        vessel_name: 'Solar Crest',
        bollards_start: 10,
        bollards_end: 16,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-05T06:00:00.000Z',
        planned_end: '2026-06-06T06:00:00.000Z',
        actual_start: '2026-06-05T06:00:00.000Z',
        actual_end: '2026-06-06T06:05:00.000Z',
        resources: [
          { id: 'e1-v2-r1', resource_name: 'Forklift 5', planned_start: '2026-06-05T06:00:00.000Z', planned_end: '2026-06-06T06:00:00.000Z' },
          { id: 'e1-v2-r2', resource_name: 'Pilot F', planned_start: '2026-06-05T06:15:00.000Z', planned_end: '2026-06-06T06:15:00.000Z' }
        ]
      },
      {
        id: 'e1-v3',
        vessel_name: 'Iron Falcon',
        bollards_start: 1,
        bollards_end: 10,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-09T18:00:00.000Z',
        planned_end: '2026-06-10T18:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'e1-v3-r1', resource_name: 'Crane 7', planned_start: '2026-06-09T18:00:00.000Z', planned_end: '2026-06-10T18:20:00.000Z' },
          { id: 'e1-v3-r2', resource_name: 'Tugboat E', planned_start: '2026-06-09T18:15:00.000Z', planned_end: '2026-06-10T18:35:00.000Z' }
        ]
      },
      {
        id: 'e1-v4',
        vessel_name: 'Coastal Runner',
        bollards_start: 10,
        bollards_end: 16,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-17T10:00:00.000Z',
        planned_end: '2026-06-18T10:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'e1-v4-r1', resource_name: 'Forklift 5', planned_start: '2026-06-17T10:00:00.000Z', planned_end: '2026-06-18T10:00:00.000Z' },
          { id: 'e1-v4-r2', resource_name: 'Pilot F', planned_start: '2026-06-17T10:15:00.000Z', planned_end: '2026-06-18T10:15:00.000Z' }
        ]
      },
      {
        id: 'e1-v5',
        vessel_name: 'Jade Express',
        bollards_start: 1,
        bollards_end: 7,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-22T14:00:00.000Z',
        planned_end: '2026-06-23T14:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'e1-v5-r1', resource_name: 'Crane 7', planned_start: '2026-06-22T14:00:00.000Z', planned_end: '2026-06-23T14:10:00.000Z' },
          { id: 'e1-v5-r2', resource_name: 'Tugboat E', planned_start: '2026-06-22T14:15:00.000Z', planned_end: '2026-06-23T14:25:00.000Z' }
        ]
      },
      {
        id: 'e1-v6',
        vessel_name: 'Pearl Diver',
        bollards_start: 10,
        bollards_end: 16,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-29T08:00:00.000Z',
        planned_end: '2026-06-30T08:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'e1-v6-r1', resource_name: 'Forklift 5', planned_start: '2026-06-29T08:00:00.000Z', planned_end: '2026-06-30T08:00:00.000Z' },
          { id: 'e1-v6-r2', resource_name: 'Pilot F', planned_start: '2026-06-29T08:15:00.000Z', planned_end: '2026-06-30T08:15:00.000Z' }
        ]
      }
    ]
  },
  {
    berth_id: 'f3e2d1c0-b9a8-7654-3210-abcdefabcdef',
    berth_name: 'Berth F',
    avail_bollards_st: 1,
    avail_bollards_ed: 13,
    bollards_increment: 4,
    planned_start: '2026-06-03T06:00:00.000Z',
    vessels: [
      {
        id: 'f1-v1',
        vessel_name: 'Sea Breeze',
        bollards_start: 5,
        bollards_end: 13,
        status: { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
        planned_start: '2026-06-03T06:00:00.000Z',
        planned_end: '2026-06-04T06:00:00.000Z',
        actual_start: '2026-06-03T06:05:00.000Z',
        actual_end: '2026-06-04T06:15:00.000Z',
        resources: [
          { id: 'f1-v1-r1', resource_name: 'Crane 8', planned_start: '2026-06-03T06:00:00.000Z', planned_end: '2026-06-04T06:00:00.000Z' },
          { id: 'f1-v1-r2', resource_name: 'Tugboat F', planned_start: '2026-06-03T06:15:00.000Z', planned_end: '2026-06-04T06:15:00.000Z' }
        ]
      },
      {
        id: 'f1-v2',
        vessel_name: 'Coral Wave',
        bollards_start: 1,
        bollards_end: 9,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-08T14:00:00.000Z',
        planned_end: '2026-06-09T14:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'f1-v2-r1', resource_name: 'Forklift 6', planned_start: '2026-06-08T14:00:00.000Z', planned_end: '2026-06-09T14:00:00.000Z' },
          { id: 'f1-v2-r2', resource_name: 'Pilot G', planned_start: '2026-06-08T14:15:00.000Z', planned_end: '2026-06-09T14:15:00.000Z' }
        ]
      },
      {
        id: 'f1-v3',
        vessel_name: 'Amber Tide',
        bollards_start: 5,
        bollards_end: 13,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-13T20:00:00.000Z',
        planned_end: '2026-06-14T20:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'f1-v3-r1', resource_name: 'Crane 8', planned_start: '2026-06-13T20:00:00.000Z', planned_end: '2026-06-14T20:20:00.000Z' },
          { id: 'f1-v3-r2', resource_name: 'Tugboat F', planned_start: '2026-06-13T20:15:00.000Z', planned_end: '2026-06-14T20:35:00.000Z' }
        ]
      },
      {
        id: 'f1-v4',
        vessel_name: 'Midnight Sun',
        bollards_start: 1,
        bollards_end: 9,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-19T08:00:00.000Z',
        planned_end: '2026-06-20T08:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'f1-v4-r1', resource_name: 'Forklift 6', planned_start: '2026-06-19T08:00:00.000Z', planned_end: '2026-06-20T08:00:00.000Z' },
          { id: 'f1-v4-r2', resource_name: 'Pilot G', planned_start: '2026-06-19T08:15:00.000Z', planned_end: '2026-06-20T08:15:00.000Z' }
        ]
      },
      {
        id: 'f1-v5',
        vessel_name: 'Copper Star',
        bollards_start: 5,
        bollards_end: 13,
        status: { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
        planned_start: '2026-06-24T16:00:00.000Z',
        planned_end: '2026-06-25T16:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'f1-v5-r1', resource_name: 'Crane 8', planned_start: '2026-06-24T16:00:00.000Z', planned_end: '2026-06-25T16:10:00.000Z' },
          { id: 'f1-v5-r2', resource_name: 'Tugboat F', planned_start: '2026-06-24T16:15:00.000Z', planned_end: '2026-06-25T16:25:00.000Z' }
        ]
      },
      {
        id: 'f1-v6',
        vessel_name: 'Golden Gate',
        bollards_start: 1,
        bollards_end: 9,
        status: { lookup_code: 'PLANNED', lookup_value: 'Planned' },
        planned_start: '2026-06-29T10:00:00.000Z',
        planned_end: '2026-06-30T10:00:00.000Z',
        actual_start: null,
        actual_end: null,
        resources: [
          { id: 'f1-v6-r1', resource_name: 'Forklift 6', planned_start: '2026-06-29T10:00:00.000Z', planned_end: '2026-06-30T10:00:00.000Z' },
          { id: 'f1-v6-r2', resource_name: 'Pilot G', planned_start: '2026-06-29T10:15:00.000Z', planned_end: '2026-06-30T10:15:00.000Z' }
        ]
      }
    ]
  }
];