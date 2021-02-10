import connect from 'util/mongodb';

const handler = (controller) => async (req, res) => {
    await connect();

    try {
        const response = await (new controller(req.method))(req.query, req.body);

        return res.status(response.getStatus())
                  .send(response.getData());
    } catch (error) {
        console.log(error)
        res.status(error.getStatus())
           .send(error.getMessage());
    }
}

export default handler