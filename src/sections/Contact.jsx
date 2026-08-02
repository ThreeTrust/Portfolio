import { useState } from 'react';
import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import './Contact.css';

const Contact = () => {
  // État pour gérer le message de confirmation après l'envoi
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Envoi en cours...");
    
    const formData = new FormData(event.target);
    
    // ⚠️ REMPLACE CETTE CLÉ PAR CELLE QUE TU AS REÇUE PAR EMAIL !
    formData.append("access_key", "TON_ACCESS_KEY_ICI");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message envoyé avec succès ! 🎉 Je vous réponds très vite.");
        event.target.reset(); // On vide le formulaire
      } else {
        console.log("Error", data);
        setResult("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      setResult("Erreur de connexion. Vérifiez votre internet.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Travaillons Ensemble</h2>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="contact-description">
            Une idée de projet ? Une opportunité ? N'hésitez pas à m'écrire, 
            je serai ravi d'en discuter avec vous !
          </p>
        </Reveal>
        
        {/* --- LE FORMULAIRE --- */}
        <Reveal direction="up" delay={0.3}>
          <form onSubmit={onSubmit} className="contact-form">
          
          <div className="form-row">
            <div className="input-group">
              {/* Le placeholder=" " (avec un espace) est OBLIGATOIRE pour l'animation CSS */}
              <input type="text" id="name" name="name" required placeholder=" " />
              <label htmlFor="name">Votre Nom</label>
              <span className="focus-border"></span>
            </div>
            
            <div className="input-group">
              <input type="email" id="email" name="email" required placeholder=" " />
              <label htmlFor="email">Votre Email</label>
              <span className="focus-border"></span>
            </div>
          </div>
          
          <div className="input-group textarea-group">
            <textarea id="message" name="message" required rows="5" placeholder=" "></textarea>
            <label htmlFor="message">Votre Message</label>
            <span className="focus-border"></span>
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn">
            Envoyer le message <FaPaperPlane className="send-icon" />
          </button>
          
          {result && <p className="form-result">{result}</p>}
        </form>
        </Reveal>
        
      </div>
    </section>
  );
};

export default Contact;