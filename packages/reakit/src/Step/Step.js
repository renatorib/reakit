import React from "react";
import PropTypes from "prop-types";
import { theme } from "styled-tools";
import hoistNonReactStatics from "hoist-non-react-statics";
import styled from "../styled";
import as from "../as";
import Hidden from "../Hidden";

const noop = () => false;

class Component extends React.Component {
  constructor(props) {
    super(props);
    const { register, step, order } = this.props;
    register(step, order);
  }

  componentDidUpdate(prevProps) {
    const { step, update, order } = this.props;
    if (prevProps.step !== step || prevProps.order !== order) {
      update(prevProps.step, step, order);
    }
  }

  componentWillUnmount() {
    const { step, unregister } = this.props;
    unregister(step);
  }

  render() {
    const { isCurrent, step } = this.props;
    return <Hidden unmount visible={isCurrent(step)} {...this.props} />;
  }
}

hoistNonReactStatics(Component, Hidden);

const Step = styled(Component)`
  ${theme("Step")};
`;

Step.propTypes = {
  step: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired,
  isCurrent: PropTypes.func.isRequired,
  order: PropTypes.number
};

Step.defaultProps = {
  register: noop,
  update: noop,
  unregister: noop,
  isCurrent: noop
};

export default as("div")(Step);
