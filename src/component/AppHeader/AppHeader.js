import React from 'react';
import {
  MainWrapper,
  SubWrapper,
  TopViewWrapper,
  CenterText,
  BackScreenWrapper,
  InnerImageNavBar,
  InnerRightImageNavBar,
  FullWrapContainer,
  RightWrapContainer,
  RightContainer,
} from './styled';
import TitleText from '../TitleText/TitleText';
import constant from '../../helper/constant';
import { connect } from 'react-redux';

const NavBar = props => {
  const {
    backScreenName,
    onPressClose,
    rightImage,
    onPressBack,
    rightTitle,
    onPressRight,
    disabled,
    isHide,
  } = props;

  const renderRightSide = () => {
    return (
      <RightContainer onPress={onPressRight}>
        {rightTitle && (
          <RightWrapContainer onPress={onPressRight}>
            <TitleText
              color={constant.lightWhiteColor}
              fontSize={'14px'}
              text={rightTitle}
              hideText={disabled}
            />
          </RightWrapContainer>
        )}
        {rightImage && (
          <RightWrapContainer onPress={onPressRight}>
            <InnerRightImageNavBar source={{ uri: props.rightImage }} />
          </RightWrapContainer>
        )}
      </RightContainer>
    );
  };

  return (
    <MainWrapper
      height={constant.headerHeight + props.safeAreaInsetsData.top}
      paddingTop={props.safeAreaInsetsData.top}
      backgroundColor={props.backgroundColor}>
      {!isHide && (
        <SubWrapper>
          <TopViewWrapper>
            {backScreenName && (
              <CenterText textAlign={props.textAlign}>
                <TitleText
                  color={constant.lightWhiteColor}
                  fontSize={'14px'}
                  text={props.backScreenName}
                />
              </CenterText>
            )}
          </TopViewWrapper>
          {onPressClose && (
            <BackScreenWrapper onPress={onPressClose}>
              <InnerImageNavBar source={{ uri: 'icon_close' }} />
            </BackScreenWrapper>
          )}
          {backScreenName && (
            <BackScreenWrapper onPress={onPressBack}>
              <InnerImageNavBar source={{ uri: 'arrow_back' }} />
            </BackScreenWrapper>
          )}
          <FullWrapContainer />
          {renderRightSide()}
        </SubWrapper>
      )}
    </MainWrapper>
  );
};

const mapStateToProps = state => {
  return {
    safeAreaInsetsData: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(NavBar);
