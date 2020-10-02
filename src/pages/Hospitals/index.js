import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {fonts, colors} from '../../utils';
import {
  ILHospitalBG,
  DummyHospital1,
  DummyHospital2,
  DummyHospital3,
} from '../../assets';
import {ListHospitals} from '../../components';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}> Hospitals</Text>
        <Text style={styles.desc}> 3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospitals
          type="Rumah Sakit"
          name="Siloam"
          adress="Jl Merbabu no 792"
          pic={DummyHospital1}
        />
        <ListHospitals
          type="Rumah Sakit Jiwa"
          name="Duren Sawit"
          adress="Jl gatot subroto no 792"
          pic={DummyHospital2}
        />
        <ListHospitals
          type="Rumah Sakit"
          name="Anna Medika"
          adress="Jl jd sudirman no 792"
          pic={DummyHospital3}
        />
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
