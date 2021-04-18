import React from 'react';
// Material UI button component. Material UI docs at https://material-ui.com/components/buttons/
import {Button} from '@material-ui/core';
// Material UI icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// Title logo at the top of the screen
import logo from '../../assets/title.png';

import MenuRules from './MenuRules';
import ModeToggle from '../ModeToggle';

//
// MainMenu Component.
// The smaller pieces will eventully be moved to their
// own component functions in other files.
//

const MainMenu = ({setGameView, setActiveMode, activeMode}) => {
  const playButtonStyle = {
    paddingLeft: '50px',
    paddingRight: '50px',
    backgroundColor: 'green',
    fontSize: '50px',
    marginTop: '50px',
  };

  return (
    <div className='mainMenu'>
      <img src={logo} alt="Pictionary" width='400'/>
      <br/>
      <Button
        variant='contained'
        color='primary'
        style={playButtonStyle}
        onClick={() => setGameView('gameSetup')}
      >
        <PlayArrowIcon fontSize='large'/>
        Play
      </Button>
      <br/>
      <ModeToggle
        setActiveMode={setActiveMode}
        activeMode={activeMode}
      />
      <MenuRules activeMode={activeMode} />
    </div>
  );
};

export default MainMenu;

