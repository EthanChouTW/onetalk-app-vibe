import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onPress: () => void;
  onViewDetail?: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onPress, onViewDetail }) => {
  const formatBirthday = (birthday: string) => {
    const date = new Date(birthday);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/-/g, '');
  };

  const getInitial = (name: string) => {
    return name.charAt(0);
  };

  const getLineStatusColor = () => {
    return member.lineStatus === 'connected' ? '#10B981' : '#9CA3AF';
  };

  const getLineIconName = () => {
    return member.lineStatus === 'connected' ? 'chatbubble' : 'chatbubble-outline';
  };

  // Get first 2 tags to display, and calculate additional count
  const displayTags = member.tags?.slice(0, 2) || [];
  const additionalTagsCount = (member.tags?.length || 0) - 2;

  // Get first case tracking item for display
  const firstCaseTracking = member.caseTracking?.[0];
  const additionalCaseCount = (member.caseTracking?.length || 0) - 1;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Header with avatar and basic info */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitial(member.name)}</Text>
          </View>
          <View style={styles.basicInfo}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.birthday}>
              {member.birthday ? formatBirthday(member.birthday) : '未設定'}
            </Text>
          </View>
        </View>
        
        {/* Right side with LINE status and action buttons */}
        <View style={styles.rightSection}>
          <View style={styles.lineStatus}>
            <Ionicons name="link" size={16} color={getLineStatusColor()} />
            <Ionicons 
              name={getLineIconName()} 
              size={16} 
              color={getLineStatusColor()} 
            />
          </View>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="paper-plane" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={onViewDetail}
          >
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phone number */}
      <TouchableOpacity style={styles.phoneContainer}>
        <Text style={styles.phoneNumber}>{formatPhone(member.phone)}</Text>
      </TouchableOpacity>

      {/* ID Section */}
      <View style={styles.idSection}>
        <View style={styles.idRow}>
          <Text style={styles.idLabel}>HIS 姓名</Text>
          <Text style={styles.idLabel}>身份/居留證號</Text>
        </View>
        <View style={styles.idRow}>
          <Text style={styles.idValue}>{member.name}</Text>
          <Text style={styles.idValue}>{member.idNumber || '未設定'}</Text>
        </View>
      </View>

      {/* Tags Section */}
      {member.tags && member.tags.length > 0 && (
        <View style={styles.tagsSection}>
          <Text style={styles.tagsLabel}>標籤</Text>
          <View style={styles.tagsContainer}>
            {displayTags.map((tag, index) => (
              <View 
                key={index} 
                style={[
                  styles.tag, 
                  { backgroundColor: index === 0 ? '#E5E7EB' : '#6B7280' }
                ]}
              >
                <Text style={[
                  styles.tagText, 
                  { color: index === 0 ? '#374151' : '#FFFFFF' }
                ]}>
                  {tag}
                </Text>
              </View>
            ))}
            {additionalTagsCount > 0 && (
              <View style={styles.addTagButton}>
                <Text style={styles.addTagText}>+{additionalTagsCount}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.newTagButton}>
              <Ionicons name="add" size={12} color="#6B7280" />
              <Text style={styles.newTagText}>新增標籤</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Case Tracking Section */}
      {member.caseTracking && member.caseTracking.length > 0 && (
        <View style={styles.trackingSection}>
          <Text style={styles.trackingLabel}>個案追蹤</Text>
          
          {firstCaseTracking && (
            <View style={styles.trackingItem}>
              {firstCaseTracking.isActive && <View style={styles.trackingDot} />}
              <Text style={styles.trackingText}>
                {firstCaseTracking.name} {firstCaseTracking.date}
              </Text>
            </View>
          )}
          
          {additionalCaseCount > 0 && (
            <View style={styles.trackingItem}>
              <Text style={styles.trackingText}>
                {member.caseTracking[1]?.name} {member.caseTracking[1]?.date}
              </Text>
              {additionalCaseCount > 1 && (
                <View style={styles.trackingBadge}>
                  <Text style={styles.trackingBadgeText}>+{additionalCaseCount - 1}</Text>
                </View>
              )}
            </View>
          )}
          
          <TouchableOpacity style={styles.addTrackingButton}>
            <Ionicons name="add" size={12} color="#6B7280" />
            <Text style={styles.addTrackingText}>新增個案追蹤</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  birthday: {
    fontSize: 12,
    color: '#6B7280',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lineStatus: {
    flexDirection: 'row',
    gap: 4,
  },
  messageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    marginBottom: 16,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  idSection: {
    marginBottom: 16,
  },
  idRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  idLabel: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  idValue: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  tagsSection: {
    marginBottom: 16,
  },
  tagsLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  addTagButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addTagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  newTagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  newTagText: {
    fontSize: 12,
    color: '#6B7280',
  },
  trackingSection: {
    // No margin bottom since this is the last section
  },
  trackingLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  trackingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  trackingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  trackingText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  trackingBadge: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trackingBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  addTrackingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  addTrackingText: {
    fontSize: 12,
    color: '#6B7280',
  },
}); 