const express=require('express');
const app=express();
const port=3006;
app.use(express.json());
const librosRoutes=require('./router/libros');
const errorHandler=require('./middlewares/errorHandler');
app.use('/libros',librosRoutes);
app.use(errorHandler);

app.listen(port,()=>{
    console.log('iniciando server',`http://localhost:${port}/comienzo`)


})


























