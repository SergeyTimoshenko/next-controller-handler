import Item from 'models/item';

export default {
    index: async (req, res) => {
        res.status(200).send(await Item.find())
    },
    create: async (req, res) => {
        const user = await Item.create({...req.body});
        res.status(200).send(user)
    },
    find: async (req, res) => {
        const item = await Item.findById(req.query.id);
        if (!item) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    },
    update: async (req, res) => {
        await Item.updateOne({_id: req.query.id}, {...req.body})
        res.status(201).send()
    },
    delete: async (req, res) => {
        await Item.deleteOne({_id: req.query.id})
        res.status(201).send()
    }
}