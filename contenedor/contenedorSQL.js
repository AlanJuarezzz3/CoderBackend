import knex from "knex";

class ContenedorSQL {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla=tabla
    }

    async listar(id) {
        try{
            return this.knex.select("*").from(this.table).where("id",id)
        }catch(error){
            console.log("Error al listar por id");
        }
    }
async listarTodo(){
    try{
        return this.knex.select("*").from(this.table)
    }catch(error){
        console.log("Error traer todo");
    }
}
async save(prod) {
    try{
        return this.knex.insert(prod).into(this.table)
    }catch(error){
    console.log("error en la insercion del producto");
    }
}
async update(prod, id){
    try{
        return this.knex.from(this.table).where("id",id).update(prod)
    } catch(error){
        console.log("error en update");
    }
}

async deleteProduct(id){
    try{
        return this.knex.delete().from(this.table).where("id",id)
    }catch(error){
        console.log("error en el delete");
    }
 }
}
export default ContenedorSQL  