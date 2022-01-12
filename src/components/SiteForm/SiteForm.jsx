import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';

function SiteForm() {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);

    function handleFieldExit (field, value){
        let refresh = false
        switch (field) {
            case 'name': if (value != site.name) { site.name = value; refresh=true }
            break
            case 'address': if (value != site.address) { site.address = value; refresh=true }
            break
            case 'city': if (value != site.city) { site.city = value; refresh=true }
            break
            case 'state': if (value != site.state) { site.state = value; refresh=true }
            break
            case 'zip': if (value != site.zip) { site.zip = value; refresh=true }
            break
            case 'description': if (value != site.description) { site.description = value; refresh=true }
            break
            case 'comments': if (value != site.comments) { site.comments = value; refresh=true }
            break
        }
        if (refresh) {
            refreshView()
        }
    }

    function refreshView () {
        dispatch({
            type: 'EDIT_SITE',
            payload: site
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
    }

    return (
        <>
            <Grid container className={'app-form-body-container'} direction='row' spacing={2}>

                <Grid item xs={3}>
                    <Grid container direction='column' spacing={2} >
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.name} onBlur={(event)=>handleFieldExit('name', event.target.value)} fullWidth size='small' label='Name' variant='outlined' />
                        </Grid>
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.address} onBlur={(event)=>handleFieldExit('address', event.target.value)} fullWidth size='small' label='Address' variant='outlined' />
                        </Grid>
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.city} onBlur={(event)=>handleFieldExit('city', event.target.value)} fullWidth size='small' label='City' variant='outlined' />
                        </Grid>
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.state} onBlur={(event)=>handleFieldExit('state', event.target.value)} fullWidth size='small' label='State' variant='outlined' />
                        </Grid>
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.zip} onBlur={(event)=>handleFieldExit('zip', event.target.value)} fullWidth size='small' label='Zip' variant='outlined' />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={9}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.description} onBlur={(event)=>handleFieldExit('description', event.target.value)} rows={4} multiline fullWidth size='small' label='Description' variant='outlined' />
                        </Grid>
                        <Grid item>
                            <TextField className='app-form-body-text-field' defaultValue={site.comments} onBlur={(event)=>handleFieldExit('comments', event.target.value)} rows={5} multiline fullWidth size='small' label='Comments' variant='outlined' />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
}

export default SiteForm;