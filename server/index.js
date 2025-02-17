const express = require('express')
 const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
 const port = 8000;
 app.use(bodyParser.json());
 let users = []
let conn=null
const initMySQL = async () => {
   conn= await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8820
  
  })
}
app.get('/users',async (req, res) => {
  const results = await conn.query('SELECT * FROM users')
  res.json(results[0])
})

app.post('/users',async (req, res) => {
let user = req.body;
  const results= await conn.query('INSERT INTO users SET ?', user)
  console.log('results', results)
res.json({
    message: 'Create user successfully',
    data: results[0]
  }) 
}) 
// path = GET /users/:id สำหรับ ดึง users รายคนออกมา
app.get('/users/:id', (req, res) => {
  let id = req.params.id;
  // ค้นหา user หรือ index ที่ต้องการดึง
  let selectedIndex = users.findIndex(user => user.id == id)
  res.json(users[selectedIndex])
}) 
// path: PUT /users/:id สำหรับแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', (req, res) => {
let id = req.params.id;
 let updateUser = req.body;
  let selectedIndex = users.findIndex(user => user.id == id)
  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
  users[selectedIndex].age = updateUser.age || users[selectedIndex].age
  users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender
res.json({
  message: 'Update user successfully',
  data: {
        user: updateUser,
        indexUpdate: selectedIndex
   }
 })
 })

app.delete('/users/:id', (req, res) => {
let id = req.params.id;
  // หา index ของ user ที่ต้องการลบ
let selectedIndex = users.findIndex(user => user.id == id)
  // ลบ
  users.splice(selectedIndex, 1)
res.json({
  message: 'Delete user successfully',
      indexDeleted: selectedIndex
 })
 })
app.listen(port,async (req, res) => {
  await initMySQL()
  console.log('http server is running on port' + port)
 });

/* 
Get / users สำหรับ get users ทั้งหมด ที่บันทึกไว้
POst /users สำหรับสร้าง user ใหม่ เข้าไป
GET /users/:id สำหรับดึง user id รายคนออกมา
PUT/ users /:id สำหรับแก้ไข user รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users / :id สำหรับลบ user รายคน (ตาม id ที่บันทึกเข้าไป)
*/