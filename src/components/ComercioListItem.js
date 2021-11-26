import React from 'react'
import { Text,View,StyleSheet,Image,TouchableOpacity } from 'react-native'
//import { cFL } from '../util'

const ComercioListItem = props => {
	const { comercio,onPress } = props
	const name = comercio.name
	return(
		<TouchableOpacity onPress={()=>
			onPress(comercio.id)
		}>
			<View style={ styles.line }>
				<Image style={styles.avatar} source={{uri:comercio.logo}}/>
				<Text style={ styles.lineText }>
					{`${name}`}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	line:{
		height:60,
		borderBottomWidth:1,
		borderBottomColor:"#bbb",
		alignItems:'center',
		flexDirection:'row'
	},
	lineText:{
		fontSize:20,
		paddingLeft:15,
		flex:7
	},
	avatar:{
		aspectRatio:1,
		flex:1,
		marginLeft:15,
		borderRadius:15
	}
})

export default ComercioListItem