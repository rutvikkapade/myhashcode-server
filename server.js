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



app.get('/getCategories',async(req,res)=>{
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  var data;
con.query('Select * from category',(error,result)=>{
if(error){
console.log(error);
}else{
console.log(result);
data=result;

}
});
con.end();
res.json(data);
})

app.post('/getProductType',(req,res)=>{
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
con.query('select * from product_type where category_name="'+req.body.category+'"',(error,result)=>{
if(error){
 res.status(500).send('Something broke!');
}else{
data=result;
}
})
con.end();
res.json(data);
})

app.post('/sendData',(req,res)=>{
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  var data=null;
con.query('INSERT INTO products (name, price,productImg,productType,brand) VALUES ("'+req.body.productName+'",'+req.body.productPrice+',"'+req.body.imageUrl+'","'+req.body.productType+'","'+req.body.productBrand+'");',(err,result)=>{
if(err){
console.log(err);
}
});
con.end();
if(data==null){
  con.end();
  res.status(501).send('Not Implemented!');
}else{
  con.end();
  res.status(200).send('Inserted Record!');
}

});

app.post('/getProducts',(req,res)=>{
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  var data;
if(req.body.data=='All'){
con.query('select * from products inner join product_type on products.productType=product_type.product_type_name;',(err,result)=>{
if(err){
console.log(err);
}else{
  data=result;
}
})}else{
con.query('select * from products inner join product_type on products.productType=product_type.product_type_name where product_type.category_name="'+req.body.data+'";',(err,result)=>{
if(err){
console.log(err);
}else{
  data=result;
}})
con.end();
res.json(data);

}})

app.get('/', (req, res) => {
  res.send('<h2>server activated! visit the app : <a href="https://ecommerce-myhashcode.vercel.app">myHashCode.shop</a></h2>')
});

app.listen(port,()=>{
console.log("ecommerce server started !");
})