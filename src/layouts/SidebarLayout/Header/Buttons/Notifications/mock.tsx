export const MockNotifications = [
  {
    title: 'Preparing order #545 close to due time',
    at: '2022/4/23 10:47:20',
    action: {
      title: 'VIEW',
      value: 'view'
    },
    isViewed: true
  },
  {
    title: 'Pickup order #432 not picked up after 5 minutes',
    at: '2022/4/23 10:45:20',
    action: {
      title: 'VIEW',
      value: 'view'
    },
    isViewed: false
  },
  {
    title: 'Transferred order #432',
    at: '2022/4/23 10:43:20',
    action: {
      title: 'VIEW',
      value: 'view'
    },
    isViewed: true
  },
  {
    title:
      'No runners assigned or online when delivery is an available delivery method.',
    at: '2022/4/20 10:41:20',
    action: {
      title: 'ASSIGN',
      value: 'assign'
    },
    isViewed: true
  }
];
