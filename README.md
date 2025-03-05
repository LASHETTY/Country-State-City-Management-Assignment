
# Geographic Entity Manager

## Project Overview

This is a hierarchical management system for geographic entities (Countries, States, and Cities). The application allows users to create, read, update, and delete geographic entities in a nested structure.

**URL**: https://country-state-city-management-assignment.vercel.app

## Features

- **Country Management**: Add, edit, and delete countries
- **State Management**: For each country, add, edit, and delete states
- **City Management**: For each state, add, edit, and delete cities
- **Hierarchical Structure**: Navigate through the entity hierarchy with breadcrumbs
- **Confirmation Dialogs**: Ensure users confirm before making destructive changes
- **Responsive Design**: Works on various screen sizes

## Technologies Used

This project is built with modern web technologies:

- **React**: UI component library
- **TypeScript**: For type-safe code
- **Vite**: Fast build tool and development server
- **shadcn/ui**: Component library for consistent UI
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: For navigation
- **React Query**: For data management

## How to Use the Application

1. **Managing Countries**:
   - View the list of countries on the main page
   - Add a new country using the "Add Country" button
   - Edit or delete a country using the respective buttons
   - Click on a country to view its states

2. **Managing States**:
   - After selecting a country, view its states
   - Add, edit, or delete states
   - Click on a state to view its cities
   - Use the breadcrumb to navigate back to countries

3. **Managing Cities**:
   - After selecting a state, view its cities
   - Add, edit, or delete cities
   - Use the breadcrumb to navigate back to states or countries

### Use your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <CountryStateCityManagementAssignment>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a file directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Project Structure

- `src/pages`: Main application pages
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks for state management
- `src/lib`: Type definitions and utility functions
