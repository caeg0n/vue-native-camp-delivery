//import PropTypes from 'prop-types';
//import { Rating, AirbnbRating } from 'react-native-ratings'
//import { TouchableOpacity,ActivityIndicator } from 'react-native';
import React from 'react';
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native'
import { Infos } from '../RestaurantList/styles'
import Typography from '@/components/Common/Typography'
import {
  Container,
  RecentRestaurantSliderList,
  RecentRestaurantSliderItem,
  RecentRestaurantSliderLogo,
  LogoContainer
} from './styles';

export default class RecentRestaurantSlider extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      aiState:false
    }

  }

  componentDidMount() {
    this.state.aiState = true
    //this.props.changeLoading('favoritos')
  }

  //renderElement(){
  //  if(this.state.aiState == false)
  //    return <ActivityIndicator size="large" color="red" animating={true} />
  //  return null
  //}

  render(){
    return (
      <Container>
        <RecentRestaurantSliderList
          horizontal
          data={this.props.data}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this.props.nav.navigate('Buy',item)} >
              <RecentRestaurantSliderItem key={item.id}>
                <LogoContainer>
                  <RecentRestaurantSliderLogo source={{ uri: item.logo }} />
                </LogoContainer>
                <Infos>
                  <Typography size="18" color="#333" bold>{item.title}</Typography> 
                  <AirbnbRating 
                    showRating={false}
                    reviewSize={15}
                    reviews={["Ruim","Bom","muito bom", "Otimo", "Excelente!"]}
                    count={5}
                    defaultRating={0}
                    size={20}
                    onFinishRating={(value)=>this.props.ranking(value,item)}
                  /> 
                </Infos>
              </RecentRestaurantSliderItem>
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }

}
