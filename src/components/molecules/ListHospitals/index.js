import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts} from '../../../utils';

const ListHospitals = ({type, name, adress, pic}) => {
  return (
    <View style={styles.content}>
      <Image source={pic} style={styles.picture} />
      <View>
        <Text style={styles.title}> {type}</Text>
        <Text style={styles.title}> {name}</Text>
        <Text style={styles.adress}>{adress} </Text>
      </View>
    </View>
  );
};

export default ListHospitals;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  picture: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  adress: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6,
  },
});
