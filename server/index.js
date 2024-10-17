import Express from 'express'

const app = Express()


app.get('/pegaroutracoisa', function (req, res) {
    res.send('esta e outra mensagem')
})


app.listen(8000)