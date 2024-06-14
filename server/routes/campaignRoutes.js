const express = require('express');
const path = require('path');
const multer = require('multer');
const { addCampaign, deleteCampaign, getCampaign, getCampaigns } = require('../controller/campaignCtrl');

const router = express.Router();

const storage = multer.diskStorage({
    destination:"uploads/campaign/images",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage }).array('img');
 

router.post('/add-campaign', upload, addCampaign);
router.delete('/delete-campaign', deleteCampaign);
router.get('/get-campaign', getCampaign);
router.get('/get-all-campaign', getCampaigns);

module.exports = router;