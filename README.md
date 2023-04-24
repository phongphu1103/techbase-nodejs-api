## Test API voi Postman
### Buoc 1: Import db techabse tu thu muc dump
### Buoc 2: Mo Postman
### Buoc 3: Login vao API
- truy cap link localhost:8080/api/v1/auth/login
- su dung method POST
- set param email: john.doe1@gmail.com\password: 12345678 de login vao API
- sau khi login thanh cong, copy token tu response
- them x-access-token vao header va set value la token o tren
### Buoc 4: Test API
- truy cap link localhost:8080/api/v1/users/index?status=active
- su dung method GET de lay danh sach user
- truy cap link localhost:8080/api/v1/organizations/index?status=active
- su dung method GET de lay danh sach bo phan cua cong ty

## Test API voi unit test
### Buoc 1: Import db techabse tu thu muc dump
### Buoc 2: set bien AUTH_ENABLE=false trong file .env.development
### Buoc 3: su dung command line de run npm test

## Config Redis
- Open file redis.conf
- Allow client remote to redis server: bind 0.0.0.0
- Set auth password: requirepass password
- Using redis-cli to remote with command: rdcli -h redis-server-ip -a requirepass -p 6379
- Using keys '*' to get all keys
- Using hgetall 'key' to query
