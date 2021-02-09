import User from 'models/user';

export default {
    index: async (req, res) => {
        res.status(200).send(await User.find())
    },
    create: async (req, res) => {
        const user = await User.create({...req.body});
        res.status(200).send(user)
    },
    find: async (req, res) => {
        const user = await User.findById(req.query.id);
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    },
    update: async (req, res) => {
        await User.updateOne({_id: req.query.id}, {...req.body})
        res.status(201).send()
    },
    delete: async (req, res) => {
        await User.deleteOne({_id: req.query.id})
        res.status(201).send()
    }
}
