import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';


import '../App/App.css';

function SiteForm() {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);

    const [nameInput, setNameInput] = useState(site.name);
    const [addressInput, setAddressInput] = useState(site.address);
    const [cityInput, setCityInput] = useState(site.city);
    const [stateInput, setStateInput] = useState(site.state);
    const [zipInput, setZipInput] = useState(site.zip);
    const [descriptionInput, setDescriptionInput] = useState(site.description);
    const [commentsInput, setCommentsInput] = useState(site.comments);

    function refreshView () {
        const editSite = {
            id:site.id,
            name:nameInput,
            address:addressInput,
            city:cityInput,
            state:stateInput,
            zip:zipInput,
            description:descriptionInput,
            comments:commentsInput,
        }
        dispatch({
            type: 'EDIT_SITE',
            payload: editSite
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
    }

    function handleFieldExit (){
        refreshView();
    }

    return (
        <>
            <Grid container className={'app-form-body-container'} direction='row' spacing={2}>

                <Grid item xs={4}>
                    <Grid container direction='column' spacing={2} >
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={nameInput} 
                                onChange={(event)=>setNameInput(event.target.value)} 
                                onBlur={handleFieldExit} 
                                fullWidth 
                                size='small' 
                                label='Name' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={addressInput} 
                                onChange={(event)=>setAddressInput(event.target.value)} 
                                onBlur={handleFieldExit} 
                                fullWidth size='small' 
                                label='Address' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={cityInput} 
                                onChange={(event)=>setCityInput(event.target.value)} 
                                onBlur={handleFieldExit} 
                                fullWidth 
                                size='small' 
                                label='City' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={stateInput} 
                                onChange={(event)=>setStateInput(event.target.value)} 
                                onBlur={handleFieldExit} 
                                fullWidth 
                                size='small' 
                                label='State' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={zipInput} 
                                onChange={(event)=>setZipInput(event.target.value)} 
                                onBlur={(event)=>handleFieldExit('zip', event.target.value)} 
                                fullWidth size='small' 
                                label='Zip' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={descriptionInput} 
                                onChange={(event)=>setDescriptionInput(event.target.value)} 
                                onBlur={handleFieldExit} 
                                rows={4} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Description' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={commentsInput} 
                                onChange={(event)=>setCommentsInput(event.target.value)} 
                                onBlur={handleFieldExit} 
                                rows={5} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Comments' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    );
}

export default SiteForm;