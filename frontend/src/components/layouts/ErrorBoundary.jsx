import { Component } from "react";
import Card from "../UI/Card";

class ErrorBoundary extends Component{
    constructor() {
        super();
        this.state = { hasError: false }
    }
    componentDidCatch(error) {
        this.setState({ hasError: true })
    }
    
    render() {
        if(this.state.hasError){
            return <Card>Something went wrong</Card>
        }
        return this.props.children
    }
}

export default ErrorBoundary;