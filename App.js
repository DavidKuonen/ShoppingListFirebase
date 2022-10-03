import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyD6HYtSo_IIq8aN44nnUPL0-uOHUTaBKPs",

  authDomain: "shoppinglistfirebase-d4532.firebaseapp.com",

  projectId: "shoppinglistfirebase-d4532",

  storageBucket: "shoppinglistfirebase-d4532.appspot.com",

  messagingSenderId: "482564944449",

  appId: "1:482564944449:web:644e17fa61bf39594e8cc0",

  databaseURL: "https://shoppinglistfirebase-d4532-default-rtdb.europe-west1.firebasedatabase.app/"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    if(data){
      setShoppingList(Object.values(data));
      setKeys(Object.keys(data));
    }
    else{
      setShoppingList([]);
    }
    
    })
    }, []);


const updateList = () => {
  db.transaction(tx => {
  tx.executeSql('select * from shoppingitem;', [], (_, { rows }) =>
  setShoppingList(rows._array)
  );
  }, null, null);
  }



  const saveItem = () => {
    push(
    ref(database, 'items/'),
    { 'product': product, 'amount': amount });
    }

  const deleteItem = (index) => {
   var key = keys[index]
   remove(ref(database, 'items/'+key));
        
  }


  return (
    <View style={styles.container}>

   <View style={styles.textFields}>
    <TextInput  style={{width: 200, borderColor: 'gray', borderWidth: 1}}
      placeholder='Product'
      onChangeText={product => setProduct(product)}
      value={product} />
   
   <TextInput  style={{width: 200, borderColor: 'gray', borderWidth: 1}}
      placeholder='Amount'
      keyboardType='numeric'
      onChangeText={amount => setAmount(amount)}
      value={amount} />
   </View>

   <View  style={styles.buttons}>
    <Button title='Save' onPress={saveItem}></Button>
   </View>

   <View style={styles.ShoppingFields}>
    <Text style={styles.ShoppingListTitle}>Shopping List</Text>
    <FlatList 
    data={shoppingList}
    
    renderItem={({item, index})=> (
      <View> 
      <Text>{item.product},{item.amount} </Text>
      <Text style={{color: '#0000ff'}} onPress={() => deleteItem(index)}>delete</Text>
      </View>
    )}
    />
   </View>

   </View>
  );
}

//Instead of a CSS File use StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },

  textFields: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 180
  },

  buttons: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 165,
    paddingTop: 10
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  ShoppingFields: {
    flex: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },

  ShoppingListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue"
  }

});
