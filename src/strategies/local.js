import passport from 'passport';
import LocalStrategy from 'passport-local';

import HashPassword from '../utils/HashPassword';
import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findByPk(id, {
            attributes: ['id', 'username', 'email'],
            raw: true
        });
        done(null, user)
    } catch(err) {
        done(err, false)
    }
})

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                attributes: ['id', 'username', 'email', 'password'],
                where: {
                    email: email,
                    status: 'active'
                }
            });

            if (!(user instanceof User) || !HashPassword.compareHash(password, user.password)) {
                return done(null, false)
            }

            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            return done(null, payload);
        } catch(err) {
            return done(err, false);
        }
    },
))
