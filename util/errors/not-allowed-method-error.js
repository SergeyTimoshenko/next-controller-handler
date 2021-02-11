import Error from "./error";

export default class extends Error {
    constructor() {
        super('Method not allowed', 405);
    }
}