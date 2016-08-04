import React, { PureComponent, PropTypes } from 'react';

export default class Node extends PureComponent {

  getKey(node, index) {
    return `node-${index}`;
  }

  getStyleObject(styles) {
    return styles.reduce((memo, obj) => {
      let prop = {};
      prop[obj.property] = obj.value;
      return Object.assign({}, memo, prop);
    }, {});
  }

  render() {
    const {
      children = [],
      style = [],
      textContent = ''
    } = this.props.node;
    const styleObject = this.getStyleObject(style);
    const childNodes = children.map((child, index) => {
      const key = this.getKey(child, index);
      return (
        <Node
          key={key}
          node={child}
        />
      );
    });
    return (
      <div style={styleObject} className="node">
        {textContent}
        {childNodes}
      </div>
    );
  }

}

Node.propTypes = {
  node: PropTypes.object
};
