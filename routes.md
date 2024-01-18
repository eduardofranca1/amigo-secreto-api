ROUTE PLANNING:

CRUD = CREATE, READ, UPDATE, DELETE
Soft delete = desabilita o item

- POST /admin/login

- GET /admin/events
- GET /admin/events/:id
- POST /admin/events
- PUT /admin/events/:id
- DELETE /admin/events/:id

- GET /admin/events/:id_event/groups
- GET /admin/events/:id_event/groups/:id
- POST /admin/events/:id_event/s
- PUT /admin/events/:id_event/groups/:id
- DELETE /admin/events/:id_event/groups/:id

- GET /admin/events/:id_event/groups/:id_group/people
- GET /admin/events/:id_event/groups/:id_group/people/:id
- POST /admin/events/:id_event/groups/:id_group/people
- PUT /admin/events/:id_event/groups/:id_group/people/:id
- DELETE /admin/events/:id_event/groups/:id_group/people/:id

- GET /events/:id
- GET /events/:id_event/person?cpf=123
