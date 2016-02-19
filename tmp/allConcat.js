var gitUserData = require('./../js/gituser.js').getUserData;
var gitUserRepositories = require('./../js/gituser.js').getUserRepositories;

$(document).ready(function() {
  var dataResponse = {
    NAME : 0,
    WEBSITE : 1,
    AVATAR_URL : 2,
    REPOS_URL : 3
  };

  $("#user-submit").on('click', function() {
    var gitObject = gitUserData($("#username").val(), userDataCallback);
  });

  function userDataCallback( gitObject ) {
    console.log(gitObject);
    if(gitObject != null) {
      $("#user-well").attr("class", "well");
      $("#real-name").find("#website").text(gitObject[dataResponse.NAME]);
      $("#real-name").find("#website").attr("href", gitObject[dataResponse.WEBSITE]);
      $("#real-name").find("#avatar").attr("src", gitObject[dataResponse.AVATAR_URL]);
      $("#real-name").find("#avatar").attr("class", "img-thumbnail");

      gitUserRepositories(gitObject[dataResponse.REPOS_URL], userReposCallback);
    }
  };

  function userReposCallback( repos ) {
    for(var i = 0; i < repos.length; i++) {
      var infoClone = $("#repo-info").clone();
      infoClone.find("#repo-name").text(repos[i].name);
      infoClone.find("#repo-language").text(repos[i].language);
      infoClone.find("#repo-url").text("URL");
      infoClone.find("#repo-url").attr("src", repos[i].url)
      infoClone.find("#repo-clone").text("Clone URL")
      infoClone.find("#repo-clone").attr("src", repos[i].clone);
      infoClone.find("#repo-well").attr("class", "well");

      $("#repositories").append("<li>");
      infoClone.appendTo("#repositories");
      $("#repositories").append("</li>");
    }
  };
});
