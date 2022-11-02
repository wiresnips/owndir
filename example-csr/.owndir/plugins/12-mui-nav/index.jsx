import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';


export default function (owndir) {
	owndir.fileNav = function () {
		return <FileNav fsNode={owndir.O.directory} />
	}
}

function FileNav({fsNode, showHidden, expand}) {

  const renderTree = (node, showHidden) => {
  	if (!showHidden && node.name.startsWith('.')) {
  		return null
  	}

    return (
    	<TreeItem label={node.name}

    		key={node.absolutePath} 
    		nodeId={node.absolutePath}
    	>
    		{!node.childrenArray ? null :
    			node.childrenArray.map(c => renderTree(c, showHidden))}
	    </TreeItem>
    )
  };



  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
    	{fsNode.childrenArray.map(c => renderTree(c, showHidden, expand))}
    </TreeView>
  );
}