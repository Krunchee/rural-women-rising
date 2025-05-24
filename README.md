# Rural Women Rising

A lifeline, meeting place, and megaphone for women in rural and regional areas.

This is a [Next.js](https://nextjs.org) project built with TypeScript, Tailwind CSS, and Prisma.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rural-women-rising
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   For quick local development with SQLite:
   ```bash
   echo 'DATABASE_URL="file:./dev.db"' > .env.local
   ```

4. **Set up the database**
   ```bash
   # SQLite database setup
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Docker Development

Run the application with Docker Compose (includes SQLite with persistent storage):

```bash
# Start services
docker-compose up -d

# Initialize database (first time only)
docker-compose exec app npx prisma db push

# View logs
docker-compose logs -f app
```

## 🚀 Deployment

### Coolify Deployment

This application is optimized for deployment on [Coolify](https://coolify.io/).

#### Prerequisites
- Coolify instance running
- Persistent storage for SQLite database

#### Deployment Steps

1. **Create a new application in Coolify**
   - Choose "Docker" as the build pack
   - Set the repository URL
   - Set the branch (usually `main`)

2. **Configure environment variables in Coolify:**
   ```
   NODE_ENV=production
   DATABASE_URL=file:/app/data/production.db
   NEXTAUTH_SECRET=your-super-secret-key-here
   PORT=3000
   NEXT_TELEMETRY_DISABLED=1
   ```

3. **Storage setup:**
   - Configure persistent volume for `/app/data` directory
   - This ensures SQLite database persists across deployments

4. **Deploy:**
   - Coolify will automatically build and deploy using the `Dockerfile`
   - The application will be available on the assigned domain
   - Database schema will be automatically created on first run

#### Health Checks
The application includes a health check endpoint at `/api/health` that verifies:
- Application status
- Database connectivity
- Current timestamp

### Manual Deployment

For manual deployment on any server:

1. **Build the Docker image:**
   ```bash
   docker build -t rural-women-rising .
   ```

2. **Run with environment variables:**
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e DATABASE_URL="file:/app/data/production.db" \
     -e NODE_ENV="production" \
     -v sqlite_data:/app/data \
     --name rural-women-rising \
     rural-women-rising
   ```

3. **Initialize database:**
   ```bash
   docker exec rural-women-rising npx prisma db push
   ```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── about/          # About page
│   │   ├── events/         # Events page
│   │   ├── programs/       # Programs page
│   │   ├── resources/      # Resources page
│   │   ├── stories/        # Stories page
│   │   └── connect/        # Connect page
│   ├── components/         # Reusable React components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions and configurations
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── scripts/               # Deployment and utility scripts
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Local development with Docker
└── coolify.yaml          # Coolify deployment configuration
```

## 🛠️ Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite
- **ORM:** Prisma
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Docker + Coolify

## 📊 Database

The application uses Prisma ORM with the following models:
- **Story:** User stories and testimonials
- **Event:** Workshops, coaching sessions, and networking events
- **Resource:** Toolkits, guides, and templates

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes (development & production)
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:*` - Database management commands

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `NEXTAUTH_SECRET` | Authentication secret | - |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
