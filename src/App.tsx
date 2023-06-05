import React, { Fragment, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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
          <div className="col-12 col-sm-12">
            <h1>Capabilities Map</h1>
            <div className="d-flex justify-content-center">
              {sections.map(section => (
                <a
                  key={section.id}
                  className={`mx-4 fw-bold`}
                  style={{
                    color: section.color
                  }}
                  onClick={() => toggleSection(section.id)}>
                  {section.title}
                </a>
              ))}
            </div>
            <hr />
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 4, 750: 8, 900: 16 }}>
              <Masonry gutter="10px">
                {sections.map(section =>
                  section.items.map((item, itemId) => (
                    <div
                      key={itemId}
                      className={`card ratio ratio-1x1 p-3 ${
                        visibleSection !== null && visibleSection !== section.id
                          ? 'opacity-50'
                          : ''
                      }`}
                      onClick={() => openModal(item)}
                      style={{ backgroundColor: section.color }}>
                      <div className="d-flex justify-content-center align-items-center text-size text-white text-center">
                        {item.name}
                      </div>
                    </div>
                  ))
                )}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedItem && selectedItem.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <ul>
                  {selectedItem &&
                    selectedItem.subItems.map((items, i) => {
                      return (
                        <li key={i}>
                          <a href={items.href}>{items.name}</a>
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
