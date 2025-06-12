import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MembersScreen } from './src/screens/MembersScreen';
import { AddMemberScreen } from './src/screens/AddMemberScreen';
import { MemberDetailScreen } from './src/screens/MemberDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Members');
  const [screenParams, setScreenParams] = useState<any>(null);

  // Mock navigation object for screen navigation
  const mockNavigation = {
    navigate: (screen: string, params?: any) => {
      console.log('Navigate to:', screen, params);
      setCurrentScreen(screen);
      setScreenParams(params);
    },
    goBack: () => {
      console.log('Go back');
      setCurrentScreen('Members');
      setScreenParams(null);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'AddMember':
        return <AddMemberScreen navigation={mockNavigation} />;
      case 'MemberDetail':
        return (
          <MemberDetailScreen 
            navigation={mockNavigation} 
            memberId={screenParams?.memberId}
          />
        );
      case 'Members':
      default:
        return <MembersScreen navigation={mockNavigation} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
}); 