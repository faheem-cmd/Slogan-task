import React from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../common/color';

import BackButton from '../../assets/svg/Back.svg';
import MainText from '../../components/MainText';
import {GlobalSize, fontSize} from '../../common/responsive';
import Fonts from '../../common/font';

const CommonHeader: React.FC<any> = ({...props}) => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity style={styles.header} onPress={onPress}>
      <BackButton />
      <MainText txtStyle={styles.title}>{title}</MainText>
      <View style={{flex: 0.2}} />
    </TouchableOpacity>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: Fonts.PP500,
    fontSize: fontSize(20),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: GlobalSize(17),
  },
});
