import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './Login/login'; // Adjust the import path accordingly
import MainScreen from './Main/mainscreen';
import AddScreen from './components/add/add';
import TranspoScreen from './components/transpo/transpo';
import FoodScreen from './components/food/food';
import UnforeseenScreen from './components/unforseen/unforseen';
import Settings from './Settings/Settings';

const Stack = createStackNavigator();

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [dailyBudget, setDailyBudget] = useState(0);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          'Poppins': require('./assets/Poppins-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync(); // Hide the splash screen
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return null; // Alternatively, render a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Main">
          {props => <MainScreen {...props} dailyBudget={dailyBudget} setDailyBudget={setDailyBudget} />}
        </Stack.Screen>
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Transpo" component={TranspoScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Unforeseen" component={UnforeseenScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const updateDimensions = () => {
      setScreenDimensions(Dimensions.get('window'));
    };

    Dimensions.addEventListener('change', updateDimensions);

    // Cleanup function to remove the event listener
    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  const onPressStart = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./images/Pentagon.png')} 
        style={styles.fullBackground}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('./images/color_w_trans.png')} 
            style={styles.logo} 
          />
        </View>
        <TouchableOpacity style={styles.startButton} onPress={onPressStart}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282727',
  },
  fullBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    height: 180,
    width: Dimensions.get('window').width * 0.8,
    maxWidth: 300, // Set a maximum width
    resizeMode: 'contain',
  },
  startButton: {
    backgroundColor: '#A1E3FF',
    paddingVertical: 18,
    width: '80%', // Responsive width
    maxWidth: 300, // Maximum width
    borderRadius: 40,
    marginTop: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  }
});

export default App;
