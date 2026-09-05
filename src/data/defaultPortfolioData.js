const defaultPortfolioData = {
  profile: {
    name: 'Abhay Agnihotri',
    firstName: 'Abhay',
    lastName: 'Agnihotri',
    role: 'Software Developer & ML Engineer',
    tagline: 'I\'m Abhay — a software developer working across AI, machine learning, and full-stack development.',
    heroGreeting: 'Hey, My name\'s Abhay Agnihotri!',
    heroQuote: '“I don\'t want to simply follow the path that already exists. I want to keep learning, keep building, and leave something behind.”',
    homeBio: [
      'I\'m a developer who enjoys turning ideas into thoughtful, useful digital experiences.',
      'I\'m curious by nature, always learning something new and looking for better ways to build.',
      'For me, every project is another chance to grow.'
    ],
    midQuote: '“Dreams are not what you see in your sleep, dreams are things which do not let you sleep.”',
    aboutHero: 'I\'m driven by curiosity, shaped by what I build, and always looking for what\'s next.',
    aboutCuriosity: 'I believe curiosity is the beginning of every great thing. So I keep learning, experimenting, and turning ideas into reality.',
    aboutStory: [
      'I\'m Abhay Agnihotri, a developer who enjoys turning ideas into useful digital experiences. My journey started with curiosity about technology, which quickly grew into a genuine passion for building things.',
      'Along the way, I\'ve learned that engineering is about more than writing code—it\'s about understanding problems, experimenting, and finding better solutions.',
      'Today, I\'m focused on building meaningful AI and web applications, constantly exploring new technologies, and solving real-world challenges.',
      'I\'m still learning, still creating, and always excited for what comes next. That\'s the best part.'
    ],
    email: 'abhayagnihotri976@gmail.com',
    location: 'Lucknow, India',
    availability: 'Currently available for new work',
    brandDesc: 'Transforming complex data into intelligent products, predictive models, and seamless user experiences.',
    prefooterTitle: 'Let\'s slice through your next challenge together.',
    prefooterSub: 'Have an exciting project, problem to solve, or just want to say hi? Let\'s talk.',
    copyright: '© 2026 · Abhay Agnihotri · All Rights Reserved',
    statsNote: 'Open for freelance projects and full-time opportunities.',
    profileImageFront: '/profile/front.png',
    profileImageBack: '/profile/back.png'
  },
  stats: [
    { value: '4+', label: 'Projects shipped' },
    { value: '0-1 yrs', label: 'Experience' },
    { value: '2', label: 'Languages' },
    { value: '2023', label: 'Started building' }
  ],
  projects: [
    {
      id: 'linklytics',
      title: 'Linklytics — URL Shortener & Analytics',
      img: '/projects/linklytics/cover.png',
      link: '/projects/linklytics',
      date: 'May 2025',
      liveLink: 'https://url-shortner-frontend-abhay.netlify.app/',
      company: 'Full Stack Personal Project',
      primary: '#2D2D2D',
      accentColor: '#f0f4f1',
      secondary: '#F2EEE7',
      fillColor: '#F2F3F4',
      menuColor: '#c8b273',
      menuFontColor: '#f0f4f1',
      images: [
        { src: '/projects/linklytics/1.png', tag: 'big', isRight: false },
        { src: '/projects/linklytics/2.png', tag: 'small', isRight: false },
        { src: '/projects/linklytics/3.png', tag: 'small', isRight: true },
        { src: '/projects/linklytics/4.png', tag: 'big', isRight: false }
      ],
      desc: [
        'Linklytics is a high-performance URL shortening and management platform designed to deliver instant link redirection and detailed real-time click tracking.',
        'Architected a full-stack system powered by a Spring Boot REST API with Spring Security and JWT authentication, backed by PostgreSQL on Neon DB. The frontend is built using React, Vite, Tailwind CSS, and Chart.js for data visualization.',
        'Engineered core features including sub-second redirect handling, secure multi-tenant user dashboards, one-click clipboard copying, and analytics metrics for total clicks and link performance.'
      ]
    },
    {
      id: 'resumind',
      title: 'Resumind — AI ATS Resume Analyzer',
      img: '/projects/resumind/cover.png',
      link: '/projects/resumind',
      date: 'March 2025',
      liveLink: 'https://ai-resume-analyzer-main.vercel.app/',
      company: 'Full Stack AI based Personal Project',
      primary: '#263745',
      accentColor: '#f0f4f1',
      secondary: '#F3F5F7',
      fillColor: '#E0DFFC',
      menuColor: '#5C58EB',
      menuFontColor: '#f0f4f1',
      images: [
        { src: '/projects/resumind/1.png', tag: 'big', isRight: false },
        { src: '/projects/resumind/2.png', tag: 'small', isRight: false },
        { src: '/projects/resumind/3.png', tag: 'small', isRight: true },
        { src: '/projects/resumind/4.png', tag: 'big', isRight: false }
      ],
      desc: [
        'Job seekers frequently struggle with automated Applicant Tracking Systems (ATS) filtering out qualified resumes due to formatting inconsistencies, tone, and keyword mismatches.',
        'Developed an AI-driven resume optimization platform using React 19, TypeScript, React Router 7, and TailwindCSS 4, powered by Claude 3.7 Sonnet and Puter.js for cloud authentication and storage.',
        'Engineered client-side PDF parsing and rendering with PDF.js, dynamic score gauges for ATS compatibility, job-specific keyword matching, and version-tracking dashboards for iterative resume refinement.'
      ]
    },
    {
      id: 'election-analysis-2024',
      title: '2024 Indian Election Analysis Dashboard',
      img: '/projects/election-analysis-2024/cover.png',
      link: '/projects/election-analysis-2024',
      date: 'May 2025',
      liveLink:
        'https://app.powerbi.com/view?r=eyJrIjoiZWY1ZWQwYmEtY2UxMi00OWUxLTlhOGEtMWExMWI3Y2ZhZDQ2IiwidCI6ImIyZTljYjQyLTUxMTktNDUxYi05NzI5LWYyNGE1NzEzNjk3MyJ9',
      company: 'Data Analytics & BI Project',
      primary: '#1f3a34',
      accentColor: '#f0f4f1',
      secondary: '#F4F7F5',
      fillColor: '#e1f2ea',
      menuColor: '#2f8a6a',
      menuFontColor: '#f0f4f1',
      images: [
        { src: '/projects/election-analysis-2024/1.png', tag: 'big', isRight: false },
        { src: '/projects/election-analysis-2024/2.png', tag: 'small', isRight: false },
        { src: '/projects/election-analysis-2024/3.png', tag: 'small', isRight: true },
        { src: '/projects/election-analysis-2024/4.png', tag: 'big', isRight: false },
        { src: '/projects/election-analysis-2024/5.png', tag: 'medium', isRight: false },
        { src: '/projects/election-analysis-2024/6.png', tag: 'medium', isRight: false }
      ],
      desc: [
        'The 2024 Indian General Elections generated massive, multidimensional datasets across 543 constituencies, making it challenging to extract clear patterns on voter turnout, regional dominance, and swing trends.',
        'Designed and built an end-to-end interactive Business Intelligence report in Microsoft Power BI, engineering relational data models and custom DAX measures to calculate vote shares, victory margins, and demographic KPIs.',
        'Delivered nationwide party comparisons, state-level and constituency drill-downs, geospatial heatmaps, gender-based candidate performance metrics, and historical trend comparisons.'
      ]
    },
    {
      id: 'movie-recommender',
      title: 'CineMatch — ML Movie Recommender System',
      img: '/projects/movie-recommender/cover.png',
      link: '/projects/movie-recommender',
      date: 'July 2025',
      liveLink: 'https://movie-recommendor-system-abhay.streamlit.app/',
      company: 'Machine Learning Personal Project',
      primary: '#1f3a34',
      accentColor: '#f0f4f1',
      secondary: '#F4F7F5',
      fillColor: '#e1f2ea',
      menuColor: '#2f8a6a',
      menuFontColor: '#f0f4f1',
      images: [
        { src: '/projects/movie-recommender/1.png', tag: 'big', isRight: false },
        { src: '/projects/movie-recommender/2.png', tag: 'small', isRight: false },
        { src: '/projects/movie-recommender/3.png', tag: 'small', isRight: true }
      ],
      desc: [
        'With thousands of titles on streaming platforms, users face choice fatigue finding movies that align with their specific taste in genres, cast, and storyline.',
        'Engineered a content-based recommendation engine in Python using Scikit-Learn, Pandas, and NumPy. Vectorized movie metadata (genres, cast, keywords, crew) via TF-IDF and computed high-dimensional Cosine Similarity matrices.',
        'Integrated The Movie Database (TMDB) API to fetch dynamic high-resolution movie posters and metadata, deploying an interactive web application on Streamlit with cached vector computation for real-time recommendations.'
      ]
    }
  ],
  experience: [
    {
      company: 'Edunet Foundation & Shell India',
      image: '/roles/1.png',
      imageBlur: '/roles/role-1-blur.webp',
      role: 'Machine Learning Project Intern',
      period: 'Jul 2025 – Aug 2025',
      location: 'Remote',
      desc: 'Engineered an end-to-end PyTorch (ResNet-50) image classifier achieving 92.5% accuracy across 30+ tree species and deployed an interactive Streamlit analytics dashboard.'
    }
  ],
  credentials: {
    education: [
      {
        school: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow, Uttar Pradesh',
        award: 'B.Tech in CSE (AI & ML)',
        period: 'Aug 2022 – May 2026'
      },
      {
        school: 'Nirmala Convent Inter College',
        award: 'Intermediate',
        period: 'May 2021 – Jul 2022'
      },
      {
        school: 'Nirmala Convent Inter College',
        award: 'Matriculation',
        period: 'May 2019 – Jul 2020'
      }
    ],
    skills: [
      'Python',
      'Java',
      'TypeScript',
      'JavaScript',
      'SQL',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'React',
      'Spring Boot',
      'RESTful APIs',
      'Tailwind CSS',
      'JWT & Security',
      'Power BI & DAX',
      'Data Analysis & Modeling',
      'Pandas & NumPy',
      'Streamlit',
      'PostgreSQL (Supabase / Neon)',
      'MySQL',
      'Git & GitHub',
      'Docker',
      'Postman'
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Hindi', level: 'Fluent' }
    ]
  },
  services: [
    {
      smallTitle: 'Data',
      bigTitle: 'Data & AI',
      desc: [
        'I turn raw data into meaningful insights by exploring patterns, relationships, and trends hidden within it, asking the questions that matter.'
      ],
      options: [
        { title: 'Exploratory Analysis', desc: 'Finding patterns, trends, and anomalies within data' },
        { title: 'Data Cleaning', desc: 'Transforming messy data into something reliable and useful' },
        { title: 'Statistical Analysis', desc: 'Using statistics to understand what the data is telling us' },
        { title: 'Feature Engineering', desc: 'Creating meaningful features that help reveal better patterns' },
        { title: 'Python & SQL', desc: 'Working with data through practical analytical tools' }
      ]
    },
    {
      smallTitle: 'Model',
      bigTitle: 'Machine Learning',
      desc: [
        'I explore how machine learning can turn data into predictions and intelligent solutions, from building models to understanding how they actually perform.'
      ],
      options: [
        { title: 'Predictive Modeling', desc: 'Using historical data to make meaningful predictions' },
        { title: 'Machine Learning', desc: 'Building and evaluating models for real-world problems' },
        { title: 'Model Evaluation', desc: 'Understanding whether a model actually works' },
        { title: 'Deep Learning', desc: 'Exploring neural networks and complex data problems' }
      ]
    },
    {
      smallTitle: 'Explain',
      bigTitle: 'Data Storytelling',
      desc: [
        'Good analysis is only valuable when people can understand it. I focus on turning complex findings into clear stories that make data easier to explore and act upon.'
      ],
      options: [
        { title: 'Data Visualization', desc: 'Making patterns and insights easier to see' },
        { title: 'Dashboards', desc: 'Creating interactive views of important information' },
        { title: 'Data Storytelling', desc: 'Turning analytical findings into a clear narrative' },
        { title: 'Communication', desc: 'Explaining technical results in a simple way' }
      ]
    }
  ],
  process: [
    {
      smallTitle: 'Process',
      bigTitle: 'How I Work',
      desc: [
        'A structured, transparent engineering process from concept to scalable deployment.'
      ],
      options: [
        { title: 'Discovery & Requirement Analysis', desc: 'Deep dive into objectives, constraints, and data availability' },
        { title: 'Architecture & Modeling', desc: 'Designing robust data pipelines, model pipelines, and system architecture' },
        { title: 'Iterative Development', desc: 'Rapid sprints with functional prototypes and transparent check-ins' },
        { title: 'Validation & Benchmarking', desc: 'Rigorous testing, validation metrics, and performance tuning' },
        { title: 'Deployment & Monitoring', desc: 'Production release with logging, analytics, and clear documentation' }
      ]
    },
    {
      smallTitle: 'Values',
      bigTitle: 'What I Value',
      desc: [
        'Core principles and working standards that guide every line of code I write.'
      ],
      options: [
        { title: 'Curiosity-Driven Rigor', desc: 'Relentlessly exploring the best solution, not just the fastest one' },
        { title: 'Clean Architecture', desc: 'Writing maintainable, readable, and self-documenting code' },
        { title: 'User-Centric Design', desc: 'Technology must serve human needs with clarity and delight' },
        { title: 'Continuous Evolution', desc: 'Always learning emerging techniques across AI and modern engineering' }
      ]
    }
  ],
  socialLinks: [
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abhay-agnihotri-221352247/',
      icon: 'linkedin'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/Abhay-Agnihotri01',
      icon: 'github'
    },
    {
      title: 'X',
      href: 'https://x.com/AbhayAgnih47174',
      icon: 'x'
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/agnihotriabhaydotcom/',
      icon: 'instagram'
    }
  ]
};

export default defaultPortfolioData;
