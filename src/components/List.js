import React, { useState, useEffect } from 'react'
import {
    View, 
    SafeAreaView,
    ScrollView,
    TextInput, 
    Image, 
    Text,
    StyleSheet, 
    TouchableHighlight,
    Clipboard,
    FlatList,
    Button,
    Alert
} from 'react-native'

import ListItem from './ListItem'

const camera = require('../../images/camera.png')

function List (props) {
    const [list, setList] = useState({items: []})
    const picture = list.picture ? {uri: list.picture} : camera
    const [itemDescription, setItemDescription] = useState('')
    const onActionDone = props.onActionDone ? props.onActionDone : () => {}

    useEffect(() => {
        if (props.list) {
            setList(props.list)
        }        
    }, [])

    function updateList(field, value) {
        //const newItem = Object.assign({}, list, {[field]: value})
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

    function updateListItem(item) {
        const newListItems = [...list.items]
        const id = list.items.findIndex(it => it.id === item.id)
        
        if (id >= 0) {
            newListItems[id] = item
        } else {
            newListItems.push(item)
        }
        updateList('items', newListItems)
    }

    function createListItem() {
        if (!itemDescription) {
            Alert.alert('Informe a descrição do item')
        }
        else {
            const newItem = { 
                description: itemDescription, 
                done: false, 
                id: new Date().toString()
            }
            updateListItem(newItem)
            setItemDescription('')
        }
    }

    function removeListItem(item) {
        const itemIndex = list.items.findIndex(it => it.id === item.id)
        const newListItems = [...list.items]
        newListItems.splice(itemIndex, 1)
        updateList('items', newListItems)
    }

    return (
        <>
            <SafeAreaView style={styles.header}>

                <Button title="< Voltar" 
                    onPress={() => {onActionDone(props.list)}}                 
                />
                    <TextInput
                        style={styles.title}
                        placeholder="Título"
                        value={list.title}
                        onChangeText={(text) => updateList('title', text)}
                    />        
            
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                        <TouchableHighlight
                            onPress={pasteImage}
                        >
                            <Image 
                                style={styles.image} 
                                source={picture}
                                resizeMode="cover"
                            />                        
                        </TouchableHighlight>
                        <TextInput 
                            style={styles.description}
                            placeholder="Descrição"
                            value={list.description}
                            onChangeText={(text) => updateList('description', text)}
                            multiline={true}
                            numberOfLines={3}                            
                            autoCompleteType="off"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                        />
                    </View>  
                        
                    <View style={styles.novo}>
                        <TextInput
                            style={styles.inputNovo}
                            placeholder="Novo Item"
                            value={itemDescription}
                            onChangeText={(text) => setItemDescription(text)}
                        />
                        <TouchableHighlight 
                            onPress={createListItem}
                            style={styles.btnNovo}
                        >
                            <Text style={styles.btnMais}>+</Text>
                        </TouchableHighlight>
                    </View>
                </View>            
            </SafeAreaView>

            
            <FlatList 
                style={{flex: 1, margin: 5}}
                data={list.items}
                horizontal={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <ListItem item={item}
                        onUpdate={updateListItem}
                        onRemove={removeListItem}
                    />
                )}
            />
            

            <Button title="Salvar"
                onPress={() => onActionDone(list)}
            />
        </> 
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "column",  
        height: 257,
        color: '#2e2e2e',
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomColor: 'white'
    },
    title: {
        color: '#2e2e2e',
        borderWidth: 1,
        borderColor: 'white',
        borderTopColor: '#ccc',
        borderBottomColor: '#ccc',        
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        height: 50
    },
    novo: {
        flexDirection: 'row',
        height: 40,
        marginHorizontal: 5,
        borderColor: '#ccc',
        borderWidth: 1
    },
    inputNovo: {
        flex: 1, 
        fontSize: 16,             
        color: '#2e2e2e'
    },
    btnNovo: {
        backgroundColor: 'green', 
        width: 40,
        padding: 2,
    },
    btnMais: {
        color: 'white', 
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    description: {
        flex: 1,   
        fontSize: 18,     
        borderColor: '#ccc', 
        borderWidth: 1,
        padding: 5,
        height: 120
    },
    image: {
        width: 120,
        height: 120,
        marginRight: 5
    }
})

export default List
