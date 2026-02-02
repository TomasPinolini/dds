# Propuesta TP DSW (comodín)

> Documento de trabajo para adaptar cuando se defina el negocio real.

## Grupo
### Integrantes
* legajo - Apellido(s), Nombre(s)
* legajo - Apellido(s), Nombre(s)
* legajo - Apellido(s), Nombre(s)

### Repositorios
* [fullstack app - monorepo](http://hyperlinkToGihubOrGitlab)

## Tema
### Descripción
Sistema web para **gestión de turnos y atención** en un negocio de servicios (salud, estética, talleres, etc.).
Permite administrar recursos, clientes y turnos, con estados y roles de acceso.
Dominio **reemplazable**: se puede adaptar a reservas, inventario o ventas sin cambiar la estructura.

### Modelo
Ver diagrama en: `model-comodin.md`

## Alcance Funcional

### Alcance Mínimo
*Nota*: ajustar cantidades según cantidad real de integrantes.

Regularidad (base para 3 integrantes):
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Cliente<br>2. CRUD Recurso<br>3. CRUD Servicio|
|CRUD dependiente|1. CRUD Turno {depende de} Cliente + Recurso + Servicio|
|Listado<br>+<br>detalle|1. Listado de turnos filtrado por fecha/estado => detalle muestra datos del turno, cliente, recurso y servicio|
|CUU/Epic|1. Reservar un turno (creación + validaciones de disponibilidad)<br>2. Reprogramar/cancelar un turno (cambio de estado)|

### Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario/Rol<br>2. CRUD Cliente<br>3. CRUD Recurso<br>4. CRUD Servicio<br>5. CRUD Turno|
|CUU/Epic|1. Confirmar turno con notificación<br>2. Registrar atención (cierre del turno + observaciones)|

### Alcance Adicional Voluntario
|Req|Detalle|
|:-|:-|
|Listados |1. Turnos del día filtrado por fecha/estado muestra cliente, recurso y servicio<br>2. Turnos por cliente muestra historial y estados|
|CUU/Epic|1. Lista de espera automática cuando no hay disponibilidad|
|Otros|1. Envío de recordatorio de turno por email/whatsapp|
