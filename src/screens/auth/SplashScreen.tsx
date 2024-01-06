import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainText from '../../components/MainText/index.tsx';
import {COLORS} from '../../common/color/index.ts';
import Fonts from '../../common/font/index.ts';
import {fontSize} from '../../common/responsive/index.tsx';

const SplashScreen = ({navigation}: {navigation: any}) => {
  const goToCarSelection = async () => {
    let token = await AsyncStorage.getItem('Token');
    if (token) {
      navigation.reset({
        index: 0,
        routes: [{name: 'DrawerNavigator'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'WelcomePage'}],
      });
    }
  };

  let opacity = useRef(new Animated.Value(1));
  useEffect(() => {
    showLoading();
  }, []);

  const showLoading = () => {
    Animated.timing(opacity.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 600,
      delay: 600,
    }).start(() => {
      goToCarSelection();
    });
  };
  return (
    <View style={styles.container}>
      <MainText txtStyle={styles.text}>Slogan</MainText>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.PP600,
    fontSize: fontSize(30),
    color: COLORS.primary,
    letterSpacing: 2,
  },
});

// navigation.reset({
//   index: 0,
//   routes: [{name: 'DriveInfosAdded', params: {data}}],
// });
