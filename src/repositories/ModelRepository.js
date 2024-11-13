import { Model } from 'sequelize'

export default class ModelRepository {
    constructor(id = null) {
        this.modelClass = this.modelClass()
        this.model(id)
    }

    modelClass() {}

    async model(id) {
        if (id) {
            this.model = id instanceof Model ? id : await this.getById(id)
        }
        return this.model
    }

    async getAttributes() {
        return await this.modelClass.getAttributes()
    }

    async getById(id) {
        return await this.modelClass.findByPk(id)
    }

    async createWithAttributes(attributes) {
        this.model = await this.modelClass.build(attributes).save()
        return this.model
    }

    async updateWithAttributes(attributes) {
        await this.model.set(attributes).save()
        return this.model
    }
}