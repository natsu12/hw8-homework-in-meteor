Template.header.helpers
    user: ()-> Session.get('myUser')

Template.header.events
    'click #logoutAnchor': ()->
        Meteor.call 'myLogout', utils.methodHandler(()->
            utils.setUser()
            utils.setView 'login'
        )
