// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react'),
	Parse = require('parse')

console.log('loaded')

window.P = Parse

var APP_ID = 'UG6BEIIX5wt4ZnHsvtylJj7lyoaaOtOvXyHGR2b5',
	JS_KEY = 'YluvUhQUs6ldsfbcDml6CdPUlGuV9diPXRkeksqm',
	REST_API_KEY = 'gpc8Qv7NaG7lGrK5WLUyh7s60qTQO8j3ELZAdPhf'

	Parse.initialize(APP_ID,JS_KEY)

//model??? collection??? whatsssupppppp. 

//---------------------VIEWS--------------------------

var LoginView = React.createClass({

	render: function(){
		return (
			<div id = "loginView">
				<Header /> 
				<LoginBox sendInfo={this.props.sendInfo}/>
			</div>
		)
	}
})

var Header = React.createClass({

	render: function(){
		return <h1>Medium</h1>
	}
})

var LoginBox = React.createClass({
	_getLoginClick: function(event){
		if(event.which===13){
			var password = event.target.value,
				username = this.refs.usernameInput.getDOMNode().value
			this.props.sendInfo(username,password)
		}
	},

	render: function(){
		return (
			<div id="loginBox">
				<input type = "text" placeholder = "username" ref = "usernameInput" />
				<input type = "password" placeholder = "password" onKeyPress = {this._getLoginClick} />
			</div>
		)
	}
})



//----------------ROUTER-------------

var MediumRouter = Backbone.Router.extend({
	routes:{
		'home': 'showHome',
		// 'signup': 'showSignUp',
		'login': 'showLogin'
		
	},

	processInfo: function(username,password){
		var newUser = new Parse.User()
		newUser.set('username',username)
		newUser.set('password',password)
		newUser.signUp().then(
			function(user){
				alert("Thanks for signing up " + username+ '!')
				location.hash = 'home'
			})
	// .fail(
	// 	function(error))
	},

	showLogin: function(){
		console.log('showing login view')
		React.render(<LoginView sendInfo = {this.processInfo} />, document.querySelector("#container"))
	},

	showHome: function(){
		console.log('going home')
	},

	initialize: function(){
		if (!Parse.User.current()) {
			location.hash = "login"
		}
	}
})

var mr = new MediumRouter()
Backbone.history.start()

// 	showSignUp: function(username,password){

// }