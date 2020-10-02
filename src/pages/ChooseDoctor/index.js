import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../components';
import {colors, showError} from '../../utils';
import {Firebase} from '../../config';

const ChooseDoctor = ({navigation, route}) => {
  const itemCategory = route.params;
  const [listDoctors, setListDoctors] = useState([]);
  useEffect(() => {
    callDoctorsByCategory(itemCategory.category);
  }, [itemCategory.category]);
  const callDoctorsByCategory = category => {
    Firebase.database()
      .ref('doctors/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then(res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          setListDoctors(data);
        }
      })
      .catch(error => {
        showError(error.messages);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        onPress={() => navigation.goBack()}
        type="dark"
        title={`Pilih ${itemCategory.category}`}
      />
      {listDoctors.map(doctor => {
        return (
          <List
            key={doctor.id}
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            type="next"
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
