import { Component } from 'react';

interface ErrorButtonProps {}

interface ErrorButtonState {
  count: number;
}

class ButtonError extends Component<ErrorButtonProps, ErrorButtonState> {
  constructor(props: ErrorButtonProps) {
    super(props);
    this.state = {
      count: 1,
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
      throw new Error('The error button has been clicked!');
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
