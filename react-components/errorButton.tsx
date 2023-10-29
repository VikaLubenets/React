import React, { Component } from 'react';

interface ButtonProps {}

interface ButtonState {
  count: number;
}

class ButtonError extends Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    this.checkCount();
  }

  componentDidUpdate() {
    this.checkCount();
  }

  checkCount() {
    const { count } = this.state;
    if (count === 2) {
      throw new Error('I crashed!');
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <button className="error-button" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ButtonError;
