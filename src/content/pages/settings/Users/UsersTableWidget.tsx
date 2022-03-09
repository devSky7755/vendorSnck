import { Card } from '@mui/material';
import UsersTable from './UsersTable';
import { TeamUser } from 'src/models/team_user';

const tempUsers: TeamUser[] = [
  {
    id: 52,
    role: 'Runner',
    name: 'Jack Johnson',
    status: 'Active',
    lastSeen: '15 min ago',
    lastSeenTimeStamp: 0
  },
  {
    id: 51,
    role: 'Runner',
    name: 'Dave Davidson',
    status: 'Not Active',
    lastSeen: '5 days ago',
    lastSeenTimeStamp: 0
  },
  {
    id: 31,
    role: 'Packer',
    name: 'Frank Frankson',
    status: 'Active',
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0
  },
];

function UsersTableWidget() {
  return (
    <Card>
      <UsersTable users={tempUsers} />
    </Card>
  );
}

export default UsersTableWidget;
