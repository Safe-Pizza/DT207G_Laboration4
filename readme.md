# Laboration 4 - Autentisering & säkerhet REST API
Detta är en laboration i _Webbutveckingsprogrammet_ på Mittuniveristetet.

Repot innehåller kod för ett enkelt REST API som är byggt med express.
APIet är byggt för att lägga till och lagra användare samt logga in användare. Lösenord hashas vid registrering.
CRUD är implementerat dock utan update i nuläget.

## Redovsning
[Webbtjänst]()

## Databas
APIet använder MongoDb som databas med Mongoose.


| Collection  | Field        |
| ----------- | ----------- |
| users         | **_id**(ObjectID), **username**(TEXT), **password**(TEXT), **user_created**(TIMESTAMP)      |

## Användning
Tabellen nedan beskriver olika sätt att nå APIet.

| Metod      | Endpoint | Beskrivning  |
| ----------- | ----------- | ----------- |
| GET      | /users       |  Hämtar alla användare, kräver inloggad användare (token)  |
| POST      | /register       |  Skapar ny användare. Kräver att user-objekt skickas med.  |
| POST   | /login      | Loggar in registrerad användare och returnerar token. Kräver att user-objekt skickas med. |
| DELETE      | /users/:username      | Raderar användare, kräver inloggad användare (token)  |

Ett user-objekt returneras som JSON med nedan struktur:
```json
{
  "_id": "69f9b4c3dd3a7e7fde7e5965",
  "username": "username",
  "password": "passwordhashstring",
  "user_created": "2026-05-05T09:13:39.171+00:00",
  "__v": 0
}
```

Ett user-objekt skickas som JSON med nedan struktur:
```json
{
  "username": "username",
  "password": "password"
}
```

## Kontakt
 Vill du komma i kontakt med mig?


**Hanna Lindkvist** \
✉️ [hali2507@student.miun.se](mailto:hali2507@student.miun.se)
