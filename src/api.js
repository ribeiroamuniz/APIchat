const express = require("express");
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const token = require('../util/token');
const usuarioController = require('./controller/usuariocontroller'); // Corrigido para importar o controlador de usuário
const salaController = require('./controller/salacontroller'); // Corrigido para importar o controlador de sala

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Definindo as rotas
router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>");
});

router.get('/sobre', (req, res) => {
    res.status(200).send({
        "nome": "API-CHAT",
        "versão": "0.1.0",
        "autor": "Angélica Muniz"
    });
});

router.get('/salas', async (req, res) => {
    if (await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});

router.post('/sala/criar', async (req, res) => {
    if (await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let novaSala = await salaController.criar(req.body);
        res.status(201).send(novaSala);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});

router.put('/sala/entrar', async (req, res) => {
    if (!await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)){
        return res.status(400).send({ msg: "Usuário não autorizado" });
    }
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});

router.get('/sala/membros', async (req, res) => {
    if (!await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        return res.status(400).send({ msg: "Usuário não autorizado" });
    }
    const idSala = req.query.idSala;
    if (!idSala) {
        return res.status(400).send({ msg: "idSala é obrigatório" });
    }
    try {
        let membros = await salaController.listarMembros(idSala);
        res.status(200).send(membros);
    } catch (error) {
        console.error("Erro ao listar membros:", error);
        res.status(500).send({ msg: "Erro ao listar membros" });
    }
});

router.post('/sala/mensagem', async (req, res) => {
    if (!await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)){ 
        return res.status(400).send({ msg: "Usuário não autorizado" });
    }
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
});

router.get('/sala/mensagens', async (req, res) => {
    if (!await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)){ 
        return res.status(400).send({ msg: "Usuário não autorizado" });
    }
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
});

router.post('/entrar', async (req, res) => {
    const resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
});

router.delete('/sala/sair', async (req, res) => {
    if (!await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)){ 
        return res.status(400).send({ msg: "Usuário não autorizado" });
    }
    const resp = await salaController.sair(req.query.iduser, req.query.idSala);
    res.status(200).send(resp);
});

router.delete('/sair', async (req, res) => {
    if (!await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)){ 
        return res.status(400).send({ msg: "Usuário não autorizado" });
    }
    const resp = await usuarioController.sairChat(req.headers.iduser);
    res.status(200).send(resp);
});

// Usando o router
app.use('/', router);

module.exports = app;