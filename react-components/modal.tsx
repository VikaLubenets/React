import React from 'react';
import { Component, ReactNode } from 'react';
import '../src/styles/modal.css';

interface ModalProps {
  children: ReactNode;
}

export default class Modal extends Component<ModalProps> {
  render() {
    return <div className="modal">{this.props.children}</div>;
  }
}
