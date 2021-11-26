//import PropTypes from 'prop-types';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  CategorySliderList, CategorySliderItem, CategorySliderImage, CategorySliderTitle,
} from './styles'
import Typography from '@/components/Common/Typography'

export default class CategorySlider extends React.Component{

  constructor(props){
    super(props)
  }

  // componentDidMount(){
  //   this.props.changeLoading('categorias')
  // }

  render() {
    return (
    <CategorySliderList
      data={this.props.data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>this.props.nav.navigate('Buy',{"item":item,"action":"category"})} >
        <CategorySliderItem key={item.id}>
          <CategorySliderImage source={{ uri: item.imageUrl }} />
          <CategorySliderTitle>
            <Typography size="16" color="#444" align="center">{item.title}</Typography>
          </CategorySliderTitle>
        </CategorySliderItem>
        </TouchableOpacity>
      )}
    />)
  }

}

//CategorySlider.propTypes = {
//  data: PropTypes.arrayOf(PropTypes.object).isRequired,
//};