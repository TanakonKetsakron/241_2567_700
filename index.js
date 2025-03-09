const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message');
    try {

    let interest = ''
    for (let i = 0; i < interestDOMs.length; i++) {
              interest += interestDOMs[i].value
              if (i != interestDOMs.length - 1) {
                        interest += ', '
              }
    }

    let userData = {
              firstName: firstNameDOM.value,
              lastName: lastNameDOM.value,
              age: ageDOM.value,
              gender: genderDOM.value,
              description: descriptionDOM.value,
              interests: interest

    }
    console.log('submitData', userData);
    
      const response = await axios.post('http://localhost:8000/users', userData)
      console.log('response', response.data);
      messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อยแล้ว'
      messageDOM.className ='message success'
    }catch(err) {
      if (err.response) {
        console.log("err.response",err.response.data.message);
      }
      messageDOM.innerText = 'บันทึกข้อมูลไม่สำเร็จ'
      messageDOM.className ='message danger'
    }
   
}