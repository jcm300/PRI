var express = require('express')
var router = express.Router()
var jsonfile = require("jsonfile")
var formidable = require("formidable")
var fsExtra = require("fs.extra")

var myBD = __dirname + "/../public/data/data.json" 

router.get('/', (req, res) => {res.render("index")})

router.get("/table", (req,res) => {
    jsonfile.readFile(myBD, (erro,dados)=>{
        if(!erro) res.render("table", {ficheiros: dados})
        else res.json(erro)
    })
})

router.post("/saveFile",(req,res)=>{
    var form = new formidable.IncomingForm()

    form.parse(req, (erro, fields, formData)=>{
        if(!erro){
            var fenviado = formData.file.path
            var fnovo = __dirname + "/../public/uploaded/" + formData.file.name

            fsExtra.move(fenviado,fnovo, erro2 => {
                if(!erro2){
                    jsonfile.readFile(myBD,(erro3,dados)=>{
                        if(!erro3){
                            var fich = {nome: formData.file.name,
                                        path: "/uploaded/" + formData.file.name,
                                        desc: fields.desc}
                            dados.push(fich)
                            jsonfile.writeFile(myBD, dados, erro4 =>{
                                if(!erro4){
                                    console.log("Registo gravado com sucesso")
                                    res.json(formData.file.name)
                                }else{
                                    console.log("Erro: " + erro4)
                                    res.status(500).json(erro4)
                                }   
                            })
                        }else{
                            console.log("Erro: " + erro3)
                            res.status(500).json(erro3)
                        }   
                    })
                }else{
                    console.log("Erro: " + erro2)
                    res.status(500).json(erro2)
                }
            })
        }else{
            console.log("Erro: " + erro)
            res.status(500).json(erro)
        }   
    })
})

module.exports = router
