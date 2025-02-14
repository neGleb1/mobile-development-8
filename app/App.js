import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore } from './firebase/config';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export default function App(){
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'shoppingList'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(items);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (newItem.trim()) {
      try {
        await addDoc(collection(firestore, 'shoppingList'), { name: newItem });
        setNewItem('');
      } catch (error) {
        console.error('Error adding item: ', error);
      }
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'shoppingList', id));
    } catch (error) {
      console.error('Error removing item: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new item"
          value={newItem}
          onChangeText={setNewItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
});
