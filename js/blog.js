function listPosts(posts, filter) {
    var outlet = "";
    var foundPost = false;

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];

        if (filter(post)) {
            foundPost = true;
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
    }

    if (!foundPost) {
        outlet = `
            <div class="box">
                <h3 class="title">
                    Oops!
                </h3>
                <p>
                    Nenhum post foi encontrado com este termo.
                </p>
            </div>
        `;
    }

    document.getElementById('listing').innerHTML = outlet;
}

function generatePostFilter(query) {
    return post => {
        let conditions = [
            !query,
            post.title.toLowerCase().includes(query),
            post.description.toLowerCase().includes(query)
        ];
        return conditions.some(condition => !!condition);
    };
}

function draw(posts) {
    if (posts.error !== undefined) {
        alert(posts.error);
        return;
    }

    document.getElementById('posts').innerHTML = `
        <div class="box">
            <input class="input is-rounded" type="text" placeholder="Filtrar" id="filter"></input>
            <button class="button is-rounded" id="search-button"><i class="fas fa-search"></i></button>
        </div>
        <div id="listing">
        </div>
    `;

    var searchCallback = function() {
        listPosts(posts, generatePostFilter(document.querySelector('#filter').value.toLowerCase()));
    };

    document.querySelector('#filter').addEventListener('change', searchCallback);
    document.querySelector('#search-button').addEventListener('click', searchCallback);

    listPosts(posts, function(p) {
        return true;
    });
}

function main() {
    var blog = new GithubBlog('liberdade-organizacao/posts');
    blog.loadIndex(function(posts) {
        localStorage.setItem("blog", JSON.stringify(posts));
        draw(JSON.parse(localStorage.getItem("blog")));
    });
}
