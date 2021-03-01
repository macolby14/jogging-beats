/* eslint-disable */
// Source: https://stackoverflow.com/questions/58732237/oauth-popup-cross-domain-security-react-js
import React, { PureComponent, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  width: number;
  height: number;
  url: string;
  title: string;
  onClose: () => any;
  onCode: (params: any) => any;
  children?: ReactNode;
  storageName: string;
};

const OAuthPopStyle = styled.div`
  display: flex;
  justify-content: center;
`;

export default class OauthPopup extends PureComponent<Props> {
  static defaultProps = {
    onClose: () => {},
    width: 500,
    height: 500,
    url: "",
    title: "",
    storageName: "userToken",
  };

  externalWindow: any;
  codeCheck: any;

  componentWillUnmount() {
    if (this.externalWindow) {
      this.externalWindow.close();
    }
  }

  createPopup = () => {
    const { url, title, width, height, onCode } = this.props;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const windowFeatures = `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left}`;

    this.externalWindow = window.open(url, title, windowFeatures);

    const storageListener = () => {
      try {
        if (localStorage.getItem(this.props.storageName)) {
          onCode(localStorage.getItem(this.props.storageName));
          this.externalWindow.close();
          window.removeEventListener("storage", storageListener);
          localStorage.removeItem(this.props.storageName);
        }
      } catch (e) {
        window.removeEventListener("storage", storageListener);
      }
    };

    window.addEventListener("storage", storageListener);

    this.externalWindow.addEventListener(
      "beforeunload",
      () => {
        this.props.onClose();
      },
      false
    );
  };

  render() {
    return (
      <OAuthPopStyle onClick={this.createPopup}>
        {this.props.children}
      </OAuthPopStyle>
    );
  }
}
