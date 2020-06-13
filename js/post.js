function draw(box, post) {
    // checking for errors
    if (!!post.error) {
        alert(post.error);
        return;
    }

    // drawing post
    var body = post.body;

    // TODO find out why this markdown render looks really dull
    if (post.format === "md") {
        var md = new Remarkable();
        body = md.render(body);
    }

    box.innerHTML = `
        <div class="box">
            ${body}
        </div>
    `;
}

function main() {
    var url = new URL(window.location.href);
    var link = decodeURI(url.searchParams.get("link"));
    var blog = new GithubBlog('liberdade-organizacao/posts');

    blog.loadPost(link, function(data) {
        var content = document.getElementById('content');

        if (data.error) {
            content.innerHTML = `
                <div class="box">
                    <p>Erro inesperado :(</p><p>Tente novamente mais tarde</p>
                </div>
            `;
        } else {
            draw(content, {body: data, format: link.substr(-2)});
        }
    });
}
