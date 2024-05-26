import React from 'react';

class ErrorBoundary extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const nav = this.props.nav;
    const logout = this.props.logout;
    if (this.state.hasError) {
      logout();
      nav('/login');
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
