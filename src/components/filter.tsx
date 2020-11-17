import React from "react";
import { Form } from "react-bootstrap";
import { NoteFilterPredicate } from "../routes/notesRoute";
import { buildPredicate } from "../util/filterPredicateBuilder";

type FilterProps = {
	initialFilter: NoteFilterPredicate;
	setFilter: (predicate: NoteFilterPredicate) => void;
};

const Filter = ({ setFilter }: FilterProps) => {
	// TODO persist between mounts
  return <Form.Control type="text" placeholder="Filter..." onChange={(e) => setFilter(buildPredicate(e.target.value))}/>
};

export default Filter;