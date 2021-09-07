import { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { 
  makeStyles,
  createStyles,
  Grid,
  TextField,
  Chip,
  Button,
  CardContent,
  CardActions,
  Card,
  CircularProgress,
  colors
} from '@material-ui/core';
import { useActions, useAppState } from '../overmind';
import INote from '../interfaces/INote';


const useStyles = makeStyles(() =>
  createStyles({
    buttonProgress: {
      color: colors.cyan[200],
      marginRight: 12
    },
  }),
);

interface ErrorType {
  content?: string;
  tags?: string;
}

interface Props {
  editItem?: INote;
  onDoneEditing: () => void;
}

export default function FormLayout({
  editItem,
  onDoneEditing
}: Props) {
  
  const styles = useStyles();

  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<ErrorType>({})
  const [isLoading, setIsLoading] = useState(false);
  const { createNote, updateNote } = useActions();
  const { tags: tagList } = useAppState();

  useEffect(() => {
    if (editItem) {
      setContent(editItem.content);
      setTags(editItem.tags);
      setError({});
      const anchor = document.querySelector(
        '#new-note',
      );
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      methods.cancel();
    }
    return () => {};
  }, [editItem]);

  const methods = {
    cancel: function() {
      setContent("");
      setTags([]);
      setError({});
      onDoneEditing();
    },
    store: async function() {
      setIsLoading(true);
      try {
        //#region validation
        let err: ErrorType = {};
        if (!content) {
          err.content = "Note is required";
        }
        if (!tags || !tags.length) {
          err.tags = "Tag is required";
        }
        if (Object.keys(err).length) {
          setError(err);
          return;
        }
        //#endregion
        
        if (editItem && editItem.id) {
          await updateNote({
            ...editItem,
            content,
            tags
          });
          onDoneEditing();
        } else {
          await createNote({
            content,
            tags
          })
        }
        
        methods.cancel(); 
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <TextField
          id="new-note"
          label="Write your note here"
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          margin="dense" 
          style={
            {
              marginBottom: "4px"
            }
          }
          value={content}
          error={!!error.content}
          helperText={error.content || ""}
          onChange={(e) => {
            setContent(e.target.value);
            setError({
              ...error,
              content: undefined
            })
          }}
          disabled={isLoading}
        />
        <Autocomplete
          multiple
          id="new-tags"
          options={tagList}
          freeSolo
          value={tags}
          disabled={isLoading}
          onChange={(event, newValue: string[]) => {
            setTags(newValue);
            setError({...error, tags: undefined})
          }}
          renderTags={(value: string[], getTagProps) => {
              return value.map((option: string, index: number) => (
                <Chip key={`tag-${index}`} size="small" color="secondary" variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
          }
          renderInput={(params) => {
            return (
              <TextField 
                {...params} 
                error={!!error.tags}
                helperText={error.tags || ""}
                margin="dense" 
                variant="outlined" 
                label="Tags"
                placeholder="Add new tag" 
              />
            )
          }}
        />
      </CardContent>
      <CardActions >
        <Grid
          container
          direction="row-reverse"
        >
          <Grid item>
            <Button
              id="btn-cancel"
              size="small"
              color="secondary"
              style={{marginRight: "12px"}}
              onClick={() => methods.cancel()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              id="btn-save"
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => methods.store()}
              disabled={isLoading}
            >
              {isLoading && <CircularProgress id="progress-save" size={14} className={styles.buttonProgress} />}
              {editItem ? 'Save Note' : 'Add Note'}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}