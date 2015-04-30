Template.header.helpers
    user: ()-> Session.get('myUser')

Template.header.events
    'click #logoutAnchor': ()->
        Meteor.call 'myLogout', (err, res)->
            if err
                alert err
            else if res == 'ok'
                Session.set 'myUser', ''
            else
                alert res
