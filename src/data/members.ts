import { Member } from '../types';

export const sampleMembers: Member[] = [
  {
    id: '1',
    name: '韋禮安',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '0988123456',
    email: 'wei.lian@email.com',
    birthday: '1990-09-15',
    rating: 5,
    status: 'active',
    lineStatus: 'connected',
    joinDate: '2024-01-15',
    lastContact: '2024-06-10',
    notes: '麻藥過敏',
    tags: ['水飛梭', '皮膚保養'],
    idNumber: 'H200045983',
    gender: 'male',
    caseTracking: [
      { name: '杏仁酸煥膚', date: '2025/08/15 10:00', isActive: true },
      { name: '雷射除斑', date: '2025/08/10 14:00', isActive: true }
    ]
  },
  {
    id: '2',
    name: '陳美玲',
    avatar: 'https://i.pravatar.cc/150?img=2',
    phone: '0912345678',
    email: 'chen.meiling@email.com',
    birthday: '1985-03-22',
    rating: 4,
    status: 'active',
    lineStatus: 'connected',
    joinDate: '2024-02-20',
    lastContact: '2024-06-08',
    notes: '定期保養客戶',
    tags: ['雷射治療', 'VIP'],
    idNumber: 'A123456789',
    gender: 'female',
    caseTracking: [
      { name: '皮秒雷射', date: '2025/07/20 14:30', isActive: true },
      { name: '美白保養', date: '2025/08/05 16:00', isRecurring: true }
    ]
  },
  {
    id: '3',
    name: '林志豪',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '0933567890',
    email: 'lin.zhihao@email.com',
    birthday: '1992-11-08',
    rating: 3,
    status: 'active',
    lineStatus: 'disconnected',
    joinDate: '2024-03-10',
    lastContact: '2024-06-05',
    notes: '對價格敏感',
    tags: ['新手', '諮詢'],
    idNumber: 'B234567890',
    gender: 'male',
    caseTracking: [
      { name: '諮詢評估', date: '2025/07/15 10:00' }
    ]
  },
  {
    id: '4',
    name: '黃雅慧',
    avatar: 'https://i.pravatar.cc/150?img=4',
    phone: '0987654321',
    email: 'huang.yahui@email.com',
    birthday: '1988-05-18',
    rating: 5,
    status: 'active',
    lineStatus: 'connected',
    joinDate: '2024-01-05',
    lastContact: '2024-06-09',
    notes: '推薦朋友很多',
    tags: ['推薦達人', 'VIP', '美白'],
    idNumber: 'C345678901',
    gender: 'female',
    caseTracking: [
      { name: '玻尿酸', date: '2025/08/12 15:30', isActive: true },
      { name: '肉毒桿菌', date: '2025/06/20 14:00', isRecurring: true },
      { name: '臉部拉提', date: '2025/09/10 11:00' }
    ]
  },
  {
    id: '5',
    name: '李建國',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '0956123456',
    email: 'li.jianguo@email.com',
    birthday: '1987-12-03',
    rating: 4,
    status: 'active',
    lineStatus: 'disconnected',
    joinDate: '2024-04-12',
    lastContact: '2024-06-07',
    notes: '商務人士，時間彈性低',
    tags: ['商務', '除皺'],
    idNumber: 'D456789012',
    gender: 'male',
    caseTracking: [
      { name: '眼周除皺', date: '2025/08/18 19:00', isActive: true }
    ]
  },
  {
    id: '6',
    name: '王小萱',
    avatar: 'https://i.pravatar.cc/150?img=6',
    phone: '0923456789',
    email: 'wang.xiaoxuan@email.com',
    birthday: '1995-07-14',
    rating: 4,
    status: 'active',
    lineStatus: 'connected',
    joinDate: '2024-05-01',
    lastContact: '2024-06-12',
    notes: '學生族群',
    tags: ['學生', '青春痘', '保養'],
    idNumber: 'E567890123',
    gender: 'female',
    caseTracking: [
      { name: '痘疤治療', date: '2025/07/25 13:00', isActive: true },
      { name: '果酸換膚', date: '2025/08/08 15:30', isRecurring: true }
    ]
  },
  {
    id: '7',
    name: '張偉強',
    avatar: 'https://i.pravatar.cc/150?img=7',
    phone: '0934789123',
    email: 'zhang.weiqiang@email.com',
    birthday: '1983-01-25',
    rating: 5,
    status: 'active',
    lineStatus: 'connected',
    joinDate: '2023-12-15',
    lastContact: '2024-06-11',
    notes: '忠實老客戶',
    tags: ['老客戶', '肉毒', '拉皮'],
    idNumber: 'F678901234',
    gender: 'male',
    caseTracking: [
      { name: '電波拉皮', date: '2025/08/22 10:30', isActive: true },
      { name: '肉毒瘦小臉', date: '2024/02/20 15:00', isRecurring: true }
    ]
  },
  {
    id: '8',
    name: '劉詩涵',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '0945678901',
    email: 'liu.shihan@email.com',
    birthday: '1991-04-30',
    rating: 3,
    status: 'inactive',
    lineStatus: 'disconnected',
    joinDate: '2024-03-20',
    lastContact: '2024-05-15',
    notes: '需要再次聯絡',
    tags: ['流失客戶', '保養'],
    idNumber: 'G789012345',
    gender: 'female',
    caseTracking: [
      { name: '基礎保養', date: '2024/05/15 14:00' }
    ]
  }
]; 