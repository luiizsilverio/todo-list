import React from 'react'
import { 
    View, 
    Text,
    TextInput, 
    Switch, 
    StyleSheet, 
    TouchableHighlight,
    useWindowDimensions
 } from 'react-native'

function ListItem(props) {
    const item = props.item ? props.item : {}
    const onUpdate = props.onUpdate ? props.onUpdate : () => {}
    const onRemove = props.onRemove ? props.onRemove : () => {}
    const largura = useWindowDimensions().width - 110

    function updateItem (field, value) {
        //const newItem = Object.assign({}, item, {[field]: value})
        const newItem = {...item, [field]: value}
        onUpdate(newItem)
    }

    function removeItem() {
        console.log('deletando item:', item)
        onRemove(item)
    }

    return (        
        <View style={styles.container}>
            <Switch 
                value={item.done}
                onValueChange={(done) => updateItem('done', done)}
                style={{width: 50, marginRight: 10}}
            />
            <TextInput 
                style={[styles.input, {width: largura}]}
                placeholder="Descrição"
                value={item.description}
                onChangeText={(text) => updateItem('description', text)}
                editable={!item.done}
            />
            <TouchableHighlight
                onPress={removeItem}  
                style={styles.btnRemove}
            >
                <Text style={styles.btnMenos}>X</Text>
            </TouchableHighlight>
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        marginBottom: 5
    },
    input: {
        borderColor: "#ccc", 
        borderWidth: 1,
        fontSize: 16            
    },
    btnRemove: {        
        backgroundColor: 'red', 
        borderColor: "#ccc", 
        borderWidth: 1,
        width: 40,
        padding: 4
    },
    btnMenos: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center'
    },
})

export default ListItem