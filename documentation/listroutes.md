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
  "rowCount": 2,
  "rows": [
    {
      "id": "2",
      "title": "Fluffys list nr 2",
      "tags": null,
      "color": null,
      "created": "2018-11-22T12:12:16.209Z",
      "ownerid": 1,
      "ownerusername": "fluffy",
      "visibility": 0,
      "active": 1,
      "sub_id": null,
      "user_id": null,
      "list_id": null,
      "permission": null
    },
    {
      "id": "2",
      "title": "Subscribed list",
      "tags": null,
      "color": null,
      "created": "2018-11-22T12:12:09.965Z",
      "ownerid": 2,
      "ownerusername": "flappy",
      "visibility": 2,
      "active": 1,
      "sub_id": 1,
      "user_id": 1,
      "list_id": 2,
      "permission": 1
    },
    {
      "id": "1",
      "title": "Fluffys public list",
      "tags": null,
      "color": null,
      "created": "2018-11-22T12:12:09.965Z",
      "ownerid": 1,
      "ownerusername": "fluffy",
      "visibility": 2,
      "active": 1,
      "sub_id": null,
      "user_id": null,
      "list_id": null,
      "permission": null
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