import ModelRepository from './ModelRepository';

import Position from '../models/Position';

export default class PositionRepository extends ModelRepository {
    modelClass() {
        return Position
    }
}