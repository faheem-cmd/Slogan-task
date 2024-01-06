import React, {useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import Search from '../../assets/svg/Search.svg';
import {COLORS} from '../../common/color';
import Fonts from '../../common/font';
import {fontSize, GlobalSize, height} from '../../common/responsive';

const SearchBox = () => {
  return (
    <View style={styles.serachInputContainer}>
      <Search />
      <TextInput
        style={styles.input}
        placeholder="Search anything"
        placeholderTextColor={'#ABABAB;'}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  serachInputContainer: {
    width: '100%',
    height: GlobalSize(44),
    elevation: 5,
    backgroundColor: COLORS.background,
    borderRadius: GlobalSize(15),
    paddingHorizontal: GlobalSize(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: GlobalSize(26),
    justifyContent: 'center',
  },
  input: {
    padding: 0,
    flex: 1,
    paddingHorizontal: GlobalSize(10),
    fontFamily: Fonts.PP500,
    fontSize: fontSize(16),
    color: '#ABABAB',
    height: GlobalSize(42),
    justifyContent: 'center',
  },
});
