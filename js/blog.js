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
        var url = `./post.html?link=${encodeURI(post.link)}`;
        outlet += `
            <div class="box">
                <h3 class="title">
                    <a href="${url}" class="posts-title">
                        ${post.title}
                    </a>
                </h3>
                <p>
                    ${post.description}
                </p>
            </div>
        `;
    }

    document.getElementById('posts').innerHTML = outlet;
}

function main() {
    var blog = new GithubBlog('liberdade-organizacao/posts');
    blog.loadIndex(draw);
}
