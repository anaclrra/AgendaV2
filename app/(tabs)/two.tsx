import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contato } from '@/interface/Contato';
import { Button } from 'react-native-paper';

export default function ContatosList () {
  const [contatos, setContatos] = useState<Contato[]>([]);
  
  useEffect(() => {
    obterContatos();
  }, []);

  async function obterContatos() {
    let cJson = await AsyncStorage.getItem('contatos')
    if (cJson) {
      setContatos(JSON.parse(cJson))
    } 
  }

  async function limpar() {
    await AsyncStorage.removeItem('contatos')
    await AsyncStorage.clear()
    setContatos([])
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.contato}>
            <View style={styles.iconContainer}>
              <Icon name="person" size={40} color="#fff" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.detalhe}>Telefone: {item.telefone}</Text>
              <Text style={styles.detalhe}>Email: {item.email}</Text>
              <Text style={styles.detalhe}>Tipo: {item.tipo}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
       <Button mode="contained" onPress={() => { limpar() }} >Limpar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  contato: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#6200ee',
    borderRadius: 50,
    padding: 10,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detalhe: {
    fontSize: 16,
    color: '#666',
  },
});



/* import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
 */