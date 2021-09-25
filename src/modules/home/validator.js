import Animated from 'react-native-reanimated';

export function categoryType(name) {
  switch (name) {
    case 'Returns':
      return 'returns';
    case 'Follower Returns':
      return 'followerReturns';
    case 'Follower Count':
      return 'followerCount';
    case 'AMU':
      return 'AMU';
    default:
      return 'returns';
  }
}

export function customPortfolioList() {
  return {
    bestEquity: {
      title: 'Best Performing Equity Portfolios',
      key: 'bestEquity',
      visible: true,
    },
    bestEquityAndFno: {
      title: 'Best Performing Equity + FnO Portfolios',
      key: 'bestEquityAndFno',
      visible: true,
    },
    bestCurrencies: {
      title: 'Best Performing Currencies Portfolios',
      key: 'bestCurrencies',
      visible: true,
    },
    bestCommodities: {
      title: 'Best Performing Commodities Portfolios',
      key: 'bestCommodities',
      visible: true,
    },
    bestDay: {
      title: 'Best Intraday Portfolios',
      key: 'bestDay',
      visible: true,
    },
    bestWeek: {
      title: 'Best Weekly Trade Horizon Portfolios',
      key: 'bestWeek',
      visible: true,
    },
    bestMonth: {
      title: 'Best Long Term Trading Portfolios',
      key: 'bestMonth',
      visible: true,
    },
    portfolioOfTheWeek: {
      title: 'Portfolio of the Week',
      key: 'portfolioOfTheWeek',
      visible: true,
    },
  };
}

export function filterGroup() {
  return {
    assets: [
      {
        title: 'Equity',
        selected: false,
      },
      {
        title: 'Futures & Options',
        selected: false,
      },
      {
        title: 'Currencies',
        selected: false,
      },
      {
        title: 'Commodities',
        selected: false,
      },
    ],
    frequency: '',
    metric: '',
    metricTime: {
      time: 3,
      type: 'Months',
      typeList: ['Days', 'Weeks', 'Months', 'Years'],
    },
    performance: '',
    performanceTime: {
      time: 6,
      type: 'Minutes',
      typeList: ['Minutes', 'Hours', 'Days'],
    },
  };
}

export function customPortfolioListOrder() {
  return [
    'bestEquity',
    'bestEquityAndFno',
    'bestCurrencies',
    'bestCommodities',
    'bestDay',
    'bestWeek',
    'bestMonth',
    'portfolioOfTheWeek',
  ];
}

export function filterSortType() {
  return {
    Equity: 'Equity',
    'Futures & Options': 'FnO',
    Currencies: 'Currencies',
    Commodities: 'Commodities',
    Returns: 'Return',
    'Followers Count': 'FollowerCount',
    'Asset Under Management': 'AUM',
    'Risk Adjusted Returns': 'RaR',
    Intraday: 1,
    Weekly: 2,
    Monthly: 3,
    Quarterly: 4,
    Trader: 'trader',
    Followers: 'followers',
    My: 'my',
    Followed: 'followed',
  };
}
