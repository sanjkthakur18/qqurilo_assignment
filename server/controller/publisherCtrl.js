const requestIp = require('request-ip')
const Publisher = require('../model/publisherModel')


const addPublisher = async (req, res) => {
    try {
        const { name, sites, zones } = req.body;

        const existingPublisher = await Publisher.findOne({ name: name });
        if (existingPublisher) {
            res.status(409).json({ error: 'Publisher with this name already exists' })
        }

        let publisherId;
        const publishers = await Publisher.find()
        if (publishers.length === 0) publisherId = 1
        else publisherId = +publishers[publishers.length - 1].id + 1


        const newPublisher = new Publisher({
            id: publisherId,
            name: name,
            sites: sites,
            zones: zones
        });

        const savedPublisher = await newPublisher.save();
        res.status(201).send(savedPublisher);
    } catch (e) {
        res.status(500).send(e);
    }
};

const getPublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findOne({ _id: req.params.id }).populate('ads.adId');
        console.log(publisher)
        res.status(201).send(publisher);
    } catch (e) {
        res.status(500).send(e);
    }
};

const addPublisherAds = async (req, res) => {
    try {
        const { ads } = req.body;

        const publisher = await Publisher.findOne({ _id: req.params.id });

        if (!publisher) {
            res.status(409).json({ error: 'Publisher not found' })
        }

        publisher.ads = ads

        await publisher.save()

        res.status(201).send("Ads added successfully");
    } catch (e) {
        res.status(500).send(e);
    }
};

const updateAdStats = async (req, res) => {
    console.log("Working")
    try {

        const clientIp = requestIp.getClientIp(req);
        console.log("IP Address:", clientIp)
        const publisher = await Publisher.findOne({ _id: req.params.id });

        if (!publisher) {
            res.status(409).json({ error: 'Publisher not found' })
        }

        const adIndex = publisher.ads.findIndex(ad => ad._id.toString() === req.params.adId);
        console.log(req.params)

        const existingUser = publisher.ads[adIndex].stats.findIndex(stat => stat.userIp === clientIp);

        if (existingUser !== -1) publisher.ads[adIndex].stats[existingUser].watchCount += 1
        else publisher.ads[adIndex].stats.push({
            userIp: clientIp,
            watchCount: 1
        })

        await publisher.save()

        res.status(201).send("Ads count updated");
    } catch (e) {
        res.status(500).send(e);
    }
};


module.exports = { addPublisher, getPublisher, addPublisherAds, updateAdStats };
