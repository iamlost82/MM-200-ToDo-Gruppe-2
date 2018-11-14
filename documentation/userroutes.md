## USERS

[Back to API overview](./api.md)

### Create new user

* METHOD: POST
* ENDPOINT: /api/user
* BODY(json):

```javascript
{
	"username":"fluffy",
	"fullname":"Mr. Fluffy",//allowed blank
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
			"id": "1",
			"username": "fluffy",
			"fullname": "Mr.Fluffy",
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
* BODY(json):

```javascript
{
    "id": 1,
	"username":"fluffy",
	"fullname":"Mr.Fluffy",//Allowed blank
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
			"id": "1",
			"username": "fluffy",
			"fullname": "Mr.Fluffy",
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
			"id": 1,
			"username": "fluffy",
			"fullname": "Mr.Fluffy",
			"email": "fluffy@uia.no",
			"userrole": 1,
			"lastlogin": 'null or timestamp',
			"active": 0
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