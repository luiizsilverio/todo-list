import React, { useState, useEffect } from 'react'
import { 
    View,     
    Text, 
    Image, 
    StyleSheet, 
    useWindowDimensions,
    TouchableHighlight  
 } from 'react-native'

const logo = require('../logo.png')

function SimpleList(props) {
    const list = props.list ? props.list : {}
    const onRemove = props.onRemove ? props.onRemove : (lista = list) => {}
    const onSelect = props.onSelect ? props.onSelect : (lista = list) => {}
    
    const picture = list.picture ? {uri: list.picture} : logo 
    const largura = useWindowDimensions().width / 3 - 20
    
    return (
        <TouchableHighlight 
            onPress={() => onSelect(list)}
            style={[styles.view, {width: largura + 12}]} 
            underlayColor="blanchedalmond"
        > 
            <View>
                <TouchableHighlight 
                    onPress={() => onRemove(list)}
                    style={styles.btnClose}
                    >
                    <Text style={styles.text}>X</Text>
                </TouchableHighlight>
                
                <Image 
                    source={ picture } 
                    style={{width: largura, height: largura}}
                    />
                <Text style={{fontWeight: 'bold'}}>
                    { list.title }
                </Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    view: {
        margin: 2,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 5,
        position: 'relative'
    },
    btnClose: {
        position: 'absolute', 
        top: 0, 
        right: 0,
        zIndex: 2        
    },
    text: {
        fontWeight: 'bold',
        backgroundColor: 'darkred',
        color: 'white',
        paddingHorizontal: 5,
        paddingVertical: 2
    }
});

export default SimpleList
