import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
//import ToolbarAndroid from '@react-native-community/toolbar-android';

const icon = {uri: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-instagram-black-amp;-white-icon-png-image_3547797.jpg'};
const backgroundGithub = { uri: "https://pngimg.com/uploads/github/github_PNG83.png" }
const logo = require('../images/logo.png')
const background = require('../images/wallpaper_jeans.jpg')

import {
  StyleSheet,
  Platform,
  View,
  StatusBar,
  ActivityIndicator,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableHighlight,
  SectionList,
  RefreshControl
} from 'react-native';

let temp = null
const myList = Array(10)
  .fill()
  .map((item, index) => (
    {id: index}
  ))

function App() {
  const [progress, setProgress] = useState(0)
  const [mensagem, setMensagem] = useState('Oi Mundo')
  const [isLoading, setIsLoading] = useState(false)
  const [lista, setLista] = useState([])

  useEffect(() => {
    StatusBar.setBackgroundColor('lightblue', true)
    StatusBar.setBarStyle('dark-content')    
  }, [])

  useEffect(() => {
    setTimeout(() => {
      animate()
    }, 1000)
  
    return () => { 
      clearInterval(temp) 
      setMensagem('Olá Mundo')
    }    
  }, [])

  function animate() {
    let atual = 0, cont = 0;    

    temp = setInterval(() => {
      atual = Math.random() // retorna um número decimal aleatório entre 0 e 1
      setProgress(atual);
      setMensagem(String(cont))
      cont++
      if (cont > 5) {
        clearInterval(temp)     
        setMensagem('React Native \nMeu primeiro App')   
      }
    }, 500);    
  }

  function updateList() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <ImageBackground
        source={background}
        style={styles.background}
        imageStyle={{opacity:0.7}}
      >   
      
      <View style={styles.sectionContainer}>            

        <Image 
          source={logo}
          style={styles.logo}
        />

        <Text 
          style={styles.sectionText}
          numberOfLines={2}
          >
          {mensagem}
        </Text>

        <StatusBar hidden={false} />
        <ActivityIndicator size={"large"} color="lightblue" animating={false} />
        
        <Progress.Bar 
          style={styles.progress}
          progress={progress} 
          width={200} height={30} 
          borderRadius={30} 
          indeterminate={false}
        />
          
        <FlatList
          data={myList}
          keyExtractor={item => item.id}
          numColumns={2}          
          style={styles.flatList}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => {}}
              style={styles.itens}
            >
              <Text>Item { item.id }</Text>
            </TouchableHighlight>
          )} 
          ListHeaderComponent={() => (
            <Text style={styles.sectionTitle}>
              FlatList
            </Text>
          )}
          ItemSeparatorComponent={() => (<></>)}
          ListFooterComponent={() => (
            <Text style={styles.sectionTitle}>
              Total
            </Text>
          )}
          ListEmptyComponent={() => <Text>Nenhum item</Text>}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading}
              onRefresh={updateList}
            />
          }
        />        

        <SectionList
          sections={
            [
              {title: 'SEÇÃO 1', data: myList},
              {title: 'SEÇÃO 2', data: myList},
              {title: 'SEÇÃO 3', data: myList}
            ]
          }
          keyExtractor={item => item.id}
          numColumns={2}          
          style={styles.flatList}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => {}}
              style={styles.itens}
            >
              <Text>Item { item.id }</Text>
            </TouchableHighlight>
          )} 
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionTitle}>
              {title}
            </Text>
          )}
          ItemSeparatorComponent={() => (<></>)}
          renderSectionFooter={() => (
            <Text style={styles.sectionTitle}>
              Total
            </Text>
          )}
          ListEmptyComponent={() => <Text>Nenhum item</Text>}
        />
        
      </View>
      </ImageBackground>          
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 8,
    alignItems: 'center',
    flex: 1,    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'    
  },
  sectionText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  background: {
    width: "100%", 
    height: "100%",
    alignItems: 'center'
  },
  logo: {
    width: 100, 
    height: 100,
    
  },
  progress: {
    margin: 10,  
  },
  toolbar: {
    backgroundColor: '#8196F3',
    height: 56
  },
  flatList: {
    flexGrow: 1,
    flexDirection: 'column'

  },
  itens: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    color: 'white',
    margin: 4,
    padding: 4,
    borderRadius: 4,
    width: 100
  }
});

export default App;
      
/*
  <ToolbarAndroid 
    title="Meu App"
    subtitle="Subtítulo"
    titleColor="white"
    subTitleColor="white"
    navIcon={icon}
    style={styles.toolbar}    
    actions={[
      {
        title: 'Config.',
        show: 'always',
        icon: icon
      },
      {
        title: 'Ajuda',              
      }
    ]} 
    onActionSelected={handleAction}   
    onActionClicked={handleIconAction}  
  />
*/
