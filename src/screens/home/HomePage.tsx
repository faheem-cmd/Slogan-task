import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../common/color';
import MainText from '../../components/MainText';
import {getUserType} from '../../common/functions/CheckUser';
import {GlobalSize, fontSize, height} from '../../common/responsive';

import Menu from '../../assets/svg/Menu.svg';
import Bell from '../../assets/svg/Bell.svg';
import Search from '../../assets/svg/Search.svg';
import ViewAll from '../../assets/svg/Group.svg';

import Calendar from '../../assets/svg/Calander.svg';
import Dot from '../../assets/svg/Dot.svg';
import Like from '../../assets/svg/Comment.svg';
import Comment from '../../assets/svg/Like.svg';
import Plus from '../../assets/svg/Plus.svg';

import HomeHeader from '../../components/Header/HomeHeader';
import Fonts from '../../common/font';
import SearchBox from '../../components/SearchBox';
import {postData} from '../../api/request/postApi';
import {imageUrl} from '../../api/axios';
import {DrawerActions} from '@react-navigation/native';
import CommentModal from '../../components/Modal/CommentModal';

const HomePage = ({navigation}: {navigation: any}) => {
  const [post, setPost] = useState<any[]>([]);
  const [user, setUser] = useState<null | any>(null);

  const [postId, setPostId] = useState<any>(null);
  const [commentModal, setCommentModal] = useState<boolean>(false);

  async function userType() {
    try {
      const user = await getUserType();
      setUser(user);
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  }

  const getPosts = async () => {
    try {
      const result = await postData.getPost();

      if (result?.data?.status == 200) {
        setPost(result.data.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    userType();
  }, []);

  const handleCommentSection = (item: any) => {
    setPostId(item.id);
    setCommentModal(true);
  };

  const RenderItem = (data: any) => {
    const {item, index} = data;

    return (
      <Pressable
        style={styles.topContainer}
        onPress={() => navigation.navigate('ViewPost', {item: item})}>
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
                  <Calendar height={GlobalSize(15)} width={GlobalSize(15)} />
                </View>
              </View>
              <View style={styles.bottom}>
                <TouchableOpacity
                  hitSlop={styles.slop}
                  style={styles.commentWrapper}
                  onPress={() => handleCommentSection(item)}>
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
        <View
          style={{
            paddingVertical: GlobalSize(9),
            paddingHorizontal: GlobalSize(17),
          }}>
          <MainText txtStyle={styles.details}>Details</MainText>
          <MainText txtStyle={styles.detailsContent}>{item?.content}</MainText>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{margin: 2}}>
          <HomeHeader openDrawer={() => navigation.openDrawer()} />
          <SearchBox />
          <View style={styles.viewAll}>
            <ViewAll />
            <MainText txtStyle={styles.font}>All post</MainText>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={post}
          renderItem={RenderItem}
          contentContainerStyle={styles.flatlist}
          ItemSeparatorComponent={() => (
            <View style={{height: GlobalSize(10)}} />
          )}
          ListFooterComponent={() => <View style={{height: GlobalSize(300)}} />}
          // keyExtractor={item => item?.id}
        />
      </View>
      {user == 'company' ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.fabIcon}
          onPress={() => navigation.navigate('AddPost')}>
          <Plus />
        </TouchableOpacity>
      ) : null}
      <CommentModal
        isVisible={commentModal}
        onClose={() => setCommentModal(false)}
        postId={postId}
      />
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    padding: GlobalSize(17),
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
    borderWidth: 1,
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
    fontSize: fontSize(11),
    lineHeight: GlobalSize(15),
  },
  detailsContent: {
    marginTop: GlobalSize(4),
    color: '#000',
    fontFamily: Fonts.PP300,
    fontSize: fontSize(11),
    lineHeight: GlobalSize(15),
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
