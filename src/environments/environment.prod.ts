export const environment = {
  production: true,
  fetchRequests: 'api/requestsRetrieval/fetchAllRequests',
  fetchLayout: 'api/seatRetrieval/fetchLayout',
  approveRequest: '/api/requestProcess/approve',
  saveSeatTemplateUrl: 'resources/fetchLayout.json',
  saveSeatRequestTemplateUrl: 'resources/fetchRequest.json',
  rejectRequest: '/api/requestProcess/reject',
  fetchBuildings: '/api/building/fetchAllBuildings',
  fetchFloorsByBuilding: '/api/floor/fetchFloorByBuilding',
  fetchBaysByFloor: '/api/bay/fetchBaysByFloor'
};
