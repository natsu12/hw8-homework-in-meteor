Template.login.events
    'submit #loginForm': (evt)->
        form = evt.target
        username = form.username.value
        password = form.password.value
        Meteor.call 'myLogin', username, password, (err, res)->
            if err
                alert err
            else if res == 'ok'
                Session.set 'myUser', username
            else
                alert res
        false
