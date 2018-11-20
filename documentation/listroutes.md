## LISTS

[Back to API overview](./api.md)

### Create new list

* METHOD: POST
* ENDPOINT: /api/list
* AUTH:
	* HEADER:
        * x-access-auth: TOKEN
    * BODY(json):
        * ```javascript
          {
	        "auth":"TOKEN"
          }
          ```
* BODY(json):

```javascript
{
	"title":"Fluffys list"
}
```

* RESPONSE SUCCESS(201)(json):

```javascript
{
  "rowCount": 1,
  "rows": [
    {
      "id": "1",
      "title": "Fluffys list",
      "tags": null,
      "color": null,
      "created": "2018-11-19T20:30:24.486Z",
      "ownerid": 1,
      "ownerusername": "fluffy",
      "visibility": 0,
      "active": 1
    }
  ]
}
```

* RESPONSE ERROR(500)(json):
```javascript
{
  "error": "Error in action on database"
}
```

### Update excisting list

* METHOD: PUT
* ENDPOINT: /api/list/:id
* AUTH:
	* HEADER:
        * x-access-auth: TOKEN
    * BODY(json):
        * ```javascript
          {
	        "auth":"TOKEN"
          }
          ```
* BODY(json):

```javascript
{
	"title":"Fluffys edited list",
	"tags":"",
	"color":"",
	"visibility":"1",
	"active":"1"
}
```

* RESPONSE SUCCESS(200)(json):

```javascript
{
  "rowCount": 1,
  "rows": [
    {
      "id": "3",
      "title": "Fluffys edited list",
      "tags": null,
      "color": null,
      "created": "2018-11-16T09:11:50.127Z",
      "ownerid": 1,
      "ownerusername": "flappy",
      "visibility": 1,
      "active": 1
    }
  ]
}
```

* RESPONSE ERROR(500)(json):
```javascript
{
  "error": "Error in action on database"
}
```

### Get lists(own and subscribed)

* METHOD: GET
* ENDPOINT: /api/lists
* AUTH:
	* HEADER:
        * x-access-auth: TOKEN
    * BODY(json):
        * ```javascript
          {
	        "auth":"TOKEN"
          }
          ```
* RESPONSE SUCCESS(200)(json):

```javascript
{
    "ownLists": {
        "rowCount": 8,
        "rows": [{
                "id": "1",
                "title": "Fluffys List",
                "tags": null,
                "color": null,
                "created": "2018-11-16T09:11:50.127Z",
                "ownerid": 1,
                "ownerusername": "fluffy",
                "visibility": 0,
                "active": 1}]
    }
    "subscribedLists": {
        "rowCount": 0,
        "rows": [{
                "id": "2",
                "title": "Flappys List",
                "tags": null,
                "color": null,
                "created": "2018-11-16T09:11:50.127Z",
                "ownerid": 1,
                "ownerusername": "fluffy",
                "visibility": 1,
                "active": 1}]
    }
}
```

* RESPONSE ERROR(500)(json):
```javascript
{
  "error": "Error in action on database"
}
```

### Delete excisting list

* METHOD: PUT
* ENDPOINT: /api/list/:id
* AUTH:
	* HEADER:
        * x-access-auth: TOKEN
    * BODY(json):
        * ```javascript
          {
	        "auth":"TOKEN"
          }
          ```
* RESPONSE SUCCESS(200)(json):

```javascript
{
  "rowCount": 1,
  "rows": [
    {
      "id": "2",
      "title": "Fluffys list",
      "tags": NULL,
      "color": NULL,
      "created": "2018-11-16T09:10:17.319Z",
      "ownerid": 1,
      "ownerusername": "fluffy",
      "visibility": 0,
      "active": 2
    }
  ]
}
```

* RESPONSE ERROR(500)(json):
```javascript
{
  "error": "Error in action on database"
}
```