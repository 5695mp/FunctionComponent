import {
  FILTER_MENU,
  PORTFOLIOS_BEST_LIST,
  PORTFOLIOS_PAGINATION_LIST,
  PORTFOLIOS_CUSTOM_POPUP,
  PORTFOLIOS_CATEGORY_LIST,
  PORTFOLIOS_FILTER,
  PORTFOLIOS_MY_LIST,
  PORTFOLIOS_I_FOLLOW_LIST,
  FOLLOW_ME_PAGINATION_LIST,
  FOLLOW_ME_LIST,
  CREATE_OR_EDIT_PORTFOLIO,
  PERFORMANCE_DATA,
  MANAGE_UNFOLLOW_PORTFOLIO_POPUP,
  SET_SOCKET_ASSET_PRICE_DATA,
  MANAGE_BROKER_LOGIN_POPUP,
} from './constant';
import { customPortfolioList, filterGroup } from './validator';

export const initStateHome = {
  filterMenu: false,
  portfoliosBestList: {
    bestEquity: [],
    bestEquityAndFno: [],
    bestCurrencies: [],
    bestCommodities: [],
    bestDay: [],
    bestWeek: [],
    bestMonth: [],
    bestThreeMonth: [],
    portfolioOfTheWeek: [],
  },
  portfoliosPagination: [],
  portfoliosPopUp: false,
  portfolioCategoryList: customPortfolioList(),
  filtersGroup: filterGroup(),
  portfolioMyList: {
    list: [],
    count: 0,
  },
  portfolioIFollowList: {
    list: [],
    count: 0,
  },
  portfoliosFollowMePagination: [],
  portfoliosFollowMe: [],
  portfoliosAddOrEdit: { isShow: false, data: {} },
  brokerLoginPopUp: { isShow: false },
  unfollowPortfolioPopUp: { isShow: false, portfolioId: '' },
  performanceData: {
    totalMoneyInvested: 0,
    currentValue: 0,
    totalFollowers: 0,
    totalAUM: 0,
    percentReturn: 0,
    netReturn: 0,
  },
  socketAssetPriceData: {},
};

export default (state = initStateHome, action) => {
  switch (action.type) {
    case FILTER_MENU: {
      return {
        ...state,
        filterMenu: action.payload,
      };
    }

    case PORTFOLIOS_BEST_LIST: {
      return {
        ...state,
        portfoliosBestList: action.payload,
      };
    }

    case PORTFOLIOS_PAGINATION_LIST: {
      return {
        ...state,
        portfoliosPagination: action.payload,
      };
    }
    case PORTFOLIOS_CUSTOM_POPUP: {
      return {
        ...state,
        portfoliosPopUp: action.payload,
      };
    }
    case PORTFOLIOS_CATEGORY_LIST: {
      return {
        ...state,
        portfolioCategoryList: action.payload,
      };
    }
    case PORTFOLIOS_FILTER: {
      return {
        ...state,
        filtersGroup: action.payload,
      };
    }
    case PORTFOLIOS_MY_LIST: {
      return {
        ...state,
        portfolioMyList: action.payload,
      };
    }
    case PORTFOLIOS_I_FOLLOW_LIST: {
      return {
        ...state,
        portfolioIFollowList: action.payload,
      };
    }
    case FOLLOW_ME_PAGINATION_LIST: {
      return {
        ...state,
        portfoliosFollowMePagination: action.payload,
      };
    }
    case FOLLOW_ME_LIST: {
      return {
        ...state,
        portfoliosFollowMe: action.payload,
      };
    }
    case CREATE_OR_EDIT_PORTFOLIO: {
      return {
        ...state,
        portfoliosAddOrEdit: action.payload,
      };
    }
    case PERFORMANCE_DATA: {
      return {
        ...state,
        performanceData: action.payload,
      };
    }
    case MANAGE_UNFOLLOW_PORTFOLIO_POPUP: {
      return {
        ...state,
        unfollowPortfolioPopUp: action.payload,
      };
    }
    case MANAGE_BROKER_LOGIN_POPUP: {
      return {
        ...state,
        brokerLoginPopUp: { isShow: action.payload },
      };
    }
    case SET_SOCKET_ASSET_PRICE_DATA: {
      return {
        ...state,
        socketAssetPriceData: action.payload,
      };
    }
    default:
      return state;
  }
};
