// src/pages/CompanyAdd.jsx
import React, { useState } from 'react';
import { TextInput, Button, Group, Container, Title, Select, Textarea, Checkbox, NumberInput } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// API Constants
const API_KEY = 'HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE';
const API_URL = `https://api.recruitly.io/api/company`;

const CompanyAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
    email: '',
    employees: '',
    phone: '',
    website: '',
    linkedIn: '',
    twitter: '',
    facebook: '',
  });
  
  const [client, setClient] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    const value = event.target ? event.target.value : event;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      client, // Include the client status
      headOffice: {
        address: {
          addressLine: '',
          cityName: '',
          countryCode: '',
        },
        name: formData.name,
      },
    };

    try {
      await axios.post(API_URL, payload, {
        params: { apiKey: API_KEY },
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Company added successfully!');
      navigate('/companies'); // Redirect to company list
    } catch (error) {
      console.error('Failed to add company:', error);
      alert('Failed to add company');
    }
  };

  return (
    <Container className='form-container' size="sm" my="lg">
      <Title order={2} align="center" my="md">
        Add New Company
      </Title>

      <TextInput
        label="Company Name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange('name')}
        required
        className='text-input'
      />

      <Textarea
        label="Description"
        placeholder="Company Description"
        value={formData.description}
        onChange={handleChange('description')}
        my="md"
        className='text-input'
      />

      <TextInput
        label="Domain"
        placeholder="Company Domain"
        value={formData.domain}
        onChange={handleChange('domain')}
        className='text-input'
      />

      <TextInput
        label="Email"
        placeholder="Company Email"
        value={formData.email}
        onChange={handleChange('email')}
        my="md"
        className='text-input'
      />

      <TextInput
        label="Employees"
        placeholder="Number of Employees"
        value={formData.employees}
        onChange={handleChange('employees')}
        className='text-input'
      />

      <TextInput
        label="Phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange('phone')}
        my="md"
        className='text-input'
      />

      <TextInput
        label="Website"
        placeholder="Company Website"
        value={formData.website}
        onChange={handleChange('website')}
        className='text-input'
      />

     
      <Group position="center" mt="xl">
        <Button onClick={handleSubmit} className='form-add-btn' color="blue">
          Add Company
        </Button>
      </Group>
    </Container>
  );
};

export default CompanyAdd;
