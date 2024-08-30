import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    tipo: Yup.string().required('Tipo é obrigatório'),
    telefone: Yup.string()
      .matches(/^\d+$/, 'Telefone deve conter apenas números')
      .min(10, 'Telefone deve ter pelo menos 10 dígitos')
      .max(15, 'Telefone deve ter no máximo 15 dígitos')
      .required('Telefone é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
  });