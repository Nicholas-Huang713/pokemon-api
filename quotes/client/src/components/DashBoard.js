import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import QuoteForm from './QuoteForm';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

 function DashBoard() {
    const [quote, setQuote] = useState("");
    const [title, setTitle] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const classes = useStyles();
    return (
        <div>
            <h1>Welcome to the Quotes Dashboard</h1>
            <h3>Post a Quote  </h3>
            {
                formOpen ?
                <Button color="secondary">Close</Button>
                :
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={() => setFormOpen(!formOpen)}/>
                </Fab>
            }
            <br />
            {
                formOpen && 
                <QuoteForm />
            }
        </div>
    ) 
} 

export default DashBoard;