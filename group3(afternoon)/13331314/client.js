Identity = new Mongo.Collection("identity");
HomeWork = new Mongo.Collection("homeWork");
Submits = new Mongo.Collection("subimt")

if (Meteor.isClient) {
	Template.body.helpers({
		identity:function() {
			return Identity.findOne({owner : Meteor.userId()}).identity;
		},
		isTeacher:function() {
			return Identity.findOne({owner : Meteor.userId()}).identity == 'teacher';
		},
		user:function() {
			return Meteor.user().username;
		},
		homeworks:function() {
			return HomeWork.find({});
		},
		submits:function() {
			return Submits.find({});
		}
	});

	Template.body.events({
		"click #publish":function() {
			if(Session.get("publishing") != "")
				Session.set("publishing", "");
			Session.set("publishing", "ing");
		},
		"click #management":function() {
			if(Session.get("updating") != "")
				Session.set("updating", "");
			Session.set("updating", "ing");
		},
	});

	Template.manage.events({
		"submit #publish":function(event) {
			var question = event.target.question.value;
			var requirement = event.target.requirement.value;
			var deadline = event.target.deadline.value;
			HomeWork.insert({
				teacher: Meteor.user().username,
				question:question,
				requirement:requirement,
				deadline:deadline
			});
			console.log(event);
			return false;
		},
		"submit #update": function (event) {
			var question = event.target.question.value;
			var requirement = event.target.requirement.value;
			theOne = HomeWork.findOne({question:question});
			HomeWork.update(theOne._id, {$set: {requirement:requirement}});
			console.log(theOne._id);
			return false;
		}
	});

	Template.manage.helpers({
		isPublishing:function() {
			return Session.get("publishing") != "";
		},
		isUpdating:function() {
			return Session.get("updating") != "";
		},
	});

	Template.confirm.events({
		"submit .identity": function (event) {
			var identity = event.target.role.value;
			console.log(Identity);
			Identity.insert({
				identity: identity,
				owner: Meteor.userId(),
				username: Meteor.user().username
			});
			Session.set("confirm", "confirmed");
			return false;
		},
	});

	Template.homework.helpers({
		isSubmit:function() {
			return Session.get("submiting") == this._id;
		},
		mySubmit:function() {
			var answer = Submits.findOne({user : Meteor.user().username, question : this.question});
			if(answer)
				return answer.answer;
			else
				return "No Submit";
		},
		myGrade:function() {
			var answer = Submits.findOne({user : Meteor.user().username, question : this.question});
			if(answer)
				return answer.grade;
			else
				return "No Submit";
		}
	});

	Template.homework.events({
		"click #submit":function() {
			Session.set("submiting", this._id);
		},
		"submit #homework-submit" :function(event) {
			var answer = event.target.answer.value;
			var question = event.target.question.value;
			var haveSubmit = Submits.findOne({user : Meteor.user().username, question : question});

			Submits.insert({
				question : question,
				user : Meteor.user().username,
				answer : answer,
				grade : "not grade",
			});
				
			event.target.answer.value = "";
			alert("submit success!");
			Session.set("submiting", "");
			return false;
		},
		"click .delete": function () {
			HomeWork.remove(this._id);
		}
	});

	Template.submit.events({
		"change #grade":function(event) {
			Submits.update(this._id, {$set:{grade:event.target.value}});
			console.log(event.target.value);
			return false;
		}
	})

	Accounts.ui.config({
	  passwordSignupFields: "USERNAME_ONLY"
	});
}
