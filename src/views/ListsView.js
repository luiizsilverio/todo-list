import React from 'react'
import {View, FlatList, Text} from 'react-native'

import SimpleList from '../components/SimpleList'

function ListsView (props) {
    const {lists} = props
    const onRemove = props.onRemove ? props.onRemove : (lista = list) => {}    
    
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={lists}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({item}) => (
                    <SimpleList list={item} onRemove={onRemove} />                      
                )}
            />
        </View>
    )
}

export default ListsView