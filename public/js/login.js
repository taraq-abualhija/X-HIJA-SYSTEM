const form = document.getElementById("formLogin");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // ANOTHER SOLUTION SUBSITUTE OF CSS DISPLAY="BLOCK"
  errorEmail.textContent=""
  errorPassword.textContent=""

  const res = await fetch("/login", {
    method: "POST",
    body: JSON.stringify({
      email: floatingInputEmail.value,
      password: floatingPassword.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
    
  if(data.notFoundEmail)
  {
    errorEmail.textContent=data.notFoundEmail
  }
  if(data.invaildPass)
  {
    errorPassword.textContent=data.invaildPass
  }
  if(data.id)
  {
    console.log(data.id);
    location.assign("/home")
  }
    

});