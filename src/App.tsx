import React, { Fragment, useState } from 'react';

import { data } from './data';

interface SubItems {
  name: string;
  href: string;
}

interface ModalData {
  sectionId: number;
  name: string;
  subItems: SubItems[];
}

function App() {
  const { sections } = data;
  const [visibleSection, setVisibleSection] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ModalData | null>(null);

  const toggleSection = (sectionId: number) => {
    if (visibleSection === sectionId) {
      setVisibleSection(null);
    } else {
      setVisibleSection(sectionId);
    }
  };

  const openModal = (item: ModalData) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-12">
            <h2>Capabilities Map</h2>
            <div className="d-flex justify-content-center">
              {sections.map(section => (
                <a
                  key={section.id}
                  className={`font-primary mx-2 fw-bold px-2 py-1 rounded-sm ${
                    visibleSection === section.id ? 'active' : ''
                  }`}
                  style={{
                    color:
                      visibleSection === section.id ? 'white' : section.color,
                    backgroundColor:
                      visibleSection === section.id
                        ? section.color
                        : 'transparent'
                  }}
                  onClick={() => toggleSection(section.id)}>
                  {section.title}
                </a>
              ))}
            </div>
            <hr />
            <div className="d-flex flex-wrap gap-3">
              {sections.map(section =>
                section.items.map((item, itemId) => (
                  <div
                    key={itemId}
                    className={`card ratio ratio-1x1 ${
                      visibleSection !== null && visibleSection !== section.id
                        ? 'opacity-25'
                        : ''
                    } rounded-sm`}
                    onClick={() => openModal(item)}
                    style={{
                      backgroundColor: section.color,
                      maxWidth: '70px'
                    }}>
                    <div className="d-flex justify-content-center align-items-center text-size text-white text-center p-1">
                      {item.name}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-sm">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedItem && selectedItem.name}
                </h5>
                <button
                  type="button"
                  name="close-button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}>
                  <span className="invisible">Close Modal</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  {selectedItem &&
                    selectedItem.subItems.map((items, i) => {
                      return (
                        <li key={i}>
                          <a href={items.href} target="_blank">
                            {items.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-bg" />}
    </Fragment>
  );
}

export default App;
