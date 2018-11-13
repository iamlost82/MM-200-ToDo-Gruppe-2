## AUTHORIZATION

[Back to API overview](./api.md)

## Authorize user

* METHOD: POST
* ENDPOINT: /api/user/auth
* BODY(json):

```javascript
{
    "username":"fluffy@uia.no",
    "password":"123456789"
}
```

* RESPONSE SUCCESS(200)(json):

```javascript
{
	"msg": "User is authorized",
	"userData": {
		"username": "fluffy",
		"email": "fluffy@uia.no",
		"token": "TOKEN"
	}
}
```

* RESPONSE ERROR(401)(json):

```javascript
{
	msg:'User is NOT authorized'
}
```

* RESPONSE ERROR(400)(json):

```javascript
{
	error:'Error in input data, read API documentation'
}
```

* RESPONSE ERROR(500)(json):

```javascript
{
	error:'Saving to database failed'
}
```