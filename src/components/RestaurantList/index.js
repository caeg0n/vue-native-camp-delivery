//import PropTypes from 'prop-types';
//import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React from 'react';
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize"

import {
  RestaurantListContainer,
  RestaurantListItem,
  LogoContainer,
  Logo,
  RestaurantDetailsFix,
  Infos,
  RestaurantDetails,
  DeliveryDetails,
  Separator,
} from './styles';
import Typography from '@/components/Common/Typography'

export default class RestaurantList extends React.Component{
  constructor(props){
    super(props)
  }

  // componentDidMount(){
  //   this.props.changeLoading('todos')
  // }

  goToBuy(item){
    this.props.nav.navigate('Buy',item)
  }
  
  render(){
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={()=>this.goToBuy(item)} >
        <RestaurantListItem key={item.id}  >
          <LogoContainer>
            <Logo source={{ uri: item.logo }} />
          </LogoContainer>
          <Infos>
            <Typography size={RFPercentage(2.8)} color="#333" bold>{item.title}</Typography>
            <RestaurantDetails>
              <Typography color="#dab36d" size="18" bold>{item.stars}</Typography>
              <Separator>•</Separator>
              {/* <Typography size="18" color="#999">Chinesa - 0,4 km</Typography> */}
               <RestaurantDetailsFix>
                <Typography size={RFPercentage(2)} color="#999">{item.type}</Typography>
              </RestaurantDetailsFix>
              <Separator>•</Separator>
            </RestaurantDetails>
            <DeliveryDetails>
              {/* <Typography size="16" color="#999">40-50 min</Typography> */}
              {/* <Separator>•</Separator> */}
              <Text size="16" color="#999">Pedido Minimo R${item.minimal_buy_price}</Text>
            </DeliveryDetails>
              {/* <DeliveryDetails> */}
              <Text size="16" color="#999">Taxa de Entrega R${item.delivery_fee}</Text>   
              {/* </DeliveryDetails> */}
          </Infos>
        </RestaurantListItem>
      </TouchableOpacity>
    )

    const keyExtractor = (item) => String(item.id)

    const result = (
      <RestaurantListContainer
        data={this.props.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={this.props.data.length}
      />
    )
    return result
  }

}
