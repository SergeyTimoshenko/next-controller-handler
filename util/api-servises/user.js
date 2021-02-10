import User from "models/user"
import NotFoundError from "util/errors/not-found-error";
import Response from "util/response";

export default {
    async findAll() {
        const users = await User.find();

        return new Response(users, Response.success)
    },
    async findOne(id) {
        const user = await User.findById(id);

        if (!user) {
            throw new NotFoundError();
        }

        return new Response(user, Response.success);
    },
    async create(data) {
        const user = await User.create(data);

        return new Response(user, Response.created)
    },
    async update(_id, data) {
        const result = await User.updateOne({_id}, {...data});

        if (!result.n) {
            throw new NotFoundError()
        }

        return new Response(null, Response.noContent)
    },
    async delete(_id) {
        const result = await User.deleteOne({_id})

        if (!result.deletedCount) {
            throw new NotFoundError();
        }

        return new Response(null, Response.noContent);
    }
}