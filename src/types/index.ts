export interface Member {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  email?: string;
  birthday?: string;
  rating: number;
  status: 'active' | 'inactive';
  lineStatus?: 'connected' | 'disconnected';
  joinDate: string;
  lastContact?: string;
  notes?: string;
  tags?: string[];
  idNumber?: string;
  gender?: 'male' | 'female';
  caseTracking?: {
    name: string;
    date: string;
    isActive?: boolean;
    isRecurring?: boolean;
  }[];
}

export interface Contact {
  id: string;
  memberId: string;
  type: 'call' | 'message' | 'email' | 'meeting';
  date: string;
  notes?: string;
  duration?: number;
}

export type RootStackParamList = {
  Main: undefined;
  MemberDetail: { memberId: string };
  AddMember: undefined;
  EditMember: { memberId: string };
};

export type TabParamList = {
  Members: undefined;
  Analytics: undefined;
  Settings: undefined;
  Profile: undefined;
}; 