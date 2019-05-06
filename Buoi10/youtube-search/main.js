$("#search").submit(function(event) {
    var input = $("#keyword").val();
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        type: "GET",
        data: {
            delay: 1,
        },
        success: function(data) {
            $("#result-list").empty();
            console.log(data);
            for(var i = 0; i < data.items.length; i++) {
                $("#result-list").append(`<a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"><img src=${data.items[i].snippet.thumbnails.medium.url} /></a>`);
                $("#result-list").append(`<p>${data.items[i].snippet.title}</p>`);
                $("#result-list").append(`<p>${data.items[i].snippet.description}</p>`);
            }
            nextPageToken(input, data.nextPageToken);
            
        }, 
        error: function(error) {
            console.log(error);
        }
    })
    event.preventDefault();
})

function nextPageToken(input, nextPageToken) {
    $(window).scroll(function(){
        if(($(window).scrollTop() >= $(document).height() - $(window).height())){
            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
                type: "GET",
                success: function(data) {
                    for(var i = 0; i < data.items.length; i++) {
                        $("#result-list").append(`<a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank"><img src=${data.items[i].snippet.thumbnails.medium.url} /></a>`);
                        $("#result-list").append(`<p>${data.items[i].snippet.title}</p>`);
                        $("#result-list").append(`<p>${data.items[i].snippet.description}</p>`);
                    }
                },
                error: function(error) {
                    console.log(error)
                }
            })
        }
    });
}

// $("#keyword").keyup(function() {
//     var input = $("#keyword").val();
//     $.ajax({

//     })
// })

