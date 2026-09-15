function editProfile(){
  let inputs = document.querySelectorAll('input');
  let btn = document.getElementById('editBtn');
  if(inputs[0].disabled){
    inputs.forEach(i=>i.disabled=false);
    btn.innerText="Save";
  }else{
    inputs.forEach(i=>i.disabled=true);
    document.getElementById('pName').innerText=document.getElementById('name').value;
    document.getElementById('pRole').innerText=document.getElementById('role').value;
    let name=document.getElementById('name').value;
    document.getElementById('avatar').innerText=name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
    btn.innerText="Edit";
    alert("Profile Saved!");
  }
}