# API Documentation

---

[Back to main page](https://github.com/iamlost82/MM-200-ToDo-Gruppe-2)

---
# USERS:

## Create new user
### METHOD: POST
### ENDPOINT: /api/user
### BODY(json):
```javascript
{
    "username":"Mr.Fluffy",
    "useremail":"fluffy@uia.no",
    "userrole":"1",
    "userpwplain":"123456789"
}
```
### RESPONSE SUCCESS(201)(json):
[
	{
		"userid": 1,
		"username": "Mr.Fluffy",
		"useremail": "fluffy@uia.no",
		"userrole": 1,
		"userpwhash": "$2b$10$cYHJsoDIEXkKONbH2OiFR.OJq4wtgK3FXm60H7q2CuT.fIfq5yGNq",
		"active": 1
	}
]
### RESPONSE ERROR(500)(json):
{
    "msg": "Key (username)=(Mr.Fluffy) already exists."
}

## Update user
### METHOD: PUT
### ENDPOINT: /api/user
### BODY(json):
{
    "userid":"1",
    "username":"Mr.Fluffy",
    "useremail":"fluffy@uia.no",
    "userrole":"1",
    "userpwplain":"123456789"
}
### RESPONSE SUCCESS(200)(json):
[
	{
		"userid": 1,
		"username": "Mr.Fluffy",
		"useremail": "fluffy@uia.no",
		"userrole": 1,
		"userpwhash": "$2b$10$vo91/3LmcXY5zIFaEaWAvesXCtLWFciEUiRHX7qeY6oUWwwLDB85e",
		"active": 1
	}
]
### RESPONSE ERROR(500)(json):
{
	"msg": "Something went wrong"
}

## Delete(disable) user
### METHOD: DELETE
### ENDPOINT: /api/user
### BODY(json):
{
	"userid":"1"
}
### RESPONSE SUCCESS(200)(json):
{
	"msg": "User deleted"
}
### RESPONSE ERROR(500)(json):
{
	"msg": "Something went wrong"
}

## List users
### METHOD: GET
### ENDPOINT: /api/users
### RESPONSE SUCCESS(200)(json):
[
	{
		"userid": 1,
		"username": "Mr.Fluffy",
		"useremail": "fluffy@uia.no",
		"userrole": 1,
		"userpwhash": "$2b$10$RaaD3pSiCTvWXXhSSUQbR.nOynasUFXKCYUFaxAeYEqEmEOZhNOxK",
		"active": 1
	}
]
### RESPONSE ERROR(500)(json):
{
	"msg": "Something went wrong"
}