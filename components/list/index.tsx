import { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { 
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
  Chip,
  TextField
} from '@material-ui/core';
import { useAppState, useActions } from '../../overmind';
import ItemListLayout from './item';
import INote from '../../interfaces/INote';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.paper,
    },
    parent: {
      position: 'relative',
    },
    backdrop: {
      position: "absolute",
      zIndex: 10
    },
    tagFilterSmall: {
      fontSize: '0.85em'
    }
  }),
);

interface Props {
  onEditClick: (note: INote) => void
}

export default function ListLayout({onEditClick}: Props) {
  const styles = useStyles();
  const { notes, tags, selectedTag } = useAppState();
  const { deleteNote, setSelectedTag, getAllNotes } = useActions();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    methods.refreshList();
    return () => {};
  }, [selectedTag]);

  const methods = {
    refreshList: async function() {
      setIsLoading(true);
      try {
        await getAllNotes(selectedTag);
      } finally {
        setIsLoading(false);
      }
    },
    deleteNote: async function(id: number) {
      setIsLoading(true);
      try {
        await deleteNote(id);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <div className={styles.parent} id="list-notes">
      <Typography variant="subtitle2">
        Your notes:
      </Typography>
      <Autocomplete
        id="tag-filter-iput"
        size="small"
        options={tags}
        value={selectedTag}
        disabled={isLoading}
        onChange={(event, newValue: string | null) => {
          setSelectedTag(newValue);
        }}
        renderTags={(value: string[], getTagProps) => {
            return value.map((option: string, index: number) => (
              <Chip key={`tagl-${index}`} size="small" color="secondary" label={option} {...getTagProps({ index })} />
            ))
          }
        }
        renderInput={(params) => {
          return (
            <TextField 
              {...params} 
              margin="dense" 
              variant="outlined" 
              label="Filter by tag"
              size="small"
              InputProps={{
                ...params.InputProps,
                classes: {
                  input: styles.tagFilterSmall
                },
              }}
              InputLabelProps={{style: {fontSize: "1em"}}}
            />
          )
        }}
      />
      <Divider style={{
        marginBottom: 8
      }} />
      <Backdrop id="progress-load" className={styles.backdrop} style={{opacity: 0.3}} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!!notes.length ? notes.map((item, idx) => (
        <ItemListLayout
          key={`ntlist-${idx}`} 
          note={item} 
          onDeleteClick={(id) => methods.deleteNote(id)} 
          onEditClick={(note) => onEditClick(note)}
          onTagClick={(tag) => setSelectedTag(tag)}
        />
      )) : (
        <Typography variant="caption" color="textSecondary">
          No Data Available
        </Typography>
      )}
    </div>
  );
}