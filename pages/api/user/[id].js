import dbConnect from "util/mongodb"
import UserService from 'util/api-servises/user';
import NotAllowedMethodError from "util/errors/not-allowed-method-error";
import Response from "util/response";

export default async ({query, body, method}, res) => {
    await dbConnect();

    try {
        let result = null;

        switch(method) {
            case 'GET': 
                const user = await UserService.findOne(query.id)
                result = new Response(user, Response.success)
                break;
            case 'PUT':
                await UserService.update(query.id, body)
                result = new Response(null, Response.noContent)
                break;
            case 'DELETE':
                await UserService.delete(query.id)
                result = new Response(null, Response.noContent)
                break;
            default:
                throw new NotAllowedMethodError();
        }

        res.status(result.getStatus())
            .send(result.getData());
    } catch (error) {
        return res.status(error.getStatus())
           .send(error.getMessage());
    }
}