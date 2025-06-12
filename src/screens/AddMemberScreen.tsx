import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddMemberScreenProps {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

export const AddMemberScreen: React.FC<AddMemberScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthday: '',
    phone: '',
    idType: '身份/居留證號',
    idNumber: '',
    notes: '',
    tags: []
  });

  const [characterCounts, setCharacterCounts] = useState({
    name: 0,
    notes: 0,
    tags: 0
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update character count
    if (field === 'name' || field === 'notes') {
      setCharacterCounts(prev => ({ ...prev, [field]: value.length }));
    }
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSave = () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('錯誤', '請輸入姓名');
      return;
    }
    if (!formData.gender) {
      Alert.alert('錯誤', '請選擇性別');
      return;
    }
    if (!formData.birthday) {
      Alert.alert('錯誤', '請選擇生日');
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert('錯誤', '請輸入手機號碼');
      return;
    }

    Alert.alert('成功', '會員資料已儲存', [
      { text: '確定', onPress: () => navigation?.goBack() }
    ]);
  };

  const handleCancel = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
          <Ionicons name="arrow-back" size={20} color="#111928" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>新增</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Member Data Form */}
          <View style={styles.formCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                新增會員資料 (<Text style={styles.required}>*</Text>為必填)
              </Text>
            </View>

            <View style={styles.formContent}>
              {/* Name Field */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>
                    自定義姓名<Text style={styles.required}>*</Text>
                  </Text>
                  <Text style={styles.charCount}>{characterCounts.name}/20</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder=""
                  maxLength={20}
                  returnKeyType="next"
                />
              </View>

              {/* Gender Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  性別<Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity 
                    style={styles.radioOption}
                    onPress={() => handleGenderSelect('男')}
                  >
                    <View style={[
                      styles.radioButton,
                      formData.gender === '男' && styles.radioButtonSelected
                    ]}>
                      {formData.gender === '男' && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={styles.radioLabel}>男</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.radioOption}
                    onPress={() => handleGenderSelect('女')}
                  >
                    <View style={[
                      styles.radioButton,
                      formData.gender === '女' && styles.radioButtonSelected
                    ]}>
                      {formData.gender === '女' && <View style={styles.radioButtonInner} />}
                    </View>
                    <Text style={styles.radioLabel}>女</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Birthday Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  生日<Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity style={styles.datePickerButton}>
                  <Ionicons name="calendar-outline" size={24} color="#6B7280" />
                  <Text style={styles.datePickerText}>yyyy/mm/dd</Text>
                </TouchableOpacity>
              </View>

              {/* Phone Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  手機<Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.phoneInputContainer}>
                  <TouchableOpacity style={styles.countryCodeButton}>
                    <View style={styles.taiwanFlag}>
                      <Text style={styles.flagText}>🇹🇼</Text>
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.phoneInput}
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    placeholder="0912 345 678"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* ID Number Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  識別號<Text style={styles.required}>*</Text>
                </Text>
                <View style={styles.idInputContainer}>
                  <TextInput
                    style={styles.idNumberInput}
                    value={formData.idNumber}
                    onChangeText={(value) => handleInputChange('idNumber', value)}
                    placeholder=""
                    returnKeyType="next"
                  />
                  <TouchableOpacity style={styles.idTypeSelector}>
                    <Text style={styles.idTypeSelectorText}>{formData.idType}</Text>
                    <Ionicons name="chevron-down" size={12} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.addIdFieldButton}>
                  <Ionicons name="add" size={18} color="#1C64F2" />
                  <Text style={styles.addIdFieldText}>新增其他識別欄位</Text>
                </TouchableOpacity>
              </View>

              {/* Notes Field */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>會員備註</Text>
                  <Text style={styles.charCount}>{characterCounts.notes}/200</Text>
                </View>
                <TextInput
                  style={styles.textArea}
                  value={formData.notes}
                  onChangeText={(value) => handleInputChange('notes', value)}
                  placeholder="此處可記錄患者的治療歷程、基本資料等資訊，不會將內容顯示給患者。"
                  maxLength={200}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  returnKeyType="default"
                />
              </View>
            </View>
          </View>

          {/* Tags Form */}
          <View style={styles.formCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>標籤</Text>
            </View>

            <View style={styles.formContent}>
              <View style={styles.fieldContainer}>
                <View style={styles.fieldLabelRow}>
                  <View style={styles.tagsLabelContainer}>
                    <Text style={styles.fieldLabel}>為會員加入標籤</Text>
                    <Ionicons name="help-circle-outline" size={16} color="#9CA3AF" />
                  </View>
                  <Text style={styles.charCount}>0/20</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="輸入關鍵字搜尋或新增"
                  returnKeyType="done"
                />
                <Text style={styles.helpText}>
                  詳細設定可在<Text style={styles.linkText}>標籤</Text>找到。
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>儲存</Text>
            </TouchableOpacity>
          </View>

          {/* Extra space for keyboard */}
          <View style={styles.extraSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    padding: 12,
    marginLeft: -12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111928',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 48,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111928',
    lineHeight: 30,
  },
  required: {
    color: '#F05252',
  },
  formContent: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
    lineHeight: 21,
  },
  charCount: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 17.5,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    color: '#111928',
    height: 52,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#1C64F2',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1C64F2',
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111928',
  },
  datePickerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 52,
  },
  datePickerText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    height: 52,
  },
  countryCodeButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0,
  },
  taiwanFlag: {
    width: 20,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 12,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#111928',
    borderLeftWidth: 0,
  },
  idInputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  idNumberInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    color: '#111928',
    height: 52,
  },
  idTypeSelector: {
    width: 148,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
  },
  idTypeSelectorText: {
    fontSize: 14,
    color: '#111928',
    flex: 1,
  },
  addIdFieldButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  addIdFieldText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C64F2',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111928',
    height: 112,
    textAlignVertical: 'top',
  },
  tagsLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 17.5,
  },
  linkText: {
    fontWeight: '500',
    color: '#3F83F8',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2A37',
    lineHeight: 21,
  },
  saveButton: {
    backgroundColor: '#1A56DB',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 21,
  },
  extraSpace: {
    height: 100, // 額外空間，確保最後的輸入框不會被鍵盤遮擋
  },
}); 