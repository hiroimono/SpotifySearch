// console.log('test');
(function (){
    var images = $('img');
    var resultsContainer = $('.results-container');
    var moreButton = $('#more');
    var nextUrl;
    var html;


    $('#submit-button').on('click', function () {
        // console.log('test');
        var userInput = $("input[name='user-input']").val();
        // console.log('User input: ' + userInput);
        var albumOrArtist =$('select').val();
        // console.log('dropdown: ', albumOrArtist);


        $.ajax({
            url: 'https://elegant-croissant.glitch.me/spotify',
            method: 'GET',
            data: {
                query: userInput,
                type: albumOrArtist,
            },
            success: function(response){
                // console.log('response from spotify: ', response);
                response = response.artists || response.albums;
                // console.log('response: ', response);
                html = '';

                if (response.items.length == 0){
                    $('.results-container').html(html);
                    $('#nothing-found').css('display', 'flex');
                } else {
                    $('#nothing-found').css('display', 'none');
                    for (var i = 0; i < response.items.length; i++){
                        console.log('each result: ', response.items[i].name);
                        var link = response.items[i].external_urls.spotify;
                        var imageUrl = 'default.jpg';
                        if (response.items[i].images[0]){
                            imageUrl = response.items[i].images[0].url;
                        }

                        html += "<div class='gallery'><a target='_blank' href=" + link + "><img src=" + imageUrl + " alt='Cinque Terre' width='600' height='400'></a>" + "<div class='desc'>" + response.items[i].name + "</div></div>";

                        $('.results-container').html(html);

                        if (response.next){
                            var nextUrl = response.next && response.next.replace(
                                'api.spotify.com/v1/search',
                                'https://elegant-croissant.glitch.me/spotify'
                            );
                            $('#more').css('display', 'flex');
                            // console.log('nextUrl before correction:', response.next);

                            console.log('corrected nextUlr: ', nextUrl);
                        }
                    }
                }
            }

        });

    });


    $('.more').on('click', function () {
        // // console.log('test');
        var userInput = $("input[name='user-input']").val();
        // // console.log('User input: ' + userInput);
        var albumOrArtist =$('select').val();
        // // console.log('dropdown: ', albumOrArtist);
        $.ajax({
            url: nextUrl,
            method: 'GET',
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response){
                html = '';
                response = response.artists || response.albums;
                console.log('response: ', response);
                for (var i = 0; i < response.items.length; i++){
                    console.log('each result: ', response.items[i].name);

                    var imageUrl = 'default.jpg';
                    if (response.items[i].images[0]){
                        imageUrl = response.items[i].images[0].url;
                    }
                    html += "<div class='gallery'><a target='_blank' href=" + imageUrl + "><img src=" + imageUrl + " alt='Cinque Terre' width='600' height='400'></a>" + "<div class='desc'>" + response.items[i].name + "</div></div>";

                    $('.results-container').html(html);
                }
            }
        });
    });

})();
