function draw(posts) {
    // checking for errors
    if (posts.error !== undefined) {
        alert(posts.error);
        return;
    }

    // drawing posts
    var outlet = "";

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var url = `/post.html?link=`+encodeURI(post.link)+`&title=`+encodeURI(post.title);
        // TODO implement post page
        outlet += `
            <div class="l-box">
                <h3 class="information-head">
                    <a href="`+url+`">
                        `+post.title+`
                    </a>
                </h3>
                `+post.description+`
            </div>
            <hr>
        `;
    }

    document.getElementById('posts').innerHTML = outlet;
}

function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            callback({error: "Cuma?"});
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        callback({error: "Não conseguimos carregar os posts :("});
    };

    request.send();
}

function main() {
    // TODO Implement pagination logic
    // TODO Include descriptions to each post
    var url = "https://www.gitcdn.xyz/repo/liberdade-organizacao/posts/master/index.json";

    get(url, draw);
}
