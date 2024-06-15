const Campaign = require('../model/campaignModel');

const addCampaign = async (req, res) => {
    try {
        const { name, category, type, bidvalue, siteUrl } = req.body;

        const existingCampaign = await Campaign.findOne({ name: name });
        if (existingCampaign) {
            res.status(409).json({ error: 'Campaign with this name already exists' })
        }

        const imageBaseUrl =
            req.protocol + "://" + req.get("host") + "/uploads/campaign/images/";

        const newCampaign = new Campaign({
            name: name,
            category: category,
            type: type,
            bidValue: bidvalue,
            adUrl: siteUrl,
            img: imageBaseUrl + req.files[0].filename,
        });

        const savedCampaign = await newCampaign.save();

        res.status(201).send(savedCampaign);
    } catch (e) {
        res.status(500).send(e);
    }
};

const deleteCampaign = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCamp = await Campaign.findByIdAndDelete(id);
        res.status(201).send(deleteCamp);
    } catch (e) {
        res.status(500).send(e);
    }
};

const getCampaigns = async (req, res) => {
    try {
        const getAllCamp = await Campaign.find();
        res.status(201).send(getAllCamp);
    } catch (e) {
        res.status(500).send(e);
    }
};

const getCampaign = async (req, res) => {
    const { id } = req.params;
    try {
        const getCamp = await Campaign.findById(id);
        res.status(201).send(getCamp);
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = { addCampaign, getCampaigns, getCampaign, deleteCampaign };
