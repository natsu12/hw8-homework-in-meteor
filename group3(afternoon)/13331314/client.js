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
	homeworks:function() {
		return HomeWork.find({});
	}
});

Template.body.events({
	"click #publish":function() {
		console.log("publishing");
		Session.set("publishing", "ing");
	},
	"click #management":function() {
		Session.set("updating", "ing");
	},
	"click #grade":function() {
		Session.set("grading", "ing");
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
		var deadline = event.target.deadline.value;
		HomeWork.update({question:question},{$set: {requirement:requirement}});
		console.log(event);
		return false;
	}
});

Template.manage.helpers({
	isPublishing:function() {
		return Session.get("publishing");
	},
	isUpdating:function() {
		return Session.get("updating");
	},
	isGrading:function() {
		return Session.get("grading");
	},
});

Template.confirm.events({
	"submit .identity": function (event) {
		var identity = event.target.role.value;
		console.log(Identity);
		Identity.insert({
			identity: identity,
			owner: Meteor.userId(),           // _id of logged in user
			username: Meteor.user().username  // username of logged in user
		});
		Session.set("confirm", "confirmed");
		return false;
	},
});

Template.homework.helpers({
	isSubmit:function() {
		return Session.get("submiting");
	},
});

Template.homework.events({
	"click #submit":function() {
		Session.set("submiting", "submiting");
	},
	"click .submit" :function() {

	}
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}
