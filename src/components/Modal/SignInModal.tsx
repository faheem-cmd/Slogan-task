import React, {useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  TextInputProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../../common/color';
import MainText from '../MainText';
import {GlobalSize, fontSize} from '../../common/responsive';
import Fonts from '../../common/font';

interface ModalProps extends TextInputProps {
  onClose?: () => void;
  isVisible: boolean;
}

const SignInModal: React.FC<ModalProps> = ({...props}) => {
  const {onClose, isVisible} = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      backdropOpacity={0.75}
      animationIn={'slideInUp'}
      animationOut="slideOutDown"
      animationOutTiming={500}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      backdropColor={'rgba(98, 88, 88, 1)'}
      onBackdropPress={onClose}
      useNativeDriver={true}
      style={styles.modal}>
      <View style={styles.container}>
        <MainText txtStyle={styles.title}>
          What is the sign in process?
        </MainText>
        <View style={styles.descriptionWrapper}>
          <MainText txtStyle={styles.desription}>
            You have to login using your email or phone number and the password
            you have created. If it is validated, you will be redirected to your
            associated role which you have selected at the time of sign up.
          </MainText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <MainText txtStyle={styles.ok}>OK</MainText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SignInModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    // height: 223,
    borderRadius: GlobalSize(30),
    paddingVertical: GlobalSize(32),
    paddingHorizontal: GlobalSize(29),
  },
  modal: {justifyContent: 'flex-end', margin: 0},
  title: {
    fontFamily: Fonts.NS600,
    fontSize: fontSize(14),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.primary,
  },
  desription: {
    fontFamily: Fonts.NS400,
    fontSize: fontSize(14),
    letterSpacing: GlobalSize(-0.348),
    color: '#6C6C6C;',
  },
  descriptionWrapper: {
    marginTop: GlobalSize(19),
  },
  button: {
    borderRadius: GlobalSize(20),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: GlobalSize(9),
    paddingHorizontal: GlobalSize(44),
  },
  ok: {
    fontFamily: Fonts.NS600,
    fontSize: fontSize(14),
    letterSpacing: GlobalSize(-0.348),
    color: 'white',
  },
  buttonContainer: {alignItems: 'center', marginTop: GlobalSize(27)},
});
