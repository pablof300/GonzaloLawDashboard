import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'

const options = [
  { key: 'c', text: 'Contract Analysis', value: 'contractAnalysis' },
  { key: 'i', text: 'Intl. Corporate Law', value: 'intlCL' },
  { key: 'n', text: 'Intellectual Property', value: 'ip' },
  { key: 'p', text: 'Private & Emerging Business', value: 'peb' },
  { key: 't', text: 'Tax-Exemption', value: 'tex' },
]

class AddClientForm extends Component {
  state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            control={Input}
            label='Last name'
            placeholder='Last name'
          />
          <Form.Field
            control={Select}
            label='Case'
            options={options}
            placeholder='Type'
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          label='About'
          placeholder='Brief description can be included here...'
        />
        <Form.Field
          control={Checkbox}
          label='Confirm details'
        />
        <Form.Field control={Button}>Add Client</Form.Field>
      </Form>
    )
  }
}

export default AddClientForm
