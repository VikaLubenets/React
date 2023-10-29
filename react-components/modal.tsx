import React from 'react';
import { Component, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

export default class Modal extends Component<ModalProps> {
  render() {
    return <div className="modal">{this.props.children}</div>;
  }
}
