import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma categoria:</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Animais"
          onPress={() => {
            console.log('Navegando para a categoria Animais');
            navigation.navigate('Category', { category: 'animais' });
          }}
        />

        <Button
          title="Plantas"
          onPress={() => navigation.navigate('Category', { category: 'plantas' })}
        />
        <Button
          title="Fungos"
          onPress={() => navigation.navigate('Category', { category: 'fungos' })}
        />
        <Button
          title="Monera"
          onPress={() => navigation.navigate('Category', { category: 'monera' })}
        />
        <Button
          title="Protista"
          onPress={() => navigation.navigate('Category', { category: 'protista' })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default HomeScreen;
