// src/pages/CompanyView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Group, Button, Loader, Card } from '@mantine/core';
import axios from 'axios';

const API_KEY = 'HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE';
const API_URL = `https://api.recruitly.io/api/company`;

const CompanyView = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          params: { apiKey: API_KEY },
        });
        setCompany(response.data);
      } catch (error) {
        console.error('Failed to fetch company details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/companies'); // Go back to the company list
  };

  if (loading) {
    return (
      <Container size="md" my="lg">
        <Loader size="lg" />
      </Container>
    );
  }

  if (!company) {
    return (
      <Container size="md" my="lg">
        <Title order={3} color="red">Company not found</Title>
        <Button onClick={handleBack}>Back to Companies</Button>
      </Container>
    );
  }

  return (
    <Container size="md" my="lg">
      <Group position="apart">
        <Title order={2}>{company.name}</Title>
        <Button onClick={handleBack} color="blue">Back to Companies</Button>
      </Group>

      <Card shadow="sm" p="lg" mt="lg">
        <Text size="lg"><strong>ID:</strong> {company.id}</Text>
        <Text size="lg"><strong>Name:</strong> {company.name}</Text>
        <Text size="lg"><strong>Description:</strong> {company.description || 'N/A'}</Text>
        <Text size="lg"><strong>Email:</strong> {company.email || 'N/A'}</Text>
        <Text size="lg"><strong>Phone:</strong> {company.phone || 'N/A'}</Text>
     
      </Card>
    </Container>
  );
};

export default CompanyView;
