import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import $ from 'jquery';
import Comment from './Comment';

function Home()
{
  $.ajax({
    type: "GET",
    url: "https://hacker-news.firebaseio.com/v0/topstories.json",
    success: function(data)
    {
      if(data)
      {
        for(var i=0; i<data.length; i++)
        {
          $.ajax({
            type: "GET",
            url: "https://hacker-news.firebaseio.com/v0/item/"+data[i]+".json",
            success: function(data2)
            {
              var url;
              var time;
              var link;
              var comment;

              //url
              if(data2.url)
              {
                var spliturl = data2.url.split("/");
                if(spliturl[2].includes("www"))
                {
                  var spliturl1 = spliturl[2].split("www.");
                  url = "<span class='url'>("+spliturl1[1]+")</span>";
                }
                else
                {
                  url = "<span class='url'>("+spliturl[2]+")</span>";
                }
                
              }
              else
              {
                url = "";
              }

              //time
              var currentInSeconds = Math.floor(Date.now() / 1000);
              var ago = currentInSeconds - data2.time;
              var totalMinutes = Math.floor(ago / 60);

              var hours = Math.floor(totalMinutes / 60);
              var minutes = totalMinutes % 60;
              if(hours != 0)
              {
                time = hours + " hours " + minutes + " minutes ago";
              }
              else
              {
                time =  minutes + " minutes ago";
              }
              
              if(data2.descendants)
              {
                link = "href='/comments?id="+data2.id+"'";
                comment = data2.descendants;
              }
              else
              {
                link = "";
                comment = 0;
              }

              $("ol").append("<li><table><tr><td><img width='10' src='triangle.svg'></td><td><a href='"+data2.url+"' class='title'>" + data2.title + "</a>" + url + "</td></tr><tr><td></td><td class='minorTitle'>"+data2.score+" points by "+data2.by+" "+time+" | hide | <a class='link' "+link+">"+comment+" comments</td></tr></table></li>");
            }
          });
        }
      }
    }
  });

  return (
    <div>
      <ol></ol>
    </div>
  );
};

function App()
{
	return (
		<Router>
			<header className='head'>
				<a href='/' className='ybox'>Y</a>
				<a href='/' className='homelink'>Hacker News</a>
        <div className='homenav'>
          <a href='/'>new</a>|
          <a href='/'>past</a>|
          <a href='/'>comments</a>|
          <a href='/'>ask</a>|
          <a href='/'>show</a>|
          <a href='/'>jobs</a>|
          <a href='/'>submit</a>
        </div>
        <a href='/' className='login'>login</a>
			</header>
			<Routes>
				<Route exact path='/' exact element={<Home />} />
				<Route exact path='/comments' exact element={<Comment />} />
			</Routes>
		</Router>
	);
}

export default App;