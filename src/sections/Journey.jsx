import { educationData, experienceData } from '../data/content'; 
import Reveal from '../components/Reveal';
import './Journey.css';

const Journey = () => {
  return (
    <section className="journey-section" id="parcours">
      <div className="journey-container">
        <div className="section-header">
          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">Mon Parcours</h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="section-subtitle">
              Éducation et expériences professionnelles.
            </p>
          </Reveal>
        </div>

        <div className="journey-grid">
          
          {/* --- COLONNE 1 : ÉDUCATION --- */}
          <div className="journey-column">
            <h3 className="column-title">🎓 Éducation</h3>
            <div className="timeline">
              {educationData.map((item, index) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <Reveal 
                    className="timeline-content"
                    direction="left"
                    delay={index * 0.1}
                  >
                    <span className="timeline-date">{item.date}</span>
                    <h3 className="timeline-role">{item.degree}</h3>
                    <span className="timeline-company">{item.school}</span>
                    <p className="timeline-text">{item.description}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLONNE 2 : EXPÉRIENCE --- */}
          <div className="journey-column">
            <h3 className="column-title">💼 Expériences</h3>
            <div className="timeline">
              {experienceData.map((item, index) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <Reveal 
                    className="timeline-content"
                    direction="left"
                    delay={index * 0.1}
                  >
                    <span className="timeline-date">{item.date}</span>
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-company">{item.company}</span>
                    <p className="timeline-text">{item.description}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Journey;