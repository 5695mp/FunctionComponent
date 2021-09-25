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
import {
  portfoliosBestListService,
  portfoliosGroupService,
  portfoliosPaginationService,
  portfoliosDetailService,
  portfoliosEditService,
  portfoliosMyFollowerService,
  portfoliosOrderService,
  portfolioFollowService,
  createPortfolioService,
  editPortfolioService,
  getWebTradersDataService,
} from './services';
import { cloneDeep } from 'lodash';
import constant from '../../services/constant';
import { START_LOADING } from '../account/constant';
import { fillOrdersListAction } from '../orders/actions';
import { getUserData, setLoader } from '../account/actions';
import { updateUserInfo } from '../account/services';
// import {setEventData} from '../account/actions';
// import home from '../../screens/home/home';

/**
 * Home screen PortFoliosList
 */
export const bestPortFoliosList = () => {
  return (dispatch, getState) => {
    return portfoliosBestListService()
      .then(response => {
        return dispatch({
          type: PORTFOLIOS_BEST_LIST,
          payload: response,
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * Home screen separate portFolios
 */
export const portfoliosGroupList = (type, uri) => {
  return (dispatch, getState) => {
    return portfoliosGroupService(type, uri)
      .then(response => {
        let data = cloneDeep(getState().home.portfoliosBestList);
        const { portfolios } = response;

        data[type] = portfolios;
        return dispatch({
          type: PORTFOLIOS_BEST_LIST,
          payload: data,
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * Home screen separate portFolios
 */
export const paginationPortfoliosList = (
  isNextPage = false,
  skip,
  limit,
  sortType = '',
  asset_classes = '',
  trading_frequency = '',
  performance = '',
  metric = '',
  callingType = '',
) => {
  return (dispatch, getState) => {
    let url = `skip=${skip.toString()}&limit=${limit.toString()}`;
    if (asset_classes !== '') {
      url = url + `&asset_classes=${asset_classes}`;
    }
    if (sortType !== '') {
      url = url + `&sort=${sortType}`;
    }
    if (trading_frequency !== '') {
      url = url + `&trading_frequency=${trading_frequency}`;
    }
    if (performance !== '') {
      url = url + `&portfolioGroup=${performance}`;
    }
    if (metric !== '') {
      url = url + `&sort=${metric}`;
    }

    return portfoliosPaginationService(url)
      .then(response => {
        let temp = response.portfolios;
        if (isNextPage) {
          let data = cloneDeep(getState().home.portfoliosPagination);
          temp = data.concat(temp);
        }
        if (callingType === '') {
          dispatch({
            type: PORTFOLIOS_PAGINATION_LIST,
            payload: temp,
          });
          return Promise.resolve(response.count || 0);
        } else if (callingType === 'my') {
          dispatch({
            type: PORTFOLIOS_MY_LIST,
            payload: {
              list: temp,
              count: response.count || 0,
            },
          });
        } else if (callingType === 'iFollow') {
          dispatch({
            type: PORTFOLIOS_I_FOLLOW_LIST,
            payload: {
              list: temp,
              count: response.count || 0,
            },
          });
        }
        return Promise.resolve(response.count || 0);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * PortFolios details
 */
export const portfoliosDetail = (portfoliosId = '') => {
  return (dispatch, getState) => {
    return portfoliosDetailService(portfoliosId)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * My Portfolio list
 */
export const myPortfoliosList = () => {
  return (dispatch, getState) => {
    return dispatch(
      paginationPortfoliosList(false, 0, 5, '', '', '', 'my', '', 'my'),
    );
  };
};

/**
 * I Follow Portfolio list
 */
export const iFollowPortfoliosList = () => {
  return (dispatch, getState) => {
    return dispatch(
      paginationPortfoliosList(
        false,
        0,
        5,
        '',
        '',
        '',
        'followed',
        '',
        'iFollow',
      ),
    );
  };
};

/**
 * My follower
 */
export const paginationMyFollowerList = (
  isNextPage = false,
  skip,
  limit,
  filter = '',
  sortType = '',
  order = '',
  callingType: '',
) => {
  return (dispatch, getState) => {
    let url = `skip=${skip.toString()}&limit=${limit.toString()}`;
    if (sortType !== '') {
      url = url + `&sort=${sortType}`;
    }
    if (order !== '') {
      url = url + `&trading_frequency=${order}`;
    }
    if (filter !== '') {
      url = url + `&filter=${filter}`;
    }

    return portfoliosMyFollowerService(url)
      .then(response => {
        let temp = response.followers;
        if (isNextPage) {
          let data = cloneDeep(getState().home.portfoliosFollowMePagination);
          temp = data.concat(temp);
        }
        if (callingType === '') {
          dispatch({
            type: FOLLOW_ME_PAGINATION_LIST,
            payload: temp,
          });
          return Promise.resolve(response.count || 0);
        } else if (callingType === 'list') {
          dispatch({
            type: FOLLOW_ME_LIST,
            payload: temp,
          });
        }
        return Promise.resolve(response.count || 0);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * I Follow Portfolio list
 */
export const myFollowerList = () => {
  return (dispatch, getState) => {
    return dispatch(paginationMyFollowerList(false, 0, 5, '', '', '', 'list'));
  };
};

/**
 * Filter menu
 */
export const manageFilterMenu = type => {
  return (dispatch, getState) => {
    return dispatch({
      type: FILTER_MENU,
      payload: type,
    });
  };
};

/**
 * Create Portfolio
 */
export const createPortFolio = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: START_LOADING,
      payload: true,
    });
    return createPortfolioService(obj)
      .then(response => {
        dispatch({
          type: START_LOADING,
          payload: false,
        });
        if (response.code === 200) {
          dispatch(myPortfoliosList());
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * Edit Portfolio
 */
export const editPortFolio = (portfolioId, obj) => {
  return (dispatch, getState) => {
    dispatch({
      type: START_LOADING,
      payload: true,
    });
    return editPortfolioService(portfolioId, obj)
      .then(response => {
        if (response.code === 200) {
          return dispatch(myPortfoliosList());
        } else {
          return Promise.resolve(false);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * Filter menu
 */
export const portfoliosCustomPopUp = type => {
  return (dispatch, getState) => {
    return dispatch({
      type: PORTFOLIOS_CUSTOM_POPUP,
      payload: type,
    });
  };
};

/**
 * Filter menu
 */
export const portfoliosCategoryChange = type => {
  return (dispatch, getState) => {
    return dispatch({
      type: PORTFOLIOS_CATEGORY_LIST,
      payload: type,
    });
  };
};

/**
 * Filter menu reset
 */
export const portfoliosFilterUpdate = type => {
  return (dispatch, getState) => {
    return dispatch({
      type: PORTFOLIOS_FILTER,
      payload: type,
    });
  };
};

/**
 * Pagination list update
 */
export const portfoliosPaginationListUpdate = type => {
  return (dispatch, getState) => {
    return dispatch({
      type: PORTFOLIOS_PAGINATION_LIST,
      payload: type,
    });
  };
};

/**
 * Update portfolio detail
 */
export const editPortfolio = (portfolioId, obj) => {
  return (dispatch, getState) => {
    return portfoliosEditService(portfolioId, obj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * PortFolios details
 */
export const portfoliosOrder = (portfoliosId = '', investmentAmount) => {
  return (dispatch, getState) => {
    return portfoliosOrderService(portfoliosId, investmentAmount)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const followToPortfolio = (
  pfId: '',
  pfName: '',
  myPfId: '',
  myPfName: '',
  orders: [],
  checksum: '',
  text: '',
) => {
  return (dispatch, getState) => {
    const body = {
      // followerPortfolioId: myPfId,
      orderGroup: {
        orders: orders,
      },
      twitterText: text,
    };

    dispatch({
      type: START_LOADING,
      payload: true,
    });

    const headers = { 'initial-orders-checksum': checksum };
    return portfolioFollowService(pfId, body, checksum ? headers : null)
      .then(response => {
        dispatch({
          type: START_LOADING,
          payload: false,
        });

        dispatch(fillOrdersListAction());
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch({
          type: START_LOADING,
          payload: false,
        });
        return Promise.reject(error);
      });
  };
};

export const manageCreateOrEditPortfolio = data => {
  return (dispatch, getState) => {
    return dispatch({
      type: CREATE_OR_EDIT_PORTFOLIO,
      payload: data,
    });
  };
};

export const updateWatchlistData = (value, addWatchlistID = '') => {
  return (dispatch, getState) => {
    let data = cloneDeep(getState().home.portfoliosPagination);
    data.map((obj, index) => {
      if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
        if (addWatchlistID === '') {
          data[index].inWatchlist = [];
        } else {
          data[index].inWatchlist = [
            {
              name: 'test',
              id: addWatchlistID,
            },
          ];
        }
      }
    });
    dispatch(portfoliosPaginationListUpdate(data));

    let homeData = cloneDeep(getState().home.portfoliosBestList);
    homeData.bestEquity &&
      homeData.bestEquity.map((obj, index) => {
        if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
          if (addWatchlistID === '') {
            homeData.bestEquity[index].inWatchlist = [];
          } else {
            homeData.bestEquity[index].inWatchlist = [
              {
                name: 'test',
                id: addWatchlistID,
              },
            ];
          }
        }
      });
    homeData.bestMonth &&
      homeData.bestMonth.map((obj, index) => {
        if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
          homeData.bestMonth[index].inWatchlist = [];
          if (addWatchlistID === '') {
            homeData.bestMonth[index].inWatchlist = [];
          } else {
            homeData.bestMonth[index].inWatchlist = [
              {
                name: 'test',
                id: addWatchlistID,
              },
            ];
          }
        }
      });
    dispatch(updatePaginationData(homeData));

    let profileList = cloneDeep(getState().home.portfolioMyList);
    profileList &&
      profileList.list.map((obj, index) => {
        if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
          if (addWatchlistID === '') {
            profileList.list[index].inWatchlist = [];
          } else {
            profileList.list[index].inWatchlist = [
              {
                name: 'test',
                id: addWatchlistID,
              },
            ];
          }
        }
      });
    dispatch(myPortfolioUpdate(profileList));

    let profileFollowList = cloneDeep(getState().home.portfolioIFollowList);
    profileFollowList &&
      profileFollowList.list.map((obj, index) => {
        if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
          if (addWatchlistID === '') {
            profileFollowList.list[index].inWatchlist = [];
          } else {
            profileFollowList.list[index].inWatchlist = [
              {
                name: 'test',
                id: addWatchlistID,
              },
            ];
          }
        }
      });
    dispatch(myPortfolioFollowUpdate(profileFollowList));

    // let eventData = cloneDeep(getState().account.eventData);
    // dispatch(setEventData(!eventData));
  };
};

export const updatePortfoliosData = (value, isFollowed = false) => {
  return (dispatch, getState) => {
    let data = cloneDeep(getState().home.portfoliosPagination);
    data.map((obj, index) => {
      if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
        data[index].isFollowed = isFollowed;
      }
    });
    dispatch(portfoliosPaginationListUpdate(data));

    let homeData = cloneDeep(getState().home.portfoliosBestList);
    homeData.bestEquity &&
      homeData.bestEquity.map((obj, index) => {
        if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
          homeData.bestEquity[index].isFollowed = isFollowed;
        }
      });
    // homeData.bestMonth.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestMonth[index].isFollowed = isFollowed;
    //   }
    // });
    // homeData.bestEquityAndFno.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestEquityAndFno[index].isFollowed = isFollowed;
    //   }
    // });
    // homeData.bestCurrencies.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestCurrencies[index].isFollowed = isFollowed;
    //   }
    // });
    // homeData.bestCommodities.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestCommodities[index].isFollowed = isFollowed;
    //   }
    // });
    // homeData.bestDay.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestDay[index].isFollowed = isFollowed;
    //   }
    // });
    // homeData.bestWeek.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestWeek[index].isFollowed = isFollowed;
    //   }
    // });
    // homeData.bestThreeMonth.map((obj, index) => {
    //   if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
    //     homeData.bestThreeMonth[index].isFollowed = isFollowed;
    //   }
    // });
    homeData.portfolioOfTheWeek &&
      homeData.portfolioOfTheWeek.map((obj, index) => {
        if (obj.portfolio && obj.portfolio.id && obj.portfolio.id === value) {
          homeData.portfolioOfTheWeek[index].isFollowed = isFollowed;
        }
      });
    dispatch(updatePaginationData(homeData));

    dispatch(iFollowPortfoliosList());
  };
};

export const updatePaginationData = data => {
  return (dispatch, getState) => {
    return dispatch({
      type: PORTFOLIOS_BEST_LIST,
      payload: data,
    });
  };
};

export const myPortfolioUpdate = data => {
  return (dispatch, getState) => {
    dispatch({
      type: PORTFOLIOS_MY_LIST,
      payload: data,
    });
  };
};

export const myPortfolioFollowUpdate = data => {
  return (dispatch, getState) => {
    dispatch({
      type: PORTFOLIOS_I_FOLLOW_LIST,
      payload: data,
    });
  };
};

export const getWebTrader = () => {
  return (dispatch, getState) => {
    return getWebTradersDataService()
      .then(response => {
        dispatch({
          type: PERFORMANCE_DATA,
          payload: response,
        });
        return Promise.resolve(true);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const manageUnfollowPortfolioPopUp = data => {
  return (dispatch, getState) => {
    dispatch({
      type: MANAGE_UNFOLLOW_PORTFOLIO_POPUP,
      payload: data,
    });
  };
};

export const manageBrokerLoginPopUp = data => {
  return (dispatch, getState) => {
    dispatch({
      type: MANAGE_BROKER_LOGIN_POPUP,
      payload: data,
    });
  };
};

export const setSocketAssetPriceDataAction = data => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SOCKET_ASSET_PRICE_DATA,
      payload: data,
    });
  };
};
