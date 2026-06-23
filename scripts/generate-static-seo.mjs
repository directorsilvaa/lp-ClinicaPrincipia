import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const siteUrl = 'https://principiamedicina.com.br/lp';
const generatedAt = new Date().toISOString().slice(0, 10);
const contactEmail = 'contato@principiamedicina.com.br';
const medicalDirector = {
  '@type': 'Person',
  name: 'Juliana Fiuza Rebouças',
  honorificPrefix: 'Dra.',
  identifier: 'CRM 234106 SP',
};

const specialties = [
  'Ortopedia',
  'Reumatologia',
  'Neurocirurgia',
  'Medicina da Dor',
  'Medicina do Esporte',
  'Traumatologia',
  'Endocrinologia',
  'Ginecologia',
];

const acceptedPlans = ['Bradesco Saúde', 'SulAmérica', 'Medservice', 'Amil', 'GEAP', 'OMINT'];

const actingAreas = [
  {
    title: 'Coluna Vertebral',
    description: 'Diagnóstico e tratamento de hérnias, escoliose, estenose e dores crônicas da coluna.',
  },
  {
    title: 'Articulações',
    description: 'Joelhos, quadris e ombros com cuidado especializado.',
  },
  {
    title: 'Neurocirurgia',
    description: 'Procedimentos neurocirúrgicos de coluna minimamente invasivos.',
  },
  {
    title: 'Lesões Esportivas',
    description: 'Retorno seguro ao esporte após lesões musculoesqueléticas.',
  },
  {
    title: 'Ortopedia',
    description: 'Avaliação ortopédica completa com especialistas certificados.',
  },
  {
    title: 'Dor Cervical',
    description: 'Tratamento para dores no pescoço e região cervical.',
  },
  {
    title: 'Reumatologia',
    description: 'Artrite, artrose e doenças autoimunes articulares.',
  },
  {
    title: 'Medicina do Esporte',
    description: 'Performance e prevenção para atletas e praticantes.',
  },
];

const faqs = [
  {
    question: 'A Clínica Principia atende quais especialidades?',
    answer:
      'A Clínica Principia atende articulações, coluna, ortopedia, reumatologia, neurocirurgia, medicina da dor e medicina do esporte.',
  },
  {
    question: 'Onde ficam as unidades da Clínica Principia?',
    answer:
      'A Clínica Principia possui unidades em São Paulo, nos bairros Butantã e Itaim Bibi, além de unidades em Brasília e Salvador.',
  },
  {
    question: 'Como agendar uma consulta?',
    answer:
      'O agendamento pode ser feito pelo WhatsApp da clínica. A equipe orienta sobre disponibilidade, convênios e especialidade indicada.',
  },
  {
    question: 'A clínica atende convênio e particular?',
    answer:
      'Sim. A equipe confirma a cobertura disponível antes do agendamento e também orienta pacientes para atendimento particular.',
  },
];

const units = [
  {
    id: 'butanta',
    name: 'Clínica Principia Butantã',
    city: 'São Paulo',
    region: 'SP',
    neighborhood: 'Butantã',
    street: 'Rua Alvarenga, 220',
    pagePath: '/sao-paulo',
    map: 'https://www.google.com/maps/search/?api=1&query=Rua%20Alvarenga%20220%20Butant%C3%A3%20S%C3%A3o%20Paulo',
  },
  {
    id: 'itaim-bibi',
    name: 'Clínica Principia Itaim Bibi',
    city: 'São Paulo',
    region: 'SP',
    neighborhood: 'Itaim Bibi',
    street: 'Rua Joaquim Floriano, 533, Sala 1313',
    pagePath: '/sao-paulo',
    map: 'https://www.google.com/maps/search/?api=1&query=Rua%20Joaquim%20Floriano%20533%20Itaim%20Bibi%20S%C3%A3o%20Paulo',
  },
  {
    id: 'brasilia',
    name: 'Clínica Principia Brasília',
    city: 'Brasília',
    region: 'DF',
    neighborhood: 'Asa Sul',
    street: 'OHB Centro Médico, Bloco B - Sala 616, SHLS Quadra 716 - Conjunto L, Asa Sul, CEP 70390-700',
    pagePath: '/brasilia',
    map: 'https://www.google.com/maps/search/?api=1&query=OHB%20Centro%20M%C3%A9dico%20SHLS%20716%20Asa%20Sul%20Bras%C3%ADlia',
  },
  {
    id: 'salvador',
    name: 'Clínica Principia Salvador',
    city: 'Salvador',
    region: 'BA',
    neighborhood: 'Shopping Bela Vista',
    street: 'Centro Médico Bela Vista, Shopping Bela Vista, Rua Alameda Euvaldo Luz, 92 - Piso L2',
    pagePath: '/salvador',
    map: 'https://www.google.com/maps/search/?api=1&query=Shopping%20Bela%20Vista%20Rua%20Alameda%20Euvaldo%20Luz%2092%20Salvador',
  },
];

const routes = [
  {
    path: '/',
    priority: '1.0',
    title: 'Clínica Principia | Especialistas em articulações',
    description:
      'Clínica Principia: especialistas em articulações, ortopedia, reumatologia, neurocirurgia, medicina da dor e atendimento humanizado em São Paulo, Brasília e Salvador.',
    geoRegion: 'BR-SP',
    geoPlacename: 'São Paulo, Brasília e Salvador',
    heading: 'Clínica Principia: especialistas em articulações em São Paulo, Brasília e Salvador',
    intro:
      'Avaliação médica, tratamento personalizado e acompanhamento humanizado para articulações, coluna, ortopedia, reumatologia, neurocirurgia, medicina da dor e medicina do esporte.',
    units,
  },
  {
    path: '/sao-paulo',
    priority: '0.9',
    title: 'Clínica Principia em São Paulo | Butantã e Itaim Bibi',
    description:
      'Atendimento médico especializado em articulações, coluna, ortopedia, reumatologia e medicina da dor nas unidades Butantã e Itaim Bibi, em São Paulo.',
    geoRegion: 'BR-SP',
    geoPlacename: 'São Paulo',
    heading: 'Clínica Principia em São Paulo: unidades Butantã e Itaim Bibi',
    intro:
      'Consultas com especialistas em articulações, coluna, ortopedia, reumatologia, neurocirurgia, medicina da dor e medicina do esporte em São Paulo.',
    units: units.filter((unit) => unit.pagePath === '/sao-paulo'),
  },
  {
    path: '/brasilia',
    priority: '0.85',
    title: 'Clínica Principia em Brasília | Asa Sul',
    description:
      'Consulta com especialistas em articulações, coluna, ortopedia, reumatologia e medicina da dor na unidade da Clínica Principia em Brasília, na Asa Sul.',
    geoRegion: 'BR-DF',
    geoPlacename: 'Brasília',
    heading: 'Clínica Principia em Brasília: atendimento na Asa Sul',
    intro:
      'Atendimento especializado para articulações, coluna, ortopedia, reumatologia, neurocirurgia e medicina da dor em Brasília.',
    units: units.filter((unit) => unit.pagePath === '/brasilia'),
  },
  {
    path: '/salvador',
    priority: '0.85',
    title: 'Clínica Principia em Salvador | Shopping Bela Vista',
    description:
      'Atendimento especializado para articulações, coluna, ortopedia, reumatologia e medicina da dor na Clínica Principia em Salvador, no Shopping Bela Vista.',
    geoRegion: 'BR-BA',
    geoPlacename: 'Salvador',
    heading: 'Clínica Principia em Salvador: atendimento no Shopping Bela Vista',
    intro:
      'Consulta com especialistas em articulações, coluna, ortopedia, reumatologia, neurocirurgia e medicina da dor em Salvador.',
    units: units.filter((unit) => unit.pagePath === '/salvador'),
  },
];

function publicUrl(routePath) {
  return routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}/`;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function buildSchema(route) {
  const routeUrl = publicUrl(route.path);
  const localClinics = route.units.map((unit) => ({
    '@type': 'MedicalClinic',
    '@id': `${siteUrl}/#${unit.id}`,
    name: unit.name,
    url: publicUrl(unit.pagePath),
    image: `${siteUrl}/logo.png`,
    logo: `${siteUrl}/logo.png`,
    telephone: '+55-11-2305-9638',
    email: contactEmail,
    medicalDirector,
    priceRange: '$$',
    medicalSpecialty: specialties,
    areaServed: {
      '@type': 'City',
      name: unit.city,
    },
    hasMap: unit.map,
    address: {
      '@type': 'PostalAddress',
      streetAddress: unit.street,
      addressLocality: unit.city,
      addressRegion: unit.region,
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-97961-0690',
      contactType: 'Agendamento',
      availableLanguage: 'pt-BR',
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Clínica Principia',
        url: `${siteUrl}/`,
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebPage',
        '@id': `${routeUrl}#webpage`,
        url: routeUrl,
        name: route.title,
        description: route.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: localClinics.map((clinic) => ({ '@id': clinic['@id'] })),
      },
      ...localClinics,
      {
        '@type': 'SpeakableSpecification',
        '@id': `${routeUrl}#speakable`,
        cssSelector: ['h1', 'section h2', 'section h3'],
      },
      {
        '@type': 'FAQPage',
        '@id': `${routeUrl}#faq`,
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${routeUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: route.path === '/' ? 'Unidades' : route.geoPlacename,
            item: routeUrl,
          },
        ],
      },
    ],
  };
}

function buildFallbackContent(route) {
  const unitItems = route.units
    .map(
      (unit) => `<li><strong>${escapeHtml(unit.name)}</strong>: ${escapeHtml(unit.street)} - ${escapeHtml(
        unit.neighborhood
      )}, ${escapeHtml(unit.city)} ${escapeHtml(unit.region)}.</li>`
    )
    .join('');

  const faqContent = faqs
    .map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`)
    .join('');

  const planContent = acceptedPlans.map((plan) => `<li>${escapeHtml(plan)}</li>`).join('');

  const actingAreaContent = actingAreas
    .map((area) => `<article><h3>${escapeHtml(area.title)}</h3><p>${escapeHtml(area.description)}</p></article>`)
    .join('');

  return `<div id="root">
      <main>
        <section>
          <h1>${escapeHtml(route.heading)}</h1>
          <p>${escapeHtml(route.intro)}</p>
          <p>Agendamento por WhatsApp, confirmação de convênios selecionados e atendimento particular com orientação da equipe.</p>
        </section>
        <section id="inicio">
          <h2>Agende sua consulta na Clínica Principia</h2>
          <p>Especialistas em articulações que cuidam de você com avaliação precisa, tratamento personalizado, tecnologia e acompanhamento humanizado.</p>
          <p><a href="https://wa.me/5511979610690">Agendar consulta pelo WhatsApp</a></p>
        </section>
        <section id="convenios">
          <h2>Atendimento para planos selecionados e consultas particulares</h2>
          <p>A equipe orienta cada paciente antes da consulta, confirma cobertura disponível e organiza o melhor caminho para o atendimento.</p>
          <ul>${planContent}</ul>
          <p>Disponibilidade pode variar. Confirme com nossa equipe.</p>
          <ul>
            <li>Confirmação de convênio antes do agendamento.</li>
            <li>Triagem cuidadosa para direcionar a especialidade.</li>
            <li>Opção de atendimento particular com horário marcado.</li>
          </ul>
        </section>
        <section id="areas">
          <h2>Áreas de atuação</h2>
          <p>Avaliação e acompanhamento especializado para condições musculoesqueléticas e articulares.</p>
          ${actingAreaContent}
        </section>
        <section id="como">
          <h2>Como funciona</h2>
          <article>
            <h3>Agendamento</h3>
            <p>Você chama pelo WhatsApp e recebe orientação para marcar sua avaliação.</p>
          </article>
          <article>
            <h3>Avaliação médica</h3>
            <p>O especialista entende seu histórico, sintomas e exames com atenção.</p>
          </article>
          <article>
            <h3>Plano de cuidado</h3>
            <p>O tratamento é definido com segurança, clareza e acompanhamento próximo.</p>
          </article>
        </section>
        <section>
          <h2>Especialidades atendidas</h2>
          <ul>${specialties.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </section>
        <section>
          <h2>Unidades e localização</h2>
          <ul>${unitItems}</ul>
        </section>
        <section>
          <h2>Perguntas frequentes</h2>
          ${faqContent}
        </section>
        <footer>
          <h2>Clínica Principia</h2>
          <p>RT - Juliana Fiuza Rebouças | CRM 234106 | SP</p>
          <p>WhatsApp: <a href="https://wa.me/5511979610690">(11) 97961-0690</a></p>
          <p>Telefone: <a href="tel:+551123059638">(11) 2305-9638</a></p>
          <p>E-mail: <a href="mailto:${contactEmail}">${contactEmail}</a></p>
          <p>© 2026 Clínica Principia. Todos os direitos reservados.</p>
          <p><a href="https://corpad.com.br">Desenvolvido por CORPAD</a></p>
          <p><a href="https://principiamedicina.com.br/lp/#inicio">Política de Privacidade</a> <a href="#inicio">Política de Cookies</a></p>
        </footer>
      </main>
    </div>`;
}

function replaceMeta(html, route, { nested = false } = {}) {
  const canonicalUrl = publicUrl(route.path);
  let nextHtml = html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/\s*<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, '')
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    )
    .replace(/<meta name="geo\.region" content="[^"]*" \/>/, `<meta name="geo.region" content="${route.geoRegion}" />`)
    .replace(
      /<meta name="geo\.placename" content="[^"]*" \/>/,
      `<meta name="geo.placename" content="${escapeHtml(route.geoPlacename)}" />`
    )
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    )
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(buildSchema(route), null, 2)}\n    </script>`
    )
    .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, `${buildFallbackContent(route)}\n  </body>`);

  if (nested && !nextHtml.includes('<base href="/lp/" />')) {
    nextHtml = nextHtml.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <base href="/lp/" />');
  }

  return nextHtml;
}

function buildSitemap() {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${publicUrl(route.path)}</loc>
    <lastmod>${generatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const rootHtmlPath = path.join(distDir, 'index.html');
const rootHtml = await readFile(rootHtmlPath, 'utf8');

await writeFile(rootHtmlPath, replaceMeta(rootHtml, routes[0]), 'utf8');

for (const route of routes.filter((item) => item.path !== '/')) {
  const routeDir = path.join(distDir, route.path.slice(1));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), replaceMeta(rootHtml, route, { nested: true }), 'utf8');
}

await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8');
await writeFile(
  path.join(distDir, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  'utf8'
);
