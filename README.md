# Frontend Mentor - Weather App

This is my solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). The project is a responsive weather dashboard built with React, TypeScript, and Vite, powered by the Open-Meteo forecast and geocoding APIs.

## Overview

My solution to this challenge lets users search for a city, inspect current conditions, browse a 7-day forecast, and review hourly temperatures for each day. It also supports both preset and custom unit switching for temperature, wind speed, and precipitation.

### Features

- Search for cities with debounced API requests
- Navigate search results with keyboard controls
- View current weather for the selected location
- See feels like temperature, humidity, wind speed, and precipitation
- Browse a 7-day forecast with highs, lows, and icons
- Switch between forecast days in the hourly panel
- Use metric or imperial presets
- Customize temperature, wind, and precipitation units independently
- See loading, empty, and error states
- Use the app across desktop and mobile layouts

### Screenshot

![Tschikish-Weather preview](./preview.jpg)

### Links

- Repository URL: `Add your GitHub repository URL here`
- Solution URL: `Add your Frontend Mentor solution URL here`
- Live Site URL: `Add your deployed site URL here`

## Built With

- React 19
- TypeScript
- Vite
- TanStack Query
- CSS custom properties
- Flexbox
- CSS Grid
- Open-Meteo Forecast API
- Open-Meteo Geocoding API

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  api/          API clients and request helpers
  components/   Reusable weather UI components
  hooks/        Query and debounce hooks
  styles/       Global, layout, and component styles
  types/        Shared TypeScript types
  utils/        Unit conversion and weather formatting helpers
```

## API Notes

This project uses Open-Meteo and does not require an API key for standard personal usage.

- Forecast API: `https://api.open-meteo.com/v1/forecast`
- Geocoding API: `https://geocoding-api.open-meteo.com/v1/search`

The app defaults to Belgrade, Serbia on first load.

## What I Learned

- Breaking the UI into focused components made the app easier to evolve without turning the render logic into one large file.
- TanStack Query simplified request caching, loading states, retries, and async coordination for both city search and weather data.
- Separating unit conversion logic into utilities made it much easier to support both presets and custom per-measurement settings.
- Search feels much better when debounce, keyboard navigation, and explicit empty and loading states are treated as first-class behavior instead of extras.


## Author

- Frontend Mentor - [@Tschikish](https://www.frontendmentor.io/profile/Tschikish)
- GitHub - [@Tschikish](https://github.com/Tschikish)
- Name - Pavlovic Milutin