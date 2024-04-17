export const transactions = [
  {
    id: '0',
    title: 'Bought BTC with cKES',
    credited: false,
    amount: '100.00',
    token: 'KES',
    date: '20 Mar 2020, 11:59',
  },
  {
    id: '1',
    title: 'Money added via M-Pesa',
    type: 'deposit',
    credited: true,
    token: 'KES',
    amount: '130.0',
    date: '20 Mar 2020, 11:59',
  },
  {
    id: '2',
    title: 'Money added to wallet',
    type: 'deposit',
    credited: true,
    amount: '150.0',
    token: 'cUSD',
    date: '20 Mar 2020, 11:59',
  },
];

export const rates = {
  KES: 1,
  USDKES: 148.7,
  CUSDUSD: 0.9999,
  CELOUSD: 0.05,
  CUSDKES: 148.7 * 0.9999,
  CELOKES: 148.7 * 0.05,
};

export const LoansData = [
  {
    title: 'Active Loans',
    data: [
      {
        id: 'LN001',
        name: 'Akimbo <> Chamaa', // derive name from participants
        principal: '5000', // amount payable if payed on time
        dueDate: '20 Mar 2020',
        token: 'cUSD',
        isPending: true,
        currentBal: '1000',
        paid: '4000',
        isLender: false, // derive and show lender
      },
      {
        id: 'LN002',
        name: 'Akimbo <> Kachi',
        principal: '3000',
        dueDate: '20 Mar 2020',
        token: 'cUSD',
        isPending: false,
        currentBal: '1000',
        paid: '2000',
        lender: false,
      },
    ],
  },
  {
    title: 'Loan Offers',
    data: [
      {
        id: 'LO001',
        token: 'cUSD',
        from: 'Akimbo Keya',
        type: 'individual', // or "group
        lendingPool: '10000',
        minAmount: '500',
        maxAmount: '1000',
        minDuration: '7', //days
        maxDuration: '21', //weeks
        interest: '5', //percent
      },
    ],
  },
  {
    title: 'Loan Requests',
    data: [
      {
        id: 'LO002',
        from: 'Dekan Kachi',
        type: 'individual', // or "group
        token: 'cUSD',
        principal: '3000',
        minDuration: '7', //days
        maxDuration: '21', //weeks
        interest: '5', //percent
        creditScore: {
          value: '5',
          status: 'good',
        },
      },
    ],
  },
];

export const spaces = [
  {
    id: '0x1',
    type: 'contribution',
    roscaName: 'Masomo',
    goalAmount: '50',
    token: 'cUSD',
    dueDate: '20 Mar 2020',
    address: '0x8ad186F9F99B59fE98430CaA4E204B2084C6e51c',
  },
  {
    id: '0x2',
    type: 'rosca',
    name: 'TMK Wanaume',
    value: '5000',
    token: 'cUSD',
    dueDate: '20 Mar 2020',
  },
  {
    id: '0x3',
    type: 'personal',
    name: 'Vacation',
    value: '500',
    token: 'cUSD',
    dueDate: '20 Mar 2020',
  },
];
