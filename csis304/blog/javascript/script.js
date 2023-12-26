// Version: v2 11/29/2023 10:11x
// Global Variables....
const NEW_POST = 'newPost';

function onPageStart() {
  // when page starts load comments and replies user logged in
  document.getElementById('makePost').style.visibility = 'hidden';
  document.getElementById('registerUser').style.visibility = 'hidden';
  if (getAccessToken() != null) {
    loadAllPosts();
    getAllUsers();

    document.getElementById('makePost').style.visibility = 'visible';
    document.getElementById('registerUser').style.visibility = 'visible';
    console.log('test');
    document.getElementById('loggedInElement').innerHTML = 'Logged In: ' + getUserName();
  }
}

function getAccessToken() {
  // create access token

  return sessionStorage.getItem('accessToken');
}

function setAccessToken(newAccessToken) {
  sessionStorage.setItem('accessToken', newAccessToken);
}
function getUserName() {
  return sessionStorage.getItem('userName');
}
function setUserName(newUserName) {
  sessionStorage.setItem('userName', newUserName);

}
function getTokenType() {
  //return tokenType;
  return sessionStorage.getItem('tokenType');
}
function setTokenType(newTokenType) {
  //tokenType = newTokenType;
  sessionStorage.setItem('tokenType', newTokenType);
}

function onPost() {
// when click post button
  let div = document.createElement("div");
  div.classList.add('individualPost');

  div.id = "individualPost";
  addPost(div, getUserName(), getDate(), 'write your thoughts', NEW_POST);
  let comments = document.createElement('h4');
  comments.innerHTML = "Comments:";
  div.appendChild(comments);
  //document.getElementById('postContainer').appendChild(div);
  document.getElementById('postContainer').prepend(div);
}

function getDate() {

  // create current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}



function addPost(postBlockDiv, userName, date, contentText, postId) {
  let postDiv = document.createElement("div");
  postDiv.classList.add('post');
  postDiv.id = postId;

  let userNameElement = document.createElement('h6');
  userNameElement.innerText = userName;

  let dateElement = document.createElement('h6');
  dateElement.innerText = date;

  let contentElement = document.createElement('textarea');
  contentElement.innerText = contentText;
  /*let contents = document.createElement('p');
  contents.innerText = 'To be filled in';
  */
  postDiv.appendChild(userNameElement);
  postDiv.appendChild(dateElement);
  postDiv.appendChild(contentElement);

  if (userName == getUserName()) {
    let editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    if (postId == NEW_POST) {
      editBtn.innerText = 'Save';
      editBtn.id = "temporaryEditId";
      editBtn.onclick = function () {
        sendNewPost(contentElement.value, getDate(), editBtn, postDiv, contentElement);
      }
    }
    else {
      editBtn.innerText = 'Edit';
      editBtn.id = "temporaryEditId";
      editBtn.onclick = function () {
        editPostContents(contentElement.value, getDate(), editBtn, postDiv.id);
      }
    }
    postDiv.appendChild(editBtn);



    let remove = document.createElement('button');
    remove.classList.add('edit');
    remove.innerText = 'Delete';
    postDiv.appendChild(remove);
    remove.onclick = function () {
      let deleteId = null;
      if (postId == NEW_POST) {
        deleteId = postDiv.id;
      }
      else {
        deleteId = postId;
      }
      deletePost(postBlockDiv, deleteId);
    };
  }

  let makeReply = document.createElement('button');
  makeReply.classList.add('makeReply');
  makeReply.innerText = 'Reply';
  makeReply.onclick = function () {
    console.log("make reply click");
    addReply(postBlockDiv, getDate(), 'your thoughts...', postId, getUserName(), 'NewReply');
  };
  postDiv.appendChild(makeReply);



  postBlockDiv.appendChild(postDiv);

  return postBlockDiv;
}


function deletePost(postDiv, postId) {
  const request = new XMLHttpRequest();
  const url = 'http://web.cs.georgefox.edu:8080/foxtrot/posts/' + postId;
  request.open("DELETE", url);
  request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
  request.setRequestHeader('Accept-encoding', 'gzip, deflate');
  request.send();
  request.onreadystatechange = (e) => {
    if (request.readyState == 4 && request.status == 200) {
      postDiv.remove();
    }
  }
}


function loadAllPosts() {
  const request = new XMLHttpRequest();
  const url = 'http://web.cs.georgefox.edu:8080/foxtrot/posts/';
  request.open("GET", url);
  request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
  request.send();
  request.onreadystatechange = (e) => {
    if (request.readyState == 4 && request.status == 200) {
      handleListPosts(request.responseText);
    }
  }
}

function handleListPosts(responseBody) {
  let allPost = JSON.parse(responseBody)
  for (let i = 0; i < allPost.length; i++) {
    let parentDiv = document.createElement("div");
    parentDiv.classList.add('individualPost');
    document.getElementById('postContainer').appendChild(parentDiv);
    let post = allPost[i];
    if (post.user != null) {
      let postBlockDiv = addPost(parentDiv, post.user.username, post.post_date, post.post_text, post.id);
      loadReplies(post.id, postBlockDiv);
    }
  }
}

function sendNewPost(contentText, date, editBtn, postDiv, contentElement) {
  date = date;
  let postData = {
    post_date: date,
    post_text: contentText,
    extra: {}

  }
  let post = JSON.stringify(postData);
  const request = new XMLHttpRequest();
  const url = 'http://web.cs.georgefox.edu:8080/foxtrot/posts/';
  request.open("POST", url);
  request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Accept', 'application/json');
  request.send(post);
  request.onreadystatechange = (e) => {
    if (request.readyState == 4 && request.status == 200) {
      let newPostData = JSON.parse(request.responseText);
      let postId = newPostData.id;
      postDiv.id = postId;
      editBtn.onclick = function () {
        editPostContents(contentElement.value, getDate(), "1", postDiv.id);
      }
      editBtn.innerText = "Edit";
      //postDiv.appendChild(editBtn);
    }
  }
}

function editPostContents(content, date, editBtn, postId) {
  date = date;
  content = content;
  let postData = {
    post_date: date,
    post_text: content,
    extra: {}

  }
  let post = JSON.stringify(postData);
  const request = new XMLHttpRequest();
  const url = 'http://web.cs.georgefox.edu:8080/foxtrot/posts/' + postId;
  request.open("PUT", url);
  request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Accept', 'application/json');
  request.send(post);
  request.onreadystatechange = (e) => {
    if (request.readyState == 4 && request.status == 200) {
      let newPostData = JSON.parse(request.responseText);
      let postId = newPostData.id;
      //postDiv.id = postId;

    }

    //postDiv.appendChild(editBtn);


  }
}