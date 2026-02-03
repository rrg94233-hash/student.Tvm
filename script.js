const loginForm = document.getElementById('loginForm');
const userList = document.getElementById('userList');
const studentInput = document.getElementById('studentId');

// 1. ฟังก์ชันป้องกันการพิมพ์ตัวอักษร (พิมพ์ได้แค่ตัวเลข 0-9)
if (studentInput) {
    studentInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5);
    });
}

// 2. ฟังก์ชันดึงข้อมูลมาแสดงผล
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('tvm_data')) || [];
    userList.innerHTML = ''; 
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.style.padding = "8px 0";
        li.style.borderBottom = "1px solid #eee";
        li.style.listStyle = "none";
        li.style.fontSize = "13px";
        li.textContent = `ID: ${user.id} — บันทึกเมื่อ: ${user.time}`;
        userList.appendChild(li);
    });
}

// 3. ฟังก์ชันเมื่อกดยืนยัน (Sign In)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const id = studentInput.value;
    const time = new Date().toLocaleString('th-TH');

    // แก้ไขเงื่อนไขตรงนี้: ถ้าไม่เท่ากับ 5 หลัก ให้เตือน
    if (id.length !== 5) {
        alert("❌ กรุณากรอกรหัสประจำตัวให้ครบ 5 หลัก!");
        return; 
    }

    // ดึงข้อมูลเดิม
    let users = JSON.parse(localStorage.getItem('tvm_data')) || [];

    // บันทึกใหม่ไว้บนสุด
    users.unshift({ id, time });

    // เก็บแค่ 30 คนล่าสุด
    if (users.length > 30) {
        users.pop();
    }

    localStorage.setItem('tvm_data', JSON.stringify(users));
    
    displayUsers();
    loginForm.reset();
    alert("✅ บันทึกข้อมูลสำเร็จ!");
});

// 4. ล้างข้อมูล
function clearData() {
    if(confirm('ล้างข้อมูลทั้งหมด?')) {
        localStorage.removeItem('tvm_data');
        displayUsers();
    }
}

displayUsers();