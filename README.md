# Description

REST API for Diagram Block. Server should allow for easy manipulation:

<ul>
  <li>
     -Electrical Drawings
  </li>

  <li>
     -Hydraulic Drawings
  </li>

  <li>
    -Mechanical Drawings
  </li>
    <li>    
    -Easy Search by cable, pipe, element, tag name etc.gs
  </li>

</ul>

For now main focus of application is simple creating, delatating, updating (CRUD)
elements with many - to - many relations.

"Under the hood" application is using TypeORM and <a href="http://nestjs.com/" target="blank">NestJS</a>, preferring Domain
driven desing, and Onion Architecure, so there is several layers:

<ul>
  <li>
      Core -Entity(Domain)
  </li>

  <li>
  Infrastructure- Custom Repository with ORM </li>

  <li>
  Infrastructure- Services with Data Transfer Object (DTO)
  </li>

</ul>

For better scaling I am considering to use auto mapper to automatically map
DTO-Entity.

All e2e tests currently are against Database (MySQL), because I would like to be
sure that all operation between database and repository are correct.
Especially Cascade Removing.

Project using .env WHICH ARE NOT INCLUDED IN THIS REPO.

# Running the app

```bash

###### development

$ npm run start

###### watch mode

$ npm run start:dev

###### production mode

$ npm run start:prod
```

# Test

```bash

###### e2e tests

$ npm run test:e2e

```
