import styled from 'styled-components/native';
import constant from '../../helper/constant';

export const MainWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${props => props.backgroundColor || constant.headerBGColor};
  height: ${props => (props.height ? props.height : '6%')};
  padding-top: ${props => (props.paddingTop ? props.paddingTop : '0px')};
`;

export const SubWrapper = styled.View`
  flex: 1px;
  flex-direction: row;
`;

export const TopViewWrapper = styled.View`
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  position: absolute;
  justify-content: center;
`;

export const CenterText = styled.Text`
  margin-horizontal: 52px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
`;

export const BackScreenWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  left: 15px;
`;

export const RightContainer = styled.View`
  justify-content: center;
`;

export const InnerImageNavBar = styled.Image`
  height: 24px;
  width: 24px;
  resize-mode: contain;
`;

export const InnerRightImageNavBar = styled.Image`
  height: 20px;
  width: 28px;
  resize-mode: contain;
`;

export const FullWrapContainer = styled.Image`
  flex: 1px;
`;

export const RightWrapContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  right: 15px;
`;
