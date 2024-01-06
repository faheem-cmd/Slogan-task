import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../common/color';
import {GlobalSize, fontSize} from '../../common/responsive';
import MainText from '../../components/MainText';

import ViewAll from '../../assets/svg/Group.svg';

import Calendar from '../../assets/svg/Calander.svg';
import Like from '../../assets/svg/Comment.svg';
import Dot from '../../assets/svg/Dot.svg';
import Comment from '../../assets/svg/Like.svg';

import Fonts from '../../common/font';
import HomeHeader from '../../components/Header/HomeHeader';
import SearchBox from '../../components/SearchBox';
import CommonHeader from '../../components/Header/CommonHeader';
import {imageUrl} from '../../api/axios';

const ViewPost = ({route, navigation}: {route: any; navigation: any}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title={'View Post'} onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.topContainer}>
            <View style={styles.parentContainer}>
              <ImageBackground
                source={{uri: `${imageUrl}posts/images/${item.image}`}}
                // source={require('../../assets/images/im.png')}
                imageStyle={styles.image}
                style={styles.backgroundImage}>
                <View style={styles.imageLayout}>
                  <View style={styles.wrapper}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: `${imageUrl}company/images/${item.company.image}`,
                        }}
                        // source={require('../../assets/svg/amazon.png')}
                        style={styles.logo}
                      />
                      <View>
                        <MainText txtStyle={styles.title} numberOfLines={2}>
                          {item?.company?.company_name}
                        </MainText>
                        <MainText txtStyle={styles.subTitle}>
                          Updated 4 hrs
                        </MainText>
                      </View>
                    </View>
                    <View style={styles.dotWrapper}>
                      <Dot height={GlobalSize(20)} width={GlobalSize(20)} />
                      <View style={{width: GlobalSize(6)}} />
                      <View>
                        <MainText txtStyle={styles.title2}>Remaining</MainText>
                        <MainText txtStyle={styles.subTitle2}>10 Days</MainText>
                      </View>
                      <View style={{width: GlobalSize(15)}} />
                      <Calendar
                        height={GlobalSize(15)}
                        width={GlobalSize(15)}
                      />
                    </View>
                  </View>
                  <View style={styles.bottom}>
                    <TouchableOpacity
                      disabled={true}
                      hitSlop={styles.slop}
                      style={styles.commentWrapper}>
                      <Comment />
                      <MainText txtStyle={{...styles.title3}}>50</MainText>
                    </TouchableOpacity>
                    <View style={styles.commentWrapper}>
                      <MainText txtStyle={styles.title3}>400</MainText>
                      <Like style={{top: -GlobalSize(1)}} />
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View
            style={{
              paddingVertical: GlobalSize(9),
              paddingHorizontal: GlobalSize(17),
            }}>
            <MainText txtStyle={styles.details}>Details</MainText>
            <MainText txtStyle={styles.detailsContent}>
              {item?.content}
            </MainText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    padding: GlobalSize(17),
    marginTop: GlobalSize(30),
  },
  viewAll: {
    paddingHorizontal: GlobalSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: GlobalSize(8),
    marginTop: GlobalSize(27),
  },
  font: {
    fontFamily: Fonts.PP500,
    fontSize: fontSize(15),
    color: COLORS.primary,
    top: GlobalSize(2),
  },
  flatlist: {
    // borderWidth: 1,
    borderRadius: GlobalSize(25),
    paddingVertical: GlobalSize(12),
    paddingHorizontal: GlobalSize(13),
    marginTop: GlobalSize(12.47),
    borderColor: '#D0D0D0',
  },
  logo: {
    height: GlobalSize(41),
    width: GlobalSize(41),
    resizeMode: 'contain',
    borderRadius: 200,
  },
  backgroundImage: {
    height: null,
    width: null,
    flex: 1,
  },
  image: {
    // resizeMode: 'contain',
    borderRadius: GlobalSize(20),
  },
  title: {
    fontFamily: Fonts.PP500,
    fontSize: fontSize(16),
    color: COLORS.background,
    lineHeight: GlobalSize(19),
  },
  subTitle: {
    fontFamily: Fonts.PP400,
    fontSize: fontSize(9),
    color: COLORS.background,
    lineHeight: GlobalSize(15),
  },
  title2: {
    fontFamily: Fonts.PP500,
    fontSize: fontSize(10),
    color: COLORS.background,
    lineHeight: GlobalSize(15),
    top: GlobalSize(3),
  },
  title3: {
    fontFamily: Fonts.PP300,
    fontSize: fontSize(10),
    color: COLORS.background,
    lineHeight: GlobalSize(15),
  },
  subTitle2: {
    fontFamily: Fonts.PP400,
    fontSize: fontSize(8),
    color: COLORS.background,
    lineHeight: GlobalSize(15),
    top: GlobalSize(-0.5),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: GlobalSize(15),
    width: '50%',
    justifyContent: 'flex-start',
  },
  dotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: GlobalSize(41),
  },
  commentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: GlobalSize(5),
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GlobalSize(7),
    position: 'absolute',
    bottom: GlobalSize(14),
    width: '100%',
    alignSelf: 'center',
  },
  topContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderTopWidth: 0,
    borderColor: '#D9D9D9',
  },
  details: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: Fonts.PP500,
    fontSize: fontSize(16),
    // lineHeight: GlobalSize(15),
    marginTop: GlobalSize(20),
  },
  detailsContent: {
    marginTop: GlobalSize(13),
    color: '#000',
    fontFamily: Fonts.PP400,
    fontSize: fontSize(12),
    // lineHeight: GlobalSize(15),
  },
  parentContainer: {height: GlobalSize(178), width: '100%'},
  imageLayout: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
    borderRadius: 20,
    padding: GlobalSize(14),
  },
  fabIcon: {
    height: GlobalSize(55),
    width: GlobalSize(55),
    backgroundColor: COLORS.primary,
    borderRadius: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: GlobalSize(30),
    right: GlobalSize(15),
  },
  slop: {
    left: GlobalSize(50),
    right: GlobalSize(50),
    bottom: GlobalSize(50),
    top: GlobalSize(50),
  },
});
