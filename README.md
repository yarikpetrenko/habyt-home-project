# Habyt Frontend Take-Home Assignment

This is a take-home assignment for frontend developer candidates at Habyt. The assignment aims to assess your ability to implement a filter interface for property listings using React and Next.js.

## Getting Started

First, clone this repository and install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Overview

### Features Implemented

1. **Enhance the Filter UI**: 

   - UI Components from shadcn: Used for improved visual design, better control, and consistency.

   - Classname Utility (cn): Introduced a utility for managing class names efficiently.

   - Server-Side Actions for Filtering: Added actions callable from server components and api routes for better API interaction.

   - Centralized Filtering Hook: Implemented a custom hook to manage filter state in one place.

   - Scoped Component Structure: Used a components folder under the relevant route instead of a global top-level folder.

   - Debounced Filters: Added debounce to some filters to prevent excessive API calls.

   - Query Parameter Handling: Implemented query param validation and restoration after saving filters.

   - Advanced Filtering: Added an option to filter by the number of rooms in an apartment.

2. **Improving User Experience**:

   - SWR for Data Caching: Utilized SWR for efficient data fetching and caching.

   - Data Folder for Hooks: Created a dedicated data folder to house SWR hooks like useListingsQuery for better organization.
  
   - Constants Folder: Created a dedicated folder for shared constants.

   - Pagination Enhancements:

      - Mobile-specific pagination implementation.

      - Dynamic pagination for better UX.

   - Loading States: Implemented loading indicators for both filters and results.

   - Clear No Results Feedback: Added meaningful feedback when no properties match the applied filters.

3. **Additional Features Implemented**

   - Map View Integration: Implemented a map displaying the properties.

   - Sorting Options: Added sorting functionality by price.

   - Suspense and Build Fixes: Ensured the app builds correctly.

   - Refactored Component Structure: Moved logic into smaller sub-components to reduce unnecessary client components.

   - New API Endpoint for Cities: Added an endpoint to fetch city data dynamically.

   - Improved Image Handling: Introduced a styles prop for image handling and optimizations.

   - Zod for Validation: Implemented Zod for stricter query parameter validation within API routes (only for sorting but should be expended to filters as well).

### Notes & Future Improvements

   - Corners were cut for efficiency, but the structure allows for easy future improvements.

   - Tailwind Customization: Did not integrate a text library but text styles can be expanded using Tailwind variables.

   - Filter Validation: Improved validation for applied filters.

   - API Route Enhancements: Query params should ideally be fully validated with Zod.

   - Virtual list for efficitent rendering of listings.
