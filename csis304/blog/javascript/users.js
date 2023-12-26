

let userIdMap = {}
// map of user id's used for comments

function getAllUsers() {
  // loads users
  const request = new XMLHttpRequest();
  const url = 'http://web.cs.georgefox.edu:8080/users';
  request.open("GET", url);
  request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
  request.send();
  request.onreadystatechange = (e) => {
    if (request.readyState == 4 && request.status == 200) {
      let result = JSON.parse(request.responseText);
      for (let i = 0; i < result.length; i++) {
        let user = result[i];
        userIdMap[Number(user.id)] = user.username;
        console.log(userIdMap);
      }
    }
  }
}

function onLogIn() {
  // uses form to gather data
  let anchor = document.getElementById('menu');
  let form = document.createElement("FORM");
  form.setAttribute("id", "registerUser");
  anchor.appendChild(form);

  let userName = document.createElement("INPUT");
  userName.setAttribute("type", "text");
  userName.setAttribute("value", "");
  userName.placeholder = 'Username';
  document.getElementById("menu").appendChild(userName);


  let pword = document.createElement("INPUT");
  pword.setAttribute("type", "text");
  pword.setAttribute('value', '');
  pword.placeholder = 'Password';
  document.getElementById('menu').appendChild(pword);

  let submit = document.createElement("INPUT");
  submit.setAttribute("type", "submit");
  document.getElementById('menu').appendChild(submit);
  submit.onclick = function () {
    setUserName(userName.value);
    logIn(userName.value, pword.value);
    logOutReference(userName, pword, submit);
  };
}


function logIn(userName, pword) {

  // sends log in form
  let post = "username=" + userName + "&password=" + pword;
  var xhttp = new XMLHttpRequest();


  xhttp.open("POST", "http://web.cs.georgefox.edu:8080/token", true);
  xhttp.setRequestHeader('accept', 'application/json');
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhttp.onreadystatechange = (e) => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      let tokenResponse = JSON.parse(xhttp.responseText);
      setAccessToken(tokenResponse.access_token);
      setTokenType(tokenResponse.token_type);
      loadAllPosts();
      document.getElementById('makePost').style.visibility = 'visible';
      document.getElementById('loggedInElement').innerHTML = 'Logged In: ' + getUserName();
    }
  }
  xhttp.send(post);

}
