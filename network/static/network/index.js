document.addEventListener('DOMContentLoaded', function() {

    //By default all posts
    posts("all");
    
    //Current user
    const current_user = document.querySelector('#user').value;

    document.querySelector('#compose').addEventListener('click', () => upload_view('compose-view'));
    document.querySelector('#posts').addEventListener('click', () => posts('all'));
    document.querySelector('#following').addEventListener('click', () => posts('following'));
    document.querySelector('#profile').addEventListener('click', () => profile(current_user));
 
    //Creating Post
    document.querySelector('#compose-form').onsubmit = compose;
})


//Upload view
function upload_view(view) {
    
    //Hide other views
    document.getElementsByName('view').forEach(div => {
        div.style.display = 'none';
    });

    //Show selected view
    let selected_view = document.querySelector(`#${view}`);
    selected_view.style.display = 'block'; 

    if(view != "compose-view")
        selected_view.innerHTML = '';
}


//Create new post
function compose() {

    upload_view('compose-view');

    //Necessary values
    const content = String(document.querySelector('#compose-body').value);

    //API call 
    fetch('/network/create', {
        method: 'POST',
        body: JSON.stringify({
            content: content
        })
    }); 

    //Redirect to main page
    posts('all');
}


//Show all posts
function posts(type) {

    let view = "";
    //if all posts
    if(type == "all")
    {
        upload_view('posts-view');
        view = "posts";
    }
    else if(type == "following")
    {
        upload_view('following-view');
        view = "following";
    }
        
    //API Call
    fetch(`/network/posts/${type}`)
    .then(response => response.json())
    .then(table => {
        console.log(table);
        
        //Current User
        const current_user = table.current_user;
        //data
        const data = table.posts;

        //Display posts
        display_posts(current_user, data, view);
    }); 
}


//Show profile
function profile(username) {
    upload_view('profile-view');

    //API Call
    fetch(`/network/profile/${username}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);  
        upload_view('profile-view');

        //Current User
        let current_user = data.current_user;
        //Followers
        let followers = data.followers;
        //Follower Count
        let followers_count = data.followers_count;
        //Following
        let following = data.following;
        //Following Count
        let following_count = data.following_count;
        //Posts
        let posts = data.posts;
        //Follow button color
        let background_color = "btn btn-outline-success";
        //Verb
        let action = "follow";

        //If user already follows this person
        for(let follower of followers)
        {
            if(current_user == follower)
            {
                background_color = "btn btn-outline-danger";
                action = "unfollow";
                break;  
            }
        }

        const following_info = document.createElement('div');
        following_info.innerHTML = `
        <div>
            <h1><b><i>${username}</i></b></h1>
        </div>
        <div>
            <button id="followers_button" class="btn btn-light btn-lg">Followers: ${followers_count}</button>
        </div>
        <div>
            <button id="following_button" class="btn btn-light btn-lg">Following: ${following_count}</button>
        </div>
        <br>
        <div>
            <button id="follow" class="${background_color}"> ${action}</button>
        </div> 
        <br>
        `;
        document.querySelector('#profile-view').append(following_info);

        //Following/Unfollowing
        let follow_button = document.querySelector('#follow');
        follow_button.addEventListener('click', () => follow_or_unfollow(action, current_user, username));

        //Showing follow info
        let followers_button = document.querySelector("#followers_button");
        let following_button = document.querySelector("#following_button");
        followers_button.addEventListener('click', () => view_all("followers", data));
        following_button.addEventListener('click', () => view_all("following", data));

        //Display posts
        display_posts(current_user, posts, "profile");
    });
} 


//Show all likes
function view_all(action, data){
    upload_view("follow-info-view");
    console.log(action);

    let list;
    if(action != "likes")
    {
        //Followers
        let followers = data.followers;
        //Follower Count
        let followers_count = data.followers_count;
        //Following
        let following = data.following;
        //Following Count
        let following_count = data.following_count;


        if(action == "following") {
            list = following;
        }   
        if(action == "followers") {
            list = followers;
        }
    }
    else
        list = data;
    
    //Configure table
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.querySelector('#follow-info-view').appendChild(table);

    //First Row of table
    let row = document.createElement('tr');
    let heading = document.createElement('th');
    heading.innerHTML = action;
    row.appendChild(heading);
    thead.appendChild(row);

    //Follower/following information
    for(let i=0; i<list.length; i++)
    {
        let new_row = document.createElement('tr');
        let new_heading = document.createElement('th');
        new_heading.innerHTML = list[i];
        new_row.appendChild(new_heading);
        tbody.appendChild(new_row);
    }

    table.classList.add('table', 'thead-light');
}


//Like or unLike post
function change_like(action, id) {
    fetch(`network/${action}/${id}`, {
        method: "POST"
    });

    posts("all");
}


//Follow
function follow_or_unfollow(action, current_user, username) {

    if(current_user == username)
        alert("You cannot follow/unfollow yourself");
    else {
        //API call
        fetch(`network/${action}/${username}`,{
            method: "POST"
        });

        posts("all");
    }
}


//Displaying posts
function display_posts(current_user, data, view) {
    for(var i=0; i<data.length; i++)
        {                                   
            const info = data[i];
            const id = info.id;
            const username = info.creator;
            const content = info.content;
            const date = info.date;
            const likes = info.likes;

            let background_color = "btn btn-success";
            let like_or_unlike = "like";

            for(var j=0; j<likes.length; j++) 
            {
                //If user liked post already
                if(current_user == likes[j]) {
                    background_color = "btn btn-danger";
                    like_or_unlike = "unlike";
                    break;
                }
            }

            //Create element
            const post = document.createElement('div');
            post.innerHTML = `
            <div name="post" id=${id};>
                <div id="post_username${id}">
                    <h5><i><b>${username}</b></i> on <b>${date}</b></h5>
                </div>
                <div>
                    <button id="like${id}" class="${background_color}">
                    ${like_or_unlike}
                    </button>
                    <button id="all_likes${id}" class="btn btn-primary">All Likes</button>
                </div>
                <div>
                    ${content}
                </div>    
            </div>
            <hr>
            `;
            
            document.querySelector(`#${view}-view`).append(post);
            if(view != "profile")
                document.querySelector(`#post_username${id}`).addEventListener('click', () => profile(username));
            
            //Liking or unliking post
            let like_button = document.querySelector(`#like${id}`);
            like_button.addEventListener("click", () => change_like(like_or_unlike, id));
            
            //All likes
            let all_likes_button = document.querySelector(`#all_likes${id}`);
            all_likes_button.addEventListener("click", () => view_all("likes", likes));
        }
}
