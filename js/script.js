//search bar handler
$(function(){
    var searchField = $('#query');
    var icon = $('#search-btn');
    
    //Focus Handler
    $(searchField).on('focus', function(){
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400); 
    });
    
    //Blur Event Handler
    $(searchField).on('blur', function(){
        if(searchField.val() == '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function(){});
            $(icon).animate({
                right: '360px'
            }, 400, function(){});
        }
    });
    
    $('#search-form').submit(function(e){
        e.preventDefault();
    })
});

function search(){
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get form input
    q = $('#query').val()
    
    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyCNFHF5PEyd_TW4DOIdq-0wiwB6iJiTHNU'},
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                
                //Log data
                console.log(data);
                
                $.each(data.items, function(i, item){
                    //Get Output
                    var output = getOutput(item);
                    
                    //Display Results
                    $('#results').append(output);
                });
                
                var buttons = getButtons(prevPageToken, nextPageToken);
                
                //Display Buttons
                $('#buttons').append(buttons)
            }
    );
}

//Next Page Function
function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');
    
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get form input
    q = $('#query').val()
    
    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            pageToken: token, 
            type: 'video',
            key: 'AIzaSyCNFHF5PEyd_TW4DOIdq-0wiwB6iJiTHNU'},
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                
                //Log data
                console.log(data);
                
                $.each(data.items, function(i, item){
                    //Get Output
                    var output = getOutput(item);
                    
                    //Display Results
                    $('#results').append(output);
                });
                
                var buttons = getButtons(prevPageToken, nextPageToken);
                
                //Display Buttons
                $('#buttons').append(buttons)
            }
    );
}

//Previous Page Function
function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
    
    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get form input
    q = $('#query').val()
    
    //Run GET request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            pageToken: token, 
            type: 'video',
            key: 'AIzaSyCNFHF5PEyd_TW4DOIdq-0wiwB6iJiTHNU'},
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                
                //Log data
                console.log(data);
                
                $.each(data.items, function(i, item){
                    //Get Output
                    var output = getOutput(item);
                    
                    //Display Results
                    $('#results').append(output);
                });
                
                var buttons = getButtons(prevPageToken, nextPageToken);
                
                //Display Buttons
                $('#buttons').append(buttons)
            }
    );
}

// Build Output
function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    var videoDate = item.snippet.publishedAt;
    var filterDate = new Date(videoDate);
    var finalDate = monthNames[filterDate.getMonth()] + ' ' + filterDate.getDate() + ', ' +  filterDate.getFullYear();
    
    //Build Output String
    
    var output = '<li>' +
        '<div class="list-left">' +
        '<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'"><img src="'+thumb+'"></a>' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
        '<small>By <span class="cTitle">'+channelTitle+'</span> on '+finalDate+'</small>' +
        '<p>'+description+'</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' + 
        '';
    
    return output;
}

//Build the Pagination Buttons
function getButtons(prevPageToken, nextPageToken){
    if (!prevPageToken) {
        var btnoutput = '<div class="btn-container">' + 
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
    } else {
        var btnoutput = '<div class="btn-container">' +
        '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
        'onclick="prevPage();">Prev Page</button>' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
    }
    
    return btnoutput;
}
