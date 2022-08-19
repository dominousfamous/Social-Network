# Social Network
#### Python, Django, HTML/CSS, JavaScript, sqlite3
## Description
This full stack application allows users to create their own posts, like others' posts, and follow other users. It is a single page application where it fetches data from the internal API urls and renders the data to the frontend using JavaScript. Instead of displaying the information in multiple html files, it would update the div in index.html with the intended information. 

**models.py** : All the django models for this application. The User model represents the user, the Following model handles the following/unfollowing of other users, and the Post model represents a post, which contains a creator, the content, and likes.

**urls.py** : Contains all the API endpoints for this application. These urls would be called from index.js using fetch and the resulting data would be rendered to the div using JavaScript. 

**views.py** : Contains all the backend logic of this application, such as registering users and allowing users to follow others.

**index.js** : Renders data from the backend to the frontend. Performs certain actions when an event is triggered. 

**index.html** : All the data is shown on this page. There are multiple divs, such as "profile-view", "posts-view", etc. Depending on the information, it is displayed to these divs. 

**layout.html** : Base HTML page with all the necessary information(navbar, sources, etc.)


## What I learned
Prior to this project, I was accustomed to creating HTML files for every single endpoint of an application. Through this project, I learned how to use JavaScript to render data to a much smaller number of HTML files in a much more efficient manner. In addition, I only knew how to make API calls to outside sources, but this project taught me how to write my own endpoints and call them within my code. 
