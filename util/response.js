export default class {
    static get success() { return 200 };
    static get notFound() { return 404 };
    static get created() { return 201 };
    static get noContent() { return 204 };
    constructor(data = null, status = this.success) {
        this._data = data;
        this._status = status;
    }

    getData() {
        return this._data;
    }

    getStatus() {
        return this._status;
    }
}