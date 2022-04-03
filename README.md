# Incubyte

This is simple Words fullstack API.

Tech stack used

##### VanilaJS + NodeJS + Postgresql

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
1.  If CORS error occurs use Moesif Plugin in Chrome (Handled in Express in some cases if occurs)

    [Moesif Chrome Plug in Link](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc)

2.  For UI frontend change the url to `localhost:3003` If you run services as local else use `https://incubyte-words-node-api.herokuapp.com`
    When making the post request to the post word `app_ui.js line 22` enable/disable the `"ApiKey": "rdj"`
    1. if running as `localhost:3003` comment(disable) the line `app_ui.js line 22`
    2. if running as `https://incubyte-words-node-api.herokuapp.com` uncomment(enable) the line `app_ui.js line 22`
    3. Default host as Heroku URL

Heroku URL for Get all word from DB:

### BaseURL : 

[https://incubyte-words-node-api.herokuapp.com](https://incubyte-words-node-api.herokuapp.com)
### Simple Get Path :
[https://incubyte-words-node-api.herokuapp.com/words](https://incubyte-words-node-api.herokuapp.com/words)
