import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

type ScreenType = 'Home' | 'Animais' | 'Plantas' | 'Fungos' | 'Monera' | 'Protista';

const categoryDescriptions: { [key in ScreenType]?: string } = {
  Animais: 'Os animais são organismos multicelulares que fazem parte do reino Animalia.',
  Plantas: 'As plantas realizam fotossíntese e formam o reino Plantae.',
  Fungos: 'Os fungos são organismos heterotróficos pertencentes ao reino Fungi.',
  Monera: 'Organismos unicelulares procariontes fazem parte do reino Monera.',
  Protista: 'Organismos unicelulares e multicelulares simples pertencem ao reino Protista.',
};

const HomeScreen = ({ onNavigate }: { onNavigate: (screen: ScreenType) => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Escolha uma categoria:</Text>

    <View style={styles.categoryContainer}>
      <View style={styles.categoryRow}>
        <TouchableOpacity style={[styles.button, styles.button1]} onPress={() => onNavigate('Animais')}>
          <Text style={styles.buttonText}>Animais</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{categoryDescriptions.Animais}</Text>
      </View>
      <View style={styles.categoryRow}>
        <TouchableOpacity style={[styles.button, styles.button2]} onPress={() => onNavigate('Plantas')}>
          <Text style={styles.buttonText}>Plantas</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{categoryDescriptions.Plantas}</Text>
      </View>
      <View style={styles.categoryRow}>
        <TouchableOpacity style={[styles.button, styles.button3]} onPress={() => onNavigate('Fungos')}>
          <Text style={styles.buttonText}>Fungos</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{categoryDescriptions.Fungos}</Text>
      </View>
      <View style={styles.categoryRow}>
        <TouchableOpacity style={[styles.button, styles.button4]} onPress={() => onNavigate('Monera')}>
          <Text style={styles.buttonText}>Monera</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{categoryDescriptions.Monera}</Text>
      </View>
      <View style={styles.categoryRow}>
        <TouchableOpacity style={[styles.button, styles.button5]} onPress={() => onNavigate('Protista')}>
          <Text style={styles.buttonText}>Protista</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{categoryDescriptions.Protista}</Text>
      </View>
    </View>
  </View>
);


const CategoryScreen = ({ category, onNavigateBack }: { category: ScreenType; onNavigateBack: () => void }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://192.168.17.3:3000/${category.toLowerCase()}`);
        setItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os itens da categoria:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchText, items]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={`Buscar em ${category}...`}
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text><Text style={styles.bold}>Nutrição:</Text> {item.nutrition}</Text>
            <Text><Text style={styles.bold}>Tipo de Célula:</Text> {item.cellType}</Text>
            <Text><Text style={styles.bold}>Organização Celular:</Text> {item.cellOrganization}</Text>
            <Text><Text style={styles.bold}>Reprodução:</Text> {item.reproduction}</Text>
            <Text><Text style={styles.bold}>Respiração:</Text> {item.respiration}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'Animais':
      case 'Plantas':
      case 'Fungos':
      case 'Monera':
      case 'Protista':
        return <CategoryScreen category={currentScreen} onNavigateBack={() => setCurrentScreen('Home')} />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#212121', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', 
  },
  categoryContainer: {
    width: '100%',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  description: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#fff', 
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120, 
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#FC580C',
  },
  button2: {
    backgroundColor: '#FC6B0A',
  },
  button3: {
    backgroundColor: '#F8872E',
  },
  button4: {
    backgroundColor: '#FFA927',
  },
  button5: {
    backgroundColor: '#FDCA49',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#FC580C',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  searchInput: {
    width: '100%', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f4d092', 
    color: '#fff',
    marginVertical: 10, 
  },
  
});

export default App;
