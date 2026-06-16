import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  Bone,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Dumbbell,
  HeartPulse,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import './styles.css';

const actingAreas = [
  {
    title: 'Coluna Vertebral',
    description: 'Diagnóstico e tratamento de hérnias, escoliose, estenose e dores crônicas da coluna.',
    Icon: Activity,
  },
  {
    title: 'Articulações',
    description: 'Joelhos, quadris e ombros com cuidado especializado.',
    Icon: Bone,
  },
  {
    title: 'Neurocirurgia',
    description: 'Procedimentos neurocirúrgicos de coluna minimamente invasivos.',
    Icon: Brain,
  },
  {
    title: 'Lesões Esportivas',
    description: 'Retorno seguro ao esporte após lesões musculoesqueléticas.',
    Icon: Dumbbell,
  },
  {
    title: 'Ortopedia',
    description: 'Avaliação ortopédica completa com especialistas certificados.',
    Icon: Stethoscope,
  },
  {
    title: 'Dor Cervical',
    description: 'Tratamento para dores no pescoço e região cervical.',
    Icon: HeartPulse,
  },
  {
    title: 'Reumatologia',
    description: 'Artrite, artrose e doenças autoimunes articulares.',
    Icon: ShieldCheck,
  },
  {
    title: 'Medicina do Esporte',
    description: 'Performance e prevenção para atletas e praticantes.',
    Icon: Activity,
  },
];

const units = [
  {
    city: 'Butantã, SP',
    lines: ['Rua Alvarenga, 220'],
  },
  {
    city: 'Itaim Bibi, SP',
    lines: ['Rua Joaquim Floriano, 533', 'Sala 1313'],
  },
  {
    city: 'Brasília, DF',
    lines: ['OHB Centro Médico', 'Bloco B - Sala 616', 'SHLS Quadra 716 - Conjunto L', 'Asa Sul - Brasília/DF', 'CEP 70390-700'],
  },
  {
    city: 'Salvador, BA',
    lines: ['Centro Médico Bela Vista', 'Shopping Bela Vista', 'Rua Alameda Euvaldo Luz, 92 - Piso L2'],
  },
];

const footerSpecialties = [
  'Neurocirurgia',
  'Endocrinologia',
  'Ortopedia',
  'Reumatologia',
  'Traumatologia',
  'Medicina da Dor',
  'Ginecologia',
];

const footerUnits = [
  {
    city: 'Butantã, SP',
    lines: ['Rua Alvarenga, 220'],
  },
  {
    city: 'Itaim Bibi, SP',
    lines: ['Rua Joaquim Floriano, 533', 'Sala 1313'],
  },
  {
    city: 'Brasília, DF',
    lines: ['OHB Centro Médico', 'Bloco B - Sala 616', 'SHLS Quadra 716 - Conjunto L', 'Asa Sul - Brasília/DF', 'CEP 70390-700'],
  },
  {
    city: 'Salvador, BA',
    lines: ['Centro Médico Bela Vista', 'Shopping Bela Vista', 'Rua Alameda Euvaldo Luz, 92 - Piso L2'],
  },
];

const acceptedPlans = [
  {
    name: 'Bradesco Saude',
    className: 'logo-bradesco',
    mark: 'B',
    label: 'Bradesco',
    sublabel: 'SAUDE',
  },
  {
    name: 'SulAmerica',
    className: 'logo-sulamerica',
    label: 'SulAmerica',
  },
  {
    name: 'Medservice',
    className: 'logo-medservice',
    mark: '+',
    label: 'Medservice',
  },
  {
    name: 'Amil',
    className: 'logo-amil',
    label: 'Amil',
  },
  {
    name: 'GEAP',
    className: 'logo-geap',
    mark: '+',
    label: 'GEAP',
  },
  {
    name: 'OMINT',
    className: 'logo-omint',
    label: 'OMINT',
  },
];

function App() {
  const carouselPlans = [...acceptedPlans, ...acceptedPlans];

  return (
    <main className="site-shell">
      <section className="hero" aria-label="Clinica Principia">
        <header className="navbar">
          <a className="brand" href="#inicio" aria-label="Clinica Principia">
            <img
              src="/logo-nav-small.webp"
              alt="Clínica Principia"
              width="300"
              height="101"
              fetchPriority="high"
            />
          </a>

          <nav className="nav-links" aria-label="Menu principal">
            <a href="#convenios">Convênios</a>
            <a href="#areas">Áreas de atuação</a>
            <a href="#como">Como funciona</a>
            <a href="#unidades">Unidades</a>
          </nav>

          <a
            className="whatsapp-button"
            href="https://wa.me/5511979610690"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir conversa no WhatsApp"
          >
            <MessageCircle size={15} strokeWidth={2.4} />
            <span>WhatsApp</span>
          </a>
        </header>

        <div className="hero-grid" id="inicio">
          <div className="hero-copy">
            <p className="hero-kicker">Convênios selecionados & atendimento particular</p>

            <h1>
              Especialistas em articulações{' '}
              <span>que cuidam de você.</span>
            </h1>

            <p className="lead">
              Avaliação precisa, tratamento personalizado e acompanhamento
              humanizado para recuperar sua qualidade de vida com segurança,
              tecnologia e cuidado em cada etapa.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="https://wa.me/5511979610690" target="_blank" rel="noreferrer">
                Agendar consulta
                <span aria-hidden="true">
                  <ArrowRight size={16} strokeWidth={2.4} />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-bottom" aria-hidden="true">
          <div className="bottom-pill" />
        </div>
      </section>

      <section className="section section-convenios" id="convenios" aria-labelledby="convenios-title">
        <div className="section-inner convenios-inner">
          <div className="convenios-heading">
            <p className="section-kicker">Convênios</p>
            <h2 id="convenios-title">Atendimento para planos selecionados e consultas particulares.</h2>
            <p>
              A equipe orienta cada paciente antes da consulta, confirma cobertura
              disponível e organiza o melhor caminho para o atendimento.
            </p>
          </div>

          <div className="logos-marquee" aria-label="Convenios aceitos">
            <div className="logos-track">
              {carouselPlans.map((plan, index) => (
                <article
                  className={`logo-card ${plan.className}`}
                  key={`${plan.name}-${index}`}
                  aria-hidden={index >= acceptedPlans.length ? 'true' : undefined}
                >
                  {plan.mark && <span className="logo-mark">{plan.mark}</span>}
                  <span className="logo-text">
                    <strong>{plan.label}</strong>
                    {plan.sublabel && <small>{plan.sublabel}</small>}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <p className="convenios-note">Disponibilidade pode variar. Confirme com nossa equipe.</p>

          <div className="feature-panel">
            <div className="feature-row">
              <ShieldCheck size={22} />
              <span>Confirmação de convênio antes do agendamento</span>
            </div>
            <div className="feature-row">
              <ClipboardCheck size={22} />
              <span>Triagem cuidadosa para direcionar a especialidade</span>
            </div>
            <div className="feature-row">
              <CalendarCheck size={22} />
              <span>Opção de atendimento particular com horário marcado</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-specialties" id="areas" aria-labelledby="areas-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Áreas de atuação</p>
            <h2 id="areas-title">Atendimento com especialistas</h2>
            <p>Avaliação e acompanhamento especializado para condições musculoesqueléticas e articulares.</p>
          </div>

          <div className="specialty-grid">
            {actingAreas.map(({ title, description, Icon }) => (
              <article className="specialty-card" key={title}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-how" id="como" aria-labelledby="como-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Como funciona</p>
            <h2 id="como-title">Uma jornada simples, do primeiro contato ao acompanhamento.</h2>
          </div>

          <div className="steps">
            <article className="step">
              <span>01</span>
              <h3>Agendamento</h3>
              <p>Você chama pelo WhatsApp e recebe orientação para marcar sua avaliação.</p>
            </article>
            <article className="step">
              <span>02</span>
              <h3>Avaliação médica</h3>
              <p>O especialista entende seu histórico, sintomas e exames com atenção.</p>
            </article>
            <article className="step">
              <span>03</span>
              <h3>Plano de cuidado</h3>
              <p>O tratamento é definido com segurança, clareza e acompanhamento próximo.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-units" id="unidades" aria-labelledby="unidades-title">
        <div className="section-inner two-column">
          <div className="section-copy">
            <p className="section-kicker">Unidades</p>
            <h2 id="unidades-title">Estrutura para receber você com conforto e precisão.</h2>
            <p>
              Escolha a unidade mais conveniente e fale com a equipe para confirmar
              disponibilidade de agenda, convênios e especialidades.
            </p>
            <a className="section-button" href="https://wa.me/5511979610690" target="_blank" rel="noreferrer">
              Falar no WhatsApp
              <MessageCircle size={16} strokeWidth={2.4} />
            </a>
          </div>

          <div className="unit-list">
            {units.map((unit) => (
              <article className="unit-card" key={unit.city}>
                <MapPin size={22} />
                <div>
                  <h3>{unit.city}</h3>
                  <p>
                    {unit.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
                <CheckCircle2 size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer" aria-labelledby="footer-title">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="footer-logo" href="#inicio" aria-label="Voltar ao inicio">
              <img
                src="/logo-nav-small.webp"
                alt="Clínica Principia"
                width="300"
                height="101"
                loading="lazy"
                decoding="async"
              />
            </a>
            <h2 id="footer-title">Clínica Principia</h2>
            <p>
              RT - Juliana Fiuza Rebouças | CRM 234106 | SP
            </p>
            <a className="footer-cta" href="https://wa.me/5511979610690" target="_blank" rel="noreferrer">
              <MessageCircle size={17} strokeWidth={2.4} />
              WhatsApp: (11) 97961-0690
            </a>
          </div>

          <nav className="footer-column" aria-label="Especialidades">
            <h3>Especialidades</h3>
            {footerSpecialties.map((specialty) => (
              <a href="#areas" key={specialty}>{specialty}</a>
            ))}
          </nav>

          <div className="footer-column">
            <h3>Contato</h3>
            <a href="tel:+551123059638">
              <Phone size={16} />
              (11) 2305-9638
            </a>
            <a href="https://wa.me/5511979610690" target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              (11) 97961-0690
            </a>
            <a href="mailto:contato@clinicaprincipia.com.br">
              <Mail size={16} />
              contato@clinicaprincipia.com.br
            </a>
          </div>

          <div className="footer-column footer-units">
            <h3>Unidades</h3>
            {footerUnits.map((unit) => (
              <div className="footer-unit" key={unit.city}>
                <MapPin size={16} />
                <span>
                  <strong>{unit.city}</strong>
                  {unit.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Clínica Principia. Todos os direitos reservados</span>
          <a
            className="developer-credit"
            href="https://corpad.com.br"
            target="_blank"
            rel="noreferrer"
            aria-label="Acessar site da CORPAD"
          >
            <span>Desenvolvido por</span>
            <img src="/logocorpad.png" alt="CORPAD" width="146" height="50" loading="lazy" decoding="async" />
          </a>
          <span>RT - Juliana Fiuza Rebouças | CRM 234106 | SP</span>
          <span>
            <a href="https://lp-clinica-principia.vercel.app/#inicio">Política de Privacidade</a>
            <a href="#inicio">Política de Cookies</a>
          </span>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
