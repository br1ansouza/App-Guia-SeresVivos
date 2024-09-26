import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import axios from 'axios';

type CategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Category'>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

type Props = {
  navigation: CategoryScreenNavigationProp;
  route: CategoryScreenRouteProp;
};

const CategoryScreen = ({ route, navigation }: Props) => {
  const { category } = route.params;  
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(`Categoria recebida: ${category}`);
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://192.168.17.3:3000/${category}`);
        console.log('Dados recebidos:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Erro ao buscar os itens da categoria:', error);
      }
    };
  
    fetchItems();
  }, [category]);
  

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
  },
});

export default CategoryScreen;
