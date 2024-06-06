import { db } from "../utils/db.js";
export const loginController = async (req, res) => {
    try {
        const { uid, pass } = req.body
        if (!uid && uid.trim('')) return res.status(502).send({ error: 'uid is required' })
        if (!pass && pass.trim('')) return res.status(502).send({ error: 'pass is required' })
        const sql = "SELECT uid, pass FROM login WHERE uid = ? AND pass = ?"
        db.query(sql, [uid,pass], (err, result) => {
            if (err) {
                res.status(404).send({
                    success: false,
                    message: 'Inernal wrong',
                    error: err.message
                })
            }
            if (result.length > 0) {
                res.status(200).send({
                    success: true,
                    message: 'Succesfully Login',
                    result
                })
            } else {
                res.status(502).send({
                    success: false,
                    error: 'Invalid user',
                    err
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something wrong to login controller',
            error: error.message
        })
    }
}