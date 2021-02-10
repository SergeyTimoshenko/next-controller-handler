import dbConnect from "util/mongodb"
import UserService from 'util/api-servises/user';
import Error from "util/errors/error";

export default async ({body, method}, res) => {
    await dbConnect();

    try {
        let result = null;

        switch(method) {
            case 'GET': 
                result = await UserService.findAll()
                break;
            case 'POST':
                result = await UserService.create(body)
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