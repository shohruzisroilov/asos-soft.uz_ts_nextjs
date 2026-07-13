/**
 * English dictionary — the source of truth for the translation shape.
 * The `Dictionary` type is derived from this object (see ../types), so uz.ts
 * and ru.ts are checked at compile time to have the exact same structure.
 *
 * Ordering of the `items` arrays MUST match the corresponding data file
 * (e.g. services.items[i] ↔ data/services.ts[i]) — components zip them by index.
 */
export const en = {
  nav: {
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    technologies: "Technologies",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    cta: "Get in touch",
    language: "Language",
  },

  hero: {
    eyebrow: "Digital product studio for businesses",
    headline: "Professional Software Solutions for Your Business",
    subheadlineBefore: "AsosSoft designs and develops ",
    subheadlineHighlight:
      "websites, mobile apps, CRM and AI systems,",
    subheadlineAfter:
      " automation, and custom projects. High-quality products engineered to help your business scale.",
    ctaPrimary: "Get Free Consultation",
    ctaSecondary: "View Portfolio",
    stats: [
      "Projects delivered",
      "Happy clients",
      "Years of experience",
      "Experts on the team",
    ],
    floating: [
      "Web development",
      "Mobile apps",
      "CRM & ERP",
      "AI solutions",
      "Automation",
      "UI/UX design",
    ],
  },

  services: {
    badge: "What we do",
    heading: "Services built to scale your business",
    subheading: "Professional end-to-end software services from concept to launch.",
    learnMore: "Learn more",
    items: [
      {
        title: "Website Development",
        description:
          "Fast, accessible websites built on modern frameworks that convert visitors into customers.",
      },
      {
        title: "E-commerce",
        description:
          "Scalable online stores with secure checkout, payments, and inventory management.",
      },
      {
        title: "CRM Development",
        description:
          "Custom CRM platforms that centralize your sales pipeline and customer relationships.",
      },
      {
        title: "Mobile Apps",
        description:
          "Native and cross-platform iOS & Android apps with pixel-perfect, fluid experiences.",
      },
      {
        title: "Telegram Bots",
        description:
          "Smart Telegram bots for sales, support, and automation — available around the clock.",
      },
      {
        title: "AI Solutions",
        description:
          "LLM-powered assistants, chatbots, and intelligent automation tailored to your data.",
      },
    ],
  },

  portfolio: {
    badge: "Our work",
    heading: "Selected projects we’re proud of",
    subheading: "Real digital products shipped to solve real business goals.",
    buttonLabels: {
      web: "Visit Website",
      app: "View App",
      bot: "View Bot",
      private: "Private System",
    },
    categories: {
      All: "All",
      Web: "Web",
      "E-commerce": "E-commerce",
      Mobile: "Mobile",
      AI: "AI",
      SaaS: "SaaS",
    },
    items: [
      {
        title: "Sam Travel",
        description: "Modern and user-friendly tourism website for traveling across Europe and the world.",
      },
      {
        title: "Atlas CRM",
        description: "Modern CRM that unifies sales pipeline and contact management.",
      },
      {
        title: "Pulse Fitness",
        description: "Cross-platform mobile application for fitness tracking and workout plans.",
      },
      {
        title: "Lumen AI",
        description: "AI-powered knowledge assistant answering queries based on private data.",
      },
      {
        title: "Vertex ERP",
        description: "Corporate ERP system connecting finance, HR, and operations.",
      },
      {
        title: "Cargo Logistics",
        description: "Logistics tracking panel with live map and route optimization.",
      },
    ],
  },

  technologies: {
    badge: "Our stack",
    heading: "Technologies we build with",
    subheading: "A modern, battle-tested toolkit chosen for performance and reliability.",
    groups: {
      frontend: "Frontend",
      backend: "Backend & APIs",
      mobile: "Mobile Development",
      bot: "Telegram Bots",
      desktop: "Desktop Apps",
      devops: "DevOps & Cloud",
      database: "Databases & Storage",
      design: "Design & Tools",
    },
  },

  whyChoose: {
    badge: "Why AsosSoft",
    heading: "Built to earn your trust",
    subheading: "Key values that make us the right long-term partner for your product.",
    items: [
      {
        title: "Fast Delivery",
        description: "Projects are completed and launched on time, every time.",
      },
      {
        title: "Modern Technologies",
        description: "We build on a modern, fast, and secure technology stack.",
      },
      {
        title: "Affordable Pricing",
        description: "Transparent prices for premium software with no hidden fees.",
      },
      {
        title: "Scalable Architecture",
        description: "Systems designed to grow with your user base seamlessly.",
      },
      {
        title: "Professional Team",
        description: "Experienced engineers and designers who care about results.",
      },
      {
        title: "24/7 Support",
        description: "Constant monitoring and technical help whenever you need it.",
      },
      {
        title: "Premium UI",
        description: "Beautiful, pixel-perfect, and highly user-friendly designs.",
      },
      {
        title: "SEO Optimized",
        description: "Built for speed and discoverability, helping customers find you first.",
      },
    ],
  },

  process: {
    badge: "How we work",
    heading: "Our development process",
    subheading: "A transparent and proven workflow from initial plan to final launch.",
    items: [
      {
        title: "Requirement Analysis",
        description: "We analyze your business goals and plan the software features.",
      },
      {
        title: "Planning",
        description: "We establish a clear project timeline and milestone map.",
      },
      {
        title: "UI/UX Design",
        description: "We design beautiful, custom prototypes for your preview.",
      },
      {
        title: "Development",
        description: "We write clean, testable, and scalable software code.",
      },
      {
        title: "Testing",
        description: "We thoroughly check speed, security, and bugs on all devices.",
      },
      {
        title: "Deployment",
        description: "We deploy to secure servers and launch the project safely.",
      },
      {
        title: "Support",
        description: "We ensure continuous maintenance and technical assistance.",
      },
    ],
  },

  faq: {
    badge: "FAQ",
    heading: "Frequently asked questions",
    subheading:
      "Everything you need to know about working with AsosSoft. Can’t find an answer? We’re one message away.",
    still: "Still have questions?",
    getInTouch: "Get in touch",
    items: [
      {
        question: "How much does a project cost?",
        answer:
          "Every project is quoted individually based on scope, complexity, and timeline. Smeta is fully transparent.",
      },
      {
        question: "How long will my project take?",
        answer:
          "A landing page typically takes 1–2 weeks, a full website 3–5 weeks, and a complex web or mobile app 8–16 weeks.",
      },
      {
        question: "Do you provide support after launch?",
        answer:
          "Yes. Every launch includes a warranty period, and we offer 24/7 monitoring and support plans afterward.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "We build on a modern, proven stack: Next.js, React, Vue, Node.js, NestJS, Go, Laravel, Python and databases.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Absolutely. Our maintenance plans cover security patches, updates, backups, and feature improvements.",
      },
      {
        question: "Can you handle hosting and deployment?",
        answer:
          "Yes — we set up and manage hosting on AWS, Azure, Google Cloud, or Vercel, with CI/CD for zero-downtime releases.",
      },
      {
        question: "Can you build Telegram bots?",
        answer:
          "We build Telegram bots for sales, support, and automation — including payment integration and admin dashboards.",
      },
      {
        question: "Do you build AI solutions?",
        answer:
          "Yes. We develop AI assistants and chatbots, RAG systems, and intelligent automation tailored to your data.",
      },
      {
        question: "Can you build a custom CRM?",
        answer:
          "We design custom CRMs around your exact sales process — pipelines, contacts, deals, reporting, and role-based access.",
      },
      {
        question: "Do you develop ERP systems?",
        answer:
          "Yes. We build modular ERP platforms that unify finance, inventory, HR, and operations with real-time dashboards.",
      },
      {
        question: "Do you optimize for SEO?",
        answer:
          "SEO is built into everything we ship: fast Core Web Vitals, semantic markup, structured data, clean URLs, and sitemaps.",
      },
    ],
  },

  testimonials: {
    badge: "Testimonials",
    heading: "Loved by teams we’ve built with",
    subheading: "Don’t just take our word for it — here’s what our clients say.",
    items: [
      {
        role: "CTO",
        review:
          "They built the website faster and more beautifully than we expected. Thanks to fast load speeds, conversions increased. Very responsible team.",
      },
      {
        role: "Founder",
        review:
          "They shipped our mobile app ahead of schedule without cutting any corners. The design and performance is outstanding. Thanks a lot!",
      },
      {
        role: "Product Lead",
        review:
          "They unified our complex old management tools into one unified clean platform. Our work is much simpler now and time is saved.",
      },
      {
        role: "CEO",
        review:
          "The live fleet tracking dashboard transformed our operations. Big thanks to Shohruz and his team for fast help. Happy with the partnership.",
      },
      {
        role: "Head of Marketing",
        review:
          "The website design is extremely modern and beautiful. We now easily rank higher on Google search results. Extremely satisfied!",
      },
      {
        role: "COO",
        review:
          "They studied our business and gave very helpful product consulting. The CRM they created made our sales processes structured and clear.",
      },
    ],
  },

  contact: {
    badge: "Contact",
    heading: "Let’s build something great",
    subheading: "Tell us about your project and we’ll get back to you soon.",
    details: {
      email: "Email",
      phone: "Phone",
      location: "Location",
    },
    form: {
      fullName: "Full name",
      phone: "Phone",
      email: "Email",
      company: "Company",
      companyHint: "Optional",
      service: "Service",
      budget: "Budget",
      message: "Message",
      selectService: "Select a service",
      selectBudget: "Select a range",
      fullNamePlaceholder: "Jane Doe",
      phonePlaceholder: "+998 (90) 000-00-00",
      emailPlaceholder: "jane@company.com",
      companyPlaceholder: "Company Inc.",
      messagePlaceholder: "Tell us about your project, goals, and timeline…",
      submit: "Send message",
      submitting: "Sending…",
      privacy:
        "We’ll never share your details. By submitting you agree to our privacy policy.",
    },
    serviceOther: "Other / Not sure",
    budgets: [
      "Less than $5,000",
      "$5,000 – $15,000",
      "$15,000 – $50,000",
      "$50,000+",
      "Not sure yet",
    ],
    success: {
      title: "Message sent successfully",
      body: "Thanks for reaching out — we’ll reply within 24 hours.",
    },
    errors: {
      fullNameRequired: "Please enter your full name.",
      fullNameShort: "That name looks too short.",
      phoneRequired: "Please enter your phone number.",
      phoneInvalid: "Please enter a valid phone number.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      serviceRequired: "Please select a service.",
      budgetRequired: "Please select a budget range.",
      messageRequired: "Please tell us about your project.",
      messageShort: "Please add a little more detail (at least 10 characters).",
    },
  },

  footer: {
    ready: "Ready to start your project?",
    getQuote: "Get a free quote →",
    description: "AsosSoft is a premium software studio building high-performance digital products for businesses.",
    quickLinks: "Quick Links",
    servicesTitle: "Services",
    servicesLinks: [
      "Website Development",
      "Mobile Apps",
      "AI Solutions",
      "CRM Development",
      "Cloud Deployment",
      "UI/UX Design",
    ],
    getInTouch: "Get in touch",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms",
    backToTop: "Back to top",
  },

  metadata: {
    title: "AsosSoft — Web Development, Mobile Apps & Telegram Bot Creation",
    description:
      "AsosSoft is a premium software studio offering web development, mobile apps, CRM systems, and Telegram bot creation. High-performance IT solutions for business.",
  },
};
