## LIST-ELEMENTS

[Back to API overview](./api.md)

### Create new list

* METHOD: POST
* ENDPOINT: /api/element
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
	"title":"Fluffys list element",
	"listid":1,
	"deadline":null
}
or
{
	"title":"Fluffys list element",
	"listid":1,
	"deadline":2018-11-22
}
```

* RESPONSE SUCCESS(201)(json):

```javascript
{
  "rowCount": 1,
  "rows": [
    {
      "id": "1",
      "title": "Flyffys list element",
      "created": "2018-11-20T09:39:53.568Z",
      "authorid": 1,
      "authorusername": "fluffy",
      "checked": null,
      "checkedbyid": null,
      "checkedbyusername": null,
      "listid": 1,
      "deadline": null,
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

### Update excisting list element

* METHOD: PUT
* ENDPOINT: /api/element/:id
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
	"title":"Fluffys changed list element",
	"check":
		{
		"checked":"2018-09-28 01:00:00",
		"checkedbyid":"1",
		"checkedbyusername":"fluffy"
	},
	"deadline":"2018-11-21"
}
or
{
	"title":"Fluffys changed list element",
	"check":null,
	"deadline":"2018-11-21"
}
```

* RESPONSE SUCCESS(200)(json):

```javascript
{
  "rowCount": 1,
  "rows": [
    {
      "id": "1",
      "title": "Fluffys changed list element",
      "created": "2018-11-20T08:09:25.863Z",
      "authorid": 1,
      "authorusername": "fluffy",
      "checked": "2018-09-27T23:00:00.000Z",
      "checkedbyid": 1,
      "checkedbyusername": "fluffy",
      "listid": 1,
      "deadline": "2018-11-20T23:00:00.000Z",
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

### Get lists elements of a list

* METHOD: GET
* ENDPOINT: /api/elements/:listid
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
      "id": "1",
      "title": "Fluffys list elemenet",
      "created": "2018-11-20T08:09:25.863Z",
      "authorid": 1,
      "authorusername": "fluffy",
      "checked": null,
      "checkedbyid": null,
      "checkedbyusername": null,
      "listid": 1,
      "deadline": "2018-11-19T23:00:00.000Z"
    },
    ....
  ]
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
* ENDPOINT: /api/element/:id
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