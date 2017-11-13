# WRI-back-nodejs

Back-end application of WRI app system. This is the API system, there is no authentification needed to connect to the system, you just have to download the API and launch it.

## Requirements

To download the API you must have some requirements installed on your device:

- NodeJS - Version 7.*
- NPM - Last Version
- Visual Studio Code
- Postman to test routes (By downloading files on [link]())

## Download

To download the API, git clone the project:

```shell
git clone https://github.com/WebResearchIntegration/WRI-back-nodejs.git
```

## Install

To install all the depedencies needed for the project, you must execute the following command lines:

```shell
sudo npm install
```

## Launch the project

To launch the project, install nodemon in global on your machine.

```shell
sudo npm instlal -g nodemon
```

And next to launch the program:

```shell
nodemon server.js
```

**Now the app is available on port http://localhost:3000.**

## Deploy the app

[NOT YET IMPLEMENTED]


---

# API - Usage

We work in an API system. In this API no need to use a token or auth service. You can directly use the API.
Here are the routes you can work with:

1. ARTICLES
    1. Relationships
1. NOTES
1. QUESTIONS
1. AUTHORS

---

## ARTICLES

Inside the **Neo4j** database, it's possible to play with articles data via the API provided.

### Get Article By Id
**[GET]:** `/api/article/<id>` will get one article from the database with the provided id. If not, will throw a **404**.

### Get all articles
**[GET]:** `/api/article/` Will get all articles inside the database, will give back an array or an error.

### Create new article
**[POST]:** `/api/article/` will create a new article inside the neo4j database.

**OBJECT TEMPLATE: if you have relationships id's**

```json
{
  "name": "Le livre de la jungle",
  "score": 4,
  "abstract": "LOL",
  "conference": "azerty",
  "authors":[
      23
    ],
    "keywords": ["Yo", "cacao"],
    "references":[
        34
    ],
    "notes": [
        56 // provide the id of the note you want to add inside
    ],
    "summary":"GENIAAAAL",
    "writtenDate":"2017-10-08",
    "link":"http://3442/blah",
    "publishedDate":"2017-45-21"
}

```

**OBJECT TEMPLATE: if you DON'T have relationships id's, this will create the nodes inside the neo4j database and make relationships**

```json
{
  "name": "Le livre de la jungle",
  "score":4,
  "abstract":"LOL",
  "conference": "azerty",
  "authors":[{
    "name":"Marc"
    }
    ],
    "keywords": ["Yo", "cacao"],
    "references":[{
      "name":"OKLM"
    }],
    "notes": [{
      "text":"Ouais ouais"
    }],
      "summary":"GENIAAAAL",
      "writtenDate":"2017-10-08",
      "link":"http://3442/blah",
      "publishedDate":"2017-45-21"
}
```

### Modify an existing article
**[PUT]:** `/api/article/<id>` will modify an existing article with the value you give to update data.

To modify an object you must send the object with id to identify and modify the selected node. In fact you don't need to send all characters just the one you want to edit.

### Delete an article by id
**[DELETE]:** `/api/article/<id>` will delete an article thanks to the provided id. If doesn't exist will send **404**.

---

## NOTES

Inside the **Neo4j** database, it's possible to play with notes data via the API provided.

### Get note by id
**[GET]:** `/api/note/<id>` will get a note via the corresponding id. If does not find the id, will send a **404**.

### Get all notes
**[GET]:** `/api/note/<id>` will get all notes. Returns an array that contains all notes from the neo4j database.

### Create new note
**[POST]:** `/api/note/<id>` will create a new note with right fields. Will return the corresponding note, otherwise return **500**.

```json
{
  "text":"First Note to add for test"
}
```

### Modify note by id
**[PUT]:** `/api/note/<id>` will modify a note according to the corresponding id. In order to modify the element you must specify the id inside the route AND inside the body of the request. 

```json
{
  "id":34
  "text":"First Note to add for test"
}
```

### Delete note by id
**[DELETE]:** `/api/note/<id>` will delete a node with it corresponding id. otherwise will send a **404**.

---

## QUESTIONS

Inside the **Neo4j** database, it's possible to play with questions data via the API provided.

### Get question by id
**[GET]:** `/api/question/<id>` will get a question according that we provide the right id. Otherwise return a 404.

### Get all questions
**[GET]:** `/api/question/` will get all questions inside the database. Will return an array or a **500** if error does exist.

### Create new Question
**[POST]:** `/api/question/` will create a new question inside the database. If err, return **500**.

```json
{
    "answer": "Un troupeau de vitres",
    "problematic": "Qu'est-ce qui court dans un pré et qui est transparent ?",
    "id": 24
}

```
### Modify question by id
**[PUT]:** `/api/question/<id>` will modify a question by giving the right id. if not found question will be ignored.

### Delete question by id
**[DELETE]:** `/api/question/<id>` will delete the question by the corresponding id.