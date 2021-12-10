import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {AuthStackParamList} from '../StackParamLists/AuthStackParamList';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Home'>;
  route: RouteProp<AuthStackParamList, 'Home'>;
};

const HomeScreen = ({navigation, route}: Props) => {
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../Assets/Images/netflix-logo.jpeg')}
          width={50}
          height={50}
          style={styles.logo}
        />
        <SharedElement id={`${user.id}`}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => navigation.goBack()}>
            <Image
              source={{uri: user.image}}
              width={45}
              height={45}
              style={styles.image}
            />
          </TouchableOpacity>
        </SharedElement>
      </View>
      <Text style={styles.text}>Should I do the rest ?</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#040404',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imageContainer: {
    // shadowColor: '#444',
    // shadowOffset: {
    //   width: 1,
    //   height: 3,
    // },
    // shadowOpacity: 1,
    borderRadius: 10,
    // shadowRadius: 5,
  },
  logo: {
    height: 50,
    width: 50,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  text: {
    position: 'absolute',
    top: '50%',
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 20,
  },
});
