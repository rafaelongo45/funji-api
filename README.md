
## This app utilizes the kanjiapi
- Link: https://kanjiapi.dev/

## :rocket: Routes

```yml
POST /signup
    - Route to create a new user
    - headers: {}
    - body:{
        "username": "lorem ipsum",
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "confirmPassword": "loremIpsum"",
        "profileImage": "https://lorem.ipsum.com/img",
}
```
    
```yml 
POST /signin
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsum"
    }
```
    
```yml 
GET /kanjis/all
    - Route to list all kanjis on the API
    - body: {}
```

```yml
GET /kanjis/:collection
    - Route to list all kanjis from a collection
    - body: {}
``` 

```yml
GET /kanji/:kanji
    - Route to get informations from specified kanji
    - body: {}
```
 
```yml
GET /user/:username/kanjis
    - Route to get informations from a user with his saved kanjis
    - body: {}
```

```yml
GET /user/kanjis
    - Route to get informations from a user with his saved kanjis using his validation token
    - body: {}
    - headers: { "Authorization": "Bearer $token" }
```

```yml
GET /user/kanjis (authenticated)
    - Route to get informations from a user with his saved kanjis using his validation token
    - body: {}
    - headers: { "Authorization": "Bearer $token" }
```

```yml
GET /user/:username
    - Route to get informations from a user without his kanjis
    - body: {}
```

```yml
GET /users/:part-of-username
    - Route to get informations from a user without his kanjis sending only part of his username
    - body: {}
```

```yml
POST /kanji (authenticated)
    - Route to insert a kanji for a user using his token
    - headers: { "Authorization": "Bearer $token" }
    - body: {
     "kanji": "kanji",
     "grade": "kanji-grade"
    }
```

```yml
POST /user/edit (authenticated)
    - Route to edit a user's profile image
    - headers: { "Authorization": "Bearer $token" }
    - body: {
     "profileImage": "https://lorem.ipsum.com/img"
    }
```

***
