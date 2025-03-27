const BASE_URL = 'http://localhost:8000'

window.onload = async() => {
    await loadData()
};

const loadData = async() => {
    console.log('users page loaded')
    
    const response = await axios.get(`${BASE_URL}/users`)

    console.log(response.data)

    const userDOM = document.getElementById('users')
    

    let htmlData = `
    <table border="1">
        <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Interests</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;
    /* ปุ่ม "Delete" มี class="delete" และเก็บค่า id ไว้ใน data-id ถูกใช้งานภายหลัง และ ลบข้อมูลของผู้ใช้*/
    //ลิ้งไปที่ index.html พร้อม id  ปุ่ม Edit ใน a คลิกแล้วจะไปหน้า index.html
    /*ขึ้นบรรทัดใหม่ ใช้ br*/
    //<button class='extra1'> Pass 1</button> สร้างปุ่ม Pass 1
    for(let i = 0; i < response.data.length; i++) {
        let users = response.data[i]
        htmlData += `
        <tr>
          <td>${users.id}</td>
          <td>${users.firstname}</td>
          <td>${users.lastname}</td>
          <td>${users.age}</td>
          <td>${users.gender}</td>
          <td>${users.interests || '-'}</td>
          <td>${users.description || '-'}</td>
          <td>
              <a href='index.html?id=${users.id}'><button>Edit</button></a> 
              <button class='delete' data-id='${users.id}'>Delete</button> 
              <br> 
              <button class='extra1'> Pass 1</button>
              <button class='extra2'> Notpass 2</button>
          </td>
        </tr>
        `
    } 
    htmlData += '</tbody></table>'
    userDOM.innerHTML = htmlData

    // Event สำหรับลบ user
    const deletDOMs = document.getElementsByClassName('delete')
    for(let i = 0; i < deletDOMs.length; i++) {
        deletDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try{
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData() // โหลดข้อมูลใหม่
            }catch(error){
                console.log('error', error)
            }
        })    
    }
}
