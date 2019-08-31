// console.log('test');
(function (){
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
                console.log('response: ', response);
                var html = '';

                if (response.items.length == 0){
                    $('.results-container').html(html);
                    $('#nothing-found').css('display', 'flex');
                } else {
                    $('#nothing-found').css('display', 'none');
                    for (var i = 0; i < response.items.length; i++){
                        console.log('each result: ', response.items[i].name);

                        var imageUrl = 'default.jpg';
                        if (response.items[i].images[0]){
                            imageUrl = response.items[i].images[0].url;
                        }

                        html += "<div class='gallery'><a target='_blank' href=" + imageUrl + "><img src=" + imageUrl + " alt='Cinque Terre' width='600' height='400'></a>" + "<div class='desc'>" + response.items[i].name + "</div></div>";

                        $('.results-container').html(html);


                        if (response.next){
                            var nextUrl = response.next && response.next.replace(
                                'api.spotify.com/v1/search',
                                'https://elegant-croissant.glitch.me/spotify'
                            );
                            setTimeout(fn(nextUrl, html), 2000);
                        }
                    }
                }
            }

        });

        function fn(url, html){
            $('#more').css('display', 'flex');
            // console.log('nextUrl before correction:', response.next);

            console.log('corrected nextUlr: ', url);
            // var next = response.next;
            $('.more').on('click', function () {
                // // console.log('test');
                // var userInput = $("input[name='user-input']").val();
                // // console.log('User input: ' + userInput);
                // var albumOrArtist =$('select').val();
                // // console.log('dropdown: ', albumOrArtist);
                $.ajax({
                    url: url,
                    method: 'GET',
                    data: {
                        query: userInput,
                        type: albumOrArtist
                    },
                    success: function(r){
                        r = r.artists || r.albums;
                        console.log('response: ', r);
                        for (var i = 0; i < r.items.length; i++){
                            console.log('each result: ', r.items[i].name);

                            var imageUrl = 'default.jpg';
                            if (r.items[i].images[0]){
                                imageUrl = r.items[i].images[0].url;
                            }
                            var nextHtml = html;
                            nextHtml += "<div class='gallery'><a target='_blank' href=" + imageUrl + "><img src=" + imageUrl + " alt='Cinque Terre' width='600' height='400'></a>" + "<div class='desc'>" + r.items[i].name + "</div></div>";

                            $('.results-container').html(nextHtml);
                        }
                    }
                });
            });
        }

    });})();
