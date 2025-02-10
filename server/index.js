const express = require('express');
const bodyParser = require('body-parser');
const app = express();  

const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1

//ใช้สำหรับแสดงข้อมูล user ทั้งหมด เพิ่มข้อมูลลงไป
app.get('/users', (req, res) => {
  res.json(users);
 
})

// path: / user ใช้ในการ สร้างข้อมูล userใหม่  เพิ่มข้อมูลลงไป
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter
  counter += 1
  users.push(user);
  res.json({
    message: 'Create new user successfully',
    user: user
  });

})
// PUT / user/:id ใช้สำหรับแก้ไขข้อมูล user ที่มี id ตามที่ระบุ
app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;

  //ค้นหา users ที่ต้องการแก้ไข
  let.selectedIndex = users.findIndex(user => user.id == id)

 
  //แก้ไขข้อมูล users ที                                หรือ ||  
  if(updateUser.firstname){
    users[selectIndex].firstname = updateUser.firstname;

  }
  if(updateUser.lastname){
    users[selectIndex].lastname = updateUser.lastname;

  }

  users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname;  
  users[selectIndex].lastname = updateUser.lastname|| users[selectIndex].lastname;


  res.json({
    message: 'Update user successfully',
    data: {
      user: updateUser,
      indexUpdated: selectIndex
    }
  })
})
  //users ที่ update ใหม่ กลับเข้าไปในเก็บ  users เดิม
app.delete('/user/:id', (req, res) => {
  //path: /user/:id ใช้สำหรับลบข้อมูล user ที่มี id ตามที่ระบุ
  let id = req.params.id;
  //หา index ของ user ที่ต้องการลบ
  let selectedIndex = users.findIndex(user => user.id == id)

  //ลบs
  delete users.splice(selectedIndex, 1)
  res.json({
    message: 'Delete user successfully',
    indexDeleted: selectedIndex
  })
})
 


app.listen(port, (req,res) => {
  console.log('Http Server is running on port ' + port);
});

/* 
Get / users สำหรับ get users ทั้งหมด ที่บันทึกไว้
POst /users สำหรับสร้าง user ใหม่ เข้าไป
GET /users/:id สำหรับดึง user id รายคนออกมา
PUT/ users /:id สำหรับแก้ไข user รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users / :id สำหรับลบ user รายคน (ตาม id ที่บันทึกเข้าไป)
*/