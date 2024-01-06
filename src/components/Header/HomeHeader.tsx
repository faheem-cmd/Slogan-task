import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS} from '../../common/color';
import MainText from '../../components/MainText';
import {getUserType} from '../../common/functions/CheckUser';
import {GlobalSize} from '../../common/responsive';

import Menu from '../../assets/svg/Menu.svg';
import Bell from '../../assets/svg/Bell.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeHeader = (props: any) => {
  const {openDrawer} = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer}>
        <Menu />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}>
        <TouchableOpacity>
          <Bell />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Profile.png')}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: GlobalSize(55),
    width: GlobalSize(55),
  },
  image: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 200,
  },
});
