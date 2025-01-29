# NestJS, Sequelize + Postgres, JWT, , Class-validator, Multer, Custom Decorators, Guards, Interceptors, Pipes, Roles, Swagger, Docker.

## Functionality:

- User registration and login
- Guarded routes for authenticated users (JWT)
- Guarded routes for users with specific roles (custom decorator)
- Data validation with class-validator and custom pipes
- File upload with multer
- Example of Swagger documentation for API
- Custom guards, interceptors, decorators, and pipes
- Setup migrations
- Setup Docker

### DB Relations:

- Many-to-many relations between `UsersModel` and `RolesModel`
- One-to-many relations between `UsersModel` and `PostsModel`
