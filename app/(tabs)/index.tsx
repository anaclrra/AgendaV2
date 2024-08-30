import React, { useState } from 'react';
import { Contato } from '@/interface/Contato';
import { validationSchema } from '../validate';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Cadastro() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [error, setError] = useState<string | null>(null);

  const adicionarContato = async (novoContato: Contato) => {
    console.log('new:', novoContato);
    const foundEmail = contatos.find(contato => {
      return contato.email === novoContato.email;
    })
    if(foundEmail){
      setError('Email já adicionado a lista de contatos.');
    }else{
        setError(null);
        let cJson = await AsyncStorage.getItem('contatos');
        let contatos = cJson ? JSON.parse(cJson) : [];
        contatos.push(novoContato);
        await AsyncStorage.setItem('contatos', JSON.stringify(contatos));
        setContatos(contatos);
    }
  };

  const handleSubmit = (values: Contato, { resetForm }: { resetForm: () => void }) => {
    adicionarContato(values);
    resetForm();
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <Formik
        initialValues={{ nome: '', telefone: '', email: '', tipo: '', favorito: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
            />
            {touched.nome && errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Telefone"
              onChangeText={handleChange('telefone')}
              onBlur={handleBlur('telefone')}
              value={values.telefone}
              keyboardType="numeric"
            />
            {touched.telefone && errors.telefone && <Text style={styles.error}>{errors.telefone}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              onChangeText={handleChange('tipo')}
              onBlur={handleBlur('tipo')}
              value={values.tipo}
            />
            {touched.tipo && errors.tipo && <Text style={styles.error}>{errors.tipo}</Text>}

            <View style={styles.radioContainer}>
              <Text style={styles.radioLabel}>Marcar como Favorito:</Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  value="sim"
                  status={values.favorito ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('favorito', true)}
                />
                <Text>Sim</Text>

                <RadioButton
                  value="nao"
                  status={!values.favorito ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('favorito', false)}
                />
                <Text>Não</Text>
              </View>
            </View>

        
            <Button
              onPress={() => handleSubmit()}
              mode="contained"
            >Cadastrar</Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,

  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  radioContainer: {
    marginTop: 10,
    marginBottom: 12,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2e2e2e'
  }
});
