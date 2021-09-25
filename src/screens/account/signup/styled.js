import styled from 'styled-components/native';
import React from 'react';

export const TextBoxContainer = styled.View`
  flex-direction: row;
  margin-top: 48px;
  margin-horizontal: 23px;
`;

export const SignContainer = styled.View`
  flex: 1;
`;

export const PhoneNumberContainer = styled.View`
  margin-horizontal: 12px;
`;

export const TitleContainer = styled.View`
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};
  margin-horizontal: 20px;
  margin-top: 20px;
`;

export const ButtonContainer = styled.View`
  margin-horizontal: 20px;
  margin-top: ${props =>
    (props.apiWaitingTime && props.apiWaitingTime === 0 && '30px') || '0px'};
  margin-bottom: 26px;
`;

export const ErrorContainer = styled.View`
  height: 30px;
  align-items: center;
  margin-top: 10px;
`;
