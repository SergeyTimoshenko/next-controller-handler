import connect from 'util/mongodb';

const handler = (controller) => async (req, res) => {
    await connect()
    if (req.query.id) {
        switch (req.method) {
            case "GET": return controller.find(req, res);
            case "PUT": return controller.update(req, res);
            case "DELETE": return controller.delete(req, res);
            default: return res.status(404).send('method not allowed')
        }
    }
    
    switch (req.method) {
        case "GET": return controller.index(req, res);
        case "POST": return controller.create(req, res);
        default: return res.status(404).send('method not allowed')
    }
}

export default handler