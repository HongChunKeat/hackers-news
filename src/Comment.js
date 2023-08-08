import $ from 'jquery';
import { useSearchParams } from "react-router-dom";

function Comment()
{   
  const [searchParams, setSearchParams] = useSearchParams();

  $.ajax({
    type: "GET",
    url: "https://hacker-news.firebaseio.com/v0/item/"+searchParams.get("id")+".json",
    success: function(data)
    {
      //fetch item
      if(data)
      {
        for(var i=0; i<data.kids.length; i++)
        {
          //fetch comment of that item
          $.ajax({
            type: "GET",
            url: "https://hacker-news.firebaseio.com/v0/item/"+data.kids[i]+".json",
            success: function(data2)
            {
              console.log(data2)

              //time
              var currentInSeconds = Math.floor(Date.now() / 1000);
              var ago = currentInSeconds - data2.time;
              var totalMinutes = Math.floor(ago / 60);

              var hours = Math.floor(totalMinutes / 60);
              var minutes = totalMinutes % 60;
              if(hours != 0)
              {
                var time = hours + " hours " + minutes + " minutes ago";
              }
              else
              {
                var time =  minutes + " minutes ago";
              }

              $("ol").append("<li><table><tr><td><img width='10' src='triangle.svg'></td><td class='minorComment'>"+data2.by+" "+time+" | next [-]</td></tr><tr><td></td><td class='commentText'>"+data2.text+"</td></tr></table></li>");
            }
          });
        }
      }
    }
  });

  return (
    <div>
      <ol className='commentOL'></ol>
    </div>
  );
}

export default Comment;