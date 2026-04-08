export const portfolioData = {
  personal: {
    name: 'Darwin M. Lubugan',
    initials: 'DL',
    title: 'Software Engineer',
    greeting: 'Hello, I\'m',
    description: `Software Engineer with strong C#, .NET, and Vue.js background, expanding into automation, API integration, and system administration. Proficient in PowerShell, Python, and PHP for developing automation workflows and internal systems.`,
    typingTitles: ['Software Engineer', 'Automation Expert', 'System Administrator', 'API Integrator']
  },
  stats: [
    { number: '70', suffix: '%', label: 'Task Reduction' },
    { number: '2', suffix: '+', label: 'Years Experience' },
    { number: '3', suffix: '', label: 'Major Projects' }
  ],
  about: {
    title: 'A Passionate Developer',
    bio: `I'm a software engineer based in Malaruhatan, Lian, Batangas with a strong foundation in Microsoft technologies. I have experience developing automation workflows, API integrations, and internal systems that streamline business operations.`,
    secondaryBio: `I believe in continuous learning and staying up-to-date with the latest technologies including AI-assisted development tools to accelerate coding and debugging. When I'm not coding, I'm exploring new ways to automate repetitive tasks and improve system efficiency.`,
    highlights: [
      { icon: '📍', label: 'Location', value: 'Malaruhatan, Lian, Batangas' },
      { icon: '🎓', label: 'Education', value: 'BSIT - Cum Laude' },
      { icon: '💼', label: 'Company', value: 'Advani Group of Companies' },
      { icon: '🌐', label: 'Email', value: 'lubugandarwin@gmail.com' }
    ]
  },
  skills: [
    {
      icon: '💻',
      title: 'Microsoft Stack',
      description: 'Building robust applications using C#, .NET Core, ASP.NET Core MVC & Web API, Entity Framework Core, and LINQ.',
      tags: ['C#', '.NET Core', 'ASP.NET Core', 'Entity Framework', 'LINQ'],
      proficiency: 90
    },
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Creating responsive web applications and internal tools using modern JavaScript frameworks and PHP.',
      tags: ['Vue.js', 'PHP', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
      proficiency: 85
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications on Microsoft Azure with CI/CD pipelines and Azure Functions.',
      tags: ['Microsoft Azure', 'Azure Functions', 'Azure DevOps', 'CI/CD', 'Docker'],
      proficiency: 75
    },
    {
      icon: '🤖',
      title: 'Automation & AI',
      description: 'Developing automation scripts and integrating OCR solutions for streamlined business processes.',
      tags: ['PowerShell', 'Python', 'Azure OCR', 'AI Tools', 'Claude Code'],
      proficiency: 88
    },
    {
      icon: '🗄️',
      title: 'Database Management',
      description: 'Managing and designing databases using SQL Server, T-SQL, and MongoDB for efficient data storage.',
      tags: ['SQL Server', 'T-SQL', 'MongoDB', 'Stored Procedures'],
      proficiency: 82
    },
    {
      icon: '🔧',
      title: 'ERP & Support',
      description: 'Providing application support for Dynamics 365 Business Central and system troubleshooting.',
      tags: ['Dynamics 365 BC', 'SAP Business One', 'Network Admin', 'System Troubleshooting'],
      proficiency: 78
    }
  ],
  projects: [
    {
      title: 'Shopify Image Resizer with API Tester',
      description: 'Built an image resizing tool specifically for Shopify product uploads, integrated with Shopify API. Includes an API credential tester to validate Shopify access tokens and store connectivity before performing image operations, ensuring reliable integration.',
      tags: ['Python', 'Shopify API', 'PIL/Pillow', 'REST API'],
      image: '/assets/projects/shopify-image-resizer.png',
      impact: 'Saves 5+ hrs/week',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Timekeeping System',
      description: 'A PHP and MySQL timekeeping system developed to fully replace Sprout, eliminating manual timesheets and reducing operational costs by removing third-party licensing fees.',
      tags: ['PHP', 'MySQL', 'Vue.js'],
      image: '/assets/projects/timekeeping-system.png',
      impact: 'Eliminates licensing fees',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Shopify Automation Scripts',
      description: 'PowerShell and Python scripts for Shopify product data alignment, deduplication, and barcode generation - reducing a multi-week manual process to under one hour.',
      tags: ['PowerShell', 'Python', 'Shopify API'],
      image: '/assets/projects/shopify-automation.png',
      impact: 'Weeks → < 1 hour',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'OCR Integration System',
      description: 'Integrated OCR for faster customer identification, reducing queue times and eliminating manual data entry with real-time accuracy.',
      tags: ['Azure OCR', 'Vue.js', 'C#'],
      image: '/assets/projects/ocr-integration.png',
      impact: '70% faster processing',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'MHO Information System',
      description: 'Capstone project: Digitized and automated manual record-keeping processes, eliminating paper-based logs and reducing data retrieval time.',
      tags: ['C#', '.NET', 'SQL Server'],
      image: '/assets/projects/mho-system.png',
      impact: '100% paperless',
      demoUrl: '#',
      codeUrl: '#'
    }
  ],
  experience: [
    {
      title: 'Junior Network and System Administrator',
      company: 'Advani Group of Companies',
      period: 'Nov 2025 - Present',
      description: 'Troubleshoot network and system issues to ensure high availability, security, and performance. Provide application support for Dynamics 365 Business Central.',
      highlights: [
        'Developed PowerShell and Python scripts to automate Shopify product data alignment, deduplication, and barcode generation - reducing multi-week manual process to under one hour',
        'Developed PHP and MySQL timekeeping system to replace Sprout, eliminating manual timesheets and reducing operational costs',
        'Used Whisper AI + Python to convert speech-to-text from Dynamics 365 training sessions, then applied AI to transform raw transcripts into structured, professional documentation — accelerating knowledge capture and reducing manual writing effort',
        'Reduced repetitive tasks by approximately 70% through automation opportunities',
        'Provide application support for Dynamics 365 Business Central, resolving user-reported issues',
        'Provide application support for Point of Sale system, resolving user-reported issues'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Elyon Global Technologies Asia Inc.',
      period: 'Oct 2023 - Oct 2025',
      description: 'Developed automation features and responsive web solutions for internal projects and client needs.',
      highlights: [
        'Integrated OCR for faster customer identification, reducing queue times and eliminating manual data entry',
        'Developed responsive landing pages and internal tools using Vue.js',
        'Created reusable components for consistent UI and faster development',
        'Delivered scalable solutions to handle high transaction volumes with real-time accuracy'
      ]
    }
  ],
  education: {
    school: 'STI College Balayan',
    degree: 'Bachelor of Science in Information Technology',
    period: '2019 - 2023',
    honors: 'Cum Laude',
    capstone: 'Municipal Health Office Information and Record Management System'
  },
  certifications: [
    { name: 'SAP Business One (Basic - Financials and Logistics)' },
    { name: 'SAP Business One (Advanced - Implementation and Support)' },
    { name: 'Tech Talks: AI and Agents' },
    { name: 'Lean Six Sigma Yellow Belt' },
    { name: 'Lean Six Sigma White Belt' }
  ],
  testimonials: [
    {
      quote: "Darwin's automation scripts saved our team countless hours. His ability to identify inefficiencies and implement solutions is remarkable.",
      author: "Manager",
      role: "Advani Group of Companies",
      initials: "AG"
    },
    {
      quote: "A dedicated developer who consistently delivers high-quality work. His OCR integration project was a game-changer for our customer service.",
      author: "Team Lead",
      role: "Elyon Global Technologies",
      initials: "EG"
    }
  ],
  contact: {
    title: 'Let\'s Connect',
    description: `I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!`,
    methods: [
      { icon: '📧', label: 'Email', value: 'lubugandarwin@gmail.com' },
      { icon: '📱', label: 'Phone', value: '+639280810360' },
      { icon: '📍', label: 'Location', value: 'Malaruhatan, Lian, Batangas' }
    ]
  },
  social: [
    { name: 'GitHub', initials: 'GH', url: 'https://github.com/Darwinie', icon: 'github' },
    { name: 'LinkedIn', initials: 'IN', url: 'https://www.linkedin.com/in/lubugandarwin05', icon: 'linkedin' },
    { name: 'Facebook', initials: 'FB', url: 'https://facebook.com/darwinlubugan', icon: 'facebook' }
  ],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' }
  ]
}