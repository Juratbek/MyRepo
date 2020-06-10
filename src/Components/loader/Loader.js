import React from "react";
import {css} from "@emotion/core";
import {SquareLoader} from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="sweet-loading">
                <SquareLoader
                    css={override}
                    size={150}
                    color={"rgba(128,128,128,0.7)"}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default AwesomeComponent