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
        <h2>`+post.title+`</h2>
        `+body+`
    `;
}

function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            callback(request.responseText);
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
    var url = new URL(window.location.href);
    var link = decodeURI(url.searchParams.get("link"));
    var title = decodeURI(url.searchParams.get("title"));

    get("https://www.gitcdn.xyz/repo/liberdade-organizacao/posts/master" + link, function(data) {
        var content = document.getElementById('content');

        if (data.error) {
            content.innerHTML = "<p>Erro inesperadp :(</p><p>Tente novamente mais tarde</p>";
        } else {
            // TODO compile markdown when required
            draw(content, {title: title, body: data, format: link.substr(-2)});
        }
    });
}
