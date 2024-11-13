import bcrypt from 'bcrypt';

class HashPassword {
    constructor() {}

    genSalt() {
        const saltOrRounds = Math.round(Math.random() * 10)
        return bcrypt.genSaltSync(saltOrRounds)
    }

    hash(password) {
        const salt = this.genSalt()
        return bcrypt.hashSync(password, salt)
    }

    compareHash(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

export default new HashPassword()