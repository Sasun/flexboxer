import React, { Component, PropTypes } from 'react';

import Tree from './tree-component';
import Properties from './properties-component';

export default class Inspector extends Component {
  render() {
    const {
      baseKey,
      node,
      onSelectNode,
      selectedNode
    } = this.props;
    return (
      <div>
        <Tree
          node={node}
          onSelectNode={onSelectNode}
          baseKey={baseKey}
        />
        <Properties node={selectedNode} />
      </div>
    );
  }
}

Inspector.propTypes = {
  baseKey: PropTypes.string,
  node: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.object),
  onSelectNode: PropTypes.func.isRequired,
  selectedNode: PropTypes.object
};
