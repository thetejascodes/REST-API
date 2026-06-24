Module template for creating new feature modules.

Structure:

- module.model.js  — data access / ORM mappings
- module.service.js — business logic
- module.controller.js — HTTP handlers
- module.routes.js — express router wiring
- dto/ — DTOs for request validation (create/update)

Copy files into `src/modules/<your-module>` and adapt names accordingly.