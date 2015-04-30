MyUsers = new Mongo.Collection 'myUsers'

Meteor.methods
    myRegister: (username, password, role)->
        if username == ''
            return 'bad username'
        if password == ''
            return 'bad password'
        if role != 'Teacher' and role != 'Student'
            return 'bad role'
        cursor = MyUsers.find username: username
        if cursor.count() > 0
            return 'username exists'
        MyUsers.insert
            username: username
            password: password
            role: role
        ServerSession.set 'myUser', username
        return 'ok'
    myLogin: (username, password)->
        cursor = MyUsers.find
            username: username
            password: password
        if cursor.count() == 0
            return 'bad username/password'
        ServerSession.set 'myUser', username
        return 'ok'
    myLogout: ()->
        ServerSession.set 'myUser', ''
        return 'ok'
