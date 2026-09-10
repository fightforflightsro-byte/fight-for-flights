import { ArrowUpRight, Mail, Menu, Plane, Trophy, X } from 'lucide-react'
import { useState } from 'react'
import { campaignStats, corporateSponsors, socialLinks, teamMembers } from './data/campaignData'
import { formatEur, getCampaignProgress } from './utils/campaignCalculations'
import './App.css'

const progress = getCampaignProgress(campaignStats, corporateSponsors)

function ExternalLink({ children, href, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const corporateEmail = `mailto:${socialLinks.email}?subject=${encodeURIComponent('Propunere parteneriat Fight for Flights')}`

  return (
    <main>
      <nav className="nav shell" aria-label="Navigație principală">
        <a className="wordmark" href="#acasa" onClick={closeMenu} aria-label="Fight for Flights, acasă"><img src="/assets/logo.png" alt="Fight for Flights" /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Deschide meniul">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#cauza" onClick={closeMenu}>Cauza</a><a href="#echipa" onClick={closeMenu}>Echipa</a><a href="#proiectul" onClick={closeMenu}>Proiectul</a><a href="#sponsori" onClick={closeMenu}>Parteneri</a>
          <ExternalLink className="nav-blondie" href={socialLinks.blondie}>Despre Blondie <ArrowUpRight size={15} /></ExternalLink>
          <ExternalLink className="button button-small" href={socialLinks.galantom}>Donează <ArrowUpRight size={15} /></ExternalLink>
        </div>
      </nav>

      <section className="hero shell" id="acasa">
        <div className="hero-copy reveal"><p className="eyebrow"><span className="eyebrow-line" /> Athens Marathon · 08.11.2026</p><h1>Fiecare viață<br /><span>merită o șansă.</span></h1><p className="hero-lede">Cu fiecare kilometru, să aducem mai multă speranță celor care au cel mai mult nevoie de ea.</p><div className="hero-actions"><ExternalLink className="button button-primary" href={socialLinks.galantom}>Donează prin Galantom <ArrowUpRight size={18} /></ExternalLink><a className="text-link" href="#proiectul">Descoperă proiectul <span>↘</span></a></div></div>
        <div className="hero-side reveal reveal-delay"><div className="hero-mark"><Plane size={38} strokeWidth={1.5} /><span>O alergare.<br />O șansă.</span></div><div className="progress-panel"><div className="progress-heading"><span>Progres campanie</span><strong>{progress.percentage.toFixed(0)}%</strong></div><div className="progress-track" aria-label={`Progres ${progress.percentage.toFixed(0)}%`}>{progress.individualWidth > 0 && <span className="progress-individual" style={{ width: `${progress.individualWidth}%` }} />}{progress.corporateWidth > 0 && <span className="progress-corporate" style={{ width: `${progress.corporateWidth}%` }} />}</div><div className="progress-total"><strong>{formatEur(progress.totalEur)}</strong><span>din {formatEur(campaignStats.targetEur)}</span></div><div className="progress-legend"><span><i className="dot dot-individual" /> Donații individuale</span><span><i className="dot dot-corporate" /> Sponsori</span></div></div></div>
      </section>

      <section className="impact-band"><div className="shell impact-grid"><div><span className="impact-number">350+</span><span>zboruri medicale</span></div><div><span className="impact-number">1.300+</span><span>copii ajutați</span></div><div><span className="impact-number">40.000 €</span><span>costul unui zbor</span></div></div></section>

      <section className="section shell cause-section" id="cauza"><div className="section-kicker">01 / Despre cauză</div><div className="cause-grid"><div><h2>Copiii bolnavi<br /><span>nu au timp.</span></h2></div><div className="cause-copy"><p>Asociația Blondie oferă transport aerian medical gratuit copiilor români care au nevoie de tratament în afara țării și nu pot călători prin mijloace tradiționale din cauza stării lor de sănătate.</p><p>Nimeni nu merită să audă că „nu se mai poate face nimic”. De aceea, Blondie construiește drumuri către speranță, acolo unde fiecare minut contează.</p><ExternalLink className="text-link" href={socialLinks.blondie}>Află mai multe despre Blondie <ArrowUpRight size={17} /></ExternalLink></div></div></section>

      <section className="section shell team-section" id="echipa"><div className="section-kicker">02 / Echipa Fight for Flights</div><div className="section-intro"><h2>Cinci oameni.<br /><span>O direcție comună.</span></h2><p>Masteranzi români din Olanda și Elveția, uniți de o provocare personală pentru o șansă la speranță și viață.</p></div><div className="team-grid">{teamMembers.map((member, index) => <article className="team-card" key={member.id}><div className={`portrait portrait-${index + 1}`}>{member.photoUrl ? <img src={member.photoUrl} alt={member.name} /> : <span>{member.name.split(' ').map((part) => part[0]).join('')}</span>}</div><div className="team-meta"><div><h3>{member.name}</h3><span className="flag">{member.locationCode}</span></div><p>{member.role}</p><small>{member.experience}</small></div></article>)}</div></section>

      <section className="project-section" id="proiectul"><div className="shell project-grid"><div><div className="section-kicker">03 / Proiectul</div><h2>Un concept simplu,<br /><span>dar nu ușor.</span></h2></div><div className="project-copy"><p>O echipă care aleargă maratonul original în scop caritabil. Până la 8 noiembrie 2026, transformăm fiecare kilometru în vizibilitate, implicare și fonduri pentru Blondie.</p><div className="project-pill"><Trophy size={20} /><span>Obiectivul nostru<br /><strong>40.000 €</strong></span></div></div></div></section>

      <section className="section shell sponsors-section" id="sponsori"><div className="section-kicker">04 / Parteneriate</div><div className="sponsor-grid"><div><h2>Fă parte din<br /><span>schimbare.</span></h2><p>Nu este vorba doar despre donații. Ne dorim campanii care aduc vizibilitate cauzei, promovează sănătatea și sportul și produc un impact real, cuantificabil.</p><a className="button button-primary" href={corporateEmail}>Devino partener corporativ <Mail size={17} /></a></div><div className="sponsor-empty"><span className="empty-plus">+</span><p>Primii noștri parteneri<br /><strong>pot fi aici.</strong></p><a className="text-link" href={corporateEmail}>Hai să discutăm <ArrowUpRight size={16} /></a></div></div></section>

      <footer className="footer"><div className="shell footer-grid"><div className="wordmark footer-mark"><img src="/assets/logo.png" alt="Fight for Flights" /></div><p>O inițiativă independentă, aliată cu Asociația Blondie pentru a contribui la strângerea fondurilor necesare zborurilor medicale.</p><div className="footer-links"><ExternalLink href={socialLinks.instagram}><ArrowUpRight size={17} /> Instagram</ExternalLink><ExternalLink href={socialLinks.galantom}><ArrowUpRight size={17} /> Galantom</ExternalLink><a href={`mailto:${socialLinks.email}`}><Mail size={17} /> Email</a></div></div><div className="shell footer-bottom"><span>© 2026 Fight for Flights</span><span>Nu suntem parte din Asociația Blondie și nu procesăm donații pe acest site.</span></div></footer>
    </main>
  )
}

export default App
