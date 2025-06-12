import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActionDropdownProps {
  onNewMember: () => void;
  onImportMembers: () => void;
  onMergeMembers: () => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  onNewMember,
  onImportMembers,
  onMergeMembers
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showDropdown = () => {
    setIsVisible(true);
  };

  const hideDropdown = () => {
    setIsVisible(false);
  };

  const handleMenuPress = (action: () => void) => {
    hideDropdown();
    setTimeout(action, 100);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={showDropdown}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={16} color="white" />
        <Text style={styles.actionButtonText}>動作</Text>
        <Ionicons 
          name={isVisible ? "chevron-up" : "chevron-down"} 
          size={14} 
          color="white" 
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideDropdown}
      >
        <Pressable style={styles.overlay} onPress={hideDropdown}>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleMenuPress(onNewMember)}
                activeOpacity={0.7}
              >
                <View style={styles.itemIconContainer}>
                  <Ionicons name="person-add" size={18} color="#3B82F6" />
                </View>
                <Text style={styles.dropdownItemText}>新增單筆會員</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleMenuPress(onImportMembers)}
                activeOpacity={0.7}
              >
                <View style={styles.itemIconContainer}>
                  <Ionicons name="cloud-upload" size={18} color="#3B82F6" />
                </View>
                <Text style={styles.dropdownItemText}>匯入會員名單</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleMenuPress(onMergeMembers)}
                activeOpacity={0.7}
              >
                <View style={styles.itemIconContainer}>
                  <Ionicons name="git-merge" size={18} color="#3B82F6" />
                </View>
                <Text style={styles.dropdownItemText}>合併會員</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  itemIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
}); 