const express = require('express');
const app = express();
const salacontroller = require("./controller/salacontroller");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res) =>{
    res.status(200).send("<h1> API-CHAT</h1>")
}));



app.use('/', router.get("/sobre", (req, res, next)=>{
    res.status(200).send({
        "nome": "api - chat",
        "versao": "0.1.0",
        "autor": "brenda Gomes"
    })
}))


app.use("/salas", router.get("/salas", (req, res, next)=>{
    const salacontroller = require("./controller/salacontroller.js");
    let resp = salacontroller.get();
    res.status(200).send(resp);
}))
module.exports = app;

app.use("/entrar", router.post("/entrar", async(req, res, next) => {
    const usuariocontroller = require("./controller/usuariocontroller.js");
    let resp = await usuariocontroller.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/salas", router.get("/salas", async (req, res, next)=>{
    if(await TokenExpiredError.checkToken(re.headers.token,req.headers.iduser,req.headers.nick)
    ){
       let resp = await salacontroller.get(); 
       res.status(200).send(resp);
    }
    else{
     res.status(200).send({msg: "Usuario não autorizado"});
    }
}))
module.exports = app;

