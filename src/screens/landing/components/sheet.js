import React, { Component } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet"


import ComercioList from '../../../components/ComercioList'

export default class Sheet extends Component {
  constructor(props){
    super(props)
    this.state = {
      comercios: []
    }
  }

  componentDidMount(){
    this.setState({
      comercios:this.props.comercios
    })
    if (this.props.getSheetState == true)
      this.RBSheet.open()
  }

  render() {
    const sheet = 
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          animationType={"slide"}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={()=>this.props.setSheetState(false)}
          customStyles={{
            container: {
              backgroundColor: "#f1f1f1",
              borderRadius:30,
              height:450
            },
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "red"
            },
            
          }}
        >
        {/* <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.close()} /> */}
        <ComercioList comercios={this.state.comercios} 
                      onPress={ (id) => {
                        this.changeOrganization(id)
                        this.RBSheet.close()
                      }}
        />
        </RBSheet>
      </View>
     
    return (
      sheet
    );
  }


  changeOrganization(id){
    this.props.changeOrganization(id)
  }
}