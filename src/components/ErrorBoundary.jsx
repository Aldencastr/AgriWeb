import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
          <h2>Algo salió mal</h2>
          <pre style={{ textAlign: 'left', maxWidth: '600px', margin: '1rem auto', overflow: 'auto' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button onClick={() => this.setState({ hasError: false })} className="btn btn-primary">
            Intentar de nuevo
          </button>
        </div>
      )
    }

    return this.props.children
  }
}