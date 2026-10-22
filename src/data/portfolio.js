export const portfolio = {
  profile: {
    name: 'Darwin M. Lubugan',
    role: 'Software Engineer — Automation',
    location: 'Batangas, Philippines',
    timezone: 'GMT+8',
    email: 'lubugandarwin@gmail.com',
    phone: '+639280810360',
    availability: 'Open to software engineering and automation roles — Remote-friendly',
    headline: 'I turn repetitive work into reliable systems.',
    intro: 'I build internal tools and automations for business operations — C#, .NET, Vue, PowerShell, Python, SQL. Currently keeping business systems running at Advani Group of Companies.',
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
    { value: 'Since 2023', label: 'Building internal tools', detail: 'Software engineering and automation roles' }
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
      title: 'Municipal Health Office information system',
      description: 'Capstone project that digitized paper-based health records.',
      stack: ['C#', '.NET', 'SQL Server']
    }
  ],
  about: {
    bio: [
      "I'm Darwin, a software engineer based in Batangas, Philippines. I build internal tools and automations for business operations — the kind of work that removes a manual step, a spreadsheet, or a licensing fee.",
      "I've worked across the Microsoft stack, PHP/MySQL systems, and Shopify automation. At Advani Group of Companies, I build internal tools while supporting users, Active Directory access, Hyper-V and Proxmox environments, backups, and business applications."
    ],
    howIWork: [
      { number: '01', title: 'Observe the process', description: 'Watch how the work actually gets done, including the workarounds.' },
      { number: '02', title: 'Find the constraint', description: 'Identify the step that creates the delay, duplicate, or manual cost.' },
      { number: '03', title: 'Build the smallest reliable system', description: 'Ship the smallest tool that removes the constraint and can be maintained.' },
      { number: '04', title: 'Measure and document it', description: 'Confirm the outcome and leave the team with a process they can run.' }
    ],
    toolbox: [
      { group: 'Build', items: ['C#', '.NET', 'ASP.NET Core', 'Vue.js', 'PHP'] },
      { group: 'Automate', items: ['PowerShell', 'Python', 'Shopify API', 'Azure OCR'] },
      { group: 'Data', items: ['SQL Server', 'T-SQL', 'MySQL', 'MongoDB'] },
      { group: 'Support', items: ['Windows / macOS', 'Active Directory', 'Hardware / software', 'End-user assistance'] },
      { group: 'Systems', items: ['Hyper-V', 'Proxmox', 'Linux', 'pfSense', 'DNS / DHCP / VPN'] },
      { group: 'Operate', items: ['Dynamics 365 Business Central', 'SAP Business One', 'Azure DevOps', 'Git', 'CI/CD', 'Docker'] }
    ],
    currently: [
      { label: 'Role', value: 'Junior Network and System Administrator' },
      { label: 'Company', value: 'Advani Group of Companies' },
      { label: 'Focus', value: 'Automation, application support, and IT operations' },
      { label: 'Education', value: 'BSIT, Cum Laude — STI College Balayan' }
    ]
  },
  experience: [
    {
      role: 'Junior Network and System Administrator',
      company: 'Advani Group of Companies (Nyne Beauty Inc.)',
      period: 'Nov 2025 — Present',
      summary: 'Build internal tools and automations while supporting users, infrastructure, and business-critical applications. Partner with teams to identify automation opportunities and reduce repetitive work.',
      highlights: [
        'Troubleshoot Windows / macOS, network, and system issues; provide hardware and software support, installation, and end-user assistance.',
        'Administer Active Directory user access, maintain servers and Linux environments, and support Hyper-V and Proxmox virtualization.',
        'Perform routine backups, maintain IT asset records, and support equipment inventory tracking.',
        'Provide Dynamics 365 Business Central application support and track issues in Azure DevOps; built a C#/.NET ticketing system for internal requests.',
        'Built a Python automation for pfSense backups and PowerShell/Python workflows for Shopify catalog alignment, deduplication, and barcode generation, reducing a multi-week process to under an hour.',
        'Built a PHP/MySQL timekeeping system that replaced a licensed tool, reducing manual processing and improving payroll accuracy.',
        'Used Whisper AI and Python to convert training transcripts into structured documentation.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Elyon Global Technologies Asia Inc.',
      period: 'Oct 2023 — Oct 2025',
      summary: 'Built automation features and responsive web solutions for internal and client projects.',
      highlights: [
        'Integrated OCR for customer identification, reducing queue times and manual data entry.',
        'Developed responsive landing pages and internal tools with Vue.js.',
        'Created reusable components for consistent UI and faster delivery.'
      ]
    }
  ],
  education: {
    degree: 'BSIT, Cum Laude',
    school: 'STI College Balayan',
    period: '2019 — 2023'
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