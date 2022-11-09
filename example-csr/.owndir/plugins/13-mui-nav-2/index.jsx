import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

/*
  okay, let's explore the idea of a plugin that can be mixed in to other components as they want
  I want to create a nav drawer, and I want to allow children to register themselves to it

  navEntry: {
    label: "",      // text to show, default: the name of the folder
    icon: <Icon />, // icon to show, default: nothing
    position: 0,    // target position in the list, unspecified comes last
  }
*/


export default function (owndir) {
  const entries = gatherNavEntries(owndir);

  owndir.sideNav = function () {
    const navigate = useNavigate();

    return <Drawer variant="permanent" anchor="left">
      <List>
        {entries.map(({path, label, icon}) => {
          const Icon = icon; // react is weird about components with lower-case names
          return <ListItem key={path} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon>{Icon ? <Icon /> : null }</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        })}
      </List>
    </Drawer>
  }
}

function nodeEntry (node) {
  if (!node.hasOwnProperty("navEntry")) {
    return null;
  }
  const entry = { ...node.navEntry };
  if (!entry.label) {
    entry.label = node.O.directory.name
  }
  if (!entry.hasOwnProperty('position')) {
    entry.position = Infinity
  }

  entry.path = node.O.directory.relativePath
  return entry;
}


function gatherNavEntries (owndir) {
  const entries = [];

  function gather (node) {
    const entry = nodeEntry(node);
    if (entry) { 
      entries.push(entry) 
    }
    node.O.childrenArray.forEach(child => gather(child))
  }

  gather(owndir);
  entries.sort((a, b) => b.position - a.position)

  return entries;
}