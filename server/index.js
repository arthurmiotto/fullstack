import Express from 'express';
import { User, sequelize } from './db.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import fetch from 'node-fetch'; // Importando fetch

const app = Express();

app.use(Express.json());
app.use(cors());

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados.');
  })
  .catch((err) => {
    console.log('Erro ao conectar:', err);
  });

// Endpoint para registrar um novo usuário
app.post('/registro', async function (req, res) {
  try {
    const { nome, sobrenome, email, senha, dataNascimento } = req.body;

    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
      res.status(406).send('Todos os campos devem ser enviados');
      return;
    }

    if (await User.findOne({ where: { email: email } })) {
      res.status(400).send('Usuário já existente no sistema');
      return;
    }

    const senhaSegura = bcryptjs.hashSync(senha, 10);

    const novoUsuario = await User.create({
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senhaSegura,
      dataNascimento: dataNascimento,
    });

    res.status(201).send('Ok, usuário criado');
  } catch (erro) {
    console.log(erro);
    res.status(500).send('Erro interno ao registrar o usuário');
  }
});

// Endpoint para login
app.post('/login', async function (req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(406).send('Todos os campos devem ser preenchidos');
    }

    const usuario = await User.findOne({ where: { email: email } });
    if (!usuario) {
      return res.status(404).send('Este usuário não está cadastrado');
    }

    const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(403).send('Senha incorreta');
    }

    const token = jwt.sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
      },
      'chavecriptografiasupersegura',
      {
        expiresIn: '30d',
      }
    );

    res.status(200).send({ msg: 'Você foi logado', token: token });
  } catch (erro) {
    console.log(erro);
    res.status(500).send('Houve um problema ao processar o login');
  }
});

// Endpoint para alterar a senha
app.put('/alterar-senha', async (req, res) => {
  try {
    const { email, senhaAtual, novaSenha } = req.body;

    if (!email || !senhaAtual || !novaSenha) {
      return res.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    const usuario = await User.findOne({ where: { email: email } });
    if (!usuario) {
      return res.status(404).send({ error: 'Usuário não encontrado.' });
    }

    const senhaCorreta = bcryptjs.compareSync(senhaAtual, usuario.senha);
    if (!senhaCorreta) {
      return res.status(403).send({ error: 'Senha atual incorreta.' });
    }

    const novaSenhaCriptografada = bcryptjs.hashSync(novaSenha, 10);
    await usuario.update({ senha: novaSenhaCriptografada });

    return res.status(200).send({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para atualizar a foto do perfil
app.put('/atualizar-foto', async (req, res) => {
  try {
    const { email, fotoUri } = req.body;

    if (!email || !fotoUri) {
      return res.status(400).send({ error: 'Email e URL da foto são obrigatórios.' });
    }

    // Fazer o upload da imagem para o Cloudinary
    const cloudinaryResponse = await uploadImageToCloudinary(fotoUri);

    if (!cloudinaryResponse.secure_url) {
      return res.status(500).send({ error: 'Erro ao fazer upload da imagem no Cloudinary.' });
    }

    const usuario = await User.findOne({ where: { email: email } });
    if (!usuario) {
      return res.status(404).send({ error: 'Usuário não encontrado.' });
    }

    // Atualizando a URL da foto do perfil no banco de dados
    await usuario.update({ foto: cloudinaryResponse.secure_url });

    return res.status(200).send({ message: 'Foto do perfil atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao atualizar a foto do perfil.' });
  }
});

// Função para fazer upload da imagem para o Cloudinary
async function uploadImageToCloudinary(fotoUri) {
  try {
    const data = new FormData();
    const fileName = fotoUri.split('/').pop();
    const fileType = fileName.split('.').pop();

    data.append('file', {
      uri: fotoUri,
      name: fileName,
      type: `image/${fileType}`,
    });
    data.append('upload_preset', 'ml_default'); // Substitua com seu upload_preset
    data.append('cloud_name', 'dpu9eooql'); // Substitua com seu cloud_name

    const response = await fetch('https://api.cloudinary.com/v1_1/dpu9eooql/image/upload', {
      method: 'POST',
      body: data,
    });

    return await response.json();
  } catch (error) {
    console.error('Erro no upload de imagem:', error);
    throw new Error('Erro ao enviar a imagem para o Cloudinary');
  }
}

// Iniciando o servidor
app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
