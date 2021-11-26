//import PropTypes from 'prop-types';
//import { TouchableOpacity,View,ActivityIndicator } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  TopRestaurantSliderList, 
  TopRestaurantSliderItem, 
  Logo, 
  TopRestaurantSliderTitle,
} from './styles';

import Typography from '@/components/Common/Typography';

export default class TopRestaurantSlider extends React.Component{

  constructor(props){
    super(props)
  }

  // componentDidMount(){
  //   this.props.changeLoading('melhores')
  // }
  
  render () {
    return (
      <TopRestaurantSliderList
        data={this.props.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>this.props.nav.navigate('Buy',item)} >
            <TopRestaurantSliderItem key={item.id}>
              <Logo source={{ uri: item.logo }} />
              <TopRestaurantSliderTitle>
                <Typography size="10" color="#444" align="center">{item.title}</Typography>
              </TopRestaurantSliderTitle>
            </TopRestaurantSliderItem>
          </TouchableOpacity>
        )}
      />
    )
  }
}

// TopRestaurantSlider.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
// };
