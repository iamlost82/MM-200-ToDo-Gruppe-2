## USERS

[Back to API overview](./api.md)

### Create new user

* METHOD: POST
* ENDPOINT: /api/user
* BODY(json):

```javascript
{
    "username":"Mr.Fluffy",
    "email":"fluffy@uia.no",
    "password":"123456789"
}
```

* RESPONSE SUCCESS(201)(json):

```javascript
{
	"rowCount": 1,
	"rows": [
		{
			"userid": "1",
			"username": "Mr.Fluffy",
			"email": "fluffy@uia.no",
			"userrole": 1,
		}
	]
}
```

* RESPONSE ERROR(500)(json):
```javascript
{
	error:'Saving to database failed'
}
```

* RESPONSE ERROR(400)(json):
```javascript
{
	error:'Error in input data, read API documentation'
}
```

## Update user

* METHOD: PUT
* ENDPOINT: /api/user
* BODY(json):

```javascript
{
    "userid":"1",
    "username":"Mr.Fluffy",
    "email":"fluffy@uia.no",
    "password":"123456789"
}
```

* RESPONSE SUCCESS(200)(json):

```javascript
{
	"rowCount": 1,
	"rows": [
		{
			"userid": "1",
			"username": "Mr.Fluffy",
			"email": "fluffy@uia.no",
			"userrole": 1
		}
	]
}
```

* RESPONSE ERROR(500)(json):

```javascript
{
	error:'Saving to database failed'
}
```

* RESPONSE ERROR(400)(json):

```javascript
{
	error:'Error in input data, read API documentation'
}
```

## Delete(disable) user

* METHOD: DELETE
* ENDPOINT: /api/user
* BODY(json):

```javascript
{
	"userid":"1"
}
```

* RESPONSE SUCCESS(200)(json):

```javascript
{
	"rowCount": 1,
	"rows": [
		{
			"userid": "1",
			"username": "Mr.Fluffy",
			"email": "fluffy@uia.no",
			"userrole": 1,
			"active": 0
		}
	]
}
```

* RESPONSE ERROR(500)(json):

```javascript
{
	error:'Saving to database failed'
}
```

* RESPONSE ERROR(400)(json):

```javascript
{
	error:'Error in input data, read API documentation'
}
```

## List users

* METHOD: GET
* AUTH:
    * HEADER:
        * x-access-auth: TOKEN
    * BODY(json):
        * ```javascript
          {
	        "auth":"TOKEN"
          }
          ```
    * PARAM:
        * ?auth=TOKEN
* ENDPOINT: /api/users
* RESPONSE SUCCESS(200)(json):

```javascript
{
	"rowCount": 1,
	"rows": [
		{
			"userid": "1",
			"username": "Mr.Fluffy",
			"email": "fluffy@uia.no",
			"userrole": 1,
			"active": 0,
			"pwhash": "$2b$10$usoYfIy4/OR5Qcal7bk2.e983hY6NK6JKn33rTlTRqFOJFDYooBeu"
		}
	]
}
```

* RESPONSE ERROR(500)(json):

```javascript
{
	error:'Error in action on database'
}
```