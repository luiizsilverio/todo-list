import React, { useState, useEffect } from 'react'
import {
    View, 
    TextInput, 
    Image, 
    StyleSheet, 
    TouchableHighlight,
    Clipboard
} from 'react-native'

const camera = require('../../images/camera.png')

function List (props) {
    const [list, setList] = useState({items: []})
    const picture = list.picture ? {uri: list.picture} : camera

    useEffect(() => {
        if (props.list) {
            setList(props.list)
        }        
    }, [])

    function updateList(field, value) {
        const newList = {...list, [field]: value}
        setList(newList)
    }

    async function pasteImage() {
        const picture = await Clipboard.getString()
        const types = ['.png', '.jpg', '.jpeg']
        
        if (picture.startsWith('http') && types.some(type => picture.endsWith(type))) {
            updateList('picture', picture)
        }
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={list.title}
                    onChangeText={(text) => updateList('title', text)}
                />        
                <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                    <TouchableHighlight
                        onPress={pasteImage}
                    >
                        <Image 
                            style={styles.image} 
                            source={picture}
                        />                        
                    </TouchableHighlight>
                    <TextInput 
                        style={styles.inputImage}
                        placeholder="Descrição"
                        value={list.description}
                        onChangeText={(text) => updateList('description', text)}
                        numberOfLines={3}
                        multiline={true}
                    />
                </View>        
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputImage: {
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 5
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        fontSize: 18
    }
})

export default List
