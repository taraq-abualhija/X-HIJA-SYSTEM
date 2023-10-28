const form = document.getElementById("formSignUp");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // ANOTHER SOLUTION SUBSITUTE OF CSS DISPLAY="BLOCK"
  errorEmail.textContent=""
  errorPassword.textContent=""

  const res = await fetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      username:floatingInput.value,
      email: floatingInputEmail.value,
      password: floatingPassword.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  
  if(data.invalidInput){
  data.invalidInput.forEach(item => {
    if(item.path == "email")
    {
      errorEmail.textContent=item.msg
    }
    if(item.path == "password")
    {
      errorPassword.textContent=item.msg
    }
  })};
  if(data.EmailIsExist){
    errorEmail.textContent=data.EmailIsExist
  }

  if (data.id){
    console.log(data.id);
    location.assign("/home")
  } 
});