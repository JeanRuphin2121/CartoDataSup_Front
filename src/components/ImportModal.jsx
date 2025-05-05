// src/components/ImportModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ImportData from '../pages/user/insights/ImportData';          // votre formulaire d’upload

export default function ImportModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Importer un fichier CSV</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/*  onHide sera appelé quand ImportData termine avec succès */}
        <ImportData onCompleted={onHide} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
