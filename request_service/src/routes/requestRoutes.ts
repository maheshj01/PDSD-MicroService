// requestRoutes.ts
import express from 'express';
import RequestManager from '../services/RequestManager';

const requestRoutes = express.Router();
const requestManager = new RequestManager()
requestRoutes.post('/submit', requestManager.submitRequest);
requestRoutes.get('/get', requestManager.getRequests);
requestRoutes.post('/update/:requestId/approve', requestManager.updateRequest);
requestRoutes.post('/update/:requestId/reject', requestManager.updateRequest);
// Add other routes as needed

export default requestRoutes;
