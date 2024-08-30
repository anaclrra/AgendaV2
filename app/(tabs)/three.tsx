import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contato } from '@/interface/Contato';
import { Button } from 'react-native-paper';


export default function Favorites () {
  const [contatos, setContatos] = useState<Contato[]>([]);
  
  useEffect(() => {
    obterContatos();
  }, []);

  async function obterContatos() {
    let cJson = await AsyncStorage.getItem('contatos')
    if (cJson) {
        let contatos = JSON.parse(cJson);

        let filterFavorites = contatos.filter((fav: any)=> fav.favorito === true);

      setContatos(filterFavorites)
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
                <View style={styles.iconWrapper}>
                    <Icon name="person" size={40} color="#fff" />
                    
                    <Icon name="star" size={20} color="#ffd700" style={styles.starIcon} />
                
                </View>
              {/* <Icon name="person" size={40} color="#fff" />
              <Icon name="star" size={40} color="#fff" /> */}
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
  iconWrapper: {
    position: 'relative',
  },
  starIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  
});

