import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (e) => {
    this.setState({
      signInEmail: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      signInPassword: e.target.value,
    });
  };

  onSubmit = () => {
    fetch("https://serene-anchorage-51042.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.onLoginChange();
          this.props.loadUser(user);
        }
      });
  };

  render() {
    const { onLoginChange } = this.props;
    return (
      <article
        className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5"
        width="500px"
        style={{ background: "rgba(255,255,255,0.3)" }}
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
              Sign in
            </Typography>
            <div style={{ width: "100%" }} noValidate>
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
                onClick={this.onSubmit}
                style={{
                  margin: "20px 0px",
                }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={onLoginChange}
                style={{
                  margin: "20px 0px",
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </Container>
      </article>
    );
  }
}
