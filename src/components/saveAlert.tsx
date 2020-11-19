import React, { useContext } from "react";
import { Alert, Col, Collapse, Row } from "react-bootstrap";
import { NoteContext } from "../contexts/noteContextProvider";

const SaveAlert = () => {
	const { unsaved, save } = useContext(NoteContext);
	return (
		<Row>
			<Col>
				<Row>
					<Collapse in={unsaved} className="w-100">
						<div>
							<Alert variant="warning">
								There are unsaved changes, Ctrl+S or{" "}
								<Alert.Link onClick={save}>click here to save!</Alert.Link>
							</Alert>
						</div>
					</Collapse>
				</Row>
			</Col>
		</Row>
	);
};

export default SaveAlert;
