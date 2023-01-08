import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function TextFieldConfirm ({text: value, onConfirm}) {
  const [text, setText] = useState(value || '')

  const [active, setActive] = useState(false);
  const inputReference = useRef(null);
  useEffect(() => {
    active && inputReference.current.focus();
  }, [active])

  function confirm () {
    onConfirm(text);
    setActive(false);
  }
  function reset () {
    setText(value || '');
    setActive(false);
  }

  return <Box display='flex' flexDirection='row'>
    {!active
      ? <Typography onClick={() => setActive(onConfirm && true)}>{value}</Typography>
      : <TextField 
          value={text}
          inputRef={inputReference}
          onChange={(e) => {
            const updatedText = e.target.value;
            setText(updatedText);
          }}
          onBlur={() => confirm()}
          onKeyUp={(event) => {
            event.key === 'Enter' && confirm();
            event.key === 'Escape' && reset();
          }}
        />}
  </Box>
}
