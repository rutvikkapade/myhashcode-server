const express=require('express')
const mysql = require('mysql');
const cors = require("cors")
const bodyParser=require('body-parser');
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({
 extended: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
const port=process.env.PORT || 3500;

var con = mysql.createConnection({
  host: "www.db4free.net",
  user: "myhashcode",
  database : "myhashcode",
  password: "rootroot"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/getCategories',(req,res)=>{
con.query('Select * from category',(error,result)=>{
if(error){
console.log(error);
}else{
console.log(result);
res.json(result);
}
});
})

app.post('/getProductType',(req,res)=>{
con.query('select * from product_type where category_name="'+req.body.category+'"',(error,result)=>{
if(error){
 res.status(500).send('Something broke!');
}else{
res.json(result);
}
})
})

app.post('/sendData',(req,res)=>{
con.query('INSERT INTO products (name, price,productImg,productType,brand) VALUES ("'+req.body.productName+'",'+req.body.productPrice+',"'+req.body.imageUrl+'","'+req.body.productType+'","'+req.body.productBrand+'");',(err,result)=>{
if(err){
console.log(err);
res.status(501).send('Not Implemented!');
}else{
res.status(200).send('Inserted Record!');
}
});

});

app.post('/getProducts',(req,res)=>{
console.log(req.body);
if(req.body.data=='All'){
con.query('select * from products inner join product_type on products.productType=product_type.product_type_name;',(err,result)=>{
if(err){
console.log(err);
}else{
res.json(result);
}
})}else{
con.query('select * from products inner join product_type on products.productType=product_type.product_type_name where product_type.category_name="'+req.body.data+'";',(err,result)=>{
if(err){
console.log(err);
}else{
res.json(result);
}})


}})

app.get('/', (req, res) => {
  res.send('<h2>server activated! visit the app : <a href="https://ecommerce-myhashcode.vercel.app">Go to the Project</a></h2>')
});

app.listen(port,()=>{
console.log("ecommerce server started !");
})