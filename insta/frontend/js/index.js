async function adduser() {
    const token =localStorage.getItem("token")
    const res = await fetch("http://localhost:3000/api/adduser",{
        headers:{"authorization":`Bearer ${token}`}
    });
const user=await res.json()
console.log(user);
str=``
user.map((data)=>{
    str=`
    <div class="lob">
        <button class="login">
        <a href="../pages/login.html?id=${data._id}"></a></button>
    </div>
   <nav class="nav">
    <div class="nam">${data.name}</div>
    <div class="img"><a href="../pages/prof.html"><img src="${data.img}" alt=""></a>

    </div>
   </nav> 
    `
    
})
document.getElementById('head').innerHTML=str
}
adduser()