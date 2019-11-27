var express = require('express');
var router = express.Router();

const apiController = require('../controller/apiController');

/* Insert entry */
router.post('/entry/insert', apiController.insert);

/* Get entries count */
router.get('/entry/count', apiController.count);

/* Get draw winner */
router.get('/entry/get_winner', apiController.get_winner);

/* Delete winner */
router.get('/entry/delete', apiController.delete);

module.exports = router;
