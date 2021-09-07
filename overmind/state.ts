import INote from "../interfaces/INote";

type State = {
  notes: INote[];
  selectedTag: string | null,
  tags: string[]
};

export const state: State = {
  notes: [],
  selectedTag: null,
  tags: []
};
