# Search and Pagination API Documentation

This document provides comprehensive documentation for the search and pagination endpoints available for all 7 tables in the system.

## Table of Contents
- [Overview](#overview)
- [Common Query Parameters](#common-query-parameters)
- [API Endpoints](#api-endpoints)
  - [Country](#1-country)
  - [State](#2-state)
  - [City](#3-city)
  - [District](#4-district)
  - [Sightseeing](#5-sightseeing)
  - [Hotel](#6-hotel)
  - [TravelType](#7-traveltype)
  - [TravelMode](#8-travelmode)
- [Response Format](#response-format)
- [Examples](#examples)

---

## Overview

All tables support two main query operations:
1. **Pagination** - Get paginated results with filtering, sorting, and includes
2. **Search** - Search for records by specific fields

Base URL: `http://your-api-domain/api`

---

## Common Query Parameters

### Pagination Endpoint Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `page` | number | No | Page number (starts from 1) | `1` |
| `pageSize` | number | No | Number of records per page (max: 100) | `10` |
| `where` | JSON string | No | Filter conditions | `{"name":"India"}` |
| `orderBy` | JSON string | No | Sort order | `{"name":"asc"}` |
| `include` | JSON string | No | Related data to include | `{}` |

### Search Endpoint Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `q` | string | Yes | Search term | `India` |

---

## API Endpoints

### 1. Country

**Table Schema:**
```typescript
{
  id: string (UUID)
  name: string (unique)
  isoCode: string (unique, optional)
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/country/
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `pageSize` - Records per page (default: 10, max: 100)
- `where` - Filter by fields: `{"name":"India"}` or `{"isoCode":"IN"}`
- `orderBy` - Sort: `{"name":"asc"}` or `{"createdAt":"desc"}`

**Example Request:**
```bash
GET /api/country/?page=1&pageSize=10&orderBy={"name":"asc"}
```

#### Search
```
GET /api/country/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/country/search?q=India
```

---

### 2. State

**Table Schema:**
```typescript
{
  id: string (UUID)
  countryId: string
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/state/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"countryId":"uuid"}` or `{"name":"California"}`
- `orderBy` - Sort: `{"name":"asc"}`

**Example Request:**
```bash
GET /api/state/?page=1&pageSize=20&where={"countryId":"550e8400-e29b-41d4-a716-446655440000"}
```

#### Search
```
GET /api/state/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/state/search?q=California
```

---

### 3. City

**Table Schema:**
```typescript
{
  id: string (UUID)
  stateId: string
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/city/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"stateId":"uuid"}` or `{"name":"Mumbai"}`
- `orderBy` - Sort: `{"name":"desc"}`

**Example Request:**
```bash
GET /api/city/?page=1&pageSize=15&where={"stateId":"550e8400-e29b-41d4-a716-446655440000"}&orderBy={"name":"asc"}
```

#### Search
```
GET /api/city/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/city/search?q=Mumbai
```

---

### 4. District

**Table Schema:**
```typescript
{
  id: string (UUID)
  cityId: string
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/district/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"cityId":"uuid"}` or `{"name":"Downtown"}`
- `orderBy` - Sort: `{"name":"asc"}`

**Example Request:**
```bash
GET /api/district/?page=1&pageSize=10&where={"cityId":"550e8400-e29b-41d4-a716-446655440000"}
```

#### Search
```
GET /api/district/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/district/search?q=Downtown
```

**Note:** District endpoints are not yet implemented.

---

### 5. Sightseeing

**Table Schema:**
```typescript
{
  id: string (UUID)
  countryId: string (optional)
  stateId: string (optional)
  cityId: string (optional)
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/sightseeing/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"cityId":"uuid"}`, `{"name":"Taj Mahal"}`, or `{"countryId":"uuid","stateId":"uuid"}`
- `orderBy` - Sort: `{"name":"asc"}` or `{"createdAt":"desc"}`

**Example Request:**
```bash
GET /api/sightseeing/?page=1&pageSize=10&where={"cityId":"550e8400-e29b-41d4-a716-446655440000"}&orderBy={"name":"asc"}
```

#### Search
```
GET /api/sightseeing/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/sightseeing/search?q=Taj%20Mahal
```

---

### 6. Hotel

**Table Schema:**
```typescript
{
  id: string (UUID)
  countryId: string
  stateId: string
  cityId: string
  sightseeingId: string (optional)
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/hotel/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"cityId":"uuid"}`, `{"name":"Grand Hotel"}`, `{"sightseeingId":"uuid"}`
- `orderBy` - Sort: `{"name":"asc"}`

**Example Request:**
```bash
GET /api/hotel/?page=1&pageSize=20&where={"cityId":"550e8400-e29b-41d4-a716-446655440000","sightseeingId":"660e8400-e29b-41d4-a716-446655440000"}
```

#### Search
```
GET /api/hotel/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/hotel/search?q=Grand
```

---

### 7. TravelType

**Table Schema:**
```typescript
{
  id: string (UUID)
  countryId: string
  stateId: string
  cityId: string
  sightseeingId: string (optional)
  name: string
  hotelId: string (optional)
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/traveltype/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"cityId":"uuid"}`, `{"name":"Adventure"}`, `{"hotelId":"uuid"}`
- `orderBy` - Sort: `{"name":"asc"}`

**Example Request:**
```bash
GET /api/traveltype/?page=1&pageSize=10&where={"cityId":"550e8400-e29b-41d4-a716-446655440000"}&orderBy={"name":"asc"}
```

#### Search
```
GET /api/traveltype/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/traveltype/search?q=Adventure
```

---

### 8. TravelMode

**Table Schema:**
```typescript
{
  id: string (UUID)
  countryId: string
  stateId: string
  cityId: string
  sightseeingId: string (optional)
  travelTypeId: string (optional)
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Pagination
```
GET /api/travelmode/
```

**Query Parameters:**
- `page` - Page number
- `pageSize` - Records per page
- `where` - Filter: `{"cityId":"uuid"}`, `{"name":"Bus"}`, `{"travelTypeId":"uuid"}`
- `orderBy` - Sort: `{"name":"asc"}`

**Example Request:**
```bash
GET /api/travelmode/?page=1&pageSize=10&where={"cityId":"550e8400-e29b-41d4-a716-446655440000","travelTypeId":"770e8400-e29b-41d4-a716-446655440000"}
```

#### Search
```
GET /api/travelmode/search
```

**Query Parameters:**
- `q` - Search term (searches in: name field)

**Example Request:**
```bash
GET /api/travelmode/search?q=Bus
```

---

## Response Format

### Pagination Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "createdAt": "2025-11-28T10:00:00.000Z",
      "updatedAt": "2025-11-28T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Search Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Found 5 results for \"search term\"",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "createdAt": "2025-11-28T10:00:00.000Z",
      "updatedAt": "2025-11-28T10:00:00.000Z"
    }
  ]
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Bad Request",
  "error": {
    "details": "Invalid query parameter"
  }
}
```

---

## Examples

### Example 1: Get First Page of Countries
```bash
curl -X GET "http://localhost:3000/api/country/?page=1&pageSize=10"
```

### Example 2: Filter Cities by State
```bash
curl -X GET "http://localhost:3000/api/city/?where=%7B%22stateId%22%3A%22550e8400-e29b-41d4-a716-446655440000%22%7D"
```
*Note: URL encoded JSON: `{"stateId":"550e8400-e29b-41d4-a716-446655440000"}`*

### Example 3: Sort Hotels by Name (Descending)
```bash
curl -X GET "http://localhost:3000/api/hotel/?orderBy=%7B%22name%22%3A%22desc%22%7D"
```
*Note: URL encoded JSON: `{"name":"desc"}`*

### Example 4: Search for Sightseeing
```bash
curl -X GET "http://localhost:3000/api/sightseeing/search?q=Taj%20Mahal"
```

### Example 5: Complex Query - Filter and Sort
```bash
curl -X GET "http://localhost:3000/api/hotel/?page=1&pageSize=20&where=%7B%22cityId%22%3A%22550e8400-e29b-41d4-a716-446655440000%22%7D&orderBy=%7B%22name%22%3A%22asc%22%7D"
```
*Note: Combines pagination, filtering by cityId, and sorting by name*

### Example 6: Filter with Multiple Conditions
```bash
curl -X GET "http://localhost:3000/api/travelmode/?where=%7B%22cityId%22%3A%22550e8400-e29b-41d4-a716-446655440000%22%2C%22travelTypeId%22%3A%22770e8400-e29b-41d4-a716-446655440000%22%7D"
```
*Note: URL encoded JSON: `{"cityId":"550e8400-e29b-41d4-a716-446655440000","travelTypeId":"770e8400-e29b-41d4-a716-446655440000"}`*

---

## Important Notes

1. **URL Encoding**: When passing JSON in query parameters, ensure proper URL encoding
   - Use `%7B` for `{`
   - Use `%7D` for `}`
   - Use `%22` for `"`
   - Use `%3A` for `:`
   - Use `%2C` for `,`

2. **Page Size Limit**: Maximum `pageSize` is 100 records

3. **Search Fields**: Search is configured to search by `name` field for all resources. MySQL search is case-sensitive by default (depends on collation)

4. **Pagination Defaults**: If not specified:
   - `page` defaults to 1
   - `pageSize` defaults to 10

5. **Case Sensitivity**: MySQL search is case-sensitive or case-insensitive depending on your database collation (utf8mb4_general_ci is case-insensitive, utf8mb4_bin is case-sensitive)

6. **Date Filtering**: You can filter by date fields using ISO 8601 format:
   ```
   where={"createdAt":{"gte":"2025-01-01T00:00:00.000Z"}}
   ```

7. **Nested Filtering**: For complex queries, use Prisma's query syntax in the `where` parameter

---

## Testing with Postman

### Pagination Request
1. Method: `GET`
2. URL: `http://localhost:3000/api/country/`
3. Params:
   - `page`: `1`
   - `pageSize`: `10`
   - `orderBy`: `{"name":"asc"}`

### Search Request
1. Method: `GET`
2. URL: `http://localhost:3000/api/country/search`
3. Params:
   - `q`: `India`

---

## Additional Resources

- For creating records, see the POST endpoints documentation
- For updating records, see the PUT endpoints documentation
- For deleting records, see the DELETE endpoints documentation
- For getting a single record by ID, use `GET /api/{resource}/:id`
