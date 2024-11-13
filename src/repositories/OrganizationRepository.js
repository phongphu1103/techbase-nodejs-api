import ModelRepository from './ModelRepository';

import Organization from '../models/Organization';

export default class OrganizationRepository extends ModelRepository {
    modelClass() {
        return Organization
    }
}