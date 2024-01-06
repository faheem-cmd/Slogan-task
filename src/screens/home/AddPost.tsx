import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  Alert,
} from 'react-native';
import {COLORS} from '../../common/color';

import BackButton from '../../assets/svg/Back.svg';
import Down from '../../assets/svg/Down.svg';

import MainText from '../../components/MainText';
import {GlobalSize, fontSize} from '../../common/responsive';
import Fonts from '../../common/font';
import CommonHeader from '../../components/Header/CommonHeader';
import {postData} from '../../api/request/postApi';

import ImagePicker from 'react-native-image-crop-picker';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddPost = ({navigation}: {navigation: any}) => {
  const [category, setCategoty] = useState<any[]>([]);
  const [showDrpdown, setShowDropDown] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>({
    id: null,
    name: 'Select Category',
  });
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<any>(null);

  const getCategories = async () => {
    try {
      const result = await postData.getCategory();
      if (result.status == 200) {
        setCategoty(result.data.company_categories);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDropDown = () => {
    setShowDropDown(!showDrpdown);
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
  };
  const handleClickCategory = (item: any) => {
    setSelectedCategory({id: item.id, name: item.name});
    setShowDropDown(!showDrpdown);
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then((res: any) => {
        setImage(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createPost = async () => {
    try {
      let data = {
        company_category_id: selectedCategory.id,
        content: content,
        Image: image,
        end_date: '2025-07-30 04:17:35',
      };
      const result = await postData.createNewPost(data);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title={'Upload Post'} onPress={() => navigation.goBack()} />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.subContainer}>
          <Pressable
            style={
              image == null
                ? styles.imageContainer
                : styles.imageContainerInactive
            }
            onPress={pickImage}>
            {image == null ? (
              <MainText txtStyle={styles.select}>Select Image</MainText>
            ) : (
              <Image
                source={{uri: image.path}}
                style={{
                  height: null,
                  width: null,
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />
            )}
          </Pressable>
          <TouchableOpacity
            style={styles.dowpDownContainer}
            onPress={() => handleDropDown()}>
            <MainText txtStyle={styles.categoryTitle}>
              {selectedCategory.name}
            </MainText>
            <Down />
          </TouchableOpacity>
          {showDrpdown && (
            <View style={styles.drop}>
              <ScrollView nestedScrollEnabled>
                {category?.map((item: any, index: number) => (
                  <TouchableOpacity
                    style={styles.dropDown}
                    onPress={() => handleClickCategory(item)}>
                    <View style={{paddingHorizontal: GlobalSize(18)}}>
                      <MainText
                        txtStyle={{
                          color: COLORS.textDark,
                          fontFamily: Fonts.PP300,
                        }}>
                        {item.name}
                      </MainText>
                    </View>
                    {index !== category?.length - 1 && (
                      <View style={styles.border} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <View style={styles.descriptionDownContainer}>
            <TextInput
              style={{
                padding: 0,
                flex: 1,
                color: COLORS.textDark,
                fontFamily: Fonts.PP300,
              }}
              placeholder="Description"
              textAlignVertical="top"
              multiline={true}
              onChangeText={(e: any) => setContent(e)}
            />
          </View>
          <TouchableOpacity
            disabled={true}
            style={styles.dowpDownContainer}
            onPress={() => handleDropDown()}>
            <MainText txtStyle={styles.categoryTitle}>Set a timer</MainText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}>
              <View style={styles.round}>
                <MainText txtStyle={styles.categoryTitle}>05</MainText>
              </View>
              <MainText>:</MainText>

              <View style={styles.round}>
                <MainText txtStyle={styles.categoryTitle}>12</MainText>
              </View>
              <MainText>:</MainText>
              <View style={styles.round}>
                <MainText txtStyle={styles.categoryTitle}>00</MainText>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => createPost()}
              style={{
                width: '100%',
                height: GlobalSize(68),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: GlobalSize(8),
                marginTop: GlobalSize(100),
              }}>
              <MainText txtStyle={styles.buttonText}>Upload</MainText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPost;

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
  subContainer: {
    padding: GlobalSize(17),
    marginTop: GlobalSize(4),
  },
  imageContainer: {
    height: GlobalSize(184),
    width: '100%',
    borderRadius: GlobalSize(25),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: ' rgba(191, 191, 191, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainerInactive: {
    height: GlobalSize(184),
    width: '100%',
    borderRadius: GlobalSize(25),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: ' rgba(191, 191, 191, 1)',
  },
  dowpDownContainer: {
    height: GlobalSize(52),
    width: '100%',
    borderRadius: GlobalSize(25),
    borderWidth: 1,
    borderColor: ' rgba(191, 191, 191, 1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GlobalSize(14),
    flexDirection: 'row',
    paddingHorizontal: GlobalSize(17),
  },
  descriptionDownContainer: {
    minHeight: GlobalSize(128),
    width: '100%',
    borderRadius: GlobalSize(25),
    borderWidth: 1,
    borderColor: ' rgba(191, 191, 191, 1)',
    marginTop: GlobalSize(14),
    padding: GlobalSize(17),
  },
  dropDown: {
    paddingVertical: GlobalSize(18),
  },
  drop: {
    width: '100%',
    maxHeight: GlobalSize(240),
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(191, 191, 191, 1)',
    marginTop: GlobalSize(5),
  },
  select: {
    color: 'rgba(142, 141, 141, 1)',
    fontFamily: Fonts.PP300,
  },
  round: {
    height: GlobalSize(40),
    width: GlobalSize(50),
    borderRadius: GlobalSize(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(191, 191, 191, 1)',
  },
  buttonText: {
    fontFamily: Fonts.PP500,
    fontSize: fontSize(18),
    letterSpacing: GlobalSize(-0.348),
    color: COLORS.background,
  },
  categoryTitle: {
    fontFamily: Fonts.PP300,
    fontSize: fontSize(14),
    color: 'rgba(9, 9, 9, 1)',
  },
  border: {
    height: 1,
    backgroundColor: 'rgba(191, 191, 191, 1)',
    width: '100%',
    marginTop: 10,
  },
});
