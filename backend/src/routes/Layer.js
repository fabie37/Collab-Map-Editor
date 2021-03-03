//Layer
routes.post('/createlayer', verifyToken, LayerController.createLayer);
routes.post('/layerbrowser', verifyToken, LayerController.getLayerByMapId); // temporary dev page
routes.get('/layer/:map_id?', verifyToken, LayerController.getLayerByMapId);
routes.delete('/deletelayer/:layer_id', verifyToken, LayerController.delete); */