// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './headerCss.module.css';
import { Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    // <Box
    //   sx={(theme) => ({
    //     backgroundColor: theme.colors.gray[0],
    //     padding: theme.spacing.md,
    //     borderBottom: `1px solid ${theme.colors.gray[3]}`,
    //   })}
    // >
    //   <Group position="apart">
    //     <Title order={3}>Company Management</Title>
    //     <Button color="red" onClick={handleLogout}>
    //       Logout
    //     </Button>
    //   </Group>
    // </Box>
    <header className={classes.header}>
    <Container size="md">
      <div className={classes.inner}>

        <MantineLogo className={classes.logo} size={18} />
        <Group gap={5} visibleFrom="sm">
        <Button color="red" onClick={handleLogout}>
           Logout
        </Button>
        </Group>
              
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      </div>
    </Container>
  </header>
  );
};

export default Header;
