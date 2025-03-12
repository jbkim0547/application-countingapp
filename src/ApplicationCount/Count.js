import '../App.css';
import * as React from 'react'
import './Count.css';
import { Checkbox } from '@mui/material';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Count() {
    return (
        <React.Fragment>
            <div Style= "margin-top:30px;">Apply Count</div>
            <div Style= "margin-top:-10px" id='checkBox-container' className="float-container">
                <div className="float-child">
                    <div Style= "margin-top:10px; margin-right:4px">1. </div>
                </div>
                <div class="float-child">
                    <div>
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                        <Checkbox {...label} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Count;
