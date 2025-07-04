import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service if needed
    // console.error(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <h1 className="text-3xl font-bold text-red-700 mb-2">Something went wrong.</h1>
          <p className="text-gray-700 mb-4">An unexpected error occurred. Please try again or contact support if the problem persists.</p>
          <button onClick={this.handleReset} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 