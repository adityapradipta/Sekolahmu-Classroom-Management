# Sekolahmu-Classroom-Management

Berikut merupakan keterangan dari take home test ini:

1. backend REST-API ini dibuat pada OS Ubuntu dan menggunakan NodeJS dan Postgres sebagai database nya
2. Terdapat data dummy (seed) yang digunakan untuk test API
3. Asumsi jumlah kolom maksimal 26 (mengacu kepada jumlah huruf alfabet)
4. untuk pengujian masing-masing API, menggunakan aplikasi Insomnia (ubuntu) atau Postman

Berikut langkah-langkah untuk menjalankan program ini:

1. install NodeJs dan Postgres pada komputer
2. lakukan cloning terhadap repository ini dengan script pada terminal:
   ```javascript
   "git clone https://github.com/adityapradipta/Sekolahmu-Classroom-Management.git";
   ```
3. setelah selesai, masuk ke direktori project Sekolahmu-Classroom-Management
4. untuk instalasi package yg dibutuhkan (menggunakan npm) jalankan pada terminal:
   ```javascript
   "npm install";
   ```
5. setelah itu, buka file pada direktori config/config.json. sesuaikan username, password, database, dialect, dan host dengan konfigurasi Postgres di komputer masing-masing

   ```javascript
       {
           "development": {
               "username": "postgres",
               "password": "postgres",
               "database": "sekolahmu",
               "host": "127.0.0.1",
               "dialect": "postgres"
           }
       }

   ```

6. kemudian kembali ke direktori project Sekolahmu-Classroom-Management pada terminal
7. Pastikan postgres pada komputer telah tersambung. lakukan setup database dengan cara:
   ```javascript
   "sequelize db:create"; //membuat database
   "sequelize db:migrate"; //migrasi untuk membuat tabel
   "sequelize db:seed:all"; //seeding data dummy pada tabel2
   ```
8. (opsional) apabila ingin mereset database, lakukan perintah berikut pada terminal:
   ```javascript
   "sequelize db:seed:undo:all";
   "sequelize db:migrate:undo:all";
   "sequelize db:drop";
   ```
   kemudian kembali ke langkah 7 untuk setup ulang
9. untuk menjalankan server/program ini, lakukan perintah berikut pada terminal:
   ```javascript
   "node app.js";
   ```
   atau
   ```javascript
   "npm start";
   ```
10. kemudian, REST-API bisa diuji dengan cara menggunakan program Insomnia/Postman, atau program-program test API lainnya. daftar url API yang bisa diuji dapat dilihat pada dokumentasi di bawah

<br><br>

# REST API DOCUMENTATION

Below are the list of URL that you can use<br>

| NO  | URL              | Method |          Purpose          |
| --- | ---------------- | :----: | :-----------------------: |
| 1   | /login           |  POST  |       Login a user        |
| 2   | /create_class    |  POST  | Create class (admin only) |
| 3   | /check_in        | PATCH  |      Class check in       |
| 4   | /check_out       | PATCH  |      Class check out      |
| 5   | /get_class_list  |  GET   |    Get all class list     |
| 6   | /get_class_by_id |  POST  |  Get class detail by id   |

<br><br>

---

## 1. /login

---

- method: POST
- purpose: Login a user
- req.body: <br>
  ```javascript
      {
          "email": "wahyu@contoh.com",
          "password": "123456",
      }
  ```
- success response: <br>
  - code: 200 <br>
  - content: <br>
  ```javascript
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IndhaHl1IiwiZW1haWwiOiJ3YWh5dUBjb250b2guY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTk2NzE1MTYyfQ.AGqsUIbqm-ZyJqeYEd2eOYvwdC0bhW9rHFoDG8JC00o",
          "data": {
              "id": 1,
              "name": "wahyu",
              "email": "wahyu@contoh.com",
              "role": "admin"
          },
          "message": "Welcome Back wahyu!"
      }
  ```
- error response: <br>

  - code: 401 <br>
  - cause: email is wrong or never registered before
  - content: <br>

  ```javascript
      {
          "message": "Please input registered email"
      }
  ```

  OR

  - code: 401 <br>
  - cause: password is wrong
  - content: <br>

  ```javascript
      {
          "message": "Please input correct password"
      }
  ```

  OR

  - code: 500 <br>
  - content: <br>

  ```javascript
  {
      "err": "..."
  }
  ```

<br><br>

---

## 2. /create_class

---

- method: POST
- purpose: Create a class (admin only)
- request headers: <br>
  ```javascript
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b25vQGNvbnRvaC5jb20iLCJpYXQiOjE1ODgwNTk1OTl9.czlkTrQIkGR3tfLF4AfATex5iCI5MoqhiZNMdQd_eec"
      }
  ```
- req.body: <br>
  ```javascript
      {
          "rows": 1,
          "columns": 5
      }
  ```
- success response: <br>
  - code: 200 <br>
  - content: <br>
  ```javascript
      {
          "message": "Class created"
      }
  ```
- error response: <br>

  - code: 400 <br>
  - cause: value of attributes rows and/or columns is below zero, or attributes columns has value more than 26
  - content: <br>

  ```javascript
      {
          "message": "rows and columns must be more than zero and maximum value of columns is 26"
      }
  ```

  OR

  - code: 401 <br>
  - cause: unauthorized (role of logged in user is not admin)
  - content: <br>

  ```javascript
      {
          "message": "unauthorized",
      }
  ```

  OR

  - code: 401 <br>
  - cause: no token
  - content: <br>

  ```javascript
      {
          "err": {
              "name": "JsonWebTokenError",
              "message": "jwt must be provided"
          }
      }
  ```

  OR

  - code: 500 <br>
  - content: <br>

  ```javascript
  {
      "err": "..."
  }
  ```

<br><br>

---

## 3. /check_in

---

- method: PATCH
- purpose: for check in into a class (for teacher and student)
- request headers: <br>
  ```javascript
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Im55b21hbiIsImVtYWlsIjoibnlvbWFuQGNvbnRvaC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU5NjcxMzE0MX0.7ju2vuhS5Z_YYiHla4BpFHOJGbbQy6NHzlxfJDZiHfc"
      }
  ```
- request body: <br>

```javascript
    {
        "ClassId"   : 2,
        "UserId"    : 5
    }
```

- success response: <br>

  - code: 200 <br>
  - content: <br>
    if loggin user is a student: <br>
    ```javascript
    {
        "class_id": 2,
        "rows": 2,
        "columns": 2,
        "teacher": "out",
        "available_seats": [
            "1b",
            "2A",
            "2B"
        ],
        "occupied_seats": [
            {
            "seat": "1A",
            "student_name": "nyoman"
            }
        ],
        "message": "Hi nyoman, your seat is 1A"
    }
    ```
    if loggin user is a teacher: <br>
    ```javascript
    {
        "class_id": 2,
        "rows": 2,
        "columns": 2,
        "teacher": "in",
        "available_seats": [
            "1b",
            "2A",
            "2B"
        ],
        "occupied_seats": [
            {
            "seat": "1A",
            "student_name": "nyoman"
            }
        ],
        "message": "Teacher check in success!"
    }
    ```
    if loggin user is an admin: <br>
    ```javascript
    {
        "class_id": 2,
        "rows": 2,
        "columns": 2,
        "teacher": "in",
        "available_seats": [
            "1b",
            "2A",
            "2B"
        ],
        "occupied_seats": [
            {
            "seat": "1A",
            "student_name": "nyoman"
            }
        ],
    }
    ```

- error response: <br>

  - code: 400 <br>
  - cause: student already check in
  - content: <br>
    `javascript { "class_id": 2, "rows": 2, "columns": 2, "teacher": "out", "available_seats": [ "1b", "2A", "2B" ], "occupied_seats": [ { "seat": "1A", "student_name": "nyoman" } ], "message": "Hi nyoman, you already check in" }`
    OR

  - code: 400 <br>
  - cause: class is full (for student)
  - content: <br>
    ```javascript
        {
            "class_id": 2,
            "rows": 2,
            "columns": 2,
            "teacher": "out",
            "available_seats": [ ],
            "occupied_seats": [
                {
                "seat": "1A",
                "student_name": "budi"
                },
                {
                "seat": "1B",
                "student_name": "ani"
                },
                {
                "seat": "2A",
                "student_name": "nia"
                },
                {
                "seat": "2B",
                "student_name": "rio"
                }
            ],
            "message": "Hi nyoman, , the class is fully seated"
        }
    ```

  OR

  - code: 400 <br>
  - cause: teacher already login / someone already login as teacher
  - content: <br>
    ```javascript
        {
            "class_id": 2,
            "rows": 2,
            "columns": 2,
            "teacher": "in",
            "available_seats": [ ],
            "occupied_seats": [
                {
                "seat": "1A",
                "student_name": "budi"
                },
                {
                "seat": "1B",
                "student_name": "ani"
                },
                {
                "seat": "2A",
                "student_name": "nia"
                },
                {
                "seat": "2B",
                "student_name": "rio"
                }
            ],
            "message": "teacher already check_in"
        }
    ```

  OR

  - code: 400 <br>
  - cause: no token
  - content: <br>
    ```javascript
        {
            "err": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }
    ```

  OR

  - code: 500 <br>
  - content: <br>
    ```javascript
    {
        "err": "..."
    }
    ```

<br><br>

---

## 4. /check_out

---

- method: PATCH
- purpose: to check out from a class (for teacher and student)
- request headers: <br>
  ```javascript
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Im55b21hbiIsImVtYWlsIjoibnlvbWFuQGNvbnRvaC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU5NjcxMzE0MX0.7ju2vuhS5Z_YYiHla4BpFHOJGbbQy6NHzlxfJDZiHfc"
      }
  ```
- request body: <br>

```javascript
    {
        "ClassId"   : 2,
        "UserId"    : 5
    }
```

- success response: <br>

  - code: 200 <br>
  - content: <br>
    if loggin user is a student: <br>
    ```javascript
    {
        "class_id": 2,
        "rows": 2,
        "columns": 2,
        "teacher": "in",
        "available_seats": [
            "1A",
            "1b",
            "2A",
            "2B"
        ],
        "occupied_seats": [],
        "message": "Hi nyoman, seat 1A is now available for other students"
    }
    ```
    if loggin user is a teacher: <br>
    ```javascript
    {
        "class_id": 2,
        "rows": 2,
        "columns": 2,
        "teacher": "out",
        "available_seats": [
            "1A",
            "1b",
            "2A",
            "2B"
        ],
        "occupied_seats": [],
        "message": "Teacher check out success!"
    }
    ```
    if loggin user is an admin: <br>
    ```javascript
    {
        "class_id": 2,
        "rows": 2,
        "columns": 2,
        "teacher": "in",
        "available_seats": [
            "1b",
            "2A",
            "2B"
        ],
        "occupied_seats": [
            {
            "seat": "1A",
            "student_name": "nyoman"
            }
        ],
    }
    ```

- error response: <br>

  - code: 400 <br>
  - cause: student already check out / student is not booked in the class
  - content: <br>
    `javascript { "class_id": 2, "rows": 2, "columns": 2, "teacher": "out", "available_seats": [ "1A", "1b", "2A", "2B" ], "occupied_seats": [], "message": "Hi nyoman, you are not in this class" }`
    OR

  - code: 400 <br>
  - cause: teacher already check out / no teacher in the class
  - content: <br>
    ```javascript
        {
            "class_id": 2,
            "rows": 2,
            "columns": 2,
            "teacher": "out",
            "available_seats": [
                "1A",
                "1b",
                "2A",
                "2B"
            ],
            "occupied_seats": [],
            "message": "class is already have no teacher"
        }
    ```

  OR

  - code: 400 <br>
  - cause: no token
  - content: <br>
    ```javascript
        {
            "err": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }
    ```

  OR

  - code: 500 <br>
  - content: <br>
    ```javascript
    {
        "err": "..."
    }
    ```

<br><br>

---

## 5. /get_class_list

---

- method: GET
- purpose: get all class information
- request headers: <br>
  ```javascript
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Im55b21hbiIsImVtYWlsIjoibnlvbWFuQGNvbnRvaC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU5NjcxMzE0MX0.7ju2vuhS5Z_YYiHla4BpFHOJGbbQy6NHzlxfJDZiHfc"
      }
  ```
- success response: <br>

  - code: 200 <br>
  - content: <br>
    ```javascript
    {
        "data": [
            {
                "class_id": 1,
                "rows": 2,
                "columns": 3,
                "teacher": "in",
                "available_seats": [
                    "1A",
                    "1B",
                    "1C",
                    "2A",
                    "2B",
                    "2C"
                ],
                "occupied_seats": []
            },
            {
                "class_id": 3,
                "rows": 4,
                "columns": 3,
                "teacher": "out",
                "available_seats": [
                    "1A",
                    "1B",
                    "1C",
                    "2A",
                    "2B",
                    "2C",
                    "3A",
                    "3B",
                    "3C",
                    "4A",
                    "4B",
                    "4C"
                ],
                "occupied_seats": []
            },
            {
                "class_id": 4,
                "rows": 1,
                "columns": 5,
                "teacher": "out",
                "available_seats": [
                    "1A",
                    "1B",
                    "1C",
                    "1D",
                    "1E"
                ],
                "occupied_seats": []
            },
            {
                "class_id": 2,
                "rows": 2,
                "columns": 2,
                "teacher": "out",
                "available_seats": [
                    "1A",
                    "1b",
                    "2A",
                    "2B"
                ],
                "occupied_seats": []
            }
        ]
    }
    ```

- error response: <br>

  - code: 400 <br>
  - cause: no token
  - content: <br>
    ```javascript
        {
            "err": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }
    ```

  OR

  - code: 500 <br>
  - content: <br>
    ```javascript
    {
        "err": "..."
    }
    ```

<br><br>

---

## 6. /get_class_by_id

---

- method: POST
- purpose: get class information based on id
- request headers: <br>
  ```javascript
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6Im55b21hbiIsImVtYWlsIjoibnlvbWFuQGNvbnRvaC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTU5NjcxMzE0MX0.7ju2vuhS5Z_YYiHla4BpFHOJGbbQy6NHzlxfJDZiHfc"
      }
  ```
- request body: <br>
  ```javascript
      {
          "ClassId": 1
      }
  ```
- success response: <br>

  - code: 200 <br>
  - content: <br>
    ```javascript
    {
        "class_id": 1,
        "rows": 2,
        "columns": 3,
        "teacher": "in",
        "available_seats": [
            "1A",
            "1B",
            "1C",
            "2A",
            "2B",
            "2C"
        ],
        "occupied_seats": []
    }
    ```

- error response: <br>

  - code: 400 <br>
  - cause: no token
  - content: <br>
    ```javascript
        {
            "err": {
                "name": "JsonWebTokenError",
                "message": "jwt must be provided"
            }
        }
    ```

  OR

  - code: 500 <br>
  - content: <br>
    ```javascript
    {
        "err": "..."
    }
    ```

<br><br>
