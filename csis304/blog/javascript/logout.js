function logOut(logInBtn) {
  // log out ajax post
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://web.cs.georgefox.edu:8080/logout", true);
  xhttp.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
  xhttp.setRequestHeader('accept', 'application/json');
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhttp.onreadystatechange = (e) => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      
    }
  }
  alert('Logged Out');
  document.getElementById('loggedInElement').innerHTML = '';
  logInBtn.innerText = 'Login';
  logInBtn.onclick = function () {
    onLogIn();
  }

  //console.log('logged out');
  //xhttp.send(post);
}

function logOutReference(userName, pword, submit) {
  // log out function with form
  userName.style.visibility = 'hidden';
  console.log('remove');
  pword.style.visibility = 'collapse';
  submit.style.visibility = 'collapse';
  logInBtn = document.getElementById('login');
  logInBtn.innerText = 'Logout';
  logInBtn.onclick = function () {
    logOut(logInBtn);
  };
}