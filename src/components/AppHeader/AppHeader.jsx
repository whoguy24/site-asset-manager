import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';

function AppHeader() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(store => store.user);

    function handleLogOutButton() {
        dispatch({ type: 'LOGOUT' })
        history.push('/login')
    }

    return (
        <AppBar id={'app-header'} position='static'>
            <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Grid container direction='row' alignItems='center' spacing={1}>
                        <Grid item >
                            <ConstructionIcon />
                        </Grid>
                        <Grid item id={'app-header-title'}>
                            <h3>Site Asset Manager</h3>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} direction='row' alignItems='center'>
                        <Grid item>
                            <p>{user.username}</p>
                        </Grid>
                        <Grid item>
                            <Button id={'app-header-logout-button'} onClick={handleLogOutButton} size='small' variant='contained'>Log Out</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default AppHeader;