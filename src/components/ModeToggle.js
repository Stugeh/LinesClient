import React, {useState} from 'react';
// Material UI button component. Material UI docs at https://material-ui.com/components/buttons/
import {Button} from '@material-ui/core';
// Material UI icons
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';

const ModeToggle = ({setActiveMode, activeMode}) => {
  const [singlePlayerButton, setSinglePlayerButton] = useState('contained');
  const [multiPlayerButton, setMultiPlayerButton] = useState('outlined');
  // Changes the radio button colours and switches active gamemode
  const handleRadio = () => {
    const temp = singlePlayerButton;
    setSinglePlayerButton(multiPlayerButton);
    setMultiPlayerButton(temp);
    activeMode === 'multiPlayer' ?
        setActiveMode('singlePlayer') :
        setActiveMode('multiPlayer');
  };
  return (
    <div className='radioButtons'>
      <Button
        variant={singlePlayerButton}
        color='primary'
        onClick={handleRadio}
      >
        <PersonIcon fontSize='large' />
      </Button>
      <Button
        variant={multiPlayerButton}
        color='primary'
        onClick={handleRadio}>
        <PeopleAltSharpIcon fontSize='large' />
      </Button>
    </div>
  );
};

export default ModeToggle;


