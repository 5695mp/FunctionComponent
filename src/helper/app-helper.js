import React from 'react';
import { Alert, NativeModules } from 'react-native';
import constant from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { AndroidNativeModule } = NativeModules;

export function terms() {
  return [
    {
      text: 'Terms Of Using',
      type: 'header',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, cursus at quis aliquet augue. Quis ante nisl aliquet morbi. Varius nulla turpis viverra velit. Hendrerit volutpat at fermentum adipiscing tempor mattis. Vitae tristique amet aliquet semper massa justo, quisque. Mattis nisl lectus turpis dictum lacus luctus nibh. Cras amet, a blandit malesuada mollis.',
      type: 'default',
    },
    {
      text: 'Sub Header',
      type: 'subheader',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, cursus at quis aliquet augue. Quis ante nisl aliquet morbi. Varius nulla turpis viverra velit. Hendrerit volutpat at fermentum adipiscing tempor mattis. Vitae tristique amet aliquet semper massa justo, quisque. Mattis nisl lectus turpis dictum lacus luctus nibh. Cras amet, a blandit malesuada mollis.',
      type: 'default',
    },
  ];
}

export function privacyPolicy() {
  return [
    {
      text: 'Privacy Policy',
      type: 'header',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, cursus at quis aliquet augue. Quis ante nisl aliquet morbi. Varius nulla turpis viverra velit. Hendrerit volutpat at fermentum adipiscing tempor mattis. Vitae tristique amet aliquet semper massa justo, quisque. Mattis nisl lectus turpis dictum lacus luctus nibh. Cras amet, a blandit malesuada mollis.',
      type: 'default',
    },
    {
      text: 'Sub Header',
      type: 'subheader',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam, cursus at quis aliquet augue. Quis ante nisl aliquet morbi. Varius nulla turpis viverra velit. Hendrerit volutpat at fermentum adipiscing tempor mattis. Vitae tristique amet aliquet semper massa justo, quisque. Mattis nisl lectus turpis dictum lacus luctus nibh. Cras amet, a blandit malesuada mollis.',
      type: 'default',
    },
  ];
}

const onPressLeftPress = res => {
  console.log('not Handle');
};

const onPressRightPress = res => {
  console.log('not Handle');
};

export function showThemeAlert(objAlert) {
  let defaultAlertObj = {
    title: '',
    message: '',
    leftBtn: '',
    rightBtn: '',
    isLightTheme: false,
    leftPress: onPressLeftPress,
    rightPress: onPressRightPress,
    styleLeft: 'default',
    styleRight: 'default',
  };
  Object.assign(defaultAlertObj, objAlert);
  if (constant.isANDROID) {
    // AndroidNativeModule.showThemeAlert
    AndroidNativeModule.showThemeAlert(
      defaultAlertObj.title,
      defaultAlertObj.message,
      defaultAlertObj.leftBtn,
      defaultAlertObj.rightBtn,
      defaultAlertObj.isLightTheme,
      defaultAlertObj.leftPress,
      defaultAlertObj.rightPress,
    );
  } else {
    Alert.alert(defaultAlertObj.title, defaultAlertObj.message, [
      {
        text: defaultAlertObj.leftBtn,
        onPress: defaultAlertObj.leftPress,
        style: defaultAlertObj.styleLeft,
      },
      {
        text: defaultAlertObj.rightBtn,
        onPress: defaultAlertObj.rightPress,
        style: defaultAlertObj.styleRight,
      },
    ]);
  }
}

export function resetAllAsyncStorageData() {
  AsyncStorage.getAllKeys((err, keys) => {
    keys.forEach(key => {
      AsyncStorage.getItem(key).then((err, res) => {});
      AsyncStorage.removeItem(key);
    });
    AsyncStorage.setItem('isPromoPage', 'true');
  });
}

export function getKnowledgeQuestions() {
  return [
    {
      key: '0',
      title: 'Preferred asset classes',
      description: 'What investment asset classes do you prefer to invest in?',
      list: [
        {
          title: 'Equity',
        },
        {
          title: 'Futures & Options',
        },
        {
          title: 'Currencies',
        },
        {
          title: 'Commodities',
        },
      ],
      isMultipleChoice: true,
    },
    {
      key: '1',
      title: 'Trading experience',
      description: 'How many years is your trading experience with',
      descriptionHighLights: 'Equity',
      descriptionEnd: '?',
      list: [
        {
          title: 'Less then 1 year',
        },
        {
          title: '1 year',
        },
        {
          title: '2 years',
        },
        {
          title: '3 years and more',
        },
      ],
    },
    {
      key: '2',
      title: 'Trading experience',
      description: 'How many years is your trading experience with',
      descriptionHighLights: 'Futures & Options',
      descriptionEnd: '?',
      list: [
        {
          title: 'Less then 1 year',
        },
        {
          title: '1 year',
        },
        {
          title: '2 years',
        },
        {
          title: '3 years and more',
        },
      ],
    },
    {
      key: '3',
      title: 'Trading experience',
      description: 'How many years is your trading experience with',
      descriptionHighLights: 'Currencies',
      descriptionEnd: '?',
      list: [
        {
          title: 'Less then 1 year',
        },
        {
          title: '1 year',
        },
        {
          title: '2 years',
        },
        {
          title: '3 years and more',
        },
      ],
    },
    {
      key: '4',
      title: 'Trading experience',
      description: 'How many years is your trading experience with',
      descriptionHighLights: 'Commodities',
      descriptionEnd: '?',
      list: [
        {
          title: 'Less then 1 year',
        },
        {
          title: '1 year',
        },
        {
          title: '2 years',
        },
        {
          title: '3 years and more',
        },
      ],
    },
    {
      key: '5',
      title: 'Trading knowledge assessment',
      description:
        'If the equity in your account falls below the required margin, a “margin call’ will not liquidate your trades. \nIs it right?',
      list: [
        {
          title: 'Yes',
        },
        {
          title: 'No',
        },
      ],
      oneOfTwoChoice: true,
    },
    {
      key: '6',
      title: 'Trading knowledge assessment',
      description:
        'What will happen if you buy NIFTY future, and NIFTY goes down?',
      oneChoice: true,
      list: [
        {
          title: 'I will make a profit',
        },
        {
          title: 'I will have losses',
        },
      ],
    },
    {
      key: '7',
      title: 'Trading knowledge assessment',
      description:
        'My open positions will remain open when the stop loss is triggered',
      list: [
        {
          title: 'It’s Right',
        },
        {
          title: 'No, it’s wrong',
        },
      ],
      oneOfTwoChoice: true,
    },
    {
      key: '8',
      title: 'Trading knowledge assessment',
      description: 'If INR depreciates, which direction USDINR will move in?',
      list: [
        {
          title: 'Up',
        },
        {
          title: 'Down',
        },
      ],
      oneOfTwoChoice: true,
    },
    {
      key: '9',
      title: 'Trading knowledge assessment',
      description:
        'If you have sold a gold future and gold prices go down, you are likely to be in profit or loss?',
      list: [
        {
          title: 'Profit',
        },
        {
          title: 'Loss',
        },
      ],
      oneOfTwoChoice: true,
    },
    {
      key: '10',
      title: 'Prior trading courses or work experience',
      description: 'Mark, please, what best describes your experience',
      list: [
        {
          title: 'Professional certificate or relevant work experience',
        },
        {
          title: 'Academic degree in Financial related field',
        },
        {
          title: 'I have attended Trading Courses',
        },
        {
          title: 'I have no financial knowledge',
        },
      ],
    },
    {
      key: '11',
      title: 'Preferred trading frequency',
      description: 'What trading frequency do you prefer?',
      list: [
        {
          title: 'Intraday',
        },
        {
          title: '1-2 weeks',
        },
        {
          title: '1-3 months',
        },
        {
          title: '3+ months',
        },
      ],
    },
    {
      key: '12',
      title: 'Risk aptitude',
      description: 'What risk aptitude do you prefer?',
      list: [
        {
          title: 'Low risk',
        },
        {
          title: 'Moderate risk',
        },
        {
          title: 'High risk',
        },
      ],
    },
    {
      key: '13',
      title: 'Financial status',
      description: 'What is your annual income?',
      list: [
        {
          title: 'Less than 5 lakhs',
        },
        {
          title: '5–15 lakhs',
        },
        {
          title: '15–50 lakhs',
        },
        {
          title: 'More than 50 lakhs',
        },
      ],
    },
    {
      key: '14',
      title: 'Sources of income',
      description: 'What is your annual income?',
      list: [
        {
          title: 'Less than 5 lakhs',
        },
        {
          title: '5–15 lakhs',
        },
        {
          title: '15–50 lakhs',
        },
        {
          title: 'More than 50 lakhs',
        },
      ],
    },
    {
      key: '15',
      title: 'Sources of income',
      description: 'What is best describes your sources of income?',
      list: [
        {
          title: 'Salary',
        },
        {
          title: 'Investments',
        },
        {
          title: 'Pension',
        },
        {
          title: 'Inheritance',
        },
        {
          title: 'Family financial support',
        },
        {
          title: 'Other',
        },
      ],
    },
    {
      key: '16',
      title: 'Occupation',
      description: 'What is your occupation?',
      list: [
        {
          title: 'Accounting',
        },
        {
          title: 'Architecture/Engineering',
        },
        {
          title: 'Arms Trade & Defense',
        },
        {
          title: 'Arts, Design',
        },
        {
          title: 'Building Construction',
        },
        {
          title: 'Computer / IT Services',
        },
        {
          title: 'Consultancy',
        },
        {
          title: 'Extractive Industry (gas, oil)',
        },
        {
          title: 'Finance Industry',
        },
      ],
    },
  ];
}

export function getCategoryColor(title) {
  switch (title.toLowerCase()) {
    case 'bonds':
      return '#E7B52D';
    case 'commodities':
      return '#00BAE3';
    case 'currencies':
      return '#27C5C1';
    case 'futures & options':
      return '#E72D5F';
    default:
      return '#2D8EE7';
  }
}
export function calculateAge(dob) {
  try {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  } catch (e) {
    return 0;
  }
}

export function dateFormate(dob) {
  try {
    const birthDate = new Date(dob);
    alert(birthDate);

    return birthDate.toString('MM');
  } catch (e) {
    return 0;
  }
}

export function addPriceInPortfolio() {
  return [
    {
      title: '+1000',
      price: '1000',
    },
    {
      title: '+2000',
      price: '2000',
    },
    {
      title: '+5000',
      price: '5000',
    },
  ];
}

export function dateAndTime(dAndTInput) {
  const dAndTStr = dAndTInput.toString();
  const dAndT = new Date(dAndTInput);
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][dAndT.getMonth()];
  const year = dAndTStr.split('-')[0];
  const dates = dAndT.getDate();
  const timeArr = dAndTStr.split('T')[1].split(':');

  const finalTime = timeArr[0] + ':' + timeArr[1];
  const finalDate = month + ' ' + dates + ', ' + year;
  return {
    date: finalDate,
    time: finalTime,
  };
}
