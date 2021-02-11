import dbConnect from "util/mongodb"
import UserService from 'util/api-servises/user';
import Response from "util/response";
import NotAllowedMethodError from "util/errors/not-allowed-method-error";

export default async ({body, method}, res) => {
    await dbConnect();

    try {
        let result = null;

        switch(method) {
            case 'GET': 
                const users = await UserService.findAll()
                result = new Response(users, Response.success)
                break;
            case 'POST':
                const user = await UserService.create(body)
                result = new Response(user, Response.created)
                break;
            default:
                throw new NotAllowedMethodError();
        }

        res.status(result.getStatus())
            .send(result.getData());
    } catch (error) {
        console.log(error)
        return res.status(error.getStatus())
           .send(error.getMessage());
    }
}