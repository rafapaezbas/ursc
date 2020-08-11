## URSC

URSC is a containerized sidecar application that help on keeping registration and login of user for any application.

URSC has a very simple API:

*/user/register*
```
curl -v -X POST -H "Content-Type: application/json"  -d '{"name":"name","password":"password"}'  localhost:8083/user/register
```
Returns 201 if user is created, if there is already  a user with the same name, response is code 403.

*/user/login*

```
curl -v -X POST -H "Content-Type: application/json"  -d '{"name":"name","password":"password"}'  localhost:8080/user/login
```
Returns 200 and a signed JWT token if credentials are correct, otherwise response will be code 403.

*/user/check*

```
curl -i -H "Authorization: Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYSIsImlhdCI6MTU5NzA3OTUwMCwiZXhwIjoxNTk3MDgzMTAwfQ.VCGsGjpAMEVUzQu2twamNUrbFeyjNECGjeq0nxlDlm1" -X GET localhost:8080/user/check
```
Check validity of the token sent in the Authorization header and returns 200 code with the name of user if the token is valid, if not response is 422.

## Tutorial

If you want to deploy USRC you also need a MongoDB instance. Make sure your database is up and running then have a look on the configuration file config.conf:

```
jwt_sign_secret=0123456
encryption_salt=0123456
mongodb_url=mongodb://mongodb:27017
```

Change the jwt signature and encryption salt to make your application saver. Then run init.sh, now you should have a Docker container running URSC!



```
# Link mongodb container with alias "mongodb", expose application on port 8083
./init.sh -l mongodb:mongodb -p 8080 
```


