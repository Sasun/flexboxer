import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Tree extends Component {
  constructor() {
    super();
    this.onClickNode = this.onClickNode.bind(this);
  }

  onClickNode(e) {
    e.stopPropagation();
    e.preventDefault();
    // @TODO - work out how to identify "this" in the state tree
    // @TODO - probably means refactoring to `normalizer` style
    this.props.onSelectNode(this.props.node);
  }

  render() {
    const {
      baseKey = 'tree',
      node = {},
      onSelectNode = function() {}
    } = this.props;
    const {
      textContent = '',
      selector = '',
      style = {},
      children = []
    } = node;
    const childNodes = children.map((child, index) => {
      let childId = `${baseKey}-${index}`;
      const childNode = <Tree
        node={child}
        onSelectNode={onSelectNode}
        key={childId}
        baseKey={childId}
      />;
      return childNode;
    });

    let className = 'tree';
    if ( this.props.isSelected ) className += ' tree-selected';

    return (
      <div className={className} onClick={this.onClickNode}>
        {selector}
        {textContent}
        <div className="tree-children">{childNodes}</div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  if ( !ownProps.node ) return { isSelected: false };
  const node = ownProps.node;
  const childIds = node.childIds;
  const props = {
    node: Object.assign({}, node, {children: childIds.map(id => state.tree[id])}),
    isSelected: (state.selectedNode && state.selectedNode === node.id)
  };
  return props;
}

const WrappedTree = connect(mapStateToProps)(Tree);
export default WrappedTree;

Tree.propTypes = {
  baseKey: PropTypes.string,
  node: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.object),
  onSelectNode: PropTypes.func.isRequired
}
