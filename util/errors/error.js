export default class extends Error {
    constructor(message = null, status = 400) {
        super(message)
        this.status = status;
    }

    getMessage() {
        return this.message;
    }

    getStatus() {
        return this.status;
    }
}