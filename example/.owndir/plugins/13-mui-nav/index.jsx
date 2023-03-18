import _ from 'lodash'

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
    path: ""        // where to go when clicked, default: the path of the folder
  }

  navEntry can also be a list of such
*/

const drawerStyle = {
    '& .MuiDrawer-paper': {
      position: 'relative'
  },
}

export default function (owndir) {

  owndir.sideNav = function () {
    const entries = gatherNavEntries(owndir);
    const navigate = useNavigate();

    return <Drawer variant="permanent" anchor="left" sx={drawerStyle}>
      <List>
        {entries.map(({path, label, icon}) => {
          const Icon = icon; // react is weird about components with lower-case names
          return <ListItem key={path}>
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


function nodeEntries (owndir) {
  if (!owndir.hasOwnProperty("navEntry")) {
    return [];
  }

  const entries = _.isArray(owndir.navEntry) ? owndir.navEntry : [owndir.navEntry]

  return entries.map(entry => {
    entry = { ...entry }

    if (!entry.label) {
      entry.label = owndir.directory.name
    }
    if (!entry.path) {
      entry.path = owndir.directory.relativePath
    }
    if (!entry.hasOwnProperty('position')) {
      entry.position = Infinity
    }

    return entry;
  })
}


function gatherNavEntries (owndir) {
  const entries = [];

  function gather (owndir) {
    entries.push(...nodeEntries(owndir))
    owndir.O.children.forEach(child => gather(child))
  }

  gather(owndir);
  entries.sort((a, b) => a.position - b.position)

  return entries;
}