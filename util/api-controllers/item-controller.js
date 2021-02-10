import Item from 'models/item';
import NotFoundError from 'util/errors/not-found-error';
import Response from 'util/response';

export default class {
    constructor(method) {
        switch(method) {
            case 'GET': return this.get;
            case 'POST': return this.post;
            case 'PUT': return this.put;
            case 'DELETE': return this.delete;
        }
    }
    async get(query) {
        let result = null;
        if (query.id) {
            result = await Item.findById(query.id);
        } else {
            result = await Item.find();
        }

        if (!result) {
            throw new NotFoundError()
        }

        return new Response(result, Response.success)
    }
    async post(query, body) {
        const item = await Item.create({...body});
        return new Response(item, Response.created)
    }
    async put(query, body) {
        const result = await Item.updateOne({_id: query.id}, {...body})
        if (!result.n) {
            throw new NotFoundError()
        }

        return new Response(null, Response.noContent)
    }
    async delete(query) {
        const result = await Item.deleteOne({_id: query.id})

        if (!result.deletedCount) {
            throw new NotFoundError()
        }

        return new Response(null, Response.noContent)
    }
}