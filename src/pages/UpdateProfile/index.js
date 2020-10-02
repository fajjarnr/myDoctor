import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Gap, Profile, Input, Button} from '../../components';
import {colors, getData, storeData, showError, showSuccess} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {Firebase} from './../../config';
import ImagePicker from 'react-native-image-picker';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photo: ILNullPhoto,
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password must be more than 6 characters');
      } else {
        updatePassword();
        updateDataProfile();
        navigation.replace('MainApp');
      }
    } else {
      updateDataProfile();
      navigation.replace('MainApp');
    }
  };

  const updatePassword = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(error => {
          showError(error.message);
        });
      }
    });
  };
  const updateDataProfile = () => {
    const data = profile;
    data.photo = photoForDB;
    Firebase.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data);

        showSuccess('Profile updated successfully');
      })
      .catch(error => {
        showError(error.message);
      });
  };
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  const getImage = () => {
    ImagePicker.launchImageLibrary(
      {quality: 0.7, maxHeight: 200, maxWidth: 200},
      response => {
        if (response.didCancel || response.error) {
          showError("You didn't choose photos?");
        } else {
          const source = {uri: response.uri};
          setPhotoForDB(`data:${response.type};base64, ${response.data}`);
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Edit Profile" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Profile avatar={photo} isRemove onPress={getImage} />

          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Profession"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="E - Mail" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button title=" Save Profile " onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
