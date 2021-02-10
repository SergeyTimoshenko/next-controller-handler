import dbConnect from "util/mongodb"
import UserService from 'util/api-servises/user';
import Error from "util/errors/error";

export default async ({query, body, method}, res) => {
    await dbConnect();

    try {
        let result = null;

        switch(method) {
            case 'GET': 
                result = await UserService.findOne(query.id)
                break;
            case 'PUT':
                result = await UserService.update(query.id, body)
                break;
            case 'DELETE':
                result = await UserService.delete(query.id)
                break;
            default:
                throw new Error('Method not allowed', 405);
        }

        res.status(result.getStatus())
            .send(result.getData());
    } catch (error) {
        console.log(error)
        return res.status(error.getStatus())
           .send(error.getMessage());
    }
}