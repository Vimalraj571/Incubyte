# Incubyte

This is simple Words fullstack API.

Tech stack used

##### VanilaJS + NodeJS + Postgresql

&nbsp;

### How to use it ?

First setup the db using init.sql

```
CREATE SCHEMA IF NOT EXISTS word_schema.words;

psql -h localhost -d <database> -U <username> -f init.sql
```

```
git clone https://github.com/Vimalraj571/Incubyte.git
npm install
npm run start:dev
```

Default running port 3002

For FrontEnd

> goto /frontend/index.html

And the front end local dev setup configured with 3002

#### DOCS API Enpoints

>goto docs/

```
Words.postman_collection.json
Words.swagger.yml
```

For swagger use [`https://editor.swagger.io/`](https://pages.github.com/) to check the API endpoint documentation
and upload the Words.swagger.yml

#### Things the Frontend - Backend will support

1. Get Words - Array
2. Get A Single word - Array
3. Edit Single word - String
4. Post New Word - Obj
5. Delete a Word - Obj
6. Also UI supports standalone storage using the localstorage Browser API.


NOTE:
If CORS error occurs use Moesif Plugin in Chrome (Handled in Express in some cases if occurs)

[Moesif Chrome Plug in Link](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc)