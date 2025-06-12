import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sampleMembers } from '../data/members';
import { BottomTabBar } from '../components/BottomTabBar';

interface MemberDetailScreenProps {
  navigation: any;
  memberId?: string;
}

export const MemberDetailScreen: React.FC<MemberDetailScreenProps> = ({ navigation, memberId = '1' }) => {
  const [activeTab, setActiveTab] = useState('總覽');
  const member = sampleMembers.find(m => m.id === memberId);

  if (!member) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>找不到會員資料</Text>
      </SafeAreaView>
    );
  }

  const caseTrackingCount = member.caseTracking?.length || 0;
  const tabs = [
    { name: '總覽', count: null },
    { name: '個案追蹤', count: caseTrackingCount },
    { name: '問卷', count: 2 },
    { name: '會員合併紀錄', count: null }
  ];

  const formatBirthday = (birthday?: string) => {
    if (!birthday) return '-';
    const date = new Date(birthday);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? '下午' : '上午';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    
    return `${year}年${month}月${day}日(${weekday}) ${period}${displayHours}:${minutes}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111928" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>會員資訊頁面</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: member.avatar || 'https://i.pravatar.cc/150?img=1' }}
              style={styles.avatar}
            />
            <View style={styles.statusIcons}>
              <View style={styles.statusIcon}>
                <Ionicons name="link" size={18} color="#31C48D" />
              </View>
              <View style={styles.statusIcon}>
                <Text style={styles.lineText}>LINE</Text>
              </View>
            </View>
            <Text style={styles.memberName}>{member.name}</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
            {tabs.map((tab, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setActiveTab(tab.name)}
                style={[
                  styles.tab,
                  activeTab === tab.name && styles.activeTab,
                  index === 0 && styles.firstTab,
                  index === tabs.length - 1 && styles.lastTab
                ]}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.name && styles.activeTabText
                ]}>
                  {tab.name}
                </Text>
                {tab.count && (
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{tab.count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Member Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>會員資訊</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#111928" />
              <Text style={styles.editButtonText}>編輯</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>自定義姓名</Text>
              <Text style={styles.infoValue}>{member.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.labelWithIcon}>
                <Ionicons name="help-circle-outline" size={16} color="#9CA3AF" />
                <Text style={styles.infoLabel}>LINE</Text>
              </View>
              <Text style={styles.infoValue}>{member.lineStatus === 'connected' ? member.name : '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.labelWithIcon}>
                <Ionicons name="help-circle-outline" size={16} color="#9CA3AF" />
                <Text style={styles.infoLabel}>HIS</Text>
              </View>
              <Text style={styles.infoValue}>{member.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>性別</Text>
              <Text style={styles.infoValue}>{member.gender === 'male' ? '男' : member.gender === 'female' ? '女' : '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>生日</Text>
              <Text style={styles.infoValue}>{formatBirthday(member.birthday)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>手機</Text>
              <Text style={styles.infoValue}>{member.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>識別號</Text>
              <View style={styles.idRow}>
                <Text style={styles.infoValue}>身分/居留證號</Text>
                <Text style={styles.infoValue}>{member.idNumber || '-'}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>會員備註</Text>
              <Text style={styles.infoValue}>{member.notes || '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>來源</Text>
              <Text style={styles.infoValue}>-</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>近期更新</Text>
              <Text style={styles.infoValue}>{member.lastContact ? formatDate(member.lastContact) : '-'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>新增日期</Text>
              <Text style={styles.infoValue}>{formatDate(member.joinDate)}</Text>
            </View>
          </View>
        </View>

        {/* Tags Section */}
        <View style={styles.tagsCard}>
          <Text style={styles.sectionTitle}>標籤</Text>
          <View style={styles.tagsContainer}>
            {(member.tags || []).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity style={styles.tagRemove}>
                  <Ionicons name="close" size={14} color="#6B7280" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addTagButton}>
              <Ionicons name="add" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Case Tracking Section */}
        <View style={styles.trackingCard}>
          <Text style={styles.sectionTitle}>個案追蹤</Text>
          <View style={styles.trackingContainer}>
            {(member.caseTracking || []).map((item, index) => (
              <View key={index} style={styles.trackingItem}>
                {item.isActive && <View style={styles.activeDot} />}
                {item.isRecurring && (
                  <Ionicons name="refresh" size={16} color="#1C64F2" style={styles.recurringIcon} />
                )}
                <Text style={styles.trackingText}>{item.name}</Text>
                <Text style={styles.trackingDate}>{item.date}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addTrackingButton}>
              <Ionicons name="add" size={16} color="#9CA3AF" />
              <Text style={styles.addTrackingText}>新增個案追蹤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar 
        currentTab="members" 
        onTabPress={(tab) => console.log('Tab pressed:', tab)} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111928',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  avatar: {
    width: 144,
    height: 144,
    borderRadius: 72,
    marginBottom: 24,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  statusIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#31C48D',
  },
  memberName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111928',
    lineHeight: 48,
  },
  tabContainer: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tabScrollView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 38,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  firstTab: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  lastTab: {
    borderRightWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeTab: {
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
  },
  activeTabText: {
    color: '#111928',
  },
  tabBadge: {
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111928',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111928',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2A37',
    marginLeft: 8,
  },
  infoContent: {
    gap: 16,
  },
  infoRow: {
    gap: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111928',
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  idRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tagsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
  },
  tagRemove: {
    padding: 2,
  },
  addTagButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  trackingContainer: {
    gap: 8,
  },
  trackingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#31C48D',
  },
  recurringIcon: {
    marginRight: 4,
  },
  trackingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
    flex: 1,
  },
  trackingDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
  },
  addTrackingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  addTrackingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
  },
}); 