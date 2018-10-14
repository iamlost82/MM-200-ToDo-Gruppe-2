# API Documentation

---

[Back to main page](https://github.com/iamlost82/MM-200-ToDo-Gruppe-2)

---
# USERS:

## Create new user
### METHOD: POST
### ENDPOINT: /api/users/
### BODY(json):
```{"name":"Mr.Fluffy","email":"fluffy@uia.no","password":"12345678"}```
### RESPONSE SUCCESS(201)(json):
```{"name":"Mr.Fluffy","email":"fluffy@uia.no","password":"12345678","id":"1"}```
### RESPONSE ERROR(400)(json):
```{"msg": "Storing user failed, check API documentation"}```
or
```{"msg": "Duplicate email found"}```

---

## Authorize user
### METHOD: GET
### ENDPOINT: /api/users/auth
### BODY(json):
```{"email":"fluffy@uia.no","password":"12345678"}```
### RESPONSE SUCCESS(200)(json): 
```{"id":"1","name":"Mr.Fluffy","email":"fluffy@uia.no"}```
### RESPONSE ERROR(400)(json):
```{"msg": "Authentication failed"}```

---

# JOKE(OBSOBS, justt for demo purpose):

## Return personalized joke template
### METHOD: GET
### ENDPOINT: /api/joke
### RESPONSE SUCCESS(200)(json):
```"<p>INPNAME: CAPS LOCK – Preventing Login Since 1980.</p>"```

---

## Create new joke
### METHOD: POST
### BODY(json):
```{"body":"<p>Testjoke</p>"}```
### RESPONSE SUCCESS(200)(json):
```{"msg": "New joke created"}```