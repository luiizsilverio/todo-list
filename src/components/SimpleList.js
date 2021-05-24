import React, { useState, useEffect } from 'react'
import { 
    View,     
    Text, 
    Image, 
    StyleSheet, 
    useWindowDimensions    
 } from 'react-native'

const logo = require('../logo.png')

function SimpleList(props) {
    const {list} = props    
    const picture = list.picture ? {uri: list.picture} : logo 
    const largura = useWindowDimensions().width / 3 - 20

    return (
        <View style={[styles.view, {width: largura + 12}]}>   
            <Image 
                source={ picture } 
                style={{width: largura, height: largura}}
            />
            <Text style={{fontWeight: 'bold'}}>
                { list.title }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        margin: 2,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 5
    }    
});

export default SimpleList
