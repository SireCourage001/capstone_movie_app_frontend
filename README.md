# Movie Recommendation App - Frontend

This is the frontend of the Movie Recommendation App, built using React and Vite. It communicates with the backend API for authentication and movie search. A MERN stack

## Features
- User registration and login forms
- JWT-based protected dashboard
- Movie search powered by TMDB API
- Responsive design

## Technologies
- React + Vite
- Axios
- React Router
- jwt-decode

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/movie-app-frontend.git
cd movie-recommendation-app-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file
```
VITE_TMDB_API_KEY=your_tmdb_key
```

### 4. Run the frontend
```bash
npm run dev
```

## Deployment
- Deploy to Vercel
- Add `VITE_TMDB_API_KEY` in project settings

## Folder Structure
```
src/
  components/
  pages/
  utils/
  App.jsx
  main.jsx
