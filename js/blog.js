function main() {
    var request = new XMLHttpRequest();
    var url = "http://api.tumblr.com/v2/blog/liberdadeorganizacao.tumblr.com/posts/text?api_key=???&limit=6"
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // drawing posts
            var posts = document.getElementById('posts');
            var data = JSON.parse(request.responseText);
            var html = ``;
            for (var i = 0; i < 5; i++) {
                var rawPost = data.response.posts[i];
                var id = rawPost.id.toString();
                var title = rawPost.title;
                var body = rawPost.body;
                var post = `
                    <div class="l-box">
                        <h3 class="information-head">
                            <a href="/post.html?id=`+id+`">
                                `+title+`
                            </a>
                        </h3>
                        `+body+`
                    </div>
                    <hr>
                `;
                html += post;
            }
            posts.innerHTML = html;

            // TODO draw arrows
        } else {
            // We reached our target server, but it returned an error
            alert("Couldn't load blog pots");
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        alert("Couldn't load blog pots");
    };

    request.send();


}
