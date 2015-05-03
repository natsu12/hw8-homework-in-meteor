Template.framework.onRendered ()->
    utils.setView 'home'

Template.framework.helpers
    view: ()-> Session.get 'view'
    user: ()-> Session.get 'myUser'

Template.framework.events
    'click a': (evt)->
        view = evt.target.getAttribute 'href'
        utils.setView view if view
        return false
