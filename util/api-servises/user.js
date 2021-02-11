import User from "models/user"
import NotFoundError from "util/errors/not-found-error";


export default {
    findAll() {
        return User.find();
    },
    async findOne(id) {
        const user = await User.findById(id);

        if (!user) {
            throw new NotFoundError();
        }

        return user;
    },
    create(data) {
       return User.create(data);
    },
    async update(_id, data) {
        const result = await User.updateOne({_id}, {...data});

        if (!result.n) {
            throw new NotFoundError()
        }

        return undefined;
    },
    async delete(_id) {
        const result = await User.deleteOne({_id})

        if (!result.deletedCount) {
            throw new NotFoundError();
        }

        return undefined;
    }
}