import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DataComponent from './src/DataComponent';
import DynamicData from './src/Dynamicdata';

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={DataComponent}
            options={{
              title: 'Static',
              headerStyle: {
                backgroundColor: '#61dafb',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Dynamic"
            options={{
              headerStyle: {
                backgroundColor: '#61dafb',
              },
            }}
            component={DynamicData}
          />
        </Stack.Navigator>
        {/* <DataComponent /> */}
      </NavigationContainer>
    );
  }
}

export default App;
