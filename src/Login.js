import React, { Component } from "react"
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from "axios"
import { Redirect } from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault();
		axios({
			method: 'POST',
			url: '/api/login',
			data: this.state,
		}).then(response => {
			if (response.status === 200) {
				sessionStorage.setItem("user_key", response.headers['x-simpleovpapi'])
				window.location = '/'
			}
		})
	}

	render() {
		if (sessionStorage.getItem('user_key')) {
			return <Redirect from="/login" to="/" />
		}
		else {
			return (
				<Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for='email'>Username</Label>
              <Input name='email' value={this.state.email} onChange={this.handleChange} placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Container>
			)
		}
	}
}

export default Login
