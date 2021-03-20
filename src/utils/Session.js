class Session {
    constructor() {
    }

    instance(session) {
        this.session = session
    }

    get(key, value) {
        const _session = {...this.session}
        delete _session["cookie"]
        if (!key || key === "undefined") {
            return _session
        }
        
        if (!_session[key] || _session[key] === "undefined") {
            return value || null
        }
        return _session[key]
    }

    set(key, value) {
        this.session[key] = value
        return this.session.save()
    }

    remove(key) {
        delete this.session[key]
        return this.session.save()
    }

    destroy() {
        return this.session.destroy()
    }
}

export default new Session()