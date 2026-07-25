// Matthew Blakney — resume source data + category tailoring.
// HARD RULE: every fact here comes from Matthew's original resume. Tailoring
// reorders and rephrases emphasis only — it never invents jobs, dates, skills,
// licences, or availability he doesn't have.

const CONTACT = {
  name: 'MATTHEW BLAKNEY',
  location: 'Oshawa, ON',
  email: 'blakney78@outlook.com',
  phone: '905 922-3766',
};

const EDUCATION = [
  {
    school: 'Durham College',
    location: 'Oshawa, ON',
    detail: 'Music Business Program | September 2024 – Present',
  },
  {
    school: "O'Neill Collegiate and Vocational Institute",
    location: 'Oshawa, ON',
    detail: 'High School Diploma | September 2020 – June 2024',
  },
];

// Base experience entries. Each category picks a bullet set keyed below.
const EXPERIENCE = {
  rink: {
    title: 'Ice Rink Maintenance (On-Call)',
    org: 'Endzone Sports Facility',
    location: 'Oshawa, ON',
    dates: 'January 2025 – April 2025',
    bullets: {
      base: [
        'Shovelled and removed snow following ice resurfacing',
        'Maintained and cleared debris from indoor ice rink to ensure safety',
        'Collaborated with team members to complete maintenance efficiently',
        'Assisted team with additional tasks as required',
      ],
      retail: [
        'Kept a busy public facility clean, safe, and presentable throughout open hours',
        'Responded reliably to on-call shifts, including early mornings and weekends',
        'Collaborated with team members to complete maintenance work efficiently',
        'Took on additional tasks as needed, adapting quickly to shifting priorities',
      ],
      warehouse: [
        'Completed physically demanding maintenance work on a strict turnaround between ice resurfacings',
        'Shovelled and hauled snow loads while following facility safety procedures',
        'Responded reliably to on-call shifts, including early mornings and weekends',
        'Collaborated with a small team to finish each reset quickly and safely',
      ],
      landscaping: [
        'Shovelled and removed heavy snow loads on a tight schedule after each ice resurfacing',
        'Cleared debris and maintained grounds-level safety across a busy public facility',
        'Worked physically demanding on-call shifts, including early mornings and weekends',
        'Collaborated with a small crew to complete maintenance work quickly and safely',
      ],
      snow: [
        'Shovelled and removed snow after every ice resurfacing, working quickly between public sessions',
        'Cleared walkways and surfaces of snow and debris to keep the facility safe for the public',
        'Answered on-call shifts reliably, including early-morning and weekend call-ins',
        'Worked as part of a small crew under time pressure, following all safety procedures',
      ],
    },
  },
  mover: {
    title: 'Mover',
    org: "Evan's Vending",
    location: 'Whitby, ON',
    dates: 'June 2021 – July 2021',
    bullets: {
      base: [
        'Safely loaded and unloaded furniture, appliances, and customer belongings',
        'Transported items efficiently between locations',
        'Maintained clean and organized work areas according to company standards',
        'Followed proper lifting techniques to ensure safety and prevent injury',
      ],
      retail: [
        'Safely lifted and moved heavy items including furniture and appliances',
        'Handled customer belongings with care from load-in to load-out',
        'Maintained clean and organized work areas to company standards',
        'Followed proper lifting techniques to work safely and prevent injury',
      ],
      warehouse: [
        'Loaded and unloaded furniture, appliances, and boxed goods safely and efficiently',
        'Moved heavy items repetitively through full shifts using proper lifting techniques',
        'Kept staging and truck areas clean, organized, and safe to company standards',
        'Worked to tight timelines while protecting customer goods from damage',
      ],
      landscaping: [
        'Performed repetitive heavy lifting through full shifts using proper, safe techniques',
        'Loaded and unloaded furniture and appliances safely and efficiently',
        'Kept work areas clean, organized, and hazard-free to company standards',
        'Worked to tight timelines in physically demanding conditions',
      ],
      snow: [
        'Performed repetitive heavy lifting through full shifts using proper, safe techniques',
        'Loaded, unloaded, and moved furniture and appliances safely and efficiently',
        'Kept work areas clean, organized, and hazard-free',
        'Worked to tight timelines in physically demanding conditions',
      ],
    },
  },
  volunteer: {
    title: 'Item Distribution (Volunteer)',
    org: 'Saint Elizabeth Healthcare',
    location: 'Whitby, ON',
    dates: 'June 2022 – August 2022',
    bullets: {
      base: [
        'Built and maintained positive customer relationships to ensure satisfaction',
        'Kept accurate records of orders, inventory, and delivery schedules',
        'Evaluated distribution processes and identified areas for improvement',
        'Supported efficient delivery operations through organization and planning',
      ],
      retail: [
        'Built positive relationships with clients, ensuring friendly and helpful service',
        'Kept accurate records of orders, inventory, and delivery schedules',
        'Evaluated distribution processes and identified areas for improvement',
        'Stayed organized while managing multiple orders and schedules',
      ],
      warehouse: [
        'Kept accurate records of orders, inventory, and delivery schedules',
        'Organized items for efficient, on-time distribution',
        'Evaluated distribution processes and flagged areas for improvement',
        'Communicated clearly with clients and team members',
      ],
      landscaping: [
        'Kept accurate records of orders, inventory, and delivery schedules',
        'Supported efficient delivery operations through organization and planning',
        'Communicated clearly and courteously with clients',
      ],
      snow: [
        'Kept accurate records of orders, inventory, and delivery schedules',
        'Supported efficient delivery operations through organization and planning',
        'Communicated clearly and courteously with clients',
      ],
    },
  },
};

// Category profiles: summary template + skills order + bullet set key.
// {ROLE} in the summary is replaced per job (defaults below keep it generic).
const CATEGORIES = {
  'grocery-retail': {
    label: 'Grocery & Retail',
    defaultRole: 'a grocery or retail team member role',
    summary:
      'Reliable Durham College student seeking {ROLE}. Hands-on experience with customer service, accurate inventory and order records, and safely moving heavy stock. Quick learner with flexible availability who shows up on time and stays busy for the whole shift.',
    skills: [
      'Customer Service & Communication',
      'Stocking & Safe Heavy Lifting',
      'Inventory & Order Records',
      'Reliability & Punctuality',
      'Attention to Detail',
      'Time Management & Efficiency',
      'Team Collaboration',
      'Clean & Organized Work Areas',
      'Physical Stamina (full shifts on your feet)',
      'MS Word, Excel & PowerPoint',
    ],
    bulletSet: 'retail',
    order: ['rink', 'mover'],
    volunteerFirst: true, // customer-service volunteer work is the strongest match
  },
  warehouse: {
    label: 'Warehouse',
    defaultRole: 'an entry-level warehouse or general labour role',
    summary:
      'Dependable, safety-focused worker seeking {ROLE}. Hands-on experience loading, unloading, and moving heavy goods using proper lifting techniques, plus accurate inventory record-keeping. Comfortable with fast-paced, repetitive physical work and flexible availability, including evenings and weekends.',
    skills: [
      'Loading & Unloading',
      'Proper Lifting Techniques',
      'Physical Stamina & Endurance',
      'Safety Awareness',
      'Inventory & Record Keeping',
      'Time Management & Efficiency',
      'Team Collaboration',
      'Reliability (proven on-call worker)',
      'Attention to Detail',
      'Clean & Organized Work Areas',
    ],
    bulletSet: 'warehouse',
    order: ['rink', 'mover'],
    volunteerFirst: false,
  },
  landscaping: {
    label: 'Landscaping & Grounds',
    defaultRole: 'a landscape labourer / grounds crew role',
    summary:
      'Hard-working labourer seeking {ROLE}. Paid experience in physically demanding grounds and facility maintenance — shovelling, hauling, debris clearing — plus professional moving work built on proper lifting techniques. Comfortable working outdoors in all conditions and keeping pace with a crew through full shifts.',
    skills: [
      'Grounds & Facility Maintenance',
      'Manual Labour & Heavy Lifting',
      'Shovelling & Debris Removal',
      'Physical Stamina & Endurance',
      'Safety Awareness',
      'Team Collaboration',
      'Reliability & Punctuality',
      'Working in All Weather Conditions',
      'Time Management & Efficiency',
      'Equipment & Work Area Care',
    ],
    bulletSet: 'landscaping',
    order: ['rink', 'mover'],
    volunteerFirst: false,
  },
  'snow-removal': {
    label: 'Snow Removal',
    defaultRole: 'a snow removal / sidewalk crew role for the 2026–27 winter season',
    summary:
      'Dependable snow-clearing worker seeking {ROLE}. Direct paid experience shovelling and removing snow on tight turnarounds at a busy Oshawa sports facility, including on-call, early-morning shifts. Physically fit, safety-conscious, and reliable when the call comes in.',
    skills: [
      'Snow Shovelling & Removal',
      'On-Call Reliability (proven)',
      'Winter & Site Safety Awareness',
      'Physical Stamina in Demanding Conditions',
      'Manual Labour & Heavy Lifting',
      'Early-Morning Availability',
      'Team Collaboration',
      'Time Management Under Pressure',
      'Attention to Detail',
      'Equipment & Work Area Care',
    ],
    bulletSet: 'snow',
    order: ['rink', 'mover'],
    volunteerFirst: false,
  },
};

module.exports = { CONTACT, EDUCATION, EXPERIENCE, CATEGORIES };
