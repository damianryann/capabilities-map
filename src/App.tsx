import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { data } from './data';

function App() {
  const { sections } = data;
  const [visibleSections, setVisibleSections] = useState(
    sections.map(section => section.id)
  );

  const toggleSection = sectionId => {
    if (visibleSections.length === 1 && visibleSections.includes(sectionId)) {
      setVisibleSections(sections.map(section => section.id));
    } else {
      setVisibleSections([sectionId]);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row p-4">
        <div className="col-12 col-sm-12">
          <h1>Capabilities Map</h1>
          <div className="d-flex justify-content-center">
            {sections.map(section => (
              <button
                key={section.id}
                className={`btn btn-primary mx-1 ${
                  visibleSections.includes(section.id) ? 'active' : ''
                }`}
                onClick={() => toggleSection(section.id)}>
                {section.title}
              </button>
            ))}
          </div>
          <hr />
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 4, 750: 8, 900: 16 }}>
            <Masonry gutter="10px">
              {sections.map(
                section =>
                  visibleSections.includes(section.id) &&
                  section.items.map((item, itemId) => (
                    <div
                      key={itemId}
                      className="card ratio ratio-1x1 p-3"
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
    </div>
  );
}

export default App;
