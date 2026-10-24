export const portfolio = {
  profile: {
    name: 'Darwin M. Lubugan',
    role: 'Software Engineer | .NET Full Stack Developer',
    location: 'Batangas, Philippines',
    timezone: 'GMT+8',
    email: 'lubugandarwin@gmail.com',
    phone: '+639280810360',
    availability: 'Open to software engineering and automation roles — Remote-friendly',
    headline: 'I turn repetitive work into reliable systems.',
    intro: 'I build enterprise applications, internal tools, and automations — C#, ASP.NET Core, .NET, Vue, PHP, PowerShell, Python, SQL. Currently a part-time software developer at NOUS AV IT Solutions.',
    portraitAlt: 'Darwin M. Lubugan',
    resumeUrl: '/Lubugan_Darwin_Resume.pdf',
    links: [
      { label: 'GitHub', url: 'https://github.com/Darwinie' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lubugandarwin05' },
      { label: 'Email', url: 'mailto:lubugandarwin@gmail.com' }
    ]
  },
  metrics: [
    { value: '≈70%', label: 'Less repetitive work', detail: 'Approximate reduction across automation work' },
    { value: 'Weeks → < 1 hour', label: 'Catalog cleanup', detail: 'Manual reconciliation replaced by scripts' },
    { value: '≈3 years', label: 'Professional software experience', detail: 'Software engineering since October 2023' }
  ],
  caseStudies: [
    {
      number: '01',
      slug: 'shopify-catalog-automation',
      title: 'Shopify catalog automation',
      outcome: 'A multi-week catalog cleanup, reduced to under an hour.',
      context: 'Product data across stores was inconsistent, duplicated, and slow to reconcile. Barcode generation was manual.',
      constraint: 'No third-party licensing. The process had to fit the existing store operation without adding a new platform.',
      built: 'A set of PowerShell and Python scripts that align product data, remove duplicates, and generate barcodes through the Shopify API.',
      result: 'Repeatable catalog cleanup in under an hour instead of weeks of manual work.',
      role: 'Automation engineer',
      stack: ['PowerShell', 'Python', 'Shopify API'],
      scope: 'Product data, deduplication, barcode generation',
      visual: { type: 'pipeline', steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify'] },
      link: null
    },
    {
      number: '02',
      slug: 'timekeeping-system',
      title: 'Timekeeping, rebuilt in-house',
      outcome: 'Replaced a licensed timesheet system with a custom PHP/MySQL app.',
      context: 'Timesheets were manual, and the existing third-party system carried recurring licensing fees.',
      constraint: 'The replacement had to cover daily timekeeping, records, and reporting without disrupting payroll operations.',
      built: 'An internal timekeeping system with a PHP/MySQL backend and a Vue.js front end.',
      result: 'Eliminated licensing fees and manual timesheet handling.',
      role: 'Full-stack developer',
      stack: ['PHP', 'MySQL', 'Vue.js'],
      scope: 'Timekeeping, records, reporting',
      visual: {
        type: 'image',
        src: '/assets/projects/timekeeping-redacted.jpg',
        alt: 'Timekeeping dashboard showing attendance and payroll summaries'
      },
      link: null
    },
    {
      number: '03',
      slug: 'ocr-customer-identification',
      title: 'OCR at the counter',
      outcome: 'Customer identification ≈70% faster, with no manual typing.',
      context: 'Manual customer identification created queues and typing errors at the counter.',
      constraint: 'The integration had to prefill the existing workflow without replacing the systems staff already used.',
      built: 'An Azure OCR integration with a Vue.js and C# workflow that reads customer information and prefills the record.',
      result: '≈70% faster processing and less manual data entry.',
      role: 'Software engineer',
      stack: ['Azure OCR', 'Vue.js', 'C#'],
      scope: 'Customer identification, data entry',
      visual: { type: 'pipeline', steps: ['Capture ID', 'OCR extract', 'Prefill workflow'] },
      link: null
    }
  ],
  additionalWork: [
    {
      title: 'Shopify image resizer with API tester',
      description: 'Tool for resizing Shopify product images and validating store credentials.',
      stack: ['Python', 'Shopify API', 'Pillow']
    },
    {
      title: 'Municipal Health Office information and record management system',
      description: 'Capstone project that digitized paper-based health records and automated record-keeping.',
      stack: ['C#', '.NET', 'SQL Server']
    }
  ],
  about: {
    bio: [
      "I'm Darwin, a software engineer based in Batangas, Philippines. I build internal tools and automations for business operations — the kind of work that removes a manual step, a spreadsheet, or a licensing fee.",
      "I've worked across the Microsoft stack, PHP/MySQL systems, and Shopify automation. At Advani Group of Companies, I built internal tools while supporting users, Active Directory access, Hyper-V and Proxmox environments, backups, and business applications. I'm now a part-time software developer at NOUS AV IT Solutions, building full-stack web applications and business systems."
    ],
    howIWork: [
      { number: '01', title: 'Observe the process', description: 'Watch how the work actually gets done, including the workarounds.' },
      { number: '02', title: 'Find the constraint', description: 'Identify the step that creates the delay, duplicate, or manual cost.' },
      { number: '03', title: 'Build the smallest reliable system', description: 'Ship the smallest tool that removes the constraint and can be maintained.' },
      { number: '04', title: 'Measure and document it', description: 'Confirm the outcome and leave the team with a process they can run.' }
    ],
    toolbox: [
      {
        group: 'Build',
        items: ['C#', '.NET', 'ASP.NET Core', '.NET MVC', 'Entity Framework Core', 'Vue.js', 'JavaScript', 'TypeScript', 'PHP', 'Bootstrap']
      },
      {
        group: 'Automate',
        items: ['PowerShell', 'Python', 'Azure AI Document Intelligence', 'Tesseract OCR (C#)', 'Shopify API']
      },
      { group: 'Data', items: ['SQL Server', 'T-SQL', 'MySQL', 'MongoDB', 'PostgreSQL'] },
      {
        group: 'Cloud & DevOps',
        items: ['Microsoft Azure', 'Azure Functions', 'Azure DevOps', 'CI/CD Pipelines', 'Docker', 'Apache HTTP Server']
      },
      {
        group: 'Support',
        items: ['Windows / macOS', 'Active Directory', 'Hardware / software', 'End-user assistance', 'Network & system troubleshooting']
      },
      { group: 'Systems', items: ['Hyper-V', 'Proxmox', 'Linux', 'pfSense', 'DNS / DHCP / VPN'] },
      {
        group: 'Operate',
        items: ['Dynamics 365 Business Central', 'SAP Business One', 'Git (GitHub, Azure Repos)', 'Agile', 'REST API Development', 'Unit Testing']
      }
    ],
    currently: [
      { label: 'Role', value: 'Software Developer (Part-time)' },
      { label: 'Company', value: 'NOUS AV IT Solutions' },
      { label: 'Focus', value: 'Full-stack web applications and business systems' },
      { label: 'Education', value: 'BSIT, Cum Laude — STI College Balayan' }
    ]
  },
  experience: [
    {
      role: 'Software Developer (Part-time)',
      company: 'NOUS AV IT Solutions',
      period: 'Mar 2026 — Present',
      summary: 'Build full-stack web applications and business systems for clients, from requirements gathering through delivery.',
      highlights: [
        'Developed a travel agency website and booking management system with purchase order functionality.',
        'Built a timekeeping and payroll system to automate attendance and payroll processing.',
        'Developed full-stack web applications using PHP, MySQL, Apache, JavaScript, HTML, and CSS.',
        'Gathered client requirements and translated business needs into software solutions.'
      ]
    },
    {
      role: 'Junior Network and System Administrator',
      company: 'Advani Group of Companies (Nyne Beauty Inc.)',
      period: 'Nov 2025 — Sept 25, 2026',
      summary: 'Built internal tools and automations while supporting users, infrastructure, and business-critical applications. Partnered with teams to identify automation opportunities and reduce repetitive work.',
      highlights: [
        'Troubleshot Windows / macOS, network, and system issues; provided hardware and software support, installation, and end-user assistance.',
        'Administered Active Directory user access, maintained servers and Linux environments, and supported Hyper-V and Proxmox virtualization.',
        'Performed routine backups, maintained IT asset records, and supported equipment inventory tracking.',
        'Provided Dynamics 365 Business Central application support and tracked issues in Azure DevOps; built a C#/.NET ticketing system for internal requests.',
        'Built Python automation for pfSense backups and PowerShell/Python workflows for Shopify catalog alignment, deduplication, and barcode generation, reducing a multi-week process to under an hour.',
        'Built a PHP/MySQL timekeeping system that replaced a licensed tool, reducing manual processing and improving payroll accuracy.',
        'Used Whisper AI and Python to convert training transcripts into structured documentation.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Elyon Global Technologies Asia Inc.',
      period: 'Oct 2023 — Oct 2025',
      summary: 'Built automation features and responsive web applications for internal and client projects.',
      highlights: [
        'Developed a Money Exchange System that streamlined critical processes and improved operational efficiency for Czarina Forex Exchange.',
        'Integrated OCR for customer identification, reducing queue times and eliminating manual data entry.',
        'Delivered a scalable solution to handle high transaction volumes with real-time accuracy.',
        'Built responsive web applications with Vue.js and reusable components, collaborating with cross-functional teams to deliver internal business solutions.'
      ]
    }
  ],
  education: {
    degree: 'BSIT, Cum Laude',
    school: 'STI College Balayan',
    period: 'July 2019 — July 2023'
  },
  certifications: [
    { name: 'SAP Business One (Basic — Financials and Logistics)' },
    { name: 'SAP Business One (Advanced — Implementation and Support)' },
    { name: 'Tech Talks: AI and Agents' },
    { name: 'Lean Six Sigma Yellow Belt' },
    { name: 'Lean Six Sigma White Belt' }
  ],
  contact: {
    headline: 'Have a process that needs to disappear?',
    email: 'lubugandarwin@gmail.com',
    location: 'Batangas, Philippines',
    timezone: 'GMT+8'
  }
}