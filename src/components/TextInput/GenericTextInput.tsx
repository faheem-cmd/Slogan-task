import React from 'react';
import {StyleSheet, TextInputProps, TouchableOpacity, View} from 'react-native';
import {GlobalSize, fontSize} from '../../common/responsive';
import {COLORS} from '../../common/color';
import {TextInput} from 'react-native-gesture-handler';
import MainText from '../MainText';
import Fonts from '../../common/font';

import Eye from '../../assets/svg/Eye.svg';

interface GenericTextInputProps extends TextInputProps {
  buttonStyle?: any;
  isPassword?: boolean;
  placeholder?: string;
  enableEmailLogin?: boolean;
  changeMode?: () => void;
  isSecure?: boolean;
  showPassword?: () => void;
}
const GenericTextInput: React.FC<GenericTextInputProps> = ({...props}) => {
  const {
    placeholder,
    isPassword,
    buttonStyle,
    enableEmailLogin,
    changeMode,
    isSecure,
    showPassword,
  } = props;
  return (
    <View
      style={[
        isPassword ? styles.inputContainerReverse : styles.inputContainer,
        buttonStyle,
      ]}>
      <TouchableOpacity
        style={styles.buttonIcon}
        activeOpacity={0.6}
        onPress={isPassword ? showPassword : changeMode}>
        {isPassword ? (
          <Eye height={24} width={24} />
        ) : (
          <MainText txtStyle={styles.phone}>
            {enableEmailLogin ? '@' : '1+'}
          </MainText>
        )}
      </TouchableOpacity>
      <TextInput
        secureTextEntry={isSecure}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={'rgba(153, 153, 153, 1)'}
        allowFontScaling={false}
        {...props}
      />
    </View>
  );
};

export default GenericTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: GlobalSize(58),
    borderWidth: 1,
    borderRadius: GlobalSize(100),
    borderColor: COLORS.border,
    paddingHorizontal: GlobalSize(5.6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerReverse: {
    width: '100%',
    height: GlobalSize(58),
    borderWidth: 1,
    borderRadius: GlobalSize(100),
    borderColor: COLORS.border,
    paddingHorizontal: GlobalSize(5.6),
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    // backgroundColor: 'red',
    flex: 1,
    fontFamily: Fonts.NS400,
    fontSize: fontSize(16.7),
    color: COLORS.textDark,
    paddingHorizontal: GlobalSize(14.12),
  },
  buttonIcon: {
    height: GlobalSize(49),
    width: GlobalSize(49),
    borderRadius: 200,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(238, 238, 238, 1)',
  },
  phone: {
    color: 'rgba(255, 158, 27, 1)',
    fontFamily: Fonts.NS600,
    fontSize: fontSize(15),

    lineHeight: GlobalSize(19),
    textAlign: 'center',
  },
});
