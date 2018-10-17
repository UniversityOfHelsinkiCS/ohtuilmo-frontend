import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const NewTopicForm = () => {
  const submitForm = (event) => {
    event.preventDefault()
    console.log('submitting proposal')
  }

  return (
    <div>
      <h1>Give your proposal</h1>
      <p>Projektin kuvaus voi olla myös suomeksi.</p>

      <form onSubmit={submitForm}>
        <div>
          <TextField fullWidth label="aihe / title" margin="normal" />
        </div>
        <div>
          <TextField fullWidth label="asiakas / customer" margin="normal" />
        </div>
        <div>
          <TextField
            fullWidth
            label="yhteyshenkilön email / contact email"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="aiheen kuvaus / description"
            multiline
            rows="5"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="toteutusympäristö / implementation environment"
            multiline
            rows="5"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="erityisvaatimukset / special requests"
            multiline
            rows="5"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="lisätietoja / additional info"
            multiline
            rows="5"
            margin="normal"
          />
        </div>
        <Temporary />
        <Button type="submit" variant="contained" color="primary">
          Submit proposal
        </Button>
      </form>
    </div>
  )
}

const Temporary = () => (
  <div>
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">sopivat ajankohdat / possible timeframes</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={false} />} label="kevät" />
        <FormControlLabel control={<Checkbox checked={false} />} label="kesä" />
        <FormControlLabel control={<Checkbox checked={true} />} label="syksy" />
      </FormGroup>
    </FormControl>
  </div>
)

export default NewTopicForm
