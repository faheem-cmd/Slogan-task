import React, {useEffect, useRef, useState} from 'react';
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
import {postData} from '../../api/request/postApi';

interface ModalProps extends TextInputProps {
  onClose?: () => void;
  isVisible: boolean;
  postId?: any;
}

const CommentModal: React.FC<ModalProps> = ({...props}) => {
  const {onClose, isVisible, postId} = props;

  const [comments, setComments] = useState<any>([]);
  const [text, setText] = useState<any>('');

  useEffect(() => {
    setText('');
    getComments();
  }, [postId]);

  const getComments = async () => {
    try {
      let data = {post_id: '89'};
      const result = await postData.getCommentsByPost(data);
      console.log(result.data.data, 'sss');
      setComments(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      //   backdropColor={'rgba(98, 88, 88, 1)'}
      onBackdropPress={onClose}
      useNativeDriver={true}
      style={styles.modal}>
      <View style={styles.container}>
        <MainText txtStyle={styles.title}>Comments</MainText>
        <View style={{margin: GlobalSize(15)}}>
          {comments.map((item: any) => (
            <View style={{marginBottom: GlobalSize(10)}}>
              <MainText txtStyle={styles.title2}>
                {item.creator.first_name}
              </MainText>
              <MainText txtStyle={styles.title3}>{item.slogan}</MainText>
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add your comment"
            placeholderTextColor={COLORS.textDark}
            defaultValue={text}
            onChangeText={e => setText(e)}
          />
          <TouchableOpacity
            hitSlop={styles.slop}
            onPress={() => {
              setComments((prevData: any) => [
                ...prevData,
                ...[
                  {
                    id: 1,
                    creator: {first_name: 'Muhammed Faheem'},
                    slogan: text,
                  },
                ],
              ]);
            }}>
            <MainText
              txtStyle={{fontFamily: Fonts.PP700, color: COLORS.primary}}>
              Send
            </MainText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    // height: 223,
    borderTopLeftRadius: GlobalSize(30),
    borderTopRightRadius: GlobalSize(30),
    paddingVertical: GlobalSize(32),
    paddingHorizontal: GlobalSize(29),
    flex: 0.7,
  },
  modal: {justifyContent: 'flex-end', margin: 0},
  title: {
    fontFamily: Fonts.NS700,
    fontSize: fontSize(18),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.primary,
  },
  title2: {
    fontFamily: Fonts.NS600,
    fontSize: fontSize(16),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.textDark,
  },
  title3: {
    fontFamily: Fonts.NS400,
    fontSize: fontSize(13),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.grey,
  },
  desription: {
    fontFamily: Fonts.PP600,
    fontSize: fontSize(14),
    letterSpacing: GlobalSize(-0.348),
    color: '#6C6C6C',
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
  input: {
    padding: 0,
    color: 'black',
    flex: 1,
    paddingHorizontal: GlobalSize(10),
  },
  inputContainer: {
    width: '100%',
    height: GlobalSize(50),
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: GlobalSize(20),
    position: 'absolute',
    alignSelf: 'center',
    bottom: GlobalSize(20),
  },
  slop: {
    left: GlobalSize(50),
    right: GlobalSize(50),
    bottom: GlobalSize(50),
    top: GlobalSize(50),
  },
});
