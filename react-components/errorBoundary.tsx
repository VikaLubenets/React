import { Component, ReactNode } from 'react';
import Modal from './modal';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    if (error) {
      return { hasError: true };
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error occurred: ', error);
    console.error('Error Info: ', errorInfo.componentStack);
    logErrorToMyService(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Modal>
          <div>Something went wrong. Please try again later.</div>
        </Modal>
      );
    }

    return this.props.children;
  }
}

function logErrorToMyService(error: Error, componentStack: string) {
  console.error('Error occurred: ', error);
  console.error('Component Stack: ', componentStack);
}
