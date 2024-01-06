import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Linking,
  Platform,
  SafeAreaView,
  SafeAreaViewBase,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../common/color';

import {GlobalSize, fontSize} from '../../common/responsive';
import MainText from '../../components/MainText';
import Fonts from '../../common/font';

import Logo from '../../assets/svg/Logo.svg';

import Button from '../../components/Button';

const WindowWidth = Dimensions.get('window').width;

const WelcomePage = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.subContainer}>
          <View>
            <Logo width={WindowWidth} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <MainText txtStyle={styles.title}>Welcome Back!</MainText>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'Company'}
            onPress={() => navigation.navigate('LoginPage')}
          />
          <Button
            title={'Normal User'}
            onPress={() => navigation.navigate('LoginPage')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    padding: GlobalSize(27),
  },
  title: {
    fontFamily: Fonts.NS700,
    fontSize: fontSize(25),
    // lineHeight: GlobalSize(19),
    textAlign: 'center',
    color: COLORS.primary,
    // marginTop: GlobalSize(45),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  awareView: {
    flexGrow: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: GlobalSize(27),
    marginBottom: GlobalSize(27),
    justifyContent: 'flex-end',
  },
});
