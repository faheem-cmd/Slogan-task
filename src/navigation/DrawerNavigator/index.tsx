import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalSize, fontSize} from '../../common/responsive';
import HomePage from '../../screens/home/HomePage';
import LoginPage from '../../screens/auth/LoginPage';
import {COLORS} from '../../common/color';
import MainText from '../../components/MainText';
import Fonts from '../../common/font';

import QnMark from '../../assets/svg/QnMark.svg';
import Logout from '../../assets/svg/Logout.svg';
import Cheveron from '../../assets/svg/Chevron.svg';
import AddPost from '../../screens/home/AddPost';
import ViewPost from '../../screens/home/ViewPost';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}: {navigation: any}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          onPress={() => navigation.goBack()}
          navigation={navigation}
        />
      )}
      // overlayColor={'transparent'}
      screenOptions={{
        swipeEnabled: false,
        drawerStyle: {
          width: Dimensions.get('window').width - GlobalSize(80),
          backgroundColor: 'transparent',
        },
        overlayColor: 'rgba(0, 27, 84, 0.4)',
        drawerHideStatusBarOnOpen: false,
        drawerStatusBarAnimation: 'slide',
        // borderTopRightRadius: GlobalSize(30),
        // borderBottomRightRadius: GlobalSize(30),
      }}>
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false, drawerItemStyle: {height: 0}}}
      />
      <Drawer.Screen
        name="ViewPost"
        component={ViewPost}
        options={{headerShown: false, drawerItemStyle: {height: 0}}}
      />
      <Drawer.Screen
        name="AddPost"
        component={AddPost}
        options={{headerShown: false, drawerItemStyle: {height: 0}}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const CustomDrawerContent: React.FC<any> = ({...props}) => {
  const {navigation, onPress} = props;
  const list = [
    {id: 1, name: 'Reward Histoy', icon: <QnMark />},
    {id: 2, name: 'Log out', icon: <Logout />},
  ];

  const handleItem = async (item: any) => {
    if (item.id == 2) {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginPage'}],
      });
      await AsyncStorage.clear();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={onPress}>
        <Cheveron />
      </TouchableOpacity>
      <View style={{marginTop: GlobalSize(23)}}>
        <View style={styles.column}>
          <Image
            // source={{
            //   // uri: `${imageUrl}company/images/${item.company.image}`,
            // }}
            source={require('../../assets/svg/amazon.png')}
            style={styles.logo}
          />
          <View>
            <MainText txtStyle={styles.name}>Amazon</MainText>
            <MainText txtStyle={styles.email}>amazone@gmail.com</MainText>
          </View>
        </View>
        <View style={styles.parentView}>
          {list.map((item: any) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleItem(item)}>
              {item.icon}
              <MainText txtStyle={styles.list}>{item.name}</MainText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: GlobalSize(21),
  },

  logo: {
    height: GlobalSize(60),
    width: GlobalSize(60),
    resizeMode: 'contain',
    borderRadius: 200,
  },
  name: {
    fontFamily: Fonts.PP500,
    fontSize: fontSize(18),
    color: '#000',
  },
  email: {
    fontFamily: Fonts.PP300,
    fontSize: fontSize(13),
    color: 'rgba(124, 124, 124, 1)',
    lineHeight: 15,
  },
  list: {
    fontFamily: Fonts.PP400,
    fontSize: fontSize(20),
    color: '#757575',
    top: GlobalSize(1),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: GlobalSize(30),
    marginBottom: GlobalSize(25),
  },
  parentView: {
    paddingHorizontal: GlobalSize(25),
    marginTop: GlobalSize(40),
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: GlobalSize(13),
  },
});
