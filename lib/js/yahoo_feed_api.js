$(function(){
    $.getJSON("https://query.yahooapis.com/v1/public/yql?callback=?", {
        q: "select * from rss(8) where url = 'https://lunch.tokyo/feed'",
        format: "json"
    }, function(json) {
        var container = document.getElementById('feed');

        for (var i = 0; i < json.query.results.item.length; i++) {
            var entry = json.query.results.item[i];

            var dd = new Date(entry.date); // now
            var yearNum = dd.getYear();
            if (yearNum < 2000) yearNum += 1900;
            var m = dd.getMonth() + 1;
            if (m < 10) {
                m = '0' + m;
            }
            var d = dd.getDate();
            if (d < 10) {
                d = '0' + d;
            }
            var date = yearNum + '.' + m + '.' + d;

            imgsrc = entry.encoded.match(/src="(.*?)"/igm);

            container.innerHTML += '<article class="js-biggerlink">' + '<img ' + imgsrc + ' alt="" class="img-responsive" />' + '<h2 class="feed-ttl">' + entry.title + '</h2>' + '<p class="feed-content">' + entry.description.substring(0, 100) + '...</p>' + '<p class="btn01"><a href="' + entry.link + '" target="_blank">more</a></p>' + '</article>';
        }
    });
});