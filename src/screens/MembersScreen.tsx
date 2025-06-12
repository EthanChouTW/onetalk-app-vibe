import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MemberCard } from '../components/MemberCard';
import { FilterBar, FilterOptions } from '../components/FilterBar';
import { BottomTabBar } from '../components/BottomTabBar';
import { ActionDropdown } from '../components/ActionDropdown';
import { sampleMembers } from '../data/members';
import { Member } from '../types';

interface MembersScreenProps {
  navigation?: {
    navigate: (screen: string, params?: any) => void;
  };
}

export const MembersScreen: React.FC<MembersScreenProps> = ({ navigation }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [members] = useState<Member[]>(sampleMembers);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  
  // Filter options state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    lineStatus: 'all',
    sendChannel: 'all',
    tags: []
  });

  // Extract all available tags from members data
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    members.forEach(member => {
      member.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [members]);

  // 模糊搜尋邏輯
  const searchFilteredMembers = useMemo(() => {
    if (!searchText.trim()) {
      return members;
    }

    const searchLower = searchText.toLowerCase().trim();
    
    return members.filter((member) => {
      // 搜尋姓名
      if (member.name.toLowerCase().includes(searchLower)) {
        return true;
      }

      // 搜尋手機號碼
      if (member.phone.includes(searchLower)) {
        return true;
      }

      // 搜尋身分證字號
      if (member.idNumber && member.idNumber.toLowerCase().includes(searchLower)) {
        return true;
      }

      // 搜尋生日 (支援多種格式)
      if (member.birthday) {
        const birthday = member.birthday;
        // 原始格式匹配
        if (birthday.includes(searchLower)) {
          return true;
        }
        
        // 移除分隔符後匹配 (例如: 19900915 匹配 1990/09/15)
        const birthdayNumbers = birthday.replace(/[-\/]/g, '');
        if (birthdayNumbers.includes(searchLower.replace(/[-\/]/g, ''))) {
          return true;
        }

        // 年份匹配
        const year = birthday.split(/[-\/]/)[0];
        if (year && year.includes(searchLower)) {
          return true;
        }
      }

      return false;
    });
  }, [members, searchText]);

  // 過濾器邏輯
  const filteredMembers = useMemo(() => {
    let result = searchFilteredMembers;

    // LINE狀態過濾
    if (filterOptions.lineStatus !== 'all') {
      result = result.filter(member => member.lineStatus === filterOptions.lineStatus);
    }

    // 發送管道過濾 (基於 LINE 連接狀態)
    if (filterOptions.sendChannel !== 'all') {
      result = result.filter(member => member.lineStatus === filterOptions.sendChannel);
    }

    // 標籤過濾
    if (filterOptions.tags.length > 0) {
      result = result.filter(member => {
        if (!member.tags || member.tags.length === 0) return false;
        return filterOptions.tags.some(filterTag => member.tags!.includes(filterTag));
      });
    }

    return result;
  }, [searchFilteredMembers, filterOptions]);

  const handleFilterPress = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    setFilterOptions({
      lineStatus: 'all',
      sendChannel: 'all',
      tags: []
    });
  };

  const handleFilterOptionsChange = (options: FilterOptions) => {
    setFilterOptions(options);
  };

  const handleSearchPress = () => {
    setIsSearchActive(true);
  };

  const handleSearchCancel = () => {
    setIsSearchActive(false);
    setSearchText('');
  };

  const handleSearchClear = () => {
    setSearchText('');
  };

  const handleTabPress = (tab: string) => {
    console.log('Tab pressed:', tab);
    navigation?.navigate(tab);
  };

  const handleMemberPress = (member: Member) => {
    console.log('Member pressed:', member.name);
    navigation?.navigate('MemberDetail', { memberId: member.id });
  };

  const handleViewMemberDetail = (member: Member) => {
    console.log('View member detail:', member.name);
    navigation?.navigate('MemberDetail', { memberId: member.id });
  };

  // Action dropdown handlers
  const handleNewMember = () => {
    navigation?.navigate('AddMember');
  };

  const handleImportMembers = () => {
    Alert.alert('匯入會員', '開啟匯入會員名單功能');
    // navigation?.navigate('ImportMembers');
  };

  const handleMergeMembers = () => {
    Alert.alert('合併會員', '開啟合併會員功能');
    // navigation?.navigate('MergeMembers');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedFilters.length > 0;
  const activeFiltersCount = selectedFilters.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={styles.header}>
        {isSearchActive ? (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="搜尋姓名、生日、手機、身分證字號"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
                placeholderTextColor="#9CA3AF"
                returnKeyType="search"
              />
              {searchText.length > 0 && (
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={handleSearchClear}
                >
                  <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleSearchCancel}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.title}>會員</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={handleSearchPress}
              >
                <Ionicons name="search" size={20} color="#6B7280" />
              </TouchableOpacity>
              <ActionDropdown
                onNewMember={handleNewMember}
                onImportMembers={handleImportMembers}
                onMergeMembers={handleMergeMembers}
              />
            </View>
          </>
        )}
      </View>

      {/* Filter Bar */}
      {!isSearchActive && (
        <FilterBar
          selectedFilters={selectedFilters}
          onFilterPress={handleFilterPress}
          onClearAll={handleClearFilters}
          filterOptions={filterOptions}
          onFilterOptionsChange={handleFilterOptionsChange}
          availableTags={availableTags}
        />
      )}

      {/* Filter Results Info */}
      {(isSearchActive && searchText.trim()) || hasActiveFilters ? (
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {isSearchActive && searchText.trim() ? 
              `搜尋結果：找到 ${filteredMembers.length} 位會員` :
              `篩選結果：找到 ${filteredMembers.length} 位會員`
            }
          </Text>
          {hasActiveFilters && (
            <View style={styles.activeFiltersContainer}>
              <Text style={styles.activeFiltersText}>
                已套用 {activeFiltersCount} 個篩選條件
              </Text>
              <TouchableOpacity onPress={handleClearFilters} style={styles.clearFiltersButton}>
                <Text style={styles.clearFiltersText}>清除全部</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}

      {/* Members List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onPress={() => handleMemberPress(member)}
            onViewDetail={() => handleViewMemberDetail(member)}
          />
        ))}
        
        {/* No Results */}
        {filteredMembers.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={48} color="#D1D5DB" />
            <Text style={styles.noResultsTitle}>
              {isSearchActive && searchText.trim() ? 
                '找不到相關會員' : 
                hasActiveFilters ? '沒有符合條件的會員' : '沒有會員資料'
              }
            </Text>
            <Text style={styles.noResultsSubtitle}>
              {isSearchActive && searchText.trim() ? 
                '請嘗試使用其他關鍵字搜尋' : 
                hasActiveFilters ? '請調整篩選條件或清除篩選' : '請新增會員資料'
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar
        currentTab="members"
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  clearButton: {
    padding: 4,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeFiltersText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  clearFiltersButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  clearFiltersText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
}); 