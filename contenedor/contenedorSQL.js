import knex from "knex";

class ContenedorSQL {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }
    async listar(id) {
        try{
            return this.knex.select("*").from(this.table).where("id",id)
        }catch(error){
            console.log("Error al listar por id",error);
        }
    }
async listarTodo(){
    try{
        return this.knex.select("*").from(this.table)
    }catch(error){
        console.log("Error traer todo",error);
    }
}
async save(prod) {
    try{
        return this.knex.insert(prod).into(this.table)
    }catch(error){
    console.log("error en la insercion del producto",error);
    }
}
async update(prod, id){
    try{
        return this.knex.from(this.table).where("id",id).update(prod)
    } catch(error){
        console.log("error en update",error);
    }
}

async deleteProduct(id){
    try{
        return this.knex.delete().from(this.table).where("id",id)
    }catch(error){
        console.log("error en el delete",error);
    }
 }
}
export default ContenedorSQL