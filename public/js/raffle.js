let count = 0;
let raffleWinner;
let entries;

(function ($) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // getEntryCount();
    getEntries();

    $('#draw_btn').click(function () {
        $('.winner-name').addClass('d-none');
        drawRaffleWinner();
    });

    $('#reveal_btn').click(function () {
        $('#draw_btn').removeClass('d-none');
        $('.winner-name').removeClass('d-none');
        // deleteWinnerData();
        updateEntries();
    });

    animateText(0);
})(jQuery);

function updateEntries() {
    fetch('/API/entry/insert', {
        method: 'POST',
        body: JSON.stringify(entries),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            
        })
        .catch(err => {
            console.log(err);
        });
}

function getEntries() {
    fetch('/API/entry/entries', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            entries = data;
            toastr.success(entries.length + " entries available.");
        })
        .catch(err => {
            console.log(err);
        });
}

function drawRaffleWinner() {
    const rndNum = Math.floor(Math.random() * entries.length); 
    
    const winner = entries[rndNum].Name;
    $('.winner-name').text(winner);

    raffleWinner = getSixDigitFormat(entries[rndNum].ID);
    entries.splice(rndNum, 1);

    $('#lever_gif_container').append('<img src="images/draw-raffle.gif" class="w-100 h-100">');

    $('.raffle-container').addClass('ml-400p');
    $('#draw_btn').addClass('d-none');
    $('#reveal_btn').addClass('d-none');

    setTimeout(function () {
        $('#lever_gif_container').html('');
        $('.raffle-container').removeClass('ml-400p');
        $('#lever_gif').addClass('d-none');

        $('#card_digit0').addClass('spin');
        $('#card_digit1').addClass('spin');
        $('#card_digit2').addClass('spin');
        $('#card_digit3').addClass('spin');
        $('#card_digit4').addClass('spin');
        $('#card_digit5').addClass('spin');

        $('#label_digit0').addClass('animate');
        $('#label_digit1').addClass('animate');
        $('#label_digit2').addClass('animate');
        $('#label_digit3').addClass('animate');
        $('#label_digit4').addClass('animate');
        $('#label_digit5').addClass('animate');

        revealNoAtCard(0, 3000);
    }, 1700);

    // const param = `?offset=` + (rndNum - 1)
    // fetch('/API/entry/get_winner' + param, { method: 'GET' })
    //     .then(res => res.json())
    //     .then(data => {
    //         const raffle_id = data[0].raffle_id;
    //         if (raffle_id) {
    //             const winner = data[0].name;
    //             $('.winner-name').text(winner);

    //             raffleWinner = getSixDigitFormat(raffle_id);

    //             $('#lever_gif_container').append('<img src="images/draw-raffle.gif" class="w-100 h-100">');

    //             $('.raffle-container').addClass('ml-400p');
    //             $('#draw_btn').addClass('d-none');
    //             $('#reveal_btn').addClass('d-none');

    //             setTimeout(function () {
    //                 $('#lever_gif_container').html('');
    //                 $('.raffle-container').removeClass('ml-400p');
    //                 $('#lever_gif').addClass('d-none');

    //                 $('#card_digit0').addClass('spin');
    //                 $('#card_digit1').addClass('spin');
    //                 $('#card_digit2').addClass('spin');
    //                 $('#card_digit3').addClass('spin');
    //                 $('#card_digit4').addClass('spin');
    //                 $('#card_digit5').addClass('spin');

    //                 $('#label_digit0').addClass('animate');
    //                 $('#label_digit1').addClass('animate');
    //                 $('#label_digit2').addClass('animate');
    //                 $('#label_digit3').addClass('animate');
    //                 $('#label_digit4').addClass('animate');
    //                 $('#label_digit5').addClass('animate');

    //                 revealNoAtCard(0, 3000);
    //             }, 1700);
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
}

function getEntryCount() {
    fetch('/API/entry/count', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            count = data[0].count;
            if (count) {
                toastr.success(count + " entries available.");
            } else {
                toastr.error("No entries available");
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteWinnerData() {
    const param = `?raffle_id=` + raffleWinner;

    fetch('/API/entry/delete' + param, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            if (data.status == 'success') {
                count--;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function revealNoAtCard(i, timer) {
    setTimeout(function () {
        $('#label_digit' + i).removeClass('animate');
        $('#label_digit' + i).text(raffleWinner.substring(i, i + 1));

        $('#card_digit' + i).removeClass('spin');

        if (i == 5) {
            $('#reveal_btn').removeClass('d-none');
        } else {
            revealNoAtCard(i + 1, 1000);
        }
    }, timer);
}

function animateText(number) {
    $('.animate').text(number);

    setTimeout(function () {
        animateText((number + 1) % 10);
    }, 100);
}

function getSixDigitFormat(num) {
    num = '000000' + num;

    return num.substring(num.length - 6);
}