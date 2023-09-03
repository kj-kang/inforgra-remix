import React from "react";
import { transform } from "sucrase";
import { evaluate } from "./evaluate";

export class Evaluation extends React.Component {

  constructor(props) {
    super(props);
    this.state = { element: null, error: null, prevCode: null }
  }

  static getDerivedStateFromProps(props, state) {
    const { code } = props;
    if (state.prevCode === code) {
      return null;
    }
    try {
      return {
        element: evaluate(code),
        error: null,
        prevCode: code,
      }
    } catch (error) {
      return {
        element: null,
        error: error,
        prevCode: code,
      }
    }
  }

  componentDidMount() {
    if (this.props.onError && this.state.error) {
      this.props.onError(this.state.error);
    }
  }
  
  render() {
    return this.state.error ? null : this.state.element;
  }
}
