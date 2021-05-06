https://github.com/bbc/REST-API-example/blob/master/README.md

# NODEPOP

## WEB-API/Node.js / MongoDB

### Install dependencies

```
npm install
```

### Seed Data Base

```
npm run installDB
```

### Run dev

```
npm run dev
```

### Run the api

```
npm run start
```

## API REQUEST

### GET

### Show all advertisements

```
http://localhost:3000/api/advertisements
```

### FIND

### Find advertisement by id

```
http://localhost:3000/api/advertisements/601f3488f61904677c0d004b
```

### POST

Create a new Advertisement

```
http://localhost:3000/api/advertisements
```

### PUT

Update an Advertisement if exist

```
http://localhost:3000/api/advertisements/<id_num>
```

### DELETE

Delete an Advertisemetn

```
http://localhost:3000/api/advertisements/<id_num>
```

## API METHODS

### FILTER

You can filter by name, sale, price and tags, for exemple:

```
http://localhost:3000/api/advertisements?name=Bi
```

return:

```
"tags": [
"lifestyle",
"motor"
],
"_id": "601f3488f61904677c0d004c",
"name": "Bicicleta",
"sale": false,
"price": 230.15,
"image": "bici.jpg",
"__v": 0
```

### TAGS

Show all the tags of data base

```

http://localhost:3000/api/advertisements/tags

```

### SORT

Show advertisements ordered by field

for exemple, order by price

```

http://localhost:3000/api/advertisements?sort=price

```

If you want to sort by another field, you just have to modify { sort = <filter_field>}

### LIMIT

You can select how many ads you want to
For exemple, if you want only one advertisement:

```
http://localhost:3000/api/advertisements?limit=1
```

### SKIP

You can select how many adds you want to skip, and show from that.

```
http://localhost:3000/api/advertisements?skip=1
```

### FIELDS

If you only want it to show some specific fields

Show advertisements with name and price

```
http://localhost:3000/api/advertisements?fields=name%20price%20-_id
```
