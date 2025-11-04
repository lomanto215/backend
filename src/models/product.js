import Pool from '../config/db.js'

const selectAll = ({ limit, offset, sort, sortby }) => {
    return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const select = async (id) => {
    return await Pool.query(`select id, name, stock, price, photo, description from product where id = $1`, [id]);
}

const insert = async (data) => {
    const { name, stock, price, photo, description } = data
    return await Pool.query(
        `INSERT INTO product (name, stock, price, photo, description) VALUES ($1, $2, $3, $4, $5)`, 
        [name, stock, price, photo, description]
    );
}

const update = async (data) => {
    const { name, stock, price, photo, description, id } = data
    return await Pool.query(
        `UPDATE product set name = $1, stock = $2, price = $3, photo = $4, description = $5 where id = $6`, 
        [name, stock, price, photo, description, id]
    );
}

const deleteData = async (id) => {
    return await Pool.query(`delete from product where id = $1`, [id]);
}

const countData = () => {
    return Pool.query(`select count(*) from product`)
}

const findId = (id) => {
    return Pool.query(`select id from product where id ${id}`)
}

export { selectAll, select, insert, update, deleteData, countData, findId}