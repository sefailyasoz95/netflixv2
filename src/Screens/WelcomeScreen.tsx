import React, {useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import {data} from '../Helpers/data';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../StackParamLists/AuthStackParamList';
import {SharedElement} from 'react-navigation-shared-element';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
  // route: RouteProp<AppStackParamList, >;
};
const newData = {
  id: 5,
  image:
    'https://pbs.twimg.com/profile_images/1356333120992149505/-qvakEK7_400x400.jpg',
  name: 'Sefa İlyas Öz',
};
const WelcomeScreen = ({navigation}: Props) => {
  const [screenStates, setScreenStates] = useState({
    autoPlay: true,
    loop: false,
    showUser: false,
    loading: false,
  });
  const [createProfile, setCreateProfile] = useState(false);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const top = useSharedValue(0);
  const right = useSharedValue(0);
  const overlayBottom = useSharedValue(200);
  const overlayOpacitiy = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
      opacity: opacity.value,
    };
  });
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: overlayBottom.value,
        },
      ],
      opacity: overlayOpacitiy.value,
    };
  });
  const animatedHeader = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, {duration: 750, easing: Easing.bounce}),
    };
  });
  const animatedEdit = useAnimatedStyle(() => {
    return {
      right: withTiming(right.value, {duration: 750, easing: Easing.bounce}),
    };
  });

  const handleUserContainer = () => {
    setScreenStates({...screenStates, showUser: true});
    (scale.value = withTiming(1, {
      duration: 750,
      easing: Easing.out(Easing.exp),
    })),
      (opacity.value = withTiming(1, {duration: 500}));
    top.value = 50;
    right.value = 20;
  };
  const toggleOverlay = () => {
    if (createProfile) {
      overlayOpacitiy.value = withTiming(0, {duration: 500});
      overlayBottom.value = withTiming(200, {duration: 750});
      setTimeout(() => {
        setCreateProfile(false);
      }, 800);
    } else {
      overlayBottom.value = withTiming(0, {duration: 750});
      overlayOpacitiy.value = withTiming(1, {duration: 500});
      setCreateProfile(true);
      // inputRef.current?.focus()
    }
  };
  const handleSave = () => {
    data.push(newData);
    toggleOverlay();
  };

  return (
    <SafeAreaView style={styles.container}>
      {screenStates.showUser && (
        <>
          <Animated.Text style={[styles.header, animatedHeader]}>
            Who is watching?
          </Animated.Text>
          <Animated.View style={[styles.header, animatedEdit]}>
            <TouchableOpacity>
              <Text style={{fontWeight: '700', color: 'white'}}>Edit</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      <LottieView
        source={require('../Assets/Animations/netflix-logo.json')}
        autoPlay={screenStates.autoPlay}
        loop={screenStates.loop}
        style={styles.lottie}
        onAnimationFinish={handleUserContainer}
      />
      {screenStates.showUser && (
        <Animated.View style={[styles.animationContainer, animatedStyle]}>
          <BlurView
            blurType="dark"
            blurAmount={5}
            style={[styles.blurContainer]}>
            {data.map(d => (
              <TouchableOpacity
                style={styles.profile}
                key={d.id}
                onPress={() => navigation.navigate('Home', {user: d})}>
                <SharedElement id={`${d.id}`}>
                  <Image
                    source={{uri: d.image}}
                    width={59}
                    height={50}
                    style={styles.image}
                  />
                </SharedElement>
                <Text
                  style={styles.name}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {d.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.profile} onPress={toggleOverlay}>
              <View style={styles.addButton}>
                <Text style={styles.plus}>+</Text>
              </View>
              <Text style={styles.name}>Add Profile</Text>
            </TouchableOpacity>
          </BlurView>
        </Animated.View>
      )}
      {createProfile && (
        <Animated.View
          style={[styles.createOverlay, overlayAnimatedStyle]}
          onTouchStart={Keyboard.dismiss}>
          <View style={styles.overlayHeader}>
            <Text style={styles.overlayText}>Create Profile</Text>
            <TouchableOpacity onPress={toggleOverlay}>
              <Text style={styles.overlayCancel}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <Image
              source={require('../Assets/Images/newProfileImage.jpg')}
              width={50}
              height={50}
              style={{height: 100, width: 100, borderRadius: 8}}
            />
            <Input
              placeholder="What we should call this one?"
              onTextChanged={(value: string) => console.log(value)}
              corner="rounded"
              style={{borderColor: 'white', marginBottom: 10, width: '85%'}}
            />
            <Button
              text="Save"
              onPress={handleSave}
              corners="curved"
              color="white"
              size="small"
              loading={screenStates.loading}
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040404',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {width: 300, height: 300, position: 'absolute'},
  blurContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    flexWrap: 'wrap',
    marginHorizontal: 40,
    paddingVertical: 15,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    margin: 5,
  },
  imageContainer: {
    // shadowColor: '#444',
    // shadowOffset: {
    //   width: 1,
    //   height: 3,
    // },
    borderRadius: 10,
    // shadowOpacity: 1,
    // shadowRadius: 5,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 3,
      height: 2,
    },
    textShadowRadius: 5,
    textTransform: 'capitalize',
  },
  addButton: {
    width: 75,
    borderRadius: 10,
    height: 75,
    margin: 5,
    // borderWidth: 1,
    // borderStyle: 'solid',
    backgroundColor: 'rgba(0,0,0,0.5)',

    shadowColor: '#444',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  plus: {
    fontSize: 55,
    alignSelf: 'center',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 3,
      height: 2,
    },
    textShadowRadius: 5,
    textTransform: 'capitalize',
    color: 'white',
  },
  header: {
    color: 'white',
    letterSpacing: 1,
    position: 'absolute',
    top: 55,
    fontWeight: '500',
    alignSelf: 'center',
  },
  createOverlay: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  overlayText: {color: 'white', fontWeight: '600', fontSize: 18},
  overlayCancel: {
    color: '#ff1111',
    fontWeight: '700',
    fontSize: 25,
    padding: 10,
  },
  overlayHeader: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});
