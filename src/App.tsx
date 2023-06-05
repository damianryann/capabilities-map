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

  function calculateRelativeLuminance(color: string) {
    const parseColor = (c: any) => {
      c = parseInt(c, 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const [r, g, b] = [
      color.slice(1, 3),
      color.slice(3, 5),
      color.slice(5, 7)
    ].map(parseColor);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function getContrastRatio(
    backgroundLuminance: number,
    textLuminance: number
  ) {
    const lightest = Math.max(backgroundLuminance, textLuminance);
    const darkest = Math.min(backgroundLuminance, textLuminance);
    return (lightest + 0.05) / (darkest + 0.05);
  }

  function getTextColor(backgroundColor: string) {
    const backgroundLuminance = calculateRelativeLuminance(backgroundColor);
    const whiteLuminance = 1.0;
    const blackLuminance = 0.0;

    const contrastWithWhite = getContrastRatio(
      backgroundLuminance,
      whiteLuminance
    );
    const contrastWithBlack = getContrastRatio(
      backgroundLuminance,
      blackLuminance
    );

    return contrastWithWhite >= contrastWithBlack ? '#FFFFFF' : '#000000';
  }

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
                      visibleSection === section.id
                        ? getTextColor(section.color)
                        : section.color,
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
                      color: getTextColor(section.color),
                      backgroundColor: section.color,
                      maxWidth: '70px'
                    }}>
                    <div className="d-flex justify-content-center align-items-center text-size text-center p-1">
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
