// Importar la clase Pool
const { Pool } = require('pg')
const { rows } = require('pg/lib/defaults')

//Crea instancia declarando en el objeto de configuración la base de datos 'cursos'
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "JBJFourier1768@",
    database: "cursos",
    port: 5432,
})

//Crea función asíncrona de nombre “newCurso” que:
//Recibe parámetros.
//Retorna el arreglo “rows” del objeto “result”, luego de hacer la consulta SQL con el método “query”.
//Incluye el comando RETURNING * al final de la sentencia SQL para obtener el registro que se está creando en la tabla.
const newCurso = async (nombre, nivelTecnico, fechaInicio, duracion) => {
    const sqlNewCurso = {
        text: `INSERT INTO curso (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
        values: [nombre, nivelTecnico, fechaInicio, duracion],
    }
    try {
        const result = await pool.query(sqlNewCurso)
        console.log(`El curso ${nombre} ha sido agregado exitosamente.`)
        return result.rows
    } catch (error) {
        console.log(`Ha ocurrido un error al agregar el nuevo curso.\n${error}`)
        return error
    }
}

// SCrear función asíncrona de nombre “getCurso” que realiza consulta SQL para obtener y retornar todos los registros de la tabla 'cursos'
const getCurso = async () => {
    const sqlGetCurso = {
        text: `SELECT * FROM curso ORDER BY id`,
    }
    try {
        const result = await pool.query(sqlGetCurso)
        console.log(`La consulta 'getCurso' ha sido ejecutada exitosamente.`)
        return result.rows
    } catch (error) {
        console.log(`Ha ocurrido un error al ejecutar la consulta 'getCurso' la tabla de datos.\n${error}`)
        return error
    }
}

//Crea función asíncrona de nombre “editCurso”, que reciba como primer parámetro el id del curso que se desea actualizar de parámetros que usaremos para actualizarlo.
//El objetivo de esta función será devolver un registro actualizado luego de emitir una consulta SQL a la tabla 'cursos'.
const editCurso = async (id, nombre, nivelTecnico, fechaInicio, duracion) => {
    const sqlEditCurso = {
        text: `UPDATE curso SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
        values: [id, nombre, nivelTecnico, fechaInicio, duracion]
    }
    try {
        const result = await pool.query(sqlEditCurso)
        console.log(`El curso ${id} (${nombre}) ha sido actualizado exitosamente.`)
        return result.rows
    } catch (error) {
        console.log(`Ha ocurrido un error al editar el curso.\n${error}`)
        return error
    }
}

//Crea función asíncrona de nombre “deleteCurso” que ejecuta consulta SQL para eliminar el registro de la tabla 'cursos' que coincide con el id recibido como parámetro. La función retorna el rowCount del objeto 'result'.
const deleteCurso = async (id) => {
    const sqlDelCurso = {
        text: `DELETE FROM curso WHERE id=$1 RETURNING *`,
        values: [id]
    }
    try {
        const result = await pool.query(sqlDelCurso)
        console.log(`El curso ${id} ha sido eliminado correctamente.`)
        return result.rows
    } catch (error) {
        console.log(`Ha ocurrido un error al eliminar el curso ${error}`)
        return error
    }
}

// Exporta objetos con las funciones asíncronas creadas
module.exports = {
    newCurso,
    getCurso,
    editCurso,
    deleteCurso
}