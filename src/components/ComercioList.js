import React from 'react'
import { View,Text,StyleSheet, SafeAreaView, ScrollView } from 'react-native'

import ComercioListItem from './ComercioListItem'

const ComercioList = props => {
	const { comercios,onPress } = props

	const items = comercios.map( comercio => {
		return <ComercioListItem 
		        key={ comercio.id }
		        comercio={ comercio }
		        onPress={ onPress }
		       />
	});

	return (
		<ScrollView>	
			{ items }
		</ScrollView>
		
	)
}

const styles = StyleSheet.create({
	container:{
		backgroundColor: '#f2f2f2'
	}
})

export default ComercioList