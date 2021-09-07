import type { NextPage } from 'next'
import { Grid, Typography, Container} from '@material-ui/core';
import Form from '../components/form';
import { useEffect, useState } from 'react';
import { useActions } from '../overmind';
import ListLayout from '../components/list';
import INote from '../interfaces/INote';

const Home: NextPage = () => {
  const { getAllTags } = useActions();
  const [editItem, setEditItem] = useState<INote>();

  useEffect(() => {
    getAllTags();
    return () => {};
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ fontWeight: 600, marginTop: 16 }} color="primary" align="center">
        Note Taking App
      </Typography>
      <Typography variant="h6" style={{ marginBottom: 16 }} gutterBottom align="center">
        Web Interface
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Form editItem={editItem} onDoneEditing={() => setEditItem(undefined)}/>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <ListLayout onEditClick={(note) => setEditItem(note)} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
