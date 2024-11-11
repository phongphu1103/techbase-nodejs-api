export default class Response {
    success (res, { ...args }) {
        return res.jsonSuccess(args);
    }

    error (res, { ...args }) {
        return res.jsonError(args);
    }
}