import React from "react";
import { Input, Button, Modal, Dropdown, Label, Header, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEvent = (props) => {
    const friendOptions = [
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
            image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        }
    ]
    return (
        <Modal trigger={<Button primary>Add Appointment</Button>}>
            <Modal.Header>Add an appointment</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Header as='h5'>Appointment Type</Header>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            placeholder='First name'
                        />
                        <Header as='h5'>Customer</Header>
                        <Dropdown
                            placeholder='Select a Customer'
                            fluid
                            selection
                            options={friendOptions}
                        />
                        <Header as='h5'>Date</Header>
                        <DatePicker
                            onChange={date => console.log(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <Header as='h5'>Duration</Header>
                        <Dropdown
                            placeholder='Appointment duration in minutes'
                            fluid
                            selection
                            options={friendOptions}
                        />
                        <Header as='h5'>Notes</Header>
                        <Form.TextArea placeholder='Extra information about the appointment' />

                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};
export default AddEvent;
