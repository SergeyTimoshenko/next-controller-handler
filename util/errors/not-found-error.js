import Response from "util/response";
import Error from "./error";

export default class extends Error {
    constructor() {
        super('Item not found', Response.notFound)
    }
}