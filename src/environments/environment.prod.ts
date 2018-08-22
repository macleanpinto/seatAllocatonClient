export const environment = {
  production: true,
  fetchRequests: 'resources/fetchRequest.json',
  fetchLayout: 'api/seatRetrieval/fetchLayout',
  retrieveSeatUrl: 'http://localhost:9000/fetchSeatingTemplate',
  approveRequest: '/api/requestProcess/approve',
  saveSeatTemplateUrl: 'resources/fetchLayout.json',
  saveSeatRequestTemplateUrl: 'resources/fetchRequest.json',
  rejectRequest: '/api/requestProcess/reject',
  fetchBuildings: '/api/building/fetchAllBuildings',
  fetchFloorsByBuilding: '/api/floor/fetchFloorByBuilding',
  fetchBaysByFloor: '/api/bay/fetchBaysByFloor'
};
