import React, { useEffect, useState } from 'react';
import { getCompanyList } from '../api';
import { Table, Container, Title, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import {  Button } from '@mantine/core';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = (companyId) => {
    navigate(`/companies/${companyId}`); 
  };
 

  useEffect(() => {

    const fetchCompanies = async () => {
      try {
        const data = await getCompanyList();
        setCompanies(data.data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Table header columns
  const tableHeaders = (
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Reference</th>
     
     
    </tr>
  );

  // Table rows - dynamically generated from the fetched company list
  const tableRows = companies.length > 0 && companies.map((company) => (
    <tr key={company.id}>
      <td>{company.id}</td>
      <td>{company.name}</td>
      <td>{company.reference}</td>
      <Button  onClick={() => handleViewDetails(company.id)}size="xs">
                  view
                </Button>
    </tr>
  ));

  return (
    <Container size="md" my="lg">
      <Title order={2} align="center" my="md">
        Company List
      </Title>

      <Button size="xs" onClick={() => navigate('/companies/new') }>
                  Add company
                </Button>
                

      {loading ? (
        <Loader size="lg" mt="xl" />
      ) : (
        <Table striped highlightOnHover>
          <thead>{tableHeaders}</thead>
          <tbody>{tableRows}</tbody>
        </Table>
      )}
    </Container>
  );
};

export default CompanyList;
