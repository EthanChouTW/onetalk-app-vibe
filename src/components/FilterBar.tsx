import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface FilterOptions {
  lineStatus: 'all' | 'connected' | 'disconnected';
  sendChannel: 'all' | 'connected' | 'disconnected';  // 基於 LINE 連接狀態
  tags: string[];
}

interface FilterBarProps {
  selectedFilters: string[];
  onFilterPress: (filter: string) => void;
  onClearAll: () => void;
  filterOptions: FilterOptions;
  onFilterOptionsChange: (options: FilterOptions) => void;
  availableTags: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedFilters, 
  onFilterPress, 
  onClearAll,
  filterOptions,
  onFilterOptionsChange,
  availableTags
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [tagSearchText, setTagSearchText] = useState('');

  const filters = [
    { 
      id: 'line_status', 
      label: 'LINE狀態', 
      icon: 'ellipse' as const,
      selectedBgColor: '#10B981',
      selectedTextColor: '#FFFFFF'
    },
    { 
      id: 'send_channel', 
      label: '發送管道', 
      icon: 'alert' as const,
      selectedBgColor: '#F59E0B',
      selectedTextColor: '#FFFFFF'
    },
    { 
      id: 'tags', 
      label: '標籤', 
      icon: 'pricetag' as const,
      selectedBgColor: '#EF4444',
      selectedTextColor: '#FFFFFF'
    },
  ];

  const lineStatusOptions = [
    { value: 'all', label: '全部' },
    { value: 'connected', label: '已連接' },
    { value: 'disconnected', label: '未連接' }
  ];

  const sendChannelOptions = [
    { value: 'all', label: '全部' },
    { value: 'connected', label: '綠燈 (可發送)' },
    { value: 'disconnected', label: '灰燈 (無法發送)' }
  ];

  const handleFilterPress = (filterId: string) => {
    console.log('Filter pressed:', filterId);
    
    if (filterId === 'tags') {
      setTagModalVisible(true);
      setActiveDropdown(null); // Close any open dropdown
    } else {
      // Toggle dropdown
      setActiveDropdown(activeDropdown === filterId ? null : filterId);
    }
  };

  const handleBackgroundPress = () => {
    setActiveDropdown(null);
  };

  const handleLineStatusSelect = (value: 'all' | 'connected' | 'disconnected') => {
    console.log('Line status selected:', value);
    onFilterOptionsChange({
      ...filterOptions,
      lineStatus: value
    });
    
    if (value === 'all') {
      if (selectedFilters.includes('line_status')) {
        onFilterPress('line_status'); // Remove from selected filters
      }
    } else {
      if (!selectedFilters.includes('line_status')) {
        onFilterPress('line_status'); // Add to selected filters
      }
    }
    setActiveDropdown(null);
  };

  const handleSendChannelSelect = (value: 'all' | 'connected' | 'disconnected') => {
    console.log('Send channel selected:', value);
    onFilterOptionsChange({
      ...filterOptions,
      sendChannel: value
    });
    
    if (value === 'all') {
      if (selectedFilters.includes('send_channel')) {
        onFilterPress('send_channel'); // Remove from selected filters
      }
    } else {
      if (!selectedFilters.includes('send_channel')) {
        onFilterPress('send_channel'); // Add to selected filters
      }
    }
    setActiveDropdown(null);
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filterOptions.tags;
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onFilterOptionsChange({
      ...filterOptions,
      tags: updatedTags
    });

    // Update selected filters
    if (updatedTags.length === 0) {
      if (selectedFilters.includes('tags')) {
        onFilterPress('tags'); // Remove from selected filters
      }
    } else {
      if (!selectedFilters.includes('tags')) {
        onFilterPress('tags'); // Add to selected filters
      }
    }
  };

  const handleAddCustomTag = () => {
    if (tagSearchText.trim() && !availableTags.includes(tagSearchText.trim())) {
      handleTagToggle(tagSearchText.trim());
      setTagSearchText('');
    }
  };

  const filteredAvailableTags = availableTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchText.toLowerCase())
  );

  const getFilterDisplayText = (filterId: string) => {
    switch (filterId) {
      case 'line_status':
        const lineStatus = lineStatusOptions.find(opt => opt.value === filterOptions.lineStatus);
        return lineStatus?.value === 'all' ? 'LINE狀態' : lineStatus?.label;
      case 'send_channel':
        const sendChannel = sendChannelOptions.find(opt => opt.value === filterOptions.sendChannel);
        return sendChannel?.value === 'all' ? '發送管道' : sendChannel?.label;
      case 'tags':
        return filterOptions.tags.length > 0 ? `標籤 (${filterOptions.tags.length})` : '標籤';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id);
          const isDropdownOpen = activeDropdown === filter.id;
          
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                isSelected && {
                  backgroundColor: filter.selectedBgColor,
                },
                isDropdownOpen && styles.filterButtonOpen
              ]}
              onPress={() => handleFilterPress(filter.id)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={filter.icon} 
                size={14} 
                color={isSelected ? filter.selectedTextColor : '#6B7280'} 
              />
              <Text style={[
                styles.filterText, 
                { color: isSelected ? filter.selectedTextColor : '#6B7280' }
              ]}>
                {getFilterDisplayText(filter.id)}
              </Text>
              <Ionicons 
                name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
                size={14} 
                color={isSelected ? filter.selectedTextColor : '#6B7280'} 
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      <TouchableOpacity style={styles.selectButton} onPress={onClearAll}>
        <Text style={styles.selectButtonText}>選取</Text>
      </TouchableOpacity>

      {/* Dropdown Modal for LINE Status */}
      <Modal
        visible={activeDropdown === 'line_status'}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <View style={styles.dropdownOverlay}>
            <View style={styles.dropdownModal}>
              <Text style={styles.dropdownTitle}>LINE狀態</Text>
              {lineStatusOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownModalItem,
                    filterOptions.lineStatus === option.value && styles.dropdownModalItemSelected,
                    index === lineStatusOptions.length - 1 && styles.dropdownModalItemLast
                  ]}
                  onPress={() => handleLineStatusSelect(option.value as any)}
                >
                  <Text style={[
                    styles.dropdownModalItemText,
                    filterOptions.lineStatus === option.value && styles.dropdownModalItemTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {filterOptions.lineStatus === option.value && (
                    <Ionicons name="checkmark" size={20} color="#2563EB" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Dropdown Modal for Send Channel */}
      <Modal
        visible={activeDropdown === 'send_channel'}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <View style={styles.dropdownOverlay}>
            <View style={styles.dropdownModal}>
              <Text style={styles.dropdownTitle}>發送管道</Text>
              {sendChannelOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownModalItem,
                    filterOptions.sendChannel === option.value && styles.dropdownModalItemSelected,
                    index === sendChannelOptions.length - 1 && styles.dropdownModalItemLast
                  ]}
                  onPress={() => handleSendChannelSelect(option.value as any)}
                >
                  <Text style={[
                    styles.dropdownModalItemText,
                    filterOptions.sendChannel === option.value && styles.dropdownModalItemTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {filterOptions.sendChannel === option.value && (
                    <Ionicons name="checkmark" size={20} color="#2563EB" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Tags Modal */}
      <Modal
        visible={tagModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setTagModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setTagModalVisible(false)}>
              <Text style={styles.modalCancelText}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>選擇標籤</Text>
            <TouchableOpacity onPress={() => setTagModalVisible(false)}>
              <Text style={styles.modalDoneText}>完成</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="搜尋或新增標籤"
                value={tagSearchText}
                onChangeText={setTagSearchText}
                placeholderTextColor="#9CA3AF"
                onSubmitEditing={handleAddCustomTag}
              />
              {tagSearchText.length > 0 && (
                <TouchableOpacity onPress={handleAddCustomTag} style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#2563EB" />
                </TouchableOpacity>
              )}
            </View>

            {/* Selected Tags */}
            {filterOptions.tags.length > 0 && (
              <View style={styles.selectedTagsSection}>
                <Text style={styles.sectionTitle}>已選擇的標籤</Text>
                <View style={styles.tagsGrid}>
                  {filterOptions.tags.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={styles.selectedTag}
                      onPress={() => handleTagToggle(tag)}
                    >
                      <Text style={styles.selectedTagText}>{tag}</Text>
                      <Ionicons name="close" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Available Tags */}
            <View style={styles.availableTagsSection}>
              <Text style={styles.sectionTitle}>可用標籤</Text>
              <View style={styles.tagsGrid}>
                {filteredAvailableTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.availableTag,
                      filterOptions.tags.includes(tag) && styles.availableTagSelected
                    ]}
                    onPress={() => handleTagToggle(tag)}
                  >
                    <Text style={[
                      styles.availableTagText,
                      filterOptions.tags.includes(tag) && styles.availableTagTextSelected
                    ]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonOpen: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  selectButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: 200,
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    margin: 20,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownModalItemSelected: {
    backgroundColor: '#F8FAFC',
  },
  dropdownModalItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdownModalItemText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownModalItemTextSelected: {
    color: '#2563EB',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalDoneText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  addButton: {
    padding: 4,
  },
  selectedTagsSection: {
    marginBottom: 24,
  },
  availableTagsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  selectedTagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  availableTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  availableTagSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  availableTagText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  availableTagTextSelected: {
    color: '#2563EB',
  },
}); 