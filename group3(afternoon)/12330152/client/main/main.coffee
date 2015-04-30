Session.set 'page', 'login'

Template.main.helpers
    page: ()-> Session.get 'page'

Template.main.events
    'click a': (evt)->
        href = evt.target.getAttribute 'href'
        Session.set 'page', href if href
        false
