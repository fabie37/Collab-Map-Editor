//Node
routes.post('/createnode', verifyToken, NodeController.createNode);
routes.post('/nodebrowser', verifyToken, NodeController.getNodeByLayerId); // temporary dev page
routes.get(
    '/nodebylayer/:layer_id?',
    verifyToken,
    NodeController.getNodeByLayerId
);
routes.get('/node/:node_id?', verifyToken, NodeController.getNodeById);
routes.delete('/deletenode/:node_id', verifyToken, NodeController.delete);
