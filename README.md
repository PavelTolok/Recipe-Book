# Recipe Book

A full-stack application built with Node.js (Express), React, and TypeScript, providing a recipe browsing experience using the [TheMealDB API](https://www.themealdb.com/api.php). The application allows users to browse recipes with filtering by ingredient, country, or category, and view detailed recipe information with interactive navigation.

## Project Overview

The Recipe Book application consists of two main parts:
- **Backend**: A Node.js/Express server with TypeScript that proxies requests to TheMealDB API, providing endpoints for listing recipes and fetching recipe details.
- **Frontend**: A React application with TypeScript that displays a list of recipes, supports filtering, and shows detailed recipe information with interactive links.

## Features

- **Recipe List Page**:
  - Displays a list of recipes fetched in real-time from the backend.
  - Supports filtering by ingredient, country, or category (one filter at a time).
  - Each recipe is clickable, navigating to the Recipe Info Page.
  - Responsive grid layout for mobile, tablet, and desktop.
- **Recipe Info Page**:
  - Shows detailed recipe information, including image, name, country, instructions, and ingredients.
  - Country is clickable, navigating to the Recipe List Page filtered by country.
  - Ingredients are clickable, navigating to the Recipe List Page filtered by ingredient.
  - A right sidebar displays recipes from the same category, clickable to view their details.
- **Styling**:
  - Uses Tailwind CSS for a modern, responsive, and user-friendly UI.
  - Includes hover effects, shadows, and adaptive layouts.
- **Code Quality**:
  - ESLint and Prettier ensure consistent code formatting.
  - TypeScript provides type safety for both backend and frontend.
- **Environment Variables**:
  - Configured via `.env` files for secure and flexible setup.

## Project Structure

- `backend/`: Express backend with TypeScript, handling API requests to TheMealDB.
- `frontend/`: React frontend with TypeScript, rendering the UI and interacting with the backend.
- `.env.example` files in both folders provide templates for environment variables.

## Prerequisites

- **Node.js**: Version 16 or higher.
- **npm**: Version 8 or higher.
- A modern web browser (e.g., Chrome, Firefox) for testing the frontend.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd recipe-book
