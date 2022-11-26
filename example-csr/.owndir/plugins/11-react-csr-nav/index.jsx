
import React from 'react'
import { Link } from 'react-router-dom'


module.exports = function (owndir) {
  owndir.fileNavSidebar = function () {
    return fileNavSidebar(owndir.O.directory)
  }
}


function fileNavSidebar (fsNode) {
  const { isDirectory, name } = fsNode;
  const [hideChildren, setHideChildren] = React.useState(false);

  if (name.startsWith('.owndir')) {
    return null;
  }

  const children = fsNode.childrenArray
  const files = children.filter(c => c.isFile);
  const dirs = children.filter(c => c.isDirectory);

  return <div className={`file-nav-sidebar ${hideChildren ? 'hidden-children' : ''}`} key={fsNode.name}>
    <div className='file-nav-sidebar-name'>
      {!isDirectory ? null : 
        <Arrow className='file-nav-sidebar-arrow' onClick={
          () => setHideChildren(v => !v)
        }/>}
      <Link to={fsNode.relativePath}>{fsNode.name}</Link>
    </div>

    {!isDirectory ? null :
      <div className='file-nav-sidebar-children-container'>
        <div className='file-nav-sidebar-children'>
          {dirs.map(fileNavSidebar)}
          {files.map(fileNavSidebar)}
        </div>
      </div>}
  </div>
}

// this needs to be a static asset

function Arrow (attrs) {
  return <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    style={{minWidth: '20px', minHeight: '20px'}}
    {...attrs}
  >
    <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
      <path fill="currentColor" fillRule="nonzero" d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z" transform="translate(356.5 164.5)"></path>
      <polygon points="446 418 466 418 466 398 446 398"></polygon>
    </g>
  </svg>
}

// */