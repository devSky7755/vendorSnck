export type TeamUserStatus = 'Active' | 'Not Active';
export type UserRole = 'Admin' | 'Runner' | 'Packer';

export interface TeamUser {
  id: number;
  role: UserRole,
  name: string;
  status: TeamUserStatus;
  lastSeen: string;
  lastSeenTimeStamp: number;
}
