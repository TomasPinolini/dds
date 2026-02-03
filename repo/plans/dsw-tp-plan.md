# Plan de desarrollo para TP DSW
Plan breve para definir el alcance, la arquitectura y la ejecución del trabajo práctico con foco en cumplir requisitos técnicos y funcionales.

## 1) Alineación de alcance y requisitos
- Completar la **propuesta** (proposal.md): descripción del negocio, modelo (link/diagrama), alcance mínimo y adicionales.
- Asumir **3–4 integrantes** para calcular: CRUDs simples, CRUDs dependientes, listados y CUU/epics requeridos.
- Objetivo: **aprobación directa** (login + roles, tests, etc.).
- Elegir el **tema** y verificar que permita cubrir requisitos de regularidad y aprobación.

## 2) Arquitectura y stack
- Elegir stack **backend** (JS + framework web + ORM/ODM + DB externa) y **frontend** (framework + biblioteca de UI/CSS).
- Stack acordado: **Node + Express + Prisma + PostgreSQL** (BE) y **React + Vite + Tailwind** (FE).
- Definir la **API** (REST/tRPC/gRPC) y el contrato de datos (modelos/DTOs).
- Diseñar capas: controller/route, service/use-case, repository/DAO, domain/model.

## 3) Diseño funcional
- Listar entidades de negocio y sus relaciones (modelo de dominio/DER/clases).
- Mapear requisitos funcionales a endpoints y pantallas:
  - CRUD simple por integrante.
  - CRUD dependiente por cada 2 integrantes.
  - Listado con filtro + detalle por cada 2 integrantes.
  - CUU/Epics de valor (mínimo 1 por cada 2 integrantes; para aprobación 1 por integrante).
- Definir roles y permisos (al menos 2 niveles).

## 4) Plan de implementación (iterativo)
- **Iteración 1**: Setup repos, CI, lint, envs, estructura por capas, DB y migraciones.
- **Iteración 2**: CRUDs mínimos + listados + detalle + validaciones + manejo de errores.
- **Iteración 3**: CUU/Epics, autenticación/roles, protección de rutas.
- **Iteración 4**: UI/UX refinado, mobile-first + 3 breakpoints, pruebas y documentación.

## 5) Testing y calidad
- Backend: 1 test automatizado por integrante + 1 integración.
- Frontend: 1 test unitario de componente + 1 e2e.
- Buenas prácticas: validación de inputs, manejo de errores, modelos tipados, patrón OO.

## 6) Entregables y gestión
- README con instrucciones de instalación/ejecución.
- Proposal actualizada con links a PRs.
- Documentación API, evidencias de tests, video demo, deploys y credenciales.
- Registro de gestión (Scrum/XP, minutas, tracking en GitHub/GitLab).
- Un **solo repositorio (monorepo)** para FE/BE con scripts claros.

## 7) Checklist rápido
- [ ] Stack definido (FE/BE/DB) y repos.
- [ ] Modelo de dominio y diagrama.
- [ ] Alcance mínimo completo.
- [ ] Login + roles + rutas protegidas.
- [ ] Tests requeridos.
- [ ] Documentación y entregables listos.
