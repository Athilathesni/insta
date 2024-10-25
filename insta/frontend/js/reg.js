document.getElementById('register').addEventListener('submit',async function(e) {
    e.preventDefault()

username=document.getElementById('name').value
email=document.getElementById('email').value
pass=document.getElementById('pass').value
phone=document.getElementById('phone').value


console.log(username,email,pass,phone);
const res=await fetch('http://localhost:3000/api/addusers',{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,email,pass,phone})
})
console.log(res);

const data=await res.json()
if(res.status==201){
    alert(data.msg)
    window.location.href="../index.html"
}
else{
    alert(data.error)
}

})