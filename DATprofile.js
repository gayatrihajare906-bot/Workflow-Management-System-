function saveProfile() {
  let name = document.getElementById('name').value;
  let role = document.getElementById('role').value;

  document.getElementById('displayName').innerText = name;
  document.getElementById('displayRole').innerText = role;

  document.getElementById('msg').innerText = "✓ Profile Updated Successfully!";
  setTimeout(() => document.getElementById('msg').innerText = "", 3000);
}

// Photo Preview
document.getElementById('imgUpload').addEventListener('change', function(e){
  let file = e.target.files[0];
  if(file){
    let reader = new FileReader();
    reader.onload = function(event){
      document.getElementById('profileImg').src = event.target.result;
    }
    reader.readAsDataURL(file);
  }
});