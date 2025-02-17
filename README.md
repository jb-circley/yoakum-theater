# Yoakum Grand Theater Website

A modern, responsive movie theater website for Yoakum Grand Theater, providing comprehensive movie information, showtimes, and ticket purchasing functionality with an advanced admin content management system.

## Features

- 🎬 Real-time movie listings and showtimes
- 🎟️ Online ticket booking system
- 📱 Responsive design for all devices
- 🎭 Movie details with trailers
- 👤 Admin dashboard for content management
- 📅 Advanced showtime management
- 📝 Contact form for customer inquiries

## Tech Stack

- Frontend:
  - React with TypeScript
  - Vite for development and building
  - TanStack Query for data fetching
  - Tailwind CSS + shadcn/ui for styling
  - Wouter for routing

- Backend:
  - Node.js with Express
  - TypeScript for type safety
  - In-memory storage (can be extended to use PostgreSQL)

## Prerequisites

- Node.js 20.x or later
- npm 9.x or later

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jb-circley/yoakum-theater.git
cd yoakum-theater
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page components and routing
│   │   ├── lib/          # Utility functions and configurations
│   │   └── hooks/        # Custom React hooks
├── server/                # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage implementation
│   └── index.ts         # Server entry point
└── shared/               # Shared TypeScript types and schemas
    └── schema.ts        # Database schema and types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Admin Panel

The admin panel is accessible at `/admin` and provides the following features:

- Dashboard with key metrics
- Movie management (add/edit/delete movies)
- Showtime management
  - Add new showtimes
  - Edit existing showtimes
  - Delete showtimes
- Coming soon movie management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TanStack Query](https://tanstack.com/query/latest) for data fetching
- [Vite](https://vitejs.dev/) for the amazing developer experience
- [Tailwind CSS](https://tailwindcss.com/) for styling
