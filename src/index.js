import React, { useEffect, useState } from 'react'
import { 
  View, 
  ScrollView, 
  StatusBar, 
  StyleSheet,
  RefreshControl,
  Alert,
  Button,
  Modal
} from 'react-native'

import ListsView from './views/ListsView'
import { ListsService } from './services/ListsService'
import List from './components/List'

const icon = {uri: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-instagram-black-amp;-white-icon-png-image_3547797.jpg'};
const logo = require('../images/logo.png')
const background = require('../images/wallpaper_jeans.jpg')

const myList = Array(10)
  .fill()
  .map((item, index) => (
    {id: index}
  ))

function App() {
  const [lists, setLists] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedList, setSelectedList] = useState({})
  
  
  useEffect(() => {
    StatusBar.setBackgroundColor('lightblue', true)
    StatusBar.setBarStyle('dark-content')    
  }, [])
  
  function getLists() {
    async function getListsAPI() {
      const data = await ListsService.list()
      setLists(data)      
    }
    try {
      setRefreshing(true);
      getListsAPI()      
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    getLists()
  }, [])
  
  function removeList(listToRemove) {
    function confirmaRemocao() {
      const id = listToRemove.id
      const newList = lists.filter(list => list.id !== id)        
      setLists(newList)
      ListsService.delete(id)         
    }

    if (!listToRemove) {
      return false
    }        

    Alert.alert(
      listToRemove.title,
      'Confirma exclusão da lista?',
      [
        { 
          text: "Confirma", 
          onPress: () => confirmaRemocao()
        },
        {
          text: "Cancela",
          onPress: () => {}
        },
      ]
    )    
  }

  function selectList(selList) {
    setSelectedList(selList)
    setModalVisible(true)
  }

  async function createList() {
    const newList = await ListsService.create({
      title: 'Nova Lista',
      description: '', 
      picture: '',
      items: []
    })

    const newLists = [...lists, newList]
    setLists(newLists)
    selectList(newList)
    console.log(newList)
    return newLists
  }

  async function updateList(newList) {
    const listas = [...lists]
    const id = listas.findIndex(list => list.id === newList.id)

    listas[id] = newList
    setLists(listas)
    setSelectedList({})
    setModalVisible(false)
    
    await ListsService.update(listas[id])
  }

  return (
    <>      
      <View style={styles.container}>
        <Button 
          title="+ Nova Lista " 
          style={{flex: 1}}
          color="green"
          onPress={createList}
        />

        <ScrollView 
          horizontal={true} 
          refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={getLists}
            />        
          }
          >
          <ListsView 
            lists={lists} 
            onRemove={removeList}     
            onSelect={selectList}                             
          />
        </ScrollView>    
      </View>

      <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
      >
        <List list={selectedList} onActionDone={updateList} />
      </Modal>
      <StatusBar />      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',    
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    marginLeft: 4    
  }
});

export default App;
