//Map Browser
routes.get('/mapbrowser', verifyToken, MapController.getAllMaps);
routes.get('/mapbrowser/:map_id', verifyToken, MapController.getMapById);
routes.delete('/mapbrowser/:map_id', verifyToken, MapController.delete);
