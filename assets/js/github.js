var commit = getCommitByFile('Somfic', 'documentation', window.location.pathname);
$('#github-audit-avatar').attr('src', commit.author.avatar_url);
$('#github-audit-user').text(commit.author.login);
$('#github-audit-timesince').text(timeSince(commit.commit.author.date));
$('#github-audit-message').text(commit.commit.message);

function getRepo(user, repo) {
    repo = executeGithubApi("users/" + user + "/repos").filter(function (item) {
        return item.name === repo;
    })[0];

    return repo;
}

function getCommitByFile(user, repo, file) {
    if(file.endsWith('/')) {
        file = file + 'index.html';
    }

    file = file.replace('.html', '.md');

    console.log(file);

    commit = executeGithubApi("repos/" + user + "/" + repo + "/commits?path=" + file + "&page=1&per_page=1");

    return commit[0];
}

function executeGithubApi(api) {
    var response;

    $.ajax({
        url: "https://api.github.com/" + api,
        async: false,
        dataType: "json",
        success: function (data) {
            response = data;
        },
        error: function (data) {
        }
    });

    return response;
}

function timeSince(d) {
    var date = Date.parse(d);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}