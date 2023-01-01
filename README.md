How to run application <br>
- clone the repository <br>
- create .env file <br>
```
NODE_ENV=development
BACKEND_PORT=8000
FRONTEND_PORT=3000
``` 

- create env file in the backend directory containing the atlas connection string <br>
``` 
MONGO_CONNECTION_STING=mongodb+srv://<username>:<password>@<cluster-string>
```

- in the root of directory 
```
make local
``` 

