import INote from '../interfaces/INote';
import { Context } from './index'

export const getAllNotes = async (context: Context, tag: string | null) => {
  try {
    let {data} = tag ? await context.effects.api.getAllNotesByTag(tag) : await context.effects.api.getAllNotes();
    context.state.notes = data;
  } catch (e) {}
};

export const getAllTags = async (context: Context) => {
  try {
    let {data} = await context.effects.api.getAllTags();
    context.state.tags = data;
  } catch (e) {}
};

export const createNote = async (context: Context, payload: INote) => {
  try {
    let {data} = await context.effects.api.createNote(payload);
    if (data.id !== undefined) {
      // reload list
      await Promise.all([
        context.actions.getAllNotes(context.state.selectedTag),
        context.actions.getAllTags()
      ]);
    }
    return data;
  } catch (e) {}
};

export const deleteNote = async (context: Context, id: number) => {
  try {
    await context.effects.api.deleteNote(id);
    await Promise.all([
      context.actions.getAllNotes(context.state.selectedTag),
      context.actions.getAllTags()
    ]);
  } catch (e) {}
};

export const updateNote = async (context: Context, payload: INote) => {
  try {
    let {data} = await context.effects.api.updateNote(payload);
    if (data.id !== undefined) {
      // reload list
      await Promise.all([
        context.actions.getAllNotes(context.state.selectedTag),
        context.actions.getAllTags()
      ]);
    }
    return data;
  } catch (e) {}
};

export const setSelectedTag = (context: Context, tag: string | null) => {
  context.state.selectedTag = tag;
};