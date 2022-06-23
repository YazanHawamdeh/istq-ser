export const statuses = {
  1: 'Pending',
  2: 'Ordering Requested Hardware',
  3: 'Requested Hardware Avaliable',
  4: 'Requested Hardware Not Avaliable',
  5: 'Ordered',
  6: 'Ready',
  7: 'Scheduled',
  8: 'Done For Review (DCE)',
  9: 'Awaiting For Accountant',
  10: 'Done from Accountant',
  11: 'Done With Comment',
  12: 'Canceled',
};

export const orderStatus = {
  PENDING: 1,
  ORDERING_REQUESTED_HARDWARE: 2,
  REQUESTED_HARDWARE_AVALIABLE: 3,
  REQUESTED_HARDWARE_NOT_AVALIABLE: 4,
  ORDERED: 5,
  READY: 6,
  SCHEDULED: 7,
  DONE_FOR_REVIEW: 8,
  AWAITING_FOR_ACCOUNTING: 9,
  DONE_FROM_ACCOUNTANT: 10,
  DONE_WITH_COMMENT: 11,
  CANCELED: 12,
};

export const requestTypes = {
  1: 'New',
  2: 'Upgrade',
  3: 'Downgrade',
  4: 'Maintenance',
};

export const typesStringFirst = [
  { label: 'New Request', value: 1 },
  { label: 'Upgrade', value: 2 },
  { label: 'Downgrade', value: 3 },
  { label: 'Maintenance', value: 4 },
];

export const rolesForSelect = [
  { label: 'Admin', value: 1 },
  { label: 'Data Center Engineer', value: 2 },
  { label: 'Accountant', value: 3 },
];

export const AdminsRole = {
  Admin: 1,
  DCE: 2,
  Accountant: 3,
};

export const statusForSelect = [
  { label: 'Pending', value: 1 },
  { label: 'Ordering Requested Hardware', value: 2 },
  { label: 'Requested Hardware Avaliable', value: 3 },
  { label: 'Requested Hardware Not Avaliable', value: 4 },
  { label: 'Ordered', value: 5 },
  { label: 'Ready', value: 6 },
  { label: 'Scheduled', value: 7 },
  { label: 'Done For Review (DCE)', value: 8 },
  { label: 'Awaiting For Accountant', value: 9 },
  { label: 'Done from Accountant', value: 10 },
  { label: 'Done With Comment', value: 11 },
  { label: 'Canceled', value: 12 },
];

export const LookupsEnums = {
  DISKS: 1,
  NETWORK_INTERFACE: 2,
  ILO_SWITCH: 3,
  NETWORK_SWITCH: 4,
  RACK: 5,
  CHASIS: 6,
  RAM: 7,
  CPU: 8,
};
