import request from '../../services/fetch';
import constant from '../../services/constant';

export const portfoliosBestListService = () =>
  request.getWithToken(constant.portfoliosBestList, {}, false);

export const portfoliosGroupService = (type, uri) =>
  request.getWithToken(constant.portfoliosBestList + uri, {}, false);

export const portfoliosPaginationService = data =>
  request.getWithToken(constant.portfoliosPagination + data, {}, false);

export const portfoliosDetailService = data =>
  request.getWithToken(constant.portfoliosDetail + data, {}, false);

export const portfoliosEditService = (data, obj) =>
  request.putWithToken(constant.portfoliosDetail + data, obj);

export const portfoliosMyFollowerService = data =>
  request.getWithToken(constant.myFollower + data, {});

export const portfoliosOrderService = (data, investmentAmount) =>
  request.getWithTokenDetail(
    constant.portfoliosDetail +
      data +
      constant.getInvestment +
      `?initialInvestment=${investmentAmount}`,
    {},
  );

export const portfolioFollowService = (url, data, header) =>
  request.postWithToken(
    constant.portfoliosDetail + url + constant.followPortfolio,
    data,
    header,
  );

export const createPortfolioService = obj =>
  request.postWithToken(constant.createPortfolio, obj);

export const editPortfolioService = (portfolioId, obj) =>
  request.putWithToken(constant.editPortfolio + portfolioId, obj);

export const getWebTradersDataService = () =>
  request.getWithToken(constant.getPerformance);

export const unfollowPortfolioService = (portfolioId, obj) =>
  request.postWithToken(
    constant.portfoliosDetail + portfolioId + '/unfollow',
    obj,
  );
