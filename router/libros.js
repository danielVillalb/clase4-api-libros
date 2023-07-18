const express=require('express');
const router=express.Router();
const libros=require('../data');
const Joi=require('joi');
/*Validamos esquemas */
const libroShema=Joi.object({
    titulo:Joi.string().required().label('Titulo'),
    autor:Joi.string().required().label('Autor')
})

/*-----------Declaramos los metodos---------------------*/

/*METODO GET*/
router.get('/',(req,res,next)=>{
    try{
        res.json(libros)
    }catch(err){
        next(err)
    };
});
/*--------TRAER SEGUN EL ID--------------*/
router.get('/:id',(req,res,next)=>{
    try{
        const id=req.params.id;
        const libro=libros.find((l)=>l.id===id);
        if(!libros){
            const error=new Error('libro no encontrado');
            throw error;
        }
        res.json(libro);
    }catch(err){
        next(err);
    }
});
/*-----------METODO POST-------------*/
router.post('/',(req,res,next)=>{
    try{
        const {error,value}=libroShema.validate(req.body);
        if(error){
            const validationError=new Error('error de validacion');
            validationError.status=400;
            validationError.details=error.details.map(detail=>detail.message);
            throw validationError;
        }
        const {titulo,autor}=value;
        const nuevoLibro={
            id:libros.length+1,
            titulo,
            autor
        }
        libros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);

    }catch(err){
        next(err);
    }
})
/*----------METODO PUT-----------------*/
router.put('/:id',(req,res,next)=>{
    try{
        const id=req.params.id;
        const libro=libros.find((l)=>l.id===id);
        if(!libro){
            const error=new Error('no se encontro el libro que quiere editar');
            error.status=404;
            throw error;
        }
        const {error,value}=libroShema.validate(req.body);
        if(error){
            const validationError=new Error('error de validacion');
            validationError.status=400;
            validationError.details=error.details.map(details=>details.message);
            throw validationError;
        }
        const {tiulo,autor}=value;
            libro.titulo=titulo||libro.titulo,
            libro.autor=auto||libro.autor
        res.json(libro);
    }catch(err){
        next(err);
    }
})



/*-------------METODO DELETE------------*/


router.delete('/:id',(req,res,next)=>{
    try{
        const id=req.params.id;
        const index=libros.findIndex((l)=>l.id===id)
        if(index===-1){
            const error=new Error('no se encontro el libro');
            error.status=404;
            throw error;
        }
        libros.splice(index,1);/*se elimina el index si encontro el libro */
        res.json(libros);
    }catch(err){
        next(err);
    }
})


module.exports=router;











