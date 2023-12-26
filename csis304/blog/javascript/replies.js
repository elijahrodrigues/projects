const NewReply = 'newReply';

function addReply(postBlockDiv, date, content, postId, idofUser, commentId) {
    // function to create replies
    let replyDiv = document.createElement("div");
    replyDiv.classList.add('reply');
    replyDiv.id = postId;

    let userName = null;
    //console.log(userIdMap);
    //console.log(idofUser);

    //userIdMap[idofUser - 1].username;
    // console.log(userName);
    if (idofUser == getUserName()) {
        userName = getUserName();
        //console.log(userName + " from getUserName function");
    }
    else {
        userName = userIdMap[Number(idofUser)];
        //console.log(userName + " from database");
    }
    userNameElement = document.createElement('h6');

    userNameElement.innerText = userName;
    //getUserName();
    //getUserNameFromComment(userId)

    let dateElement = document.createElement('h6');
    dateElement.innerText = date;

    let contentElement = document.createElement('textarea');
    contentElement.innerText = content;

    replyDiv.appendChild(userNameElement);
    replyDiv.appendChild(dateElement);
    replyDiv.appendChild(contentElement);

    console.log(userName + " = = " + getUserName());
    if (userName == getUserName()) {
        console.log(getUserName());
        let edit = document.createElement('button');
        edit.classList.add('edit');
        let remove = document.createElement('button');
        remove.classList.add('edit');
        remove.innerText = 'Delete';
        remove.onclick = function () {
            deleteReply(replyDiv, commentId);
        };

        if (commentId == 'NewReply') {
            edit.innerText = 'Save';

            edit.onclick = function () {
                sendNewReply(postId, getDate(), contentElement.value);
                edit.innerText = 'Edit';
                replyDiv.appendChild(remove);
                //edit.innerHtml = 'Edit';
                //console.log(contentElement.value);
            }
        }
        else {
            edit.innerText = 'Edit';
            edit.onclick = function () {
                editReply(contentElement.value, getDate(), commentId);
            }
            //replyDiv.appendChild(edit);

            replyDiv.appendChild(remove);
        }
        replyDiv.appendChild(edit);
    }
    postBlockDiv.appendChild(replyDiv);
}

function loadReplies(postId, postDiv) {
    // function to gather replies from server
    const request = new XMLHttpRequest();
    const url = 'http://web.cs.georgefox.edu:8080/comments/post/' + postId;
    request.open("GET", url);
    request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
    request.send();
    request.onreadystatechange = (e) => {
        if (request.readyState == 4 && request.status == 200) {
            handleListComments(request.responseText, postDiv);
        }
    }
}

function handleListComments(responseBody, postDiv) {
    // handle data from request
    let allComments = JSON.parse(responseBody);
    for (let i = 0; i < allComments.length; i++) {
        let comment = allComments[i];
        addReply(postDiv, comment.comment_date, comment.comment_text, comment.post_id, comment.user_id, comment.id);
    }
}

function sendNewReply(postId, date, content) {
    // create a new reply
    date = date;
    content = content;
    let postData = {
        comment_text: content,
        comment_date: date
        //extra: {}

    }
    let post = JSON.stringify(postData);
    const request = new XMLHttpRequest();
    const url = 'http://web.cs.georgefox.edu:8080/comments/post/' + postId;
    request.open("POST", url);
    request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    request.send(post);
    request.onreadystatechange = (e) => {
        if (request.readyState == 4 && request.status == 200) {
            newCommentData = JSON.parse(request.responseText);
            //let postId = newPostData.id;
            //postDiv.id = postId;
            //editBtn.onclick = function () {
            //editPostContents(contentElement.value, getDate(), "1", postDiv.id);
            //}
            //editBtn.innerText = "Edit";
            //postDiv.appendChild(editBtn);


        }
    }
}

function deleteReply(replyDiv, commentId) {
    // delete a reply request
    const request = new XMLHttpRequest();
    const url = 'http://web.cs.georgefox.edu:8080/comments/' + commentId;
    request.open("DELETE", url);
    request.setRequestHeader('Authorization', getTokenType() + " " + getAccessToken());
    //request.setRequestHeader('Accept-encoding', 'gzip, deflate');
    request.send();
    request.onreadystatechange = (e) => {
        if (request.readyState == 4 && request.status == 200) {
            replyDiv.remove();
        }
    }


}

function editReply(commentText, commentDate, commentId) {

    // ajax put to create modofiy comment text
    date = commentDate;
    content = commentText;
    let commentData = {
        comment_text: content,
        comment_date: date

    }
    let post = JSON.stringify(commentData);
    const request = new XMLHttpRequest();
    const url = 'http://web.cs.georgefox.edu:8080/comments/' + commentId;
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