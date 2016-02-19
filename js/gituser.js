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
