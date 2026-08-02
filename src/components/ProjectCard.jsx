import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card">
      <div className="project-image-container">
        <img src={project.image} alt={`Aperçu du projet ${project.title}`} className="project-image" />
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech-list">
          {project.tech.map((techItem, index) => (
            <span key={index} className="tech-tag">
              {techItem}
            </span>
          ))}
        </div>
        
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
            Code Source
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" className="project-link primary">
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;