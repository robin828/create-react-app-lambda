import React, { useState, useEffect } from 'react';
import Main from './components/todoList';
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const App = ()=> {					
	const [position, setPosition] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
		  setPosition(prevPosition => (prevPosition === 0 ? 20 : 0));
		}, 500);
	
		return () => clearInterval(interval);
	  }, []);
		return (
			
				<ThemeProvider theme={theme}>
					<div style={{ minHeight: '100vh',backgroundColor: theme.palette.primary.main}}>

					<Typography variant="h2" style={{textAlign: 'center', color: theme.palette.primary.common, fontWeight: 'bold', fontFamily: '"Comic Sans MS", "cursive"',  position: 'relative', top: position	}}>
						To Do App
					</Typography>
				<Main />
					</div>
				</ThemeProvider>
				
		);
}

export default App;
