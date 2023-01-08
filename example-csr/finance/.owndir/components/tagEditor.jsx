


// just make this shit global, no need to overthink things
//  there's a little bit of extra finagling to keep things updated,
//  but it means I don't need to know to establish a Context outside this file
let knownTags = [];
function addKnownTags (...tags) {
  knownTags = _.uniq(knownTags.concat(tags))
}

import _ from 'lodash'

import React, { useContext, useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';


export default function TagEditor ({ tags: value, onChange }) {
  const [text, setText] = useState('');
  const [tags, setTags] = useState(value || []);
  const [allTags, setAllTags] = useState(knownTags);
  useEffect(() => addKnownTags(...value), []);

  function addTag (instantText) {
    instantText = instantText || text
    if (_.isEmpty(instantText)) {
      return
    }

    setText('');
    const updated = _.uniq([...tags, instantText]).sort();
    if (!_.isEqual(updated, tags)) {
      setTags(updated);
      addKnownTags(...updated);
    }
  }

  function removeTag (tag) {
    const updated = _.without(tags, tag);
    if (!_.isEqual(updated, tags)) {
      setTags(updated);
    }
  }


  const [active, setActive] = useState(false);
  const inputReference = useRef(null);
  useEffect(() => { 
    if (active) {
      inputReference.current.focus()
    }
    if (!_.isEqual(tags, value)) {
      onChange(tags);  
    }
  }, [active])



  return <Box display='flex' flexDirection='row' alignItems='center'>

    {!onChange ? null :
      <IconButton onClick={() => setActive(active => !active)}>
        {active ? <CheckCircleOutlineIcon /> : <EditIcon />}
      </IconButton>}

    {tags.map(tag => 
      <Chip key={tag} label={tag}
        onDelete={!active ? null : 
                    (() => removeTag(tag))} 
      />)}

    {!active ? null :
      <Autocomplete
        style={{marginLeft: '1em'}}
        freeSolo={true}
        options={allTags}
        value={text}
        onInputChange={(e, value) => setText(value || '')}
        // dumb hack to refresh the list of known tags
        onFocus={() => (allTags !== knownTags) && setAllTags(knownTags) }
        onChange={(e, value) => addTag(value)}
        onKeyUp={(event) => {
          event.key === 'Enter' && addTag();
          event.key === 'Escape' && setActive(false);
        }}
        renderInput={(params) => <TextField {...params}
          inputRef={inputReference}
          label='New Tag (press Enter to add)' />}
      />}

  </Box>;
}
