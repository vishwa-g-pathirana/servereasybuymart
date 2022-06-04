const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
let port = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());
//-----------------------------------//

//---------------API----------------//

//User register

app.post("/easybuymartuser", async (req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;
        const { fname } = req.body;
        const { lname } = req.body;
        const newUser = await pool.query("INSERT INTO users (username,pword,fname,lname) VALUES ($1,$2,$3,$4) RETURNING *", [username, password, fname, lname]);
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//post product
app.post("/easybuymartprod", async (req, res) => {
    try {

        const { name } = req.body;
        const { sellername } = req.body;
        const { qnt } = req.body;
        const { prize } = req.body;
        const { quality } = req.body;
        const { username } = req.body;
        const { description } = req.body;
        // const uid = await pool.query("SELECT user_id FROM users WHERE username=$1 LIMIT 1", [username]);
        // const userid = (uid.rows[0].user_id);
        const newUser = await pool.query("INSERT INTO product (name,price,quentity,quality,sellername,display,description,cart) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [name, prize, qnt, quality, sellername, 0, description,0]);
        //res.json(uid.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all users

app.post("/easybuymartallusers", async (req, res) => {
    const { username } = req.body;
    try {
        const prod = await pool.query("SELECT pword FROM users WHERE username=$1", [username]);
        res.json(prod.rows[0].pword)
    } catch (err) {
        console.error(err.message)
    }
})

//View product for admin

app.get("/easybuymartprodviewadmin", async (req, res) => {
    try {
        const prod = await pool.query("SELECT * FROM product WHERE display=0");
        res.json(prod.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//View product for client

app.get("/easybuymartprodviewclient", async (req, res) => {
    try {
        const prod = await pool.query("SELECT * FROM product WHERE display=1 ORDER BY prod_id ASC");
        res.json(prod.rows)
    } catch (err) {
        console.error(err.message)

    }
})

//Cart Items

app.get("/easybuymartcart", async (req, res) => {
    try {
        const prod = await pool.query("SELECT * FROM product WHERE display=1 AND cart=1");
        res.json(prod.rows)
    } catch (err) {
        console.error(err.message)

    }
})

//Add to cart

app.patch("/productcart/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateVission = await pool.query("UPDATE product SET cart = $1 WHERE prod_id = $2", [1, id]);
        res.json("product is updated")
    } catch (err) {
        console.error(err.message);

    }
})

//remove from cart
app.patch("/productcartrmv/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateVission = await pool.query("UPDATE product SET cart = $1 WHERE prod_id = $2", [0, id]);
        res.json("product is updated")
    } catch (err) {
        console.error(err.message);

    }
})

//delete product by admin

app.delete("/deleteproduct/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await pool.query("DELETE FROM product WHERE prod_id= $1", [id]);
        res.json("prod is deleted");
    } catch (err) {
        console.error(err.message);
    }
})


//Approve item
app.patch("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateVission = await pool.query("UPDATE product SET display = $1 WHERE prod_id = $2", [1, id]);
        res.json("product is updated")
    } catch (err) {
        console.error(err.message);

    }
})

//Unpublish item
app.patch("/productunpublish/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateVission = await pool.query("UPDATE product SET display = $1 WHERE prod_id = $2", [0, id]);
        res.json("product is updated")
    } catch (err) {
        console.error(err.message);

    }
})



app.listen(port, () => {
    console.log(`server has startes on port ${port}`);
})
