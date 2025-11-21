
function showSection(id){
  document.querySelectorAll('.section').forEach(x=>x.style.display='none');
  document.getElementById(id).style.display='block';
}

let schedules = JSON.parse(localStorage.getItem('schedules')||'[]');
let students = JSON.parse(localStorage.getItem('students')||'[]');
let staff = JSON.parse(localStorage.getItem('staff')||'[]');

function save(){
  localStorage.setItem('schedules',JSON.stringify(schedules));
  localStorage.setItem('students',JSON.stringify(students));
  localStorage.setItem('staff',JSON.stringify(staff));
}

/* SCHEDULES */
function addSchedule(){
  schedules.push({name:schName.value, test:schTest.value, date:schDate.value, time:schTime.value});
  save(); renderSchedules();
}

function renderSchedules(){
  let q=schSearch.value.toLowerCase();
  let rows=schedules.filter(s=>JSON.stringify(s).toLowerCase().includes(q))
  .map((s,i)=>{
    let rem = calcRemaining(s.date,s.time);
    return `<tr>
      <td>${s.name}</td>
      <td>${s.test}</td>
      <td>${s.date}</td>
      <td>${s.time}</td>
      <td class='${rem.cls}'>${rem.text}</td>
      <td><button onclick='editSchedule(${i})'>Edit</button></td>
      <td><button onclick='delSchedule(${i})'>Del</button></td>
    </tr>`;
  }).join('');
  schTable.innerHTML="<tr><th>Name</th><th>Test</th><th>Date</th><th>Time</th><th>Remaining</th><th></th><th></th></tr>"+rows;
}
setInterval(renderSchedules,1000);
function delSchedule(i){schedules.splice(i,1);save();renderSchedules();}
function editSchedule(i){
  let s = schedules[i];
  schName.value=s.name; schTest.value=s.test; schDate.value=s.date; schTime.value=s.time;
  schedules.splice(i,1); save(); renderSchedules();
}

/* STUDENTS */
function addStudent(){
  students.push({
    name:stuName.value,father:stuFather.value,email:stuEmail.value,passport:stuPassport.value,
    test:stuTest.value,total:stuTotal.value,discount:stuDiscount.value,
    remain:stuRemain.value,status:stuStatus.value
  });
  save(); renderStudents();
}
function renderStudents(){
  let q=stuSearch.value.toLowerCase();
  let rows = students.filter(s=>JSON.stringify(s).toLowerCase().includes(q))
  .map((s,i)=>`<tr>
      <td>${s.name}</td><td>${s.father}</td><td>${s.email}</td><td>${s.passport}</td>
      <td>${s.test}</td><td>${s.total}</td><td>${s.discount}</td><td>${s.remain}</td><td>${s.status}</td>
      <td><button onclick='editStudent(${i})'>Edit</button></td>
      <td><button onclick='delStudent(${i})'>Del</button></td>
  </tr>`).join('');
  stuTable.innerHTML="<tr><th>Name</th><th>Father</th><th>Email</th><th>Passport</th><th>Test</th><th>Total</th><th>Discount</th><th>Remain</th><th>Status</th><th></th><th></th></tr>"+rows;
}
function delStudent(i){students.splice(i,1);save();renderStudents();}
function editStudent(i){
  let s=students[i];
  stuName.value=s.name; stuFather.value=s.father; stuEmail.value=s.email;
  stuPassport.value=s.passport; stuTest.value=s.test;
  stuTotal.value=s.total; stuDiscount.value=s.discount;
  stuRemain.value=s.remain; stuStatus.value=s.status;
  students.splice(i,1); save(); renderStudents();
}

/* STAFF */
function addStaff(){
  staff.push({
    name:stName.value,father:stFather.value,pos:stPos.value,
    salary:stSalary.value,phone:stPhone.value,cnic:stCnic.value
  });
  save(); renderStaff();
}
function renderStaff(){
  let q=stSearch.value.toLowerCase();
  let rows=staff.filter(s=>JSON.stringify(s).toLowerCase().includes(q))
  .map((s,i)=>`<tr>
    <td>${s.name}</td><td>${s.father}</td><td>${s.pos}</td><td>${s.salary}</td>
    <td>${s.phone}</td><td>${s.cnic}</td>
    <td><button onclick='editStaff(${i})'>Edit</button></td>
    <td><button onclick='delStaff(${i})'>Del</button></td>
  </tr>`).join('');
  stTable.innerHTML="<tr><th>Name</th><th>Father</th><th>Position</th><th>Salary</th><th>Phone</th><th>CNIC</th><th></th><th></th></tr>"+rows;
}
function delStaff(i){staff.splice(i,1);save();renderStaff();}
function editStaff(i){
  let s=staff[i];
  stName.value=s.name; stFather.value=s.father; stPos.value=s.pos;
  stSalary.value=s.salary; stPhone.value=s.phone; stCnic.value=s.cnic;
  staff.splice(i,1); save(); renderStaff();
}

/* PRINT RECEIPT (Browser PDF via Print Dialog) */
function printReceipt(data){
  let win = window.open("");
  win.document.write(`<h1>The Icons Academy</h1>
  <p>00923255810565<br>Office No 9, 3rd Floor, Haq Nawaz Plaza, G1 Markaz Islamabad</p>
  <hr>
  <p>Name: ${data.name}</p>
  <p>Father: ${data.father}</p>
  <p>Passport: ${data.passport}</p>
  <p>Test: ${data.test}</p>
  <p>Total: ${data.total}</p>
  <p>Discount: ${data.discount}</p>
  <p>Remaining: ${data.remain}</p>
  <p>Status: ${data.status}</p>
  `);
  win.print();
}

function calcRemaining(date, time){
  let dt = new Date(date+" "+time);
  let now = new Date();
  let diff = dt - now;
  if(diff<=0) return {text:"Time Up", cls:"done"};
  let days=Math.floor(diff/(1000*60*60*24));
  let hrs=Math.floor((diff/(1000*60*60))%24);
  let mins=Math.floor((diff/(1000*60))%60);
  let secs=Math.floor((diff/1000)%60);
  let cls="good";
  if(diff<24*3600*1000) cls="warn";
  if(diff<3*3600*1000) cls="urgent";
  return {text:`${days}d ${hrs}h ${mins}m ${secs}s`, cls:cls};
}
