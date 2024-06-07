import { db } from "../utils/db.js";
export const loginController = async (req, res) => {
    try {
        const { uid, pass } = req.body
        if (!uid && uid.trim('')) return res.status(502).send({ error: 'uid is required' })
        if (!pass && pass.trim('')) return res.status(502).send({ error: 'pass is required' })
        const sql = "SELECT * FROM login WHERE uid = ? AND pass = ?"
        db.query(sql, [uid, pass], (err, result) => {
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

// forget password controller
export const forgetPassController = async (req, res) => {
    try {
        const { uid, email } = req.body
        if (!uid && uid.trim('')) return res.status(502).send({ error: 'uid is required' })
        if (!email && email.trim('')) return res.status(502).send({ error: 'pass is required' })
        const sql = "select * from login where uid=? and email=?"
        db.query(sql, [uid, email], (err, result) => {
            if (err) {
                res.status(404).send({
                    success: false,
                    message: 'Inernal wrong',
                    error: err.message
                })
            }
            if (result) {
                res.status(200).send({
                    success: false,
                    message: 'Check your email',
                    result
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something wrong to forget password controller',
            error: error.message
        })
    }
}

// post api in database
export const apiController = async (req, res) => {
    try {
        const { api } = req.body;
        
        if (!api) {
            return res.status(400).send({ error: 'api is required',api }); // Changed status code to 400 for bad request
        }

        const sql = "INSERT INTO apitable (api) VALUES (?)"; // Corrected SQL syntax for INSERT statement
        db.query(sql, [api], (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Internal server error',
                    error: err.message
                });
            }

            res.status(200).send({
                success: true, // Changed success to true as the operation was successful
                message: 'API inserted successfully',
                result
            });
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong in the API controller',
            error: error.message
        });
    }
};
