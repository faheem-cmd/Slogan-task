import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Linking,
  Platform,
  Pressable,
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
import LoginLogo from '../../assets/svg/Login.svg';
import ChevronRight from '../../assets/svg/ChevronRight.svg';
import QuestionMARK from '../../assets/svg/Vector.svg';

import Button from '../../components/Button';
import GenericTextInput from '../../components/TextInput/GenericTextInput';
import SignInModal from '../../components/Modal/SignInModal';
import {user} from '../../api/request/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserType, setUserType} from '../../common/functions/CheckUser';

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

const LoginPage = ({navigation}: {navigation: any}) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [enableEmailLogin, setEnableEmailLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      let data = {email: email, password: Number(password)};
      const result = await user.loginApi(data);
      if (result?.data) {
        let userType = result?.data?.user_type == '0' ? 'company' : 'user';
        await AsyncStorage.setItem('Token', result?.data?.success?.token);
        await setUserType(userType);
        navigation.reset({
          index: 0,
          routes: [{name: 'DrawerNavigator'}],
        });
      }
    } catch (error) {
      Alert.alert('Invalid Credentials');
    }
  };

  const getuser = getUserType;

  //      await AsyncStorage.setItem('Tokens', JSON.stringify(data?.tokens));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        automaticallyAdjustKeyboardInsets={true}
        enableResetScrollToCoords={true}
        extraHeight={WindowHeight / 2.65}
        enableOnAndroid={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.awareView}
        keyboardShouldPersistTaps="always">
        <View style={{marginTop: GlobalSize(10)}}>
          <LoginLogo width={WindowWidth} height={WindowWidth} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <View>
              <MainText txtStyle={styles.title}>Welcome Back!</MainText>
              <MainText txtStyle={styles.subTitle}>
                Sign in using phone number
              </MainText>
            </View>
            <TouchableOpacity
              style={styles.QnMark}
              hitSlop={styles.slop}
              onPress={() => setShowInfoModal(true)}>
              <MainText txtStyle={styles.QnText}>?</MainText>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <GenericTextInput
              placeholder={
                enableEmailLogin
                  ? 'Enter your email address'
                  : 'Enter phone number'
              }
              isPassword={false}
              enableEmailLogin={enableEmailLogin}
              changeMode={() => setEnableEmailLogin(!enableEmailLogin)}
              onChangeText={(e: any) => setEmail(e.trim())}
              defaultValue={email}
            />
            <GenericTextInput
              placeholder={'Enter your password'}
              isPassword={true}
              buttonStyle={styles.buttonPassword}
              isSecure={showPassword}
              showPassword={() => setShowPassword(!showPassword)}
              onChangeText={(e: any) => setPassword(e.trim())}
              defaultValue={password}
            />
            <Pressable
              style={styles.captionContainer}
              onPress={() => setEnableEmailLogin(!enableEmailLogin)}>
              <MainText style={styles.caption}>
                {enableEmailLogin
                  ? 'or sign in using phone'
                  : 'or sign in using email'}
              </MainText>
            </Pressable>
          </View>
          <TouchableOpacity
            style={styles.buttonContainerSignIn}
            onPress={() => handleLogin()}>
            <MainText txtStyle={styles.signInText}>Sign In</MainText>
            <View style={styles.buttonIcon}>
              <ChevronRight />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height: GlobalSize(80)}} />
      </KeyboardAwareScrollView>
      <SignInModal
        isVisible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </SafeAreaView>
  );
};

export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    paddingHorizontal: GlobalSize(26),
  },
  title: {
    fontFamily: Fonts.NS700,
    fontSize: fontSize(25),
    color: COLORS.primary,
    // marginTop: GlobalSize(45),
  },
  subTitle: {
    fontFamily: Fonts.NS400,
    fontSize: fontSize(16.6),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.primary,
    marginTop: GlobalSize(5),
  },
  textContainer: {
    // flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  inputContainer: {
    marginTop: GlobalSize(8),
  },
  buttonPassword: {
    marginTop: GlobalSize(10.28),
  },
  caption: {
    fontFamily: Fonts.NS400,
    fontSize: fontSize(14),
    letterSpacing: GlobalSize(-0.348),
    color: '#6C6C6C',

    textDecorationLine: 'underline',
  },
  captionContainer: {
    alignItems: 'flex-end',
    marginTop: GlobalSize(6),
  },
  buttonContainerSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GlobalSize(29),
    paddingRight: GlobalSize(3),
  },
  buttonIcon: {
    height: GlobalSize(59),
    width: GlobalSize(59),
    borderRadius: 200,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontFamily: Fonts.PP600,
    fontSize: fontSize(18),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.primary,
  },
  QnMark: {
    height: GlobalSize(21),
    width: GlobalSize(21),
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(10),
  },
  QnText: {
    fontFamily: Fonts.NS700,
    fontSize: fontSize(15),
    color: 'white',
  },
  slop: {
    left: GlobalSize(50),
    right: GlobalSize(50),
    bottom: GlobalSize(50),
    top: GlobalSize(50),
  },
});
