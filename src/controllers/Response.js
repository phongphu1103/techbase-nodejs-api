export default class Response {
    static success (res, { ...args }) {
        return res.jsonSuccess(args);
    }

    static error (res, { ...args }) {
        return res.jsonError(args);
    }
}