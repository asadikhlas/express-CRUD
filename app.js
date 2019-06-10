const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');


const app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use(morgan("dev"));
app.use(cors());


app.get('*', cors());


app.get('/', (req, res)=> {
  res.send('welcome to heroku app')
})

app.post("/login", (req, res) => {
  const user = [
    {
      username: "asadikhlas",
      password: "123456"
    },
    {
      username: "umairahmed",
      password: "123456"
    }
  ];

  const { username, password } = req.body;
  const data = user.filter(
    item => item.username === username && item.password === password
  );
  if (!data.length) {
    console.log("cannot found user");
  } else {
    res.send(data);
  }
});

app.post("/signup", (req, res) => {
  const user = [];
  const { username, password } = req.body;

  const merged = [...user, { username, password }];
  user.push(...merged);

  console.log(user);

  if (user.length) {
    res.status(200).send("Everything good");
  } else {
    res.status(400).send("Try Again");
  }
});


app.get('/delete/:id', (req, res)=>{
  Student.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err){
      res.send('data deleted')
    }else{
      console.log('something went wrong')
    }
  })
})

app.post('/insertrecord', (req, res)=>{
  Student.fullname = req.body.fullname,
  Student.email = req.body.email,
  Student.mobile = req.body.mobile,
  Student.save((err, doc) => {
    if(!err){
      res.send('data successfully inserted')
    }else{
      console.log('something went wrong')
    }
  })
})

app.get('/update', (req, res) => {
  Student.findByIdAndUpdate('_id', {
    username: 'asad addy',
    password:'1234568'
  },(error, doc) => {
  if(!error){
    res.send('your data is updated successfully')
  }else{
    console.log('somthing went wrong')
  }
  })
})

app.get('/view', (req, res) => {
  Student.find({}, (error, doc)=>{
    if(!error){
      res.send('all data')
    }else{
      console.log('something went wrong')
    }
  })
})
 
app.listen(3000, () => {
  console.log("server is runing at port 3000");
});
