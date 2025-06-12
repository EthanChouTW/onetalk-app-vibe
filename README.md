# Member CRM App

A React Native Expo app for customer relationship management with Chinese interface, built with TypeScript and NativeWind (Tailwind CSS).

## Features

- **Member Management**: View and manage member profiles with ratings, contact information, and tags
- **Search Functionality**: Search members by name or phone number
- **Member Statistics**: Dashboard showing total members, active members, and high-rated members
- **Contact Actions**: Direct call, SMS, and email functionality
- **Member Details**: Comprehensive member profile with contact history and notes
- **Rating System**: 5-star rating system for member evaluation
- **Chinese Interface**: Full Chinese language support

## Tech Stack

- **React Native** with Expo framework
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **React Navigation** for navigation
- **Expo Vector Icons** for UI icons

## Setup Instructions

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start the development server**:
   ```bash
   yarn start
   ```

3. **Run on different platforms**:
   ```bash
   # iOS Simulator
   yarn ios
   
   # Android Emulator
   yarn android
   
   # Web browser
   yarn web
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── MemberCard.tsx  # Member card component
├── screens/           # App screens
│   ├── MembersScreen.tsx      # Main members list
│   └── MemberDetailScreen.tsx # Member detail view
├── navigation/        # Navigation setup
│   └── AppNavigator.tsx
├── data/             # Sample data
│   └── members.ts    # Member sample data
└── types/            # TypeScript definitions
    └── index.ts

App.tsx              # Main app component
global.css           # Global styles for NativeWind
tailwind.config.js   # Tailwind CSS configuration
metro.config.js      # Metro bundler configuration
```

## Screenshots

The app includes:
- Member list with search functionality
- Member cards with profile photos, ratings, and contact info
- Member detail pages with comprehensive information
- Bottom tab navigation
- Contact action buttons (call, SMS, email)

## Development

This app is designed to match the provided Figma design with:
- Clean, modern UI following the Chinese member management interface
- Blue accent color scheme
- Card-based layout for member information
- Intuitive navigation and user interactions

## Future Enhancements

- Add member creation and editing
- Implement contact history tracking
- Add analytics and reporting
- Push notifications for member activities
- Export functionality for member data 