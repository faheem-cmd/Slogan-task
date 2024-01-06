import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle, TextProps, View} from 'react-native';

import Fonts from '../../common/font';
import {COLORS} from '../../common/color';

interface MainTextProps extends TextProps {
  children: ReactNode;
  txtStyle?: TextStyle;
}

const MainText: React.FC<MainTextProps> = ({children, txtStyle, ...rest}) => {
  return (
    <Text style={[styles.text, txtStyle]} {...rest} allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default MainText;

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.NS500,
    color: COLORS.textDark,
  },
});
