import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Profile, List, Gap} from '../../components';
import {colors, getData, showError, showSuccess} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {Firebase} from '../../config';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      res.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const logout = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        showSuccess('log out Success');
        navigation.replace('GetStarted');
      })
      .catch(error => {
        showError(error.showMessage);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          avatar={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        icon="edit-profile"
        name="Edit Profil"
        desc="Last Update Yasterday"
        type="next"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        icon="language"
        name="Language"
        desc="Last Update Yasterday"
        type="next"
      />
      <List icon="rate" name="Rate" desc="Last Update Yasterday" type="next" />
      <List
        icon="help"
        name="Logout"
        desc="Exit MyDoctor App"
        type="next"
        onPress={logout}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
