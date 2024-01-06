import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import MainText from '../MainText';
import {GlobalSize, fontSize} from '../../common/responsive';
import Fonts from '../../common/font';
import {COLORS} from '../../common/color';

import ChevronRight from '../../assets/svg/ChevronRight.svg';
import ChevronMultiple from '../../assets/svg/ChevronMultiple.svg';

interface ButtonProps extends TextStyle {
  buttonStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps | any> = ({...props}) => {
  const {title, titleStyle, onPress} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonIcon}>
        <ChevronRight />
      </View>
      <MainText txtStyle={styles.buttonTitle}>{title}</MainText>
      <ChevronMultiple />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    // height: GlobalSize(58),
    borderWidth: 1,
    borderRadius: GlobalSize(100),
    borderColor: COLORS.border,
    paddingLeft: GlobalSize(5.6),
    paddingRight: GlobalSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: GlobalSize(6),
    marginBottom: GlobalSize(10),
  },
  buttonIcon: {
    height: GlobalSize(49),
    width: GlobalSize(49),
    borderRadius: 200,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontFamily: Fonts.NS400,
    fontSize: fontSize(15),
    // lineHeight: GlobalSize(19),
    textAlign: 'center',
    color: COLORS.primary,
  },
});
