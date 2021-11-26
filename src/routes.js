import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// Screens
import BuyScreen from '@/screens/buy';
import CartScreen from '@/screens/cart';
// Custom tabbar component
import CustomFooterTabBar from '@/components/CustomFooterTabBar';
// Tabbar icon sources
import HomeIcon from '../assets/home.png';
import SearchIcon from '../assets/search-black.png';
import OrdersIcon from '../assets/order.png';
import ProfileIcon from '../assets/profile.png';

const TabRoutes = createBottomTabNavigator(
  {
    Home: {
      screen: BuyScreen,
      navigationOptions: {
        tabBarIcon: () => HomeIcon,
        tabBarLabel: 'Início',
      },
    },
    Search: {
      screen: CartScreen,
      navigationOptions: {
        tabBarIcon: () => SearchIcon,
        tabBarLabel: 'Buscar',
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      tabBarComponent: CustomFooterTabBar,
      tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#666',
      },
    }),
  },
);

export default createAppContainer(TabRoutes);
