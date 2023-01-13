function CheckPassword(password) 
{ 

  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  console.log(decimal)
if(password.match(decimal)) 
{ 
return true

}
else
{ 
return false
}
}

export {CheckPassword}