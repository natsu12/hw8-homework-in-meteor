Template.signup.events
    'submit #signupForm': (evt)->
        form = evt.target
        username = form.username.value
        password = form.password.value
        role = form.role.value
        Meteor.call 'myRegister', username, password, role, (err, res)->
            if err
                alert err
            else if res == 'ok'
                Session.set 'myUser', username
            else
                alert res
        false
