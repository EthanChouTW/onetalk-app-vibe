import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomTabBarProps {
  currentTab: 'reservation' | 'schedule' | 'members' | 'menu';
  onTabPress: (tab: string) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ currentTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {/* 預約總覽 */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => onTabPress('reservation')}
        >
          <Ionicons 
            name={currentTab === 'reservation' ? 'time' : 'time-outline'} 
            size={20} 
            color={currentTab === 'reservation' ? '#3B82F6' : '#9CA3AF'} 
          />
          <Text style={[
            styles.tabText, 
            { color: currentTab === 'reservation' ? '#3B82F6' : '#9CA3AF' }
          ]}>
            預約總覽
          </Text>
        </TouchableOpacity>

        {/* 班表 */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => onTabPress('schedule')}
        >
          <Ionicons 
            name={currentTab === 'schedule' ? 'calendar' : 'calendar-outline'} 
            size={20} 
            color={currentTab === 'schedule' ? '#3B82F6' : '#9CA3AF'} 
          />
          <Text style={[
            styles.tabText, 
            { color: currentTab === 'schedule' ? '#3B82F6' : '#9CA3AF' }
          ]}>
            班表
          </Text>
        </TouchableOpacity>

        {/* Center Add Button */}
        <TouchableOpacity 
          style={styles.centerButton}
          onPress={() => onTabPress('add')}
        >
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* 會員 */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => onTabPress('members')}
        >
          <Ionicons 
            name={currentTab === 'members' ? 'people' : 'people-outline'} 
            size={20} 
            color={currentTab === 'members' ? '#3B82F6' : '#9CA3AF'} 
          />
          <Text style={[
            styles.tabText, 
            { color: currentTab === 'members' ? '#3B82F6' : '#9CA3AF' }
          ]}>
            會員
          </Text>
        </TouchableOpacity>

        {/* 主選單 */}
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => onTabPress('menu')}
        >
          <Ionicons 
            name={currentTab === 'menu' ? 'grid' : 'grid-outline'} 
            size={20} 
            color={currentTab === 'menu' ? '#3B82F6' : '#9CA3AF'} 
          />
          <Text style={[
            styles.tabText, 
            { color: currentTab === 'menu' ? '#3B82F6' : '#9CA3AF' }
          ]}>
            主選單
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  tabText: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 8,
  },
}); 