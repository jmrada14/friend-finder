$(document).ready(function() {

    let questions = [
        'I am the life of the party.',
        'I am extraordinarily alcoholic.',
        'I have a problem with social anxiety.',
        'I am a tinder serial killa',
        'I would rather sleep in on my days off.',
        'I have a good relationship with nobody.',
        'I believe that everything happens for a reason or maybe not lol.',
        'I enjoy drinking',
        'I am a pet person.',
        'I believe in a higher power(?)DONT ANSWER IF YOURE HIGH.'
    ];
    let choices = [
        '1 (Strongly Disagree)',
        '2 (Disagree)',
        '3 (Neutral)',
        '4 (Agree)',
        '5 (Strongly Agree)'
    ];
    var questionDiv = $('#questions');
    i = 0;
    questions.forEach(function (question) {
        i++;
        let item = $('<div class="question">');
        let headline = $('<h4>').text('Question ' + i);
        let questionText = $('<p>').text(question);
        let dropDown = $('<div class="form-group">');
        let select = $('<select class="form-control selector">');
        choices.forEach(function(choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });

    $('#submit').on('click', function(event) {
        event.preventDefault();
        let userName = $('#userName').val();
        let imageLink = $('#imageLink').val();
        if (userName.length > 0 && imageLink.length >0) {
            let answers = [];
            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            let surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            $.post('/api/friends', surveyData, function(data) {


                if (data) {
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');
                    data.forEach(function(profile) {
                        let profileDiv = $('<div class="profile">');
                        let name = profile.name;
                        let photoURL = profile.photo;
                        let nameHeader = $('<h3>').text(name);
                        let photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);

                        // Add these items to the modal.
                        $('#modalContent').append(profileDiv);
                    });
                    if (data.length > 1) {
                        $('.modal-title').text('Your best matches!');
                    } else {
                        $('.modal-title').text('Your best match!');
                    }

                    $('#resultModal').modal();
                }
            });
        } else {
            $('#errorModal').modal();
            setTimeout(function() {
                $('#errorModal').modal('hide');
            }, 1000);
        }
    });
});