# Express JS Learning

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kishan-codebuddy/expresstut
   cd expresstut
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Change MongoDB URL**:
   - Update the MongoDB connection string in `schema.prisma` to point to your MongoDB instance.

5. **Check Docker Configuration**:
   - Review the `Dockerfile` and `docker-compose.yml` files to ensure all details are correct and update them if necessary.

6. **Generate MongoDB Keyfile** (if using MongoDB on a local system):
   - You will need to generate a MongoDB keyfile for creating a replica set. You can find instructions on how to generate this key file online.

7. **Using Docker**:
   - To run the application using Docker, execute:
   ```bash
   docker-compose up --build
   ```

## Route Details

### Author Routes

- **Create Author**: `POST /authors`
  - Request Body: `{ name, bio, birthDate }`
  - Response: Created author object.

- **Read All Authors**: `GET /authors`
  - Response: Array of author objects.

- **Read Single Author**: `GET /authors/:id`
  - Response: Array of books related to the author.

- **Update Author**: `PUT /authors/:id`
  - Request Body: `{ name, bio, birthDate }`
  - Response: Updated author object.

- **Delete Author**: `DELETE /authors/:id`
  - Response: Confirmation message.

### Book Routes

- **Create Book**: `POST /books`
  - Request Body: `{ title, summary, publishedDate, pages, authorId, genres }`
  - Response: Created book object.

- **Read All Books**: `GET /books`
  - Response: Array of book objects with author information and genres.

- **Read Single Book**: `GET /books/:id`
  - Response: Book object with author and genre details.

- **Update Book**: `PUT /books/:id`
  - Request Body: `{ title, summary, publishedDate, pages, authorId, genres }`
  - Response: Updated book object.

- **Delete Book**: `DELETE /books/:id`
  - Response: Confirmation message.
