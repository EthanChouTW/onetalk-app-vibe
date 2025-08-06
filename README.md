# Member CRM App

A React Native Expo app for customer relationship management with Chinese interface, built with TypeScript and NativeWind (Tailwind CSS).

## Features

- **Member Management**: View and manage member profiles with ratings, contact information, and tags
- **Search Functionality**: Search members by name, birthday, phone number, and ID number with fuzzy search
- **Advanced Filtering**: Filter members by LINE status, send channel, and tags
- **Member Statistics**: Dashboard showing total members, active members, and high-rated members
- **Contact Actions**: Direct call, SMS, and email functionality
- **Member Details**: Comprehensive member profile with contact history, case tracking, and notes
- **Rating System**: 5-star rating system for member evaluation
- **Chinese Interface**: Full Chinese language support
- **Tag Management**: Add, search, and manage member tags
- **Case Tracking**: Track member cases and appointments

## Tech Stack

- **React Native** with Expo framework
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **React Navigation** for navigation
- **Expo Vector Icons** for UI icons

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on different platforms**:
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web browser
   npm run web
   ```

## Package Management

This project uses **npm** as the package manager. Make sure to use npm commands for consistency:

```bash
# Install new packages
npm install <package-name>

# Install dev dependencies
npm install --save-dev <package-name>

# Update packages
npm update

# Remove packages
npm uninstall <package-name>
```

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── MemberCard.tsx      # Member card component
│   ├── FilterBar.tsx       # Advanced filtering component
│   ├── BottomTabBar.tsx    # Bottom navigation
│   └── ActionDropdown.tsx  # Action dropdown menu
├── screens/                # App screens
│   ├── MembersScreen.tsx   # Main members list with search and filters
│   └── MemberDetailScreen.tsx # Member detail view
├── data/                   # Sample data
│   └── members.ts          # Diverse member sample data
└── types/                  # TypeScript definitions
    └── index.ts            # Type definitions

App.tsx                     # Main app component
.gitignore                  # Git ignore file
tailwind.config.js          # Tailwind CSS configuration
metro.config.js             # Metro bundler configuration
```

## Key Features

### Search & Filter
- **Fuzzy Search**: Search by name, birthday (multiple formats), phone, and ID number
- **LINE Status Filter**: Filter by connected/disconnected status
- **Send Channel Filter**: Filter by green light (can send) / gray light (cannot send)
- **Tag Filter**: Advanced tag selection with search and custom tag creation

### Member Management
- **Diverse Sample Data**: 8 unique members with realistic Chinese data
- **Member Details**: Complete profile information with case tracking
- **Tag System**: Flexible tagging with search and management
- **Case Tracking**: Monitor member appointments and treatments

### UI/UX
- **Modern Design**: Clean interface following Figma specifications
- **Responsive Filters**: Modal and dropdown-based filtering
- **Real-time Search**: Instant search results as you type
- **Professional Layout**: Card-based design with consistent styling

## Development

This app is designed to match the provided Figma design with:
- Clean, modern UI following the Chinese member management interface
- Blue accent color scheme with proper filter button states
- Card-based layout for member information
- Advanced search and filtering capabilities
- Intuitive navigation and user interactions

## Future Enhancements

- Add member creation and editing
- Implement contact history tracking
- Add analytics and reporting
- Push notifications for member activities
- Export functionality for member data
- Advanced case tracking features
- Member photo management
- Appointment scheduling system 