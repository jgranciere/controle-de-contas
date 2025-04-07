import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, useWindowDimensions } from 'react-native';
import HomeScreen from './src/screens/HomeScreen/homeScreen';
import DetailsScreen from './src/screens/DetailsScreen/detailsScreen';



const Stack = createStackNavigator();

export default function Navigation(){

    const { width } = useWindowDimensions();
    const isSmallScreen = width < 350;

    const CustomTitle = () => (
        <Text
          style={{
            fontSize: isSmallScreen ? 16 : 22,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 3,
            color: '#9bccff',
            textAlign: 'center',
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Controle de Contas
        </Text>
      );


    return(
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{backgroundColor:"#101E2B"},
                    headerTintColor:'#9bccff',
                    headerTitleStyle:{ fontSize: 25, fontWeight:"bold", textTransform:"uppercase", letterSpacing:5},
                    headerTitleAlign:"center",
                    headerShadowVisible:false
                }}
            >
                <Stack.Screen name="Home"  component={HomeScreen} options={{headerTitle: () => <CustomTitle/>}}/>
                <Stack.Screen name="Meses" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}