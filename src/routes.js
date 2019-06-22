import { createStackNavigator } from 'react-navigation';

import Main from './pages/Main';
import Product from './pages/Product';

export default createStackNavigator({
  Main,
  Product
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#ff9f43'
    },
    headerTintColor: '#fff'
  }
});
