import React from 'react';
import {Easing} from 'react-native-reanimated';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeScreen from '../Screens/HomeScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';

interface Props {}
const Auth = createSharedElementStackNavigator();
const AuthStack = (props: Props) => {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="Welcome" component={WelcomeScreen} />
      <Auth.Screen
        name="Home"
        component={HomeScreen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 500},
            },
            close: {
              animation: 'timing',
              config: {duration: 500},
            },
          },
        }}
        sharedElements={(route, otherRoute, showing) => {
          const {user} = route.params;
          return [
            {
              id: `${user.id}`,
            },
          ];
        }}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
