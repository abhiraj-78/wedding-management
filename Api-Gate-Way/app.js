import fastgateway from 'fast-gateway'
const port = 8001 ;

const server = fastgateway({
    routes : [
        {
            prefix:'/garden',
            target:'http://localhost:3001',
            // hooks:{},
            methods:['post']
        },
        {
            prefix:'sound',
            target:'http://localhost:3003'
        },
        {
            prefix:"photoGrapher",
            target:"http://localhost:3002"
        }
    ]
})

// server.get('/response',(req,res)=>{
//     res.send("called api gate way") ;
// })

server.start(port).then((result)=>{
    console.log(`server started at port no : ${port}`);
}).catch(err=>{
    console.log("Hello World",err);
})
