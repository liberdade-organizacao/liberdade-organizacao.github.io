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
        var url = `/post.html?link=${encodeURI(post.link)}&title=${encodeURI(post.title)}`;
        outlet += `
            <div class="l-box">
                <h3 class="information-head">
                    <a href="${url}">
                        ${post.title}
                    </a>
                </h3>
                ${post.description}
            </div>
            <hr>
        `;
    }

    document.getElementById('posts').innerHTML = outlet;
}

function main() {
    var blog = new GithubBlog('liberdade-organizacao/posts');
    blog.loadIndex(draw);
}
