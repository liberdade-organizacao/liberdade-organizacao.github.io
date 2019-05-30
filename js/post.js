function draw(box, post) {
    // checking for errors
    if (post.error !== undefined) {
        alert(post.error);
        return;
    }

    // drawing post
    var body = post.body;

    if (post.format === "md") {
        var md = new Remarkable();
        body = md.render(body);
    }

    box.innerHTML = `
        <h2>${post.title}</h2>
        ${body}
    `;
}

function main() {
    var url = new URL(window.location.href);
    var link = decodeURI(url.searchParams.get("link"));
    var title = decodeURI(url.searchParams.get("title"));
    var blog = new GithubBlog('liberdade-organizacao/posts');

    blog.loadPost(link, function(data) {
        var content = document.getElementById('content');

        if (data.error) {
            content.innerHTML = "<p>Erro inesperadp :(</p><p>Tente novamente mais tarde</p>";
        } else {
            draw(content, {title: title, body: data, format: link.substr(-2)});
        }
    });
}
