function listPosts(posts, filter) {
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

    document.getElementById('listing').innerHTML = outlet;
}

function draw(posts) {
    if (posts.error !== undefined) {
        alert(posts.error);
        return;
    }

    document.getElementById('posts').innerHTML = `
        <div class="box">
            <!-- <i class="fas fa-search"></i> -->
            <input class="input is-rounded" type="text" placeholder="Filtrar" id="filter">
        </div>
        <div id="listing">
        </div>
    `;

    document.querySelector('#filter').addEventListener('change', function() {
        // TODO draw index depending on search bar state
        listPosts(posts, function(p) {
            return false;
        });
    });

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
