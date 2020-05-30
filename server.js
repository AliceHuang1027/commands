const express = require('express')
const app = express()

const cp = require("child_process")

//child_process.exec(command,{options},{callback})



const port = process.env.PORT || 8900

const progs = ['ls','git','cat','pwd']
app.use(express.static(__dirname))
app.use(express.json({limit:'10mb'}))
app.options('/todolist/*', (req, res) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Credentials'
    )
    res.send('ok')
  })

app.get('/commands',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
})

app.post('/commands',(req,res)=>{
    
    const command = req.body.command
    const main =  command.split(' ')[0]
    console.log(main)
    const result = {}
    if(!progs.find((e)=>{return e===main })){
        result.output = 'command not allowed '
        res.json(result)
    }
    const child = cp.exec(command,(error,stdout,stedrr)=>{
        if(error){
            console.log(`Name:${error.name}\nMessage:${error.message}\nStack:${error.stack}`)
            result.output = 'error'
            res.json(result)
        }

        console.log(stdout)
        result.output=stdout
        console.log("inside",result)
        res.json(result)
        
    })
   
    

})

app.listen(port,()=>{console.log(`listening on port ${port}`)})

