import Response from "./Response"

export default class Controller {
    constructor() {}
    
    async store (req, res, next) {
        try {
            const response = await this.storeExecute(req)
            return Response.success(res, response)
        } catch (err) {
            next(err)
        }
    }

    async storeExecute (req) {
        return {}
    }

    async update (req, res, next) {
        try {
            const response = await this.updateExecute(req)
            return Response.success(res, response)
        } catch (err) {
            next(err)
        }
    }

    async updateExecute (req) {
        return {}
    }
}