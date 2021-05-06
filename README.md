## Thinkbots-DCURST Server

//To-do IIC Description

### API Guide :-

#### For Users-SVC :-

- New User Registration :-

          Endpoint :-- [POST] /api/users/register
          Body :-
                    {
                        "firstName": "John",**
                        "lastName": "Smith",
                        "dob":"DD-MM-YYYY",
                        "email":"sample@email.com",**
                        "username":"tushar123",**
                        "password":"password",**
                     }

           (** - means required)

           Response :--

            Success :-

                    {
                        success:" short msg",
                        email:"sample@email.com",
                    }

            Error :-
                    {
                        "error":"error message"
                    }
