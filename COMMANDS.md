# Quick Commands Reference

## Development
npm run dev                    # Start API + Monitor (port 3000)
npm run dev:full               # Start API + DB Designer + Monitor + Prisma
npm run dev:server             # Start API server only
npm run dev:monitor            # Start error monitor only
npm run dev:db-designer        # Start DB Designer only (port 3001)

## Build & Production
npm run build                  # Build TypeScript to JavaScript
npm start                      # Start production server

## Database (Prisma)
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate         # Create and apply migration
npm run prisma:studio          # Open Prisma Studio (DB GUI)
npm run prisma:push            # Push schema changes without migration
npm run prisma:reset           # Reset database (WARNING: deletes all data)

## Module Generation
npm run generate               # Interactive module generator
npm run generate:module <name> # Generate a specific module
npm run generate:ai            # Generate AI tests/docs

## Adapter Management (Install integrations)
npm run adapter                # Show adapter help
npm run adapter:list           # List all available adapters
npm run adapter:install <name> # Install an adapter (storage, email, etc.)
npm run adapter:auth           # List authentication adapters
npm run adapter:auth:install <name> # Install auth adapter (OAuth, OTP, etc.)

## Testing
npm test                       # Run all tests
npm run test:watch             # Run tests in watch mode
npm run test:coverage          # Run tests with coverage report

## Code Quality
npm run lint                   # Run ESLint
npm run format                 # Format code with Prettier

## Services Configuration
npm run services:config        # View current services configuration
