import React from 'react'
import {View, FlatList, Text} from 'react-native'

import SimpleList from '../components/SimpleList'

function ListsView (props) {
    const {lists} = props    
    
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={lists}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({item}) => (
                    <SimpleList list={item}/>                      
                )}
            />
        </View>
    )
}

export default ListsView