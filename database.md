DATABASE:

tables

- EVENTOS
- GRUPOS
- PESSOAS

events:

- id INT PK AUTO_INCREMENT
- status BOOLEAN default = false
- title VARCHAR
- description VARCHAR
- grouped BOOLEAN default = false

eventGroup:

- id INT PK AUTO_INCREMENT
- id_event INT FK (relacionado a events.id)
- name VARCHAR

eventPeople:

- id INT PK AUTO_INCREMENT
- id_event INT FK (relacionado a events.id)
- id_group INT FK (relacionado a eventsGroups.id)
- name VARCHAR
- cpf VARCHAR
- matched VARCHAR default = "" (empty)
