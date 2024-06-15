const express = require('express');
const { addPublisher, getPublisher, addPublisherAds, updateAdStats } = require('../controller/publisherCtrl');

const router = express.Router();


router.post('/add-publisher', addPublisher);
router.get('/:id/get-publisher', getPublisher);
router.put('/:id/update-publisher', addPublisherAds);
router.put('/:id/update-count/:adId', updateAdStats);

module.exports = router;
