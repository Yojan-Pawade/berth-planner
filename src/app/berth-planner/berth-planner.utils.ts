// Date extracting common functions
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const d = (date: Date) => String(date.getDate()).padStart(2, '0');
export const m = (date: Date) => MONTHS[date.getMonth()];
export const y = (date: Date) => date.getFullYear();
export const fmt = (date: Date) => `${d(date)}-${m(date)}-${y(date)}`;

export const ACTION_CIRCLE_SIZE = 22;

// Resource bar configs
export const TITLE_SIZE = 20;
export const RESOURCE_BAR_SIZE = 10;
export const BAR_GAP = 5;
export const EDGE_MARGIN = 8;
export const SLOT_SIZE = RESOURCE_BAR_SIZE + BAR_GAP;

// bollards config
export const BOLLARD_STEP_SIZE = 10;
export const BOLLARD_MIN_SIZE = 25;
export const BOLLARD_MAX_SIZE = 100;
export const DEFAUTL_BOLLARD_SIZE = 25;

export const BERTH_SCALE_LABEL: Record<number, string> = {
  25: '100%',
  50: '125%',
  75: '150%',
  100: '200%'
}

export const VESSEL_STATUS = [
  { lookup_code: 'OPERATION_COMPLETE', lookup_value: 'Operation Complete' },
  { lookup_code: 'IN_PROGRESS', lookup_value: 'In Progress' },
  { lookup_code: 'ARRIVED', lookup_value: 'Arrived' },
  { lookup_code: 'PLANNED', lookup_value: 'Planned' },
  { lookup_code: 'REQUESTED', lookup_value: 'Requested' },
  { lookup_code: 'CANCELLED', lookup_value: 'Cancelled' },
  { lookup_code: 'INVOICED', lookup_value: 'Invoiced' },
  { lookup_code: 'DEPARTED', lookup_value: 'Departed' }
]

export const RESOURCE_TYPE = [
  {
    "id": "7beba7b8-b40a-11f0-865a-0f90cba3972d",
    "code": "Forklift",
    "description": "Forklift",
    "status": "AVAILABLE",
    "createdAt": "2025-10-28T14:29:17.018Z",
    "updatedAt": "2025-10-28T14:29:17.018Z",
    "deletedAt": null,
    "created_by": null,
    "updated_by": null,
    "eqt_sts": {
      "lookup_value": "Available",
      "lookup_description": "Available"
    },
    "editFlag": false
  },
  {
    "id": "7beba8c6-b40a-11f0-865a-a3f914145d2b",
    "code": "Safety_Equipment",
    "description": "Safety Equipment",
    "status": "AVAILABLE",
    "createdAt": "2025-10-28T14:29:17.018Z",
    "updatedAt": "2025-10-28T14:29:17.018Z",
    "deletedAt": null,
    "created_by": null,
    "updated_by": null,
    "eqt_sts": {
      "lookup_value": "Available",
      "lookup_description": "Available"
    },
    "editFlag": false
  },
  {
    "id": "7beba93e-b40a-11f0-865a-374acbdf9a9c",
    "code": "Machinery_&_Handling_Equipment",
    "description": "Machinery & Handling Equipment",
    "status": "AVAILABLE",
    "createdAt": "2025-10-28T14:29:17.018Z",
    "updatedAt": "2025-10-28T14:29:17.018Z",
    "deletedAt": null,
    "created_by": null,
    "updated_by": null,
    "eqt_sts": {
      "lookup_value": "Available",
      "lookup_description": "Available"
    },
    "editFlag": false
  },
  {
    "id": "7beba9ca-b40a-11f0-865a-6711ea1ca584",
    "code": "Communication_&_Electronic_Equipmentt",
    "description": "Communication & Electronic Equipment",
    "status": "AVAILABLE",
    "createdAt": "2025-10-28T14:29:17.018Z",
    "updatedAt": "2025-10-28T14:29:17.018Z",
    "deletedAt": null,
    "created_by": null,
    "updated_by": null,
    "eqt_sts": {
      "lookup_value": "Available",
      "lookup_description": "Available"
    },
    "editFlag": false
  },
  {
    "id": "7beba84e-b40a-11f0-865a-37bc5813dc45",
    "code": "Navigation Equipment",
    "description": "Navigation Equipment",
    "status": "AVAILABLE",
    "createdAt": "2025-10-28T14:29:17.018Z",
    "updatedAt": "2025-10-29T05:37:14.627Z",
    "deletedAt": null,
    "created_by": null,
    "updated_by": null,
    "eqt_sts": {
      "lookup_value": "Available",
      "lookup_description": "Available"
    },
    "editFlag": false
  },
  {
    "id": "7beba312-b40a-11f0-865a-cf67109db96c",
    "code": "Crane",
    "description": "Crane",
    "status": "AVAILABLE",
    "createdAt": "2025-10-28T14:29:17.018Z",
    "updatedAt": "2025-11-17T14:36:36.258Z",
    "deletedAt": null,
    "created_by": null,
    "updated_by": null,
    "eqt_sts": {
      "lookup_value": "Available",
      "lookup_description": "Available"
    },
    "editFlag": false
  }
]

export const VESSEL_STATUS_COLORS: Record<string, string> = {
  'OPERATION_COMPLETE': '#0b9539',
  'IN_PROGRESS': '#dca830',
  'PLANNED': '#a3c3da',
  'CANCELLED': '#e4092a',
  'ARRIVED': '#62db62',
  'REQUESTED': '#d1d137',
  'INVOICED': '#6366f1',
  'DEPARTED': '#64748b',
};

export const RESOURCE_TYPE_COLORS: Record<string, string> = {
  'Forklift': '#F97316',
  'Machinery_&_Handling_Equipment': '#10B981',
  'Communication_&_Electronic_Equipmentt': '#FBBF24',
  'Navigation Equipment': '#3B82F6',
  'Crane': '#F16365',
  'Safety_Equipment': '#06B6D4',
};

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
          { id: 'a1-v1-r1', resource_name: 'Crane 1', planned_start: '2026-06-01T06:00:00.000Z', planned_end: '2026-06-02T06:45:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v1-r2', resource_name: 'Tugboat A', planned_start: '2026-06-01T06:15:00.000Z', planned_end: '2026-06-02T06:00:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'a1-v1-r3', resource_name: 'Crane 3', planned_start: '2026-06-02T00:00:00.000Z', planned_end: '2026-06-02T06:40:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v1-r4', resource_name: 'Crane 4', planned_start: '2026-06-01T08:00:00.000Z', planned_end: '2026-06-02T06:40:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v1-r5', resource_name: 'Pilot B', planned_start: '2026-06-01T06:00:00.000Z', planned_end: '2026-06-01T12:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } },
          { id: 'a1-v1-r6', resource_name: 'Forklift 2', planned_start: '2026-06-01T12:00:00.000Z', planned_end: '2026-06-01T18:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v1-r7', resource_name: 'Tugboat B', planned_start: '2026-06-01T18:00:00.000Z', planned_end: '2026-06-02T00:00:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'a1-v1-r8', resource_name: 'Crane 5', planned_start: '2026-06-02T00:00:00.000Z', planned_end: '2026-06-02T06:45:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v1-r9', resource_name: 'Pilot C', planned_start: '2026-06-01T06:30:00.000Z', planned_end: '2026-06-01T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'a1-v1-r10', resource_name: 'Forklift 3', planned_start: '2026-06-01T20:00:00.000Z', planned_end: '2026-06-02T06:45:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v1-r11', resource_name: 'Forklift 4', planned_start: '2026-06-01T12:15:00.000Z', planned_end: '2026-06-01T21:40:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v1-r12', resource_name: 'Safety Unit 1', planned_start: '2026-06-01T06:00:00.000Z', planned_end: '2026-06-02T06:45:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'a1-v1-r13', resource_name: 'Radio Set Alpha', planned_start: '2026-06-01T07:00:00.000Z', planned_end: '2026-06-02T05:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } },
          { id: 'a1-v1-r14', resource_name: 'Forklift 5', planned_start: '2026-06-01T15:00:00.000Z', planned_end: '2026-06-02T02:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } }
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
          { id: 'a1-v2-r1', resource_name: 'Crane 2', planned_start: '2026-06-04T08:00:00.000Z', planned_end: '2026-06-05T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v2-r2', resource_name: 'Pilot A', planned_start: '2026-06-04T08:15:00.000Z', planned_end: '2026-06-05T08:15:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'a1-v2-r3', resource_name: 'Forklift 1', planned_start: '2026-06-04T09:00:00.000Z', planned_end: '2026-06-05T05:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v2-r4', resource_name: 'Safety Kit B', planned_start: '2026-06-04T08:00:00.000Z', planned_end: '2026-06-05T08:20:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'a1-v2-r5', resource_name: 'Comm Hub 2', planned_start: '2026-06-04T10:00:00.000Z', planned_end: '2026-06-05T07:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          {
            "id": "a1-v3-r1",
            "resource_name": "Crane 1",
            "planned_start": "2026-06-08T10:00:00.000Z",
            "planned_end": "2026-06-09T10:00:00.000Z",
            "work_completed": 80,
            "resource_type": { "id": "7beba312-b40a-11f0-865a-cf67109db96c", "code": "Crane", "description": "Crane" }
          },
          {
            "id": "a1-v3-r2",
            "resource_name": "Tugboat A",
            "planned_start": "2026-06-08T10:15:00.000Z",
            "planned_end": "2026-06-09T10:15:00.000Z",
            "work_completed": 100,
            "resource_type": { "id": "7beba93e-b40a-11f0-865a-374acbdf9a9c", "code": "Machinery_&_Handling_Equipment", "description": "Machinery & Handling Equipment" }
          },
          {
            "id": "a1-v3-r3",
            "resource_name": "Forklift 3",
            "planned_start": "2026-06-08T11:00:00.000Z",
            "planned_end": "2026-06-09T09:00:00.000Z",
            "work_completed": 95,
            "resource_type": { "id": "7beba7b8-b40a-11f0-865a-0f90cba3972d", "code": "Forklift", "description": "Forklift" }
          },
          {
            "id": "a1-v3-r4",
            "resource_name": "Nav Sensor X",
            "planned_start": "2026-06-08T10:00:00.000Z",
            "planned_end": "2026-06-09T10:00:00.000Z",
            "work_completed": 75,
            "resource_type": { "id": "7beba84e-b40a-11f0-865a-37bc5813dc45", "code": "Navigation Equipment", "description": "Navigation Equipment" }
          },
          {
            "id": "a1-v3-r5",
            "resource_name": "Hazmat Gear",
            "planned_start": "2026-06-08T12:00:00.000Z",
            "planned_end": "2026-06-09T06:00:00.000Z",
            "work_completed": 100,
            "resource_type": { "id": "7beba8c6-b40a-11f0-865a-a3f914145d2b", "code": "Safety_Equipment", "description": "Safety Equipment" }
          }
        ]
      },
      {
        id: 'a1-v3-conflict',
        vessel_name: 'Conflict Titan',
        bollards_start: 7,
        bollards_end: 11,
        status: { lookup_code: 'ARRIVED', lookup_value: 'Arrived' },
        planned_start: '2026-06-08T21:00:00.000Z',
        planned_end: '2026-06-09T23:00:00.000Z',
        actual_start: '2026-06-08T11:15:00.000Z',
        actual_end: null,
        resources: [
          { id: 'a1-vc-r1', resource_name: 'Crane 2', planned_start: '2026-06-08T21:00:00.000Z', planned_end: '2026-06-09T23:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-vc-r2', resource_name: 'Forklift 4', planned_start: '2026-06-08T22:00:00.000Z', planned_end: '2026-06-09T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-vc-r3', resource_name: 'Bollard Guard', planned_start: '2026-06-08T21:15:00.000Z', planned_end: '2026-06-09T22:45:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'a1-vc-r4', resource_name: 'Radio Terminal', planned_start: '2026-06-09T01:00:00.000Z', planned_end: '2026-06-09T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } },
          { id: 'a1-vc-r5', resource_name: 'Gps Unit', planned_start: '2026-06-08T21:30:00.000Z', planned_end: '2026-06-09T21:30:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } }
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
          { id: 'a1-v4-r1', resource_name: 'Crane 2', planned_start: '2026-06-14T00:00:00.000Z', planned_end: '2026-06-15T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v4-r2', resource_name: 'Pilot B', planned_start: '2026-06-14T00:15:00.000Z', planned_end: '2026-06-15T00:15:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'a1-v4-r3', resource_name: 'Forklift 2', planned_start: '2026-06-14T02:00:00.000Z', planned_end: '2026-06-14T22:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v4-r4', resource_name: 'Safety Vest Station', planned_start: '2026-06-14T00:00:00.000Z', planned_end: '2026-06-15T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'a1-v4-r5', resource_name: 'Receiver Array', planned_start: '2026-06-14T04:00:00.000Z', planned_end: '2026-06-14T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'a1-v5-r1', resource_name: 'Crane 1', planned_start: '2026-06-19T12:00:00.000Z', planned_end: '2026-06-20T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v5-r2', resource_name: 'Tugboat A', planned_start: '2026-06-19T12:15:00.000Z', planned_end: '2026-06-20T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'a1-v5-r3', resource_name: 'Heavy Lift Forklift', planned_start: '2026-06-19T14:00:00.000Z', planned_end: '2026-06-20T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v5-r4', resource_name: 'Fire System Alpha', planned_start: '2026-06-19T12:00:00.000Z', planned_end: '2026-06-20T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'a1-v5-r5', resource_name: 'Signal Beacon', planned_start: '2026-06-19T13:00:00.000Z', planned_end: '2026-06-20T11:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } }
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
          { id: 'a1-v6-r1', resource_name: 'Crane 2', planned_start: '2026-06-24T06:00:00.000Z', planned_end: '2026-06-25T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'a1-v6-r2', resource_name: 'Pilot A', planned_start: '2026-06-24T06:15:00.000Z', planned_end: '2026-06-25T06:15:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'a1-v6-r3', resource_name: 'Electric Stacker', planned_start: '2026-06-24T08:00:00.000Z', planned_end: '2026-06-25T04:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'a1-v6-r4', resource_name: 'Enclosure Gates', planned_start: '2026-06-24T06:00:00.000Z', planned_end: '2026-06-25T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'a1-v6-r5', resource_name: 'VHF Unit 9', planned_start: '2026-06-24T07:00:00.000Z', planned_end: '2026-06-25T05:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
        "id": "b1-v1",
        "vessel_name": "Pacific Voyager",
        "bollards_start": 5,
        "bollards_end": 13,
        "status": { "lookup_code": "IN_PROGRESS", "lookup_value": "In Progress" },
        "planned_start": "2026-06-25T08:00:00.000Z",
        "planned_end": "2026-06-27T18:00:00.000Z",
        "actual_start": "2026-06-25T08:15:00.000Z",
        "actual_end": null,
        "resources": [
          {
            "id": "b1-v1-r1",
            "resource_name": "Crane 12",
            "planned_start": "2026-06-25T08:00:00.000Z",
            "planned_end": "2026-06-25T20:00:00.000Z",
            "actual_start": "2026-06-25T08:00:00.000Z",
            "actual_end": "2026-06-25T20:00:00.000Z",
            "work_completed": 100,
            "resource_type": { "id": "7beba312-b40a-11f0-865a-cf67109db96c", "code": "Crane", "description": "Crane" }
          },
          {
            "id": "b1-v1-r2",
            "resource_name": "Pilot Inbound",
            "planned_start": "2026-06-25T08:00:00.000Z",
            "planned_end": "2026-06-25T12:00:00.000Z",
            "actual_start": "2026-06-25T08:15:00.000Z",
            "actual_end": "2026-06-25T12:00:00.000Z",
            "work_completed": 100,
            "resource_type": { "id": "7beba84e-b40a-11f0-865a-37bc5813dc45", "code": "Navigation Equipment", "description": "Navigation Equipment" }
          },
          {
            "id": "b1-v1-r3",
            "resource_name": "Forklift Heavy A",
            "planned_start": "2026-06-25T08:00:00.000Z",
            "planned_end": "2026-06-26T12:00:00.000Z",
            "actual_start": "2026-06-25T08:00:00.000Z",
            "actual_end": null,
            "work_completed": 92,
            "resource_type": { "id": "7beba7b8-b40a-11f0-865a-0f90cba3972d", "code": "Forklift", "description": "Forklift" }
          },
          {
            "id": "b1-v1-r4",
            "resource_name": "Safety Coordinator",
            "planned_start": "2026-06-25T20:00:00.000Z",
            "planned_end": "2026-06-27T00:00:00.000Z",
            "actual_start": "2026-06-25T20:00:00.000Z",
            "actual_end": null,
            "work_completed": 49,
            "resource_type": { "id": "7beba8c6-b40a-11f0-865a-a3f914145d2b", "code": "Safety_Equipment", "description": "Safety Equipment" }
          },
          {
            "id": "b1-v1-r5",
            "resource_name": "Crane 14",
            "planned_start": "2026-06-26T06:00:00.000Z",
            "planned_end": "2026-06-26T18:00:00.000Z",
            "actual_start": "2026-06-26T06:00:00.000Z",
            "actual_end": null,
            "work_completed": 32,
            "resource_type": { "id": "7beba312-b40a-11f0-865a-cf67109db96c", "code": "Crane", "description": "Crane" }
          },
          {
            "id": "b1-v1-r6",
            "resource_name": "VHF Radio Hub",
            "planned_start": "2026-06-26T09:00:00.000Z",
            "planned_end": "2026-06-27T09:00:00.000Z",
            "actual_start": "2026-06-26T09:00:00.000Z",
            "actual_end": null,
            "work_completed": 3,
            "resource_type": { "id": "7beba9ca-b40a-11f0-865a-6711ea1ca584", "code": "Communication_&_Electronic_Equipmentt", "description": "Communication & Electronic Equipment" }
          },
          {
            "id": "b1-v1-r7",
            "resource_name": "Forklift Light B",
            "planned_start": "2026-06-26T12:00:00.000Z",
            "planned_end": "2026-06-27T12:00:00.000Z",
            "actual_start": null,
            "actual_end": null,
            "work_completed": 0,
            "resource_type": { "id": "7beba7b8-b40a-11f0-865a-0f90cba3972d", "code": "Forklift", "description": "Forklift" }
          },
          {
            "id": "b1-v1-r8",
            "resource_name": "Tugboat Outbound",
            "planned_start": "2026-06-27T14:00:00.000Z",
            "planned_end": "2026-06-27T18:00:00.000Z",
            "actual_start": null,
            "actual_end": null,
            "work_completed": 0,
            "resource_type": { "id": "7beba93e-b40a-11f0-865a-374acbdf9a9c", "code": "Machinery_&_Handling_Equipment", "description": "Machinery & Handling Equipment" }
          },
          {
            "id": "b1-v1-r9",
            "resource_name": "Main Comms Array",
            "planned_start": "2026-06-25T08:00:00.000Z",
            "planned_end": "2026-06-27T18:00:00.000Z",
            "actual_start": "2026-06-25T08:00:00.000Z",
            "actual_end": null,
            "work_completed": 45,
            "resource_type": { "id": "7beba9ca-b40a-11f0-865a-6711ea1ca584", "code": "Communication_&_Electronic_Equipmentt", "description": "Communication & Electronic Equipment" }
          },
          {
            "id": "b1-v1-r10",
            "resource_name": "Berth Nav Sensor",
            "planned_start": "2026-06-27T06:00:00.000Z",
            "planned_end": "2026-06-27T16:00:00.000Z",
            "actual_start": null,
            "actual_end": null,
            "work_completed": 0,
            "resource_type": { "id": "7beba84e-b40a-11f0-865a-37bc5813dc45", "code": "Navigation Equipment", "description": "Navigation Equipment" }
          }
        ]
      },
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
          { id: 'b1-v1-r1', resource_name: 'Forklift 1', planned_start: '2026-06-02T08:00:00.000Z', planned_end: '2026-06-03T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'b1-v1-r2', resource_name: 'Crane 3', planned_start: '2026-06-02T08:15:00.000Z', planned_end: '2026-06-03T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'b1-v1-r3', resource_name: 'Safety Barrier West', planned_start: '2026-06-02T08:00:00.000Z', planned_end: '2026-06-03T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'b1-v1-r4', resource_name: 'Dock Comm Terminal', planned_start: '2026-06-02T09:00:00.000Z', planned_end: '2026-06-03T07:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } },
          { id: 'b1-v1-r5', resource_name: 'Sonar Guide 1', planned_start: '2026-06-02T08:30:00.000Z', planned_end: '2026-06-03T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } }
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
          { id: 'b1-v2-r1', resource_name: 'Tugboat B', planned_start: '2026-06-06T10:00:00.000Z', planned_end: '2026-06-07T10:00:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'b1-v2-r2', resource_name: 'Pilot C', planned_start: '2026-06-06T10:15:00.000Z', planned_end: '2026-06-07T10:15:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'b1-v2-r3', resource_name: 'High Capacity Crane', planned_start: '2026-06-06T11:00:00.000Z', planned_end: '2026-06-07T10:30:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'b1-v2-r4', resource_name: 'Warehouse Loader', planned_start: '2026-06-06T12:00:00.000Z', planned_end: '2026-06-07T09:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'b1-v2-r5', resource_name: 'Static Spill Wall', planned_start: '2026-06-06T10:00:00.000Z', planned_end: '2026-06-07T10:30:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } }
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
          { id: 'b1-v3-r1', resource_name: 'Crane 4', planned_start: '2026-06-11T00:00:00.000Z', planned_end: '2026-06-12T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'b1-v3-r2', resource_name: 'Forklift 2', planned_start: '2026-06-11T00:15:00.000Z', planned_end: '2026-06-12T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'b1-v3-r3', resource_name: 'Anchor Winch', planned_start: '2026-06-11T01:00:00.000Z', planned_end: '2026-06-11T23:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'b1-v3-r4', resource_name: 'Backup Comms', planned_start: '2026-06-11T00:00:00.000Z', planned_end: '2026-06-12T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } },
          { id: 'b1-v3-r5', resource_name: 'Zone Laser Link', planned_start: '2026-06-11T02:00:00.000Z', planned_end: '2026-06-11T22:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } }
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
          { id: 'b1-v4-r1', resource_name: 'Tugboat B', planned_start: '2026-06-16T14:00:00.000Z', planned_end: '2026-06-17T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'b1-v4-r2', resource_name: 'Pilot D', planned_start: '2026-06-16T14:15:00.000Z', planned_end: '2026-06-17T14:15:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'b1-v4-r3', resource_name: 'Yard Truck 4', planned_start: '2026-06-16T15:00:00.000Z', planned_end: '2026-06-17T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'b1-v4-r4', resource_name: 'Quay Eye Crane', planned_start: '2026-06-16T14:00:00.000Z', planned_end: '2026-06-17T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'b1-v4-r5', resource_name: 'Emergency Station', planned_start: '2026-06-16T16:00:00.000Z', planned_end: '2026-06-17T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } }
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
          { id: 'b1-v5-r1', resource_name: 'Crane 3', planned_start: '2026-06-21T06:00:00.000Z', planned_end: '2026-06-22T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'b1-v5-r2', resource_name: 'Forklift 1', planned_start: '2026-06-21T06:15:00.000Z', planned_end: '2026-06-22T05:45:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'b1-v5-r3', resource_name: 'Tug assistance C', planned_start: '2026-06-21T07:00:00.000Z', planned_end: '2026-06-22T05:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'b1-v5-r4', resource_name: 'Dockside Shield', planned_start: '2026-06-21T06:00:00.000Z', planned_end: '2026-06-22T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'b1-v5-r5', resource_name: 'Telemetry Hub', planned_start: '2026-06-21T08:00:00.000Z', planned_end: '2026-06-22T04:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'b1-v6-r1', resource_name: 'Tugboat B', planned_start: '2026-06-27T18:00:00.000Z', planned_end: '2026-06-28T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'b1-v6-r2', resource_name: 'Pilot C', planned_start: '2026-06-27T18:15:00.000Z', planned_end: '2026-06-28T18:15:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'b1-v6-r3', resource_name: 'Counterbalance Loader', planned_start: '2026-06-27T19:00:00.000Z', planned_end: '2026-06-28T17:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'b1-v6-r4', resource_name: 'Quay Crane 9', planned_start: '2026-06-27T18:00:00.000Z', planned_end: '2026-06-28T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'b1-v6-r5', resource_name: 'Response Kit Z', planned_start: '2026-06-27T20:00:00.000Z', planned_end: '2026-06-28T15:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } }
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
          { id: 'c1-v1-r1', resource_name: 'Crane 5', planned_start: '2026-06-03T14:00:00.000Z', planned_end: '2026-06-04T14:30:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'c1-v1-r2', resource_name: 'Tugboat C', planned_start: '2026-06-03T14:15:00.000Z', planned_end: '2026-06-04T14:00:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'c1-v1-r3', resource_name: 'Pallet Forklift', planned_start: '2026-06-03T16:00:00.000Z', planned_end: '2026-06-04T12:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'c1-v1-r4', resource_name: 'Quay Enclosure', planned_start: '2026-06-03T14:00:00.000Z', planned_end: '2026-06-04T14:30:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'c1-v1-r5', resource_name: 'Comm Relay F', planned_start: '2026-06-03T15:00:00.000Z', planned_end: '2026-06-04T14:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'c1-v2-r1', resource_name: 'Forklift 3', planned_start: '2026-06-07T06:00:00.000Z', planned_end: '2026-06-08T05:50:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'c1-v2-r2', resource_name: 'Pilot D', planned_start: '2026-06-07T06:15:00.000Z', planned_end: '2026-06-08T05:50:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'c1-v2-r3', resource_name: 'Cargo Crane G', planned_start: '2026-06-07T06:00:00.000Z', planned_end: '2026-06-08T05:50:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'c1-v2-r4', resource_name: 'Deck Hand Netting', planned_start: '2026-06-07T07:00:00.000Z', planned_end: '2026-06-08T05:00:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'c1-v2-r5', resource_name: 'Dockside Link 4', planned_start: '2026-06-07T08:00:00.000Z', planned_end: '2026-06-08T04:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'c1-v3-r1', resource_name: 'Crane 5', planned_start: '2026-06-12T20:00:00.000Z', planned_end: '2026-06-13T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'c1-v3-r2', resource_name: 'Tugboat C', planned_start: '2026-06-12T20:15:00.000Z', planned_end: '2026-06-13T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'c1-v3-r3', resource_name: 'Reach Stacker', planned_start: '2026-06-12T21:00:00.000Z', planned_end: '2026-06-13T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'c1-v3-r4', resource_name: 'Beacon System', planned_start: '2026-06-12T20:00:00.000Z', planned_end: '2026-06-13T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'c1-v3-r5', resource_name: 'Perimeter Sensor', planned_start: '2026-06-12T22:00:00.000Z', planned_end: '2026-06-13T17:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } }
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
          { id: 'c1-v4-r1', resource_name: 'Forklift 3', planned_start: '2026-06-18T08:00:00.000Z', planned_end: '2026-06-19T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'c1-v4-r2', resource_name: 'Pilot E', planned_start: '2026-06-18T08:15:00.000Z', planned_end: '2026-06-19T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'c1-v4-r3', resource_name: 'Rail Mounted Crane', planned_start: '2026-06-18T09:00:00.000Z', planned_end: '2026-06-19T07:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'c1-v4-r4', resource_name: 'Gas Monitor Board', planned_start: '2026-06-18T08:00:00.000Z', planned_end: '2026-06-19T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'c1-v4-r5', resource_name: 'Data Bridge Block', planned_start: '2026-06-18T10:00:00.000Z', planned_end: '2026-06-19T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'c1-v5-r1', resource_name: 'Crane 5', planned_start: '2026-06-23T16:00:00.000Z', planned_end: '2026-06-24T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'c1-v5-r2', resource_name: 'Tugboat C', planned_start: '2026-06-23T16:15:00.000Z', planned_end: '2026-06-24T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'c1-v5-r3', resource_name: 'Heavy Truck M', planned_start: '2026-06-23T18:00:00.000Z', planned_end: '2026-06-24T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'c1-v5-r4', resource_name: 'Quay Gate Unit', planned_start: '2026-06-23T16:00:00.000Z', planned_end: '2026-06-24T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'c1-v5-r5', resource_name: 'Network Mast', planned_start: '2026-06-23T17:00:00.000Z', planned_end: '2026-06-24T15:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'c1-v6-r1', resource_name: 'Forklift 3', planned_start: '2026-06-28T10:00:00.000Z', planned_end: '2026-06-29T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'c1-v6-r2', resource_name: 'Pilot D', planned_start: '2026-06-28T10:15:00.000Z', planned_end: '2026-06-29T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'c1-v6-r3', resource_name: 'Gantry Crane 12', planned_start: '2026-06-28T11:00:00.000Z', planned_end: '2026-06-29T09:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'c1-v6-r4', resource_name: 'First Aid Kit Station', planned_start: '2026-06-28T10:00:00.000Z', planned_end: '2026-06-29T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'c1-v6-r5', resource_name: 'Encrypted Radio Node', planned_start: '2026-06-28T12:00:00.000Z', planned_end: '2026-06-29T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
        ]
      },
      {
        id: 'c1-v8',
        vessel_name: 'Celestial Navigator',
        bollards_start: 10,
        bollards_end: 22,
        status: { lookup_code: 'IN_PROGRESS', lookup_value: 'In Progress' },
        planned_start: '2026-06-01T08:00:00.000Z',
        planned_end: '2026-06-03T08:00:00.000Z',
        actual_start: '2026-06-01T08:30:00.000Z',
        actual_end: null,
        resources: [
          {
            id: 'c1-v8-r1',
            resource_name: 'Crane 2',
            planned_start: '2026-06-01T08:00:00.000Z',
            planned_end: '2026-06-03T08:00:00.000Z',
            work_completed: 45,
            resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' }
          },
          {
            id: 'c1-v8-r2',
            resource_name: 'Tugboat B',
            planned_start: '2026-06-01T08:00:00.000Z',
            planned_end: '2026-06-03T08:00:00.000Z',
            work_completed: 100,
            resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' }
          },
          {
            id: 'c1-v8-r3',
            resource_name: 'Loading Forklift',
            planned_start: '2026-06-02T09:00:00.000Z',
            planned_end: '2026-06-03T07:00:00.000Z',
            work_completed: 20,
            resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' }
          },
          {
            id: 'c1-v8-r4',
            resource_name: 'Safety Barrier A',
            planned_start: '2026-06-01T08:00:00.000Z',
            planned_end: '2026-06-03T08:00:00.000Z',
            work_completed: 60,
            resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' }
          },
          {
            id: 'c1-v8-r5',
            resource_name: 'Comm Relay Alpha',
            planned_start: '2026-06-01T08:00:00.000Z',
            planned_end: '2026-06-03T08:00:00.000Z',
            work_completed: 55,
            resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' }
          },
          {
            id: 'c1-v8-r6',
            resource_name: 'Navigation Assist',
            planned_start: '2026-06-01T08:00:00.000Z',
            planned_end: '2026-06-01T16:00:00.000Z',
            work_completed: 100,
            resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' }
          },
          {
            id: 'c1-v8-r7',
            resource_name: 'Heavy Lift Crane',
            planned_start: '2026-06-02T14:00:00.000Z',
            planned_end: '2026-06-02T20:00:00.000Z',
            work_completed: 0,
            resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' }
          },
          {
            id: 'c1-v8-r8',
            resource_name: 'Ground Handling Tech',
            planned_start: '2026-06-01T10:00:00.000Z',
            planned_end: '2026-06-03T08:00:00.000Z',
            work_completed: 80,
            resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' }
          }
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
          { id: 'd1-v1-r1', resource_name: 'Crane 6', planned_start: '2026-06-01T08:00:00.000Z', planned_end: '2026-06-02T08:45:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'd1-v1-r2', resource_name: 'Tugboat D', planned_start: '2026-06-01T08:15:00.000Z', planned_end: '2026-06-02T08:45:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'd1-v1-r3', resource_name: 'Dock Forklift 6', planned_start: '2026-06-01T10:00:00.000Z', planned_end: '2026-06-02T06:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'd1-v1-r4', resource_name: 'Lifeline Grid', planned_start: '2026-06-01T08:00:00.000Z', planned_end: '2026-06-02T08:45:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'd1-v1-r5', resource_name: 'VHF Node 12', planned_start: '2026-06-01T09:00:00.000Z', planned_end: '2026-06-02T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'd1-v2-r1', resource_name: 'Forklift 4', planned_start: '2026-06-05T10:00:00.000Z', planned_end: '2026-06-06T10:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'd1-v2-r2', resource_name: 'Pilot E', planned_start: '2026-06-05T10:15:00.000Z', planned_end: '2026-06-06T10:00:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'd1-v2-r3', resource_name: 'Quay Crane 10', planned_start: '2026-06-05T10:00:00.000Z', planned_end: '2026-06-06T10:00:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'd1-v2-r4', resource_name: 'Extinguisher Rack', planned_start: '2026-06-05T11:00:00.000Z', planned_end: '2026-06-06T09:00:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'd1-v2-r5', resource_name: 'Satellite Link Block', planned_start: '2026-06-05T12:00:00.000Z', planned_end: '2026-06-06T08:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'd1-v3-r1', resource_name: 'Crane 6', planned_start: '2026-06-10T16:00:00.000Z', planned_end: '2026-06-11T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'd1-v3-r2', resource_name: 'Tugboat D', planned_start: '2026-06-10T16:15:00.000Z', planned_end: '2026-06-11T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'd1-v3-r3', resource_name: 'Heavy Loader Stack', planned_start: '2026-06-10T18:00:00.000Z', planned_end: '2026-06-11T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'd1-v3-r4', resource_name: 'Laser Alignment Pack', planned_start: '2026-06-10T16:00:00.000Z', planned_end: '2026-06-11T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'd1-v3-r5', resource_name: 'Safety Nets Outer', planned_start: '2026-06-10T17:00:00.000Z', planned_end: '2026-06-11T15:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } }
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
          { id: 'd1-v4-r1', resource_name: 'Forklift 4', planned_start: '2026-06-15T00:00:00.000Z', planned_end: '2026-06-16T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'd1-v4-r2', resource_name: 'Pilot F', planned_start: '2026-06-15T00:15:00.000Z', planned_end: '2026-06-16T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'd1-v4-r3', resource_name: 'Straddle Carrier 2', planned_start: '2026-06-15T01:00:00.000Z', planned_end: '2026-06-15T23:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'd1-v4-r4', resource_name: 'Illuminated Barricade', planned_start: '2026-06-15T00:00:00.000Z', planned_end: '2026-06-16T00:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'd1-v4-r5', resource_name: 'UHF Radio Base', planned_start: '2026-06-15T02:00:00.000Z', planned_end: '2026-06-15T22:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'd1-v5-r1', resource_name: 'Crane 6', planned_start: '2026-06-20T12:00:00.000Z', planned_end: '2026-06-21T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'd1-v5-r2', resource_name: 'Tugboat D', planned_start: '2026-06-20T12:15:00.000Z', planned_end: '2026-06-21T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'd1-v5-r3', resource_name: 'Tier-2 Stacker', planned_start: '2026-06-20T14:00:00.000Z', planned_end: '2026-06-21T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'd1-v5-r4', resource_name: 'Life Rings Deck', planned_start: '2026-06-20T12:00:00.000Z', planned_end: '2026-06-21T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'd1-v5-r5', resource_name: 'Signal Antenna Main', planned_start: '2026-06-20T13:00:00.000Z', planned_end: '2026-06-21T11:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'd1-v6-r1', resource_name: 'Forklift 4', planned_start: '2026-06-26T06:00:00.000Z', planned_end: '2026-06-27T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'd1-v6-r2', resource_name: 'Pilot E', planned_start: '2026-06-26T06:15:00.000Z', planned_end: '2026-06-27T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'd1-v6-r3', resource_name: 'Aux Crane Unit', planned_start: '2026-06-26T07:00:00.000Z', planned_end: '2026-06-27T05:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'd1-v6-r4', resource_name: 'Quay Bumpers Safe', planned_start: '2026-06-26T06:00:00.000Z', planned_end: '2026-06-27T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'd1-v6-r5', resource_name: 'Digital Monitor Desk', planned_start: '2026-06-26T08:00:00.000Z', planned_end: '2026-06-27T04:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'e1-v1-r1', resource_name: 'Crane 7', planned_start: '2026-06-02T00:00:00.000Z', planned_end: '2026-06-03T00:10:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'e1-v1-r2', resource_name: 'Tugboat E', planned_start: '2026-06-02T00:15:00.000Z', planned_end: '2026-06-03T00:10:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'e1-v1-r3', resource_name: 'Pallet Jack Pro', planned_start: '2026-06-02T01:00:00.000Z', planned_end: '2026-06-03T00:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'e1-v1-r4', resource_name: 'Safety Net Grid E', planned_start: '2026-06-02T00:00:00.000Z', planned_end: '2026-06-03T00:10:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'e1-v1-r5', resource_name: 'Local Transceiver', planned_start: '2026-06-02T02:00:00.000Z', planned_end: '2026-06-02T22:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'e1-v2-r1', resource_name: 'Forklift 5', planned_start: '2026-06-05T06:00:00.000Z', planned_end: '2026-06-06T06:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'e1-v2-r2', resource_name: 'Pilot F', planned_start: '2026-06-05T06:15:00.000Z', planned_end: '2026-06-06T06:00:00.000Z', work_completed: 100, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'e1-v2-r3', resource_name: 'Mobile Gantry E', planned_start: '2026-06-05T06:00:00.000Z', planned_end: '2026-06-06T06:05:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'e1-v2-r4', resource_name: 'Isolation Screen', planned_start: '2026-06-05T07:00:00.000Z', planned_end: '2026-06-06T05:00:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'e1-v2-r5', resource_name: 'Data Feed Box', planned_start: '2026-06-05T08:00:00.000Z', planned_end: '2026-06-06T04:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'e1-v3-r1', resource_name: 'Crane 7', planned_start: '2026-06-09T18:00:00.000Z', planned_end: '2026-06-10T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'e1-v3-r2', resource_name: 'Tugboat E', planned_start: '2026-06-09T18:15:00.000Z', planned_end: '2026-06-10T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'e1-v3-r3', resource_name: 'High Mast Truck', planned_start: '2026-06-09T19:00:00.000Z', planned_end: '2026-06-10T17:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'e1-v3-r4', resource_name: 'Berth Border Guard', planned_start: '2026-06-09T18:00:00.000Z', planned_end: '2026-06-10T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'e1-v3-r5', resource_name: 'Compass Calibration', planned_start: '2026-06-09T20:00:00.000Z', planned_end: '2026-06-10T15:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } }
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
          { id: 'e1-v4-r1', resource_name: 'Forklift 5', planned_start: '2026-06-17T10:00:00.000Z', planned_end: '2026-06-18T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'e1-v4-r2', resource_name: 'Pilot F', planned_start: '2026-06-17T10:15:00.000Z', planned_end: '2026-06-18T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'e1-v4-r3', resource_name: 'Heavy Deck Gantry', planned_start: '2026-06-17T11:00:00.000Z', planned_end: '2026-06-18T09:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'e1-v4-r4', resource_name: 'Reflective Safety Cones', planned_start: '2026-06-17T10:00:00.000Z', planned_end: '2026-06-18T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'e1-v4-r5', resource_name: 'Secure Network Matrix', planned_start: '2026-06-17T12:00:00.000Z', planned_end: '2026-06-18T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'e1-v5-r1', resource_name: 'Crane 7', planned_start: '2026-06-22T14:00:00.000Z', planned_end: '2026-06-23T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'e1-v5-r2', resource_name: 'Tugboat E', planned_start: '2026-06-22T14:15:00.000Z', planned_end: '2026-06-23T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'e1-v5-r3', resource_name: 'Warehouse Stacker Z', planned_start: '2026-06-22T15:00:00.000Z', planned_end: '2026-06-23T13:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'e1-v5-r4', resource_name: 'Spill Kit Storage', planned: '2026-06-22T14:00:00.000Z', planned_end: '2026-06-23T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'e1-v5-r5', resource_name: 'Wireless Access Pylon', planned_start: '2026-06-22T16:00:00.000Z', planned_end: '2026-06-23T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'e1-v6-r1', resource_name: 'Forklift 5', planned_start: '2026-06-29T08:00:00.000Z', planned_end: '2026-06-30T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'e1-v6-r2', resource_name: 'Pilot F', planned_start: '2026-06-29T08:15:00.000Z', planned_end: '2026-06-30T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'e1-v6-r3', resource_name: 'Quayside Derrick', planned_start: '2026-06-29T09:00:00.000Z', planned_end: '2026-06-30T07:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'e1-v6-r4', resource_name: 'Flashing Warning Array', planned_start: '2026-06-29T08:00:00.000Z', planned_end: '2026-06-30T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'e1-v6-r5', resource_name: 'Main Signal Mast', planned_start: '2026-06-29T10:00:00.000Z', planned_end: '2026-06-30T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'f1-v1-r1', resource_name: 'Crane 8', planned_start: '2026-06-03T06:00:00.000Z', planned_end: '2026-06-04T06:15:00.000Z', work_completed: 100, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'f1-v1-r2', resource_name: 'Tugboat F', planned_start: '2026-06-03T06:15:00.000Z', planned_end: '2026-06-04T06:00:00.000Z', work_completed: 100, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'f1-v1-r3', resource_name: 'Yard Forklift 8', planned_start: '2026-06-03T08:00:00.000Z', planned_end: '2026-06-04T05:00:00.000Z', work_completed: 100, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'f1-v1-r4', resource_name: 'Safety Harness Vault', planned_start: '2026-06-03T06:00:00.000Z', planned_end: '2026-06-04T06:15:00.000Z', work_completed: 100, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'f1-v1-r5', resource_name: 'VHF Matrix Station', planned_start: '2026-06-03T07:00:00.000Z', planned_end: '2026-06-04T06:00:00.000Z', work_completed: 100, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'f1-v2-r1', resource_name: 'Forklift 6', planned_start: '2026-06-08T14:00:00.000Z', planned_end: '2026-06-09T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'f1-v2-r2', resource_name: 'Pilot G', planned_start: '2026-06-08T14:15:00.000Z', planned_end: '2026-06-09T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'f1-v2-r3', resource_name: 'Quay Crane 11', planned_start: '2026-06-08T14:00:00.000Z', planned_end: '2026-06-09T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'f1-v2-r4', resource_name: 'Emergency Life Boat', planned_start: '2026-06-08T15:00:00.000Z', planned_end: '2026-06-09T12:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'f1-v2-r5', resource_name: 'Encrypted Transceiver', planned_start: '2026-06-08T16:00:00.000Z', planned_end: '2026-06-09T11:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'f1-v3-r1', resource_name: 'Crane 8', planned_start: '2026-06-13T20:00:00.000Z', planned_end: '2026-06-14T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'f1-v3-r2', resource_name: 'Tugboat F', planned_start: '2026-06-13T20:15:00.000Z', planned_end: '2026-06-14T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'f1-v3-r3', resource_name: 'Side Loader Truck', planned_start: '2026-06-13T21:00:00.000Z', planned_end: '2026-06-14T18:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'f1-v3-r4', resource_name: 'Quay Hazard Shield', planned_start: '2026-06-13T20:00:00.000Z', planned_end: '2026-06-14T20:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'f1-v3-r5', resource_name: 'Positioning Echo Unit', planned_start: '2026-06-13T22:00:00.000Z', planned_end: '2026-06-14T17:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } }
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
          { id: 'f1-v4-r1', resource_name: 'Forklift 6', planned_start: '2026-06-19T08:00:00.000Z', planned_end: '2026-06-20T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'f1-v4-r2', resource_name: 'Pilot G', planned_start: '2026-06-19T08:15:00.000Z', planned_end: '2026-06-20T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'f1-v4-r3', resource_name: 'Gantry Lifter 14', planned_start: '2026-06-19T09:00:00.000Z', planned_end: '2026-06-20T07:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'f1-v4-r4', resource_name: 'Static Grounding Link', planned_start: '2026-06-19T08:00:00.000Z', planned_end: '2026-06-20T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'f1-v4-r5', resource_name: 'Radio Repeater Mast', planned_start: '2026-06-19T10:00:00.000Z', planned_end: '2026-06-20T06:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'f1-v5-r1', resource_name: 'Crane 8', planned_start: '2026-06-24T16:00:00.000Z', planned_end: '2026-06-25T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'f1-v5-r2', resource_name: 'Tugboat F', planned_start: '2026-06-24T16:15:00.000Z', planned_end: '2026-06-25T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba93e-b40a-11f0-865a-374acbdf9a9c', code: 'Machinery_&_Handling_Equipment', description: 'Machinery & Handling Equipment' } },
          { id: 'f1-v5-r3', resource_name: 'Compact Forklift 7', planned_start: '2026-06-24T17:00:00.000Z', planned_end: '2026-06-25T15:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'f1-v5-r4', resource_name: 'Emergency Siren Unit', planned_start: '2026-06-24T16:00:00.000Z', planned_end: '2026-06-25T16:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'f1-v5-r5', resource_name: 'Data Relay Pod 9', planned_start: '2026-06-24T18:00:00.000Z', planned_end: '2026-06-25T14:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
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
          { id: 'f1-v6-r1', resource_name: 'Forklift 6', planned_start: '2026-06-29T10:00:00.000Z', planned_end: '2026-06-30T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba7b8-b40a-11f0-865a-0f90cba3972d', code: 'Forklift', description: 'Forklift' } },
          { id: 'f1-v6-r2', resource_name: 'Pilot G', planned_start: '2026-06-29T10:15:00.000Z', planned_end: '2026-06-30T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba84e-b40a-11f0-865a-37bc5813dc45', code: 'Navigation Equipment', description: 'Navigation Equipment' } },
          { id: 'f1-v6-r3', resource_name: 'Quayside Jib Crane', planned_start: '2026-06-29T11:00:00.000Z', planned_end: '2026-06-30T09:00:00.000Z', work_completed: 0, resource_type: { id: '7beba312-b40a-11f0-865a-cf67109db96c', code: 'Crane', description: 'Crane' } },
          { id: 'f1-v6-r4', resource_name: 'Dock Hand Barrier', planned_start: '2026-06-29T10:00:00.000Z', planned_end: '2026-06-30T10:00:00.000Z', work_completed: 0, resource_type: { id: '7beba8c6-b40a-11f0-865a-a3f914145d2b', code: 'Safety_Equipment', description: 'Safety Equipment' } },
          { id: 'f1-v6-r5', resource_name: 'Telemetry Receiver', planned_start: '2026-06-29T12:00:00.000Z', planned_end: '2026-06-30T08:00:00.000Z', work_completed: 0, resource_type: { id: '7beba9ca-b40a-11f0-865a-6711ea1ca584', code: 'Communication_&_Electronic_Equipmentt', description: 'Communication & Electronic Equipment' } }
        ]
      },
      {
        "id": "f1-v5",
        "vessel_name": "Titan Mariner",
        "bollards_start": 1,
        "bollards_end": 9,
        "status": { "lookup_code": "IN_PROGRESS", "lookup_value": "In Progress" },
        "planned_start": "2026-06-25T12:00:00.000Z",
        "planned_end": "2026-06-27T12:00:00.000Z",
        "actual_start": "2026-06-25T12:15:00.000Z",
        "actual_end": null,
        "resources": [
          {
            "id": "f1-v5-r1",
            "resource_name": "Main Deck Crane",
            "planned_start": "2026-06-25T12:00:00.000Z",
            "planned_end": "2026-06-27T12:00:00.000Z",
            "work_completed": 45,
            "resource_type": { "id": "7beba312-b40a-11f0-865a-cf67109db96c", "code": "Crane", "description": "Crane" }
          },
          {
            "id": "f1-v5-r2",
            "resource_name": "Tugboat H",
            "planned_start": "2026-06-26T00:00:00.000Z",
            "planned_end": "2026-06-27T00:00:00.000Z",
            "work_completed": 40,
            "resource_type": { "id": "7beba93e-b40a-11f0-865a-374acbdf9a9c", "code": "Machinery_&_Handling_Equipment", "description": "Machinery & Handling Equipment" }
          },
          {
            "id": "f1-v5-r3",
            "resource_name": "Night Shift Forklift",
            "planned_start": "2026-06-25T18:00:00.000Z",
            "planned_end": "2026-06-26T08:00:00.000Z",
            "work_completed": 100,
            "resource_type": { "id": "7beba7b8-b40a-11f0-865a-0f90cba3972d", "code": "Forklift", "description": "Forklift" }
          },
          {
            "id": "f1-v5-r4",
            "resource_name": "Safety Inspector Gear",
            "planned_start": "2026-06-26T08:00:00.000Z",
            "planned_end": "2026-06-27T10:00:00.000Z",
            "work_completed": 6,
            "resource_type": { "id": "7beba8c6-b40a-11f0-865a-a3f914145d2b", "code": "Safety_Equipment", "description": "Safety Equipment" }
          },
          {
            "id": "f1-v5-r5",
            "resource_name": "Comms Array B",
            "planned_start": "2026-06-26T12:00:00.000Z",
            "planned_end": "2026-06-27T12:00:00.000Z",
            "work_completed": 0,
            "resource_type": { "id": "7beba9ca-b40a-11f0-865a-6711ea1ca584", "code": "Communication_&_Electronic_Equipmentt", "description": "Communication & Electronic Equipment" }
          }
        ]
      }
    ]
  }
];