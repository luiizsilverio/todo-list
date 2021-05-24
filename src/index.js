import React, { useEffect, useState } from 'react'
import { 
  View, 
  ScrollView, 
  StatusBar, 
  StyleSheet,
  RefreshControl
} from 'react-native'

import ListsView from './views/ListsView'
import { ListsService } from './services/ListsService'

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
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    StatusBar.setBackgroundColor('lightblue', true)
    StatusBar.setBarStyle('dark-content')    
  }, [])
  
  function getLists() {
    async function getListsAPI() {
      const data = await ListsService.list()
      setLists(data)
      console.log(data)
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
  
  return (
    <>            
        <ScrollView 
          contentContainerStyle={styles.container}
          horizontal={true} 
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={getLists}
            />        
          }
        >
          <ListsView lists={lists} />        
        </ScrollView>  
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
