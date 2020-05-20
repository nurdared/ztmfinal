import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onRegisterSubmit = () => {
    const { name, email, password } = this.state;
    fetch("https://serene-anchorage-51042.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onLoginChange();
        }
      });
  };

  render() {
    return (
      <article
        className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5"
        width="500px"
      >
        <Container component="main" maxWidth="xs">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Avatar></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form style={{ width: "100%" }} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={this.onNameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.onEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onPasswordChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  margin: "20px 0px",
                }}
                onClick={this.onRegisterSubmit}
              >
                Register
              </Button>
            </form>
          </div>
        </Container>
      </article>
    );
  }
}
