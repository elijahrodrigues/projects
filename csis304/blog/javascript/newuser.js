function onNewUser() {
  // function form to get create new user
    let anchor = document.getElementById('menu');
    let form = document.createElement("FORM");
    form.setAttribute("id", "newUser");
    anchor.appendChild(form);
  
    let userName = document.createElement("INPUT");
    userName.setAttribute("type", "text");
    userName.setAttribute("value", "");
    userName.placeholder = 'Set Username';
    document.getElementById("menu").appendChild(userName);
  
  
    let newPWord = document.createElement("INPUT");
    newPWord.setAttribute("type", "text");
    newPWord.placeholder = 'Set Password';
    newPWord.setAttribute('value', '');
    document.getElementById('menu').appendChild(newPWord);
  
    let submit = document.createElement("INPUT");
    submit.setAttribute("type", "submit");
    document.getElementById('menu').appendChild(submit);
    submit.onclick = function () {
      //setUserName(userName.value);
      //logIn(userName.value, newPWord.value);
      //logOutReference(userName, newPWord, submit);
      registerThisNewUser(userName.value, newPWord.value);
    };
}

function registerThisNewUser(userName, pword) {
  // ajax post
    let postData = {
        username: userName,
        password: pword
    }
    console.log(postData);
    let post = JSON.stringify(postData);
    var xhttp = new XMLHttpRequest();
  
    /*
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlcm9kcmlndWVzMjIiLCJleHAiOjE3MDExMzc3NDJ9.fQNqiDPn2wPnnN9HO5ag6XQiYUYtBP8KzMy3yWOULhU",
    "token_type": "bearer"
    */
  
    xhttp.open("POST", "http://web.cs.georgefox.edu:8080/users/", true);
    xhttp.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
    xhttp.setRequestHeader('accept', 'application/json');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = (e) => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        let tokenResponse = JSON.parse(xhttp.responseText);
        setAccessToken(tokenResponse.access_token);
        setTokenType(tokenResponse.token_type);
        //logIn();
        //setAccessToken(tokenResponse.access_token);
        //setTokenType(tokenResponse.token_type);
        //loadAllPosts();
        //document.getElementById('makePost').style.visibility = 'visible';
        //document.getElementById('loggedInElement').innerHTML = 'Logged In: ' + getUserName();
      }
    }
    xhttp.send(post);
    alert('New user created: ' + userName + " Click Login to use new username.")
    //logIn();
    
}