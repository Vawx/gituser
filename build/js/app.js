(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function RepoObject( name, url, language, clone )
{
  this.name = name;
  this.url = url;
  this.clone = clone;
  this.language = language;
}

exports.getUserData = function( userName, userCallback )
{
  var userData = [];
  if(userName.length > 0)
  {
    var url = 'https://api.github.com/users/' + userName;
    $.ajax({
      url: url,
      dataType: "json",
      success: function (data)
      {
        userData.push(data.name);
        userData.push(data.blog);
        userData.push(data.avatar_url);
        userData.push(data.repos_url);
        userCallback(userData);
      }
    });
  }
};

exports.getUserRepositories = function( url, reposCallback )
{
  var userRepos = [];
  $.ajax({
    url: url,
    dataType: "json",
    success: function (data)
    {
      for(var i = 0; i < data.length; i++) {
        userRepos.push(new RepoObject(data[i].name, data[i].html_url, data[i].language, data[i].clone_url));
      }
      reposCallback(userRepos);
    }
  });
};

},{}],2:[function(require,module,exports){
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
    $("#repositories").empty( );
    var gitObject = gitUserData($("#username").val(), userDataCallback);
  });

  function userDataCallback( gitObject ) {
    if(gitObject !== null) {
      $("#user-well").attr("class", "well");
      $("#real-name").find("#website").text(gitObject[dataResponse.NAME]);
      $("#real-name").find("#website").attr("href", gitObject[dataResponse.WEBSITE]);
      $("#real-name").find("#avatar").attr("src", gitObject[dataResponse.AVATAR_URL]);
      $("#real-name").find("#avatar").attr("class", "img-thumbnail");
      gitUserRepositories(gitObject[dataResponse.REPOS_URL], userReposCallback);
    }
  }

  function userReposCallback( repos ) {
    for(var i = 0; i < repos.length; i++) {
      var infoClone = $("#repo-info").clone();
      infoClone.find("#repo-name").text(repos[i].name);
      infoClone.find("#repo-language").text(repos[i].language);
      infoClone.find("#repo-url").text("URL");
      infoClone.find("#repo-url").attr("src", repos[i].url);
      infoClone.find("#repo-clone").text("Clone URL");
      infoClone.find("#repo-clone").attr("src", repos[i].clone);
      infoClone.find("#repo-well").attr("class", "well");

      $("#repositories").append("<li>");
      infoClone.appendTo("#repositories");
      $("#repositories").append("</li>");
    }
 }
});

},{"./../js/gituser.js":1}]},{},[2]);
