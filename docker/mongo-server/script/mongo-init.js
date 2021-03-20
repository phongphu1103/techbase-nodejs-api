db.createUser(
    {
        user: "development",
        pwd: "passpass",
        roles: [
            {
                role: "readWrite",
                db: "pmkt_db"
            }
        ]
    }
)