import React from 'react';
import { 
  makeStyles,
  createStyles,
  Chip,
  Typography,
  Paper,
  Divider,
  IconButton,
  Box
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import INote from '../../interfaces/INote';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: 12,
      marginTop: 12
    },
    sizeSmall: {
      fontSize: 11,
      height: 'unset',
      paddingTop: 2,
      paddingBottom: 2,
      letterSpacing: 0.75,
      marginTop: 6,
      marginRight: 3
    },
    fontSizeSmall: {
      fontSize: "1em"
    }
  }),
);

interface Props {
  note: INote;
  onDeleteClick: (id: number) => void;
  onEditClick: (note: INote) => void;
  onTagClick: (tag: string) => void;
}

export default function ItemListLayout({
  note, 
  onDeleteClick,
  onEditClick,
  onTagClick
}: Props) {
  const styles = useStyles();

  return (
    <Paper className={styles.paper} data-test-id={`note-item`} >
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="body2" gutterBottom>
            {note.content}
          </Typography>
        </Box>
        <Box>
          <IconButton data-test-id="edit-note" aria-label="edit" size="small" onClick={() => onEditClick(note)}>
            <EditIcon color="secondary" fontSize="small" classes={{
              fontSizeSmall: styles.fontSizeSmall
            }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton data-test-id="delete-note" aria-label="delete" size="small" onClick={() => note.id ? onDeleteClick(note.id) : {}}>
            <DeleteForeverRoundedIcon color="error" fontSize="small" classes={{
              fontSizeSmall: styles.fontSizeSmall
            }} />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      {note.tags.map((tag, idx) => (
        <Chip
          key={`ltag-${idx}`}
          size="small"
          label={tag}
          color="secondary"
          component="span"
          clickable
          classes={{
            sizeSmall: styles.sizeSmall
          }}
          variant="outlined"
          onClick={() => onTagClick(tag)}
        />
      ))}
      
    </Paper>
  );
}