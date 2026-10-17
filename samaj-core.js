/* Patidar Samaj preview core — shared by all design previews.
   Data, demo auth, roles/permissions, hash router and a localStorage mock service.
   FRONTEND DEMO ONLY: credentials live in the browser and guards can be bypassed. */
(function () {
  const IMG = 'samaj-preview-platform/public/images/';
  const img = (n) => IMG + n + '.jpg';

  const ORG = {
    name: 'Uttar Gujarat Kadva Patidar Samaj', short: 'Kadva Patidar Samaj', invocation: 'Jay Umiya Maa',
    tagline: 'One family of Maa Umiya, wherever we live',
    registration: 'Internal community portal · for members of the Patidar Samaj',
    address: 'Patidar Samaj office, Unjha, Mehsana district, North Gujarat',
    phone: '+91 00000 00000', email: 'office@kadvapatidarsamaj.example',
    hours: 'Office open Mon–Sat, 10:00 – 18:00',
  };
  const STATS = [
    { value: '1,146', label: 'Families' }, { value: '2,657', label: 'Members' },
    { value: '10', label: 'Villages in the directory' }, { value: '52', label: 'Kul in the origin legend' },
  ];
  // Sourced history. Only dates recorded in community / temple sources are shown; other entries use era labels.
  const MILESTONES = [
    { year: 'Legend', title: 'Born of Maa Uma’s clay', text: 'Community tradition holds that Goddess Uma shaped 52 figures from clay on the banks of the Saraswati and Lord Shiva gave them life — the founders of the 52 kul of the Kadva Patidars.', img: img('umiya-mataji-darshan'), ref: 'PS-ARC-0001' },
    { year: 'Roots', title: 'Farmers of the north', text: 'Community histories trace the Kadva Patidars to Kurmi cultivators. “Karad Kurmi” softened over time into “Kadva Kanbi”, and the families settled in North Gujarat around Unjha and Kadi.', img: img('community-field'), ref: 'PS-ARC-0014' },
    { year: 'Samvat 212', title: 'Maa Umiya at Unjha', text: 'By temple tradition, Maa Umiya was installed at Umapur — today’s Unjha — in Vikram Samvat 212, and Unjha became the spiritual heart of the community.', img: img('umiya-shikhar'), ref: 'PS-ARC-0102' },
    { year: '17th century', title: 'From Kanbi to Patidar', text: 'The Kanbi cultivators of the region began calling themselves Patidar — holders of land — and took the surname Patel.', img: img('festival-stalls'), ref: 'PS-ARC-0188' },
    { year: '1943', title: 'Today’s temple at Unjha', text: 'According to the Umiya Mataji Sansthan, a full renovation completed in 1943 gave the Unjha temple the form devotees visit today.', img: img('umiya-temple-unjha'), ref: 'PS-ARC-0251' },
    { year: 'Today', title: 'One community, many places', text: 'Kadva Patidar families live across North Gujarat, Ahmedabad and abroad, and Umiya Mataji temples now stand far beyond Gujarat — still bound to Maa Umiya at Unjha.', img: img('diyas-tray'), ref: 'PS-ARC-0307' },
  ];
  const ABOUT = {
    intro: 'The Uttar Gujarat Kadva Patidar Samaj brings together Kadva Patidar families whose roots lie in the villages of North Gujarat. We are devotees of Maa Umiya, our kuldevi at Unjha, and this portal is where our families find each other, follow Patidar Samaj events and receive notices from the committee.',
    volunteers: 'The Patidar Samaj is run by volunteers — an elected karobari committee and many members who give their time to organise festivals, keep the directory current and look after elders and students. This portal is for internal use by Patidar Samaj members only.',
    mission: 'To keep Kadva Patidar families of North Gujarat connected — in faith to Maa Umiya, in service to each other, and in passing our traditions to the next generation.',
    vision: 'A Patidar Samaj where every family, in the village or far from it, can find its people, ask for help and celebrate together.',
  };
  const HISTORY = {
    intro: 'Kadva Patidars trace their story to the clay figures of Maa Uma’s legend and to generations of farmers who settled the land of North Gujarat. Unjha, home of Umiya Mataji, has always been the centre of that story.',
    growth: 'Over the centuries Kadva Kanbi families became Patidars — landholders — and spread from the Mehsana–Kadi region across Gujarat and beyond. Wherever families moved, devotion to Maa Umiya and the ties of the Patidar Samaj travelled with them.',
    roots: 'Most Kadva Patidar families trace their roots to villages of North Gujarat around Unjha, Visnagar and Kadi. The village — the gam — is still how many of us introduce ourselves, and it remains the first column in our directory.',
    sources: 'Sources: Shree Umiya Mataji Sansthan, Unjha; Wikipedia (Kadava Patidar; Umiya Mata Temple); community histories published by Kadva Patidar samaj organisations. Legends are presented as community tradition. Temple photographs: Wikimedia Commons — I. L. Patel (CC BY-SA 3.0), Emmanuel Dyan (CC BY 2.0), Nikunj12387 (CC BY-SA 4.0).',
  };
  const VALUES = [
    { n: '01', title: 'Seva', text: 'Service without expectation — from blood-donation camps to helping a new family settle in.' },
    { n: '02', title: 'Sanskar', text: 'Passing on language, festivals and values to children growing up far from the villages.' },
    { n: '03', title: 'Sangathan', text: 'Unity across villages, generations and continents — one directory, one Patidar Samaj.' },
  ];
  const ACHIEVEMENTS = [
    { value: '₹1.2 Cr', label: 'Scholarships awarded to students' },
    { value: '312', label: 'Students supported through college' },
    { value: '4,800+', label: 'Units of blood donated at Patidar Samaj camps' },
    { value: '18', label: 'Mass weddings organized for families in need' },
  ];
  const ACTIVITIES = [
    { id: 'youth', title: 'Yuva Mandal', text: 'The youth wing runs the talent showcase, cricket league and mentoring circles for students.', img: img('festival-crowd') },
    { id: 'mahila', title: 'Mahila Mandal', text: 'Monthly meet-ups, the Navratri food stalls and our much-loved recipe booklet.', img: img('festive-food') },
    { id: 'education', title: 'Education Fund', text: 'Scholarships and interest-free loans for students from member families.', img: img('festival-stalls') },
    { id: 'seva', title: 'Seva Camps', text: 'Blood donation, health check-ups and winter blanket drives, three times a year.', img: img('colour-hands') },
    { id: 'culture', title: 'Festivals', text: 'Navratri garba, Diwali dinner, Sharad Purnima raas and the New Year picnic.', img: img('holi-street') },
  ];
  const COMMITTEE = [['m7', 'President'], ['m2', 'Vice President'], ['m3', 'Treasurer'], ['m11', 'Secretary'], ['m8', 'Cultural Coordinator'], ['m1', 'Youth Coordinator']];
  const LINKS = [
    { label: 'Membership application form', meta: 'PDF · 128 KB' },
    { label: 'Scholarship application 2026', meta: 'PDF · 210 KB' },
    { label: 'Patidar Samaj Bhavan booking request', meta: 'PDF · 96 KB' },
    { label: 'AGM 2025 minutes', meta: 'PDF · 340 KB' },
  ];
  const FAQ = [
    { q: 'Who can become a member?', a: 'Any Kadva Patidar family with roots in North Gujarat can apply. An admin reviews every application, usually within a few days.' },
    { q: 'Who can see my phone number and email?', a: 'Nobody, by default. Your contact details are private and are visible only to the Super Admin of the portal. Other members see your name, village and city.' },
    { q: 'How do I RSVP to an event?', a: 'Log in, open the event and select RSVP. Your confirmed events appear on your dashboard.' },
    { q: 'How long does approval take?', a: 'Most applications are reviewed within 3–5 days. You’ll get an email as soon as a decision is made.' },
  ];
  const ACTIVITY = [
    { who: 'Ashokbhai Patel', what: 'approved a new member application', when: '2 hours ago' },
    { who: 'Deepa Patel', what: 'published the Diwali Dinner event', when: '5 hours ago' },
    { who: 'Nileshbhai Patel', what: 'updated the scholarship fund report', when: 'Yesterday' },
    { who: 'System', what: 'sent 214 renewal reminder emails', when: '2 days ago' },
    { who: 'Ashokbhai Patel', what: 'merged a duplicate member record', when: '3 days ago' },
  ];
  const GALLERY = ['holi-sky', 'diya-circle', 'canopy-crowd', 'sparklers', 'rangoli', 'holi-portrait', 'city-lights', 'holi-red'].map((n) => ({ src: img(n), alt: n.replace('-', ' ') }));
  const IMAGES = {
    hero: img('diyas-tray'), heroAlt: img('holi-sky'), night: img('diya-night'), circle: img('diya-circle'), hand: img('candle-hand'),
    sparklers: img('sparklers'), city: img('city-lights'), holi: img('holi-street'), holiRed: img('holi-red'), portrait: img('holi-portrait'),
    crowd: img('holi-crowd'), colour: img('colour-hands'), canopy: img('canopy-crowd'), stalls: img('festival-stalls'), stage: img('festival-crowd'),
    field: img('community-field'), umiya: img('umiya-mataji-darshan'), temple: img('umiya-temple-unjha'), shikhar: img('umiya-shikhar'), rangoli: img('rangoli'), rangoliFloor: img('rangoli-floor'), food: img('festive-food'),
  };
  const CAT_IMG = { Festival: img('diyas-tray'), Meeting: img('canopy-crowd'), Youth: img('festival-crowd'), Seniors: img('candle-hand'), Seva: img('colour-hands'), Education: img('festival-stalls'), Sports: img('community-field'), Family: img('community-field') };

  const VILLAGES = ['Unjha', 'Visnagar', 'Kadi', 'Kalol', 'Sidhpur', 'Vadnagar', 'Kansa', 'Gozaria', 'Ladol', 'Mehsana'];
  const SEED_MEMBERS = [
    ['m1', 'Rohan Patel', 'Unjha', 'Mehsana', 'India', 'Software engineer', '+91 98250 11201', 'rohan.patel@example.com', 2014, 4, 'Leads the Yuva Mandal cricket league and the student mentoring circle.'],
    ['m2', 'Hemaben Patel', 'Visnagar', 'Vadodara', 'India', 'School principal', '+91 98250 11202', 'hema.patel@example.com', 1996, 5, 'Has coordinated the Navratri food stalls for twenty years.'],
    ['m3', 'Nileshbhai Patel', 'Kadi', 'Ahmedabad', 'India', 'Chartered accountant', '+91 98250 11203', 'nilesh.patel@example.com', 1999, 4, 'Keeps the accounts of the scholarship fund and the Patidar Samaj Bhavan.'],
    ['m4', 'Priya Patel', 'Kalol', 'Leicester', 'United Kingdom', 'Pharmacist', '+44 7700 900104', 'priya.patel@example.com', 2017, 3, 'Organises the UK chapter’s Diwali dinner.'],
    ['m5', 'Kiranbhai Patel', 'Sidhpur', 'Mehsana', 'India', 'Retired engineer', '+91 98250 11205', 'kiran.patel@example.com', 1986, 6, 'A senior elder who has guided the Patidar Samaj committee for many years.'],
    ['m6', 'Meera Patel', 'Vadnagar', 'Edison, NJ', 'United States', 'Physician', '+1 732 555 0106', 'meera.patel@example.com', 2008, 4, 'Runs the annual health check-up camp with the Seva team.'],
    ['m7', 'Ashokbhai Patel', 'Unjha', 'Mehsana', 'India', 'Textile trader', '+91 98250 11207', 'ashok.patel@example.com', 1988, 5, 'President of the Patidar Samaj committee.'],
    ['m8', 'Deepa Patel', 'Kansa', 'Mumbai', 'India', 'Event designer', '+91 98250 11208', 'deepa.patel@example.com', 2010, 3, 'Designs the stage and décor for every major festival.'],
    ['m9', 'Vikram Patel', 'Gozaria', 'Toronto', 'Canada', 'Civil engineer', '+1 416 555 0109', 'vikram.patel@example.com', 2012, 4, 'Started the Canada family WhatsApp circle.'],
    ['m10', 'Sonal Patel', 'Ladol', 'Nairobi', 'Kenya', 'Architect', '+254 712 000110', 'sonal.patel@example.com', 2005, 5, 'Drew the plans for the Patidar Samaj Bhavan extension.'],
    ['m11', 'Jayeshbhai Patel', 'Mehsana', 'Kalol', 'India', 'Advocate', '+91 98250 11211', 'jayesh.patel@example.com', 1994, 4, 'Secretary; keeps the committee minutes and registers.'],
    ['m12', 'Kavita Patel', 'Kadi', 'Auckland', 'New Zealand', 'Teacher', '+64 21 000 112', 'kavita.patel@example.com', 2016, 3, 'Teaches Gujarati to the weekend children’s class online.'],
    ['m13', 'Harshad Patel', 'Visnagar', 'London', 'United Kingdom', 'Restaurateur', '+44 7700 900113', 'harshad.patel@example.com', 2001, 6, 'Caters the New Year Sneh Milan every year.'],
    ['m14', 'Nisha Patel', 'Unjha', 'Vadodara', 'India', 'Data analyst', '+91 98250 11214', 'nisha.patel@example.com', 2020, 2, 'Helped digitise the old printed Vasti booklet.'],
    ['m15', 'Bharatbhai Patel', 'Vadnagar', 'Mehsana', 'India', 'Farmer', '+91 98250 11215', 'bharat.patel@example.com', 1986, 7, 'Hosts the New Year picnic on his family’s farm.'],
    ['m16', 'Ritu Patel', 'Sidhpur', 'Ahmedabad', 'India', 'Dentist', '+91 98250 11216', 'ritu.patel@example.com', 2019, 3, 'Volunteers at the blood-donation camps.', 'Pending'],
    ['m17', 'Amit Patel', 'Kalol', 'Mumbai', 'India', 'Photographer', '+91 98250 11217', 'amit.patel@example.com', 2022, 2, 'Photographs every Patidar Samaj event for the archive.'],
    ['m18', 'Falguni Patel', 'Kansa', 'Leicester', 'United Kingdom', 'Nurse', '+44 7700 900118', 'falguni.patel@example.com', 2011, 4, 'Leads the garba rehearsals for the UK chapter.', 'Inactive'],
  ].map(([id, name, village, city, country, occupation, phone, email, since, familySize, bio, status]) => ({ id, name, village, city, country, occupation, phone, email, since, familySize, bio, status: status || 'Active' }));

  const SEED_EVENTS = [
    ['e1', 'Sharad Purnima Raas', 'Festival', '2026-10-25', '19:30', 'Patidar Samaj Bhavan lawns, Unjha', 400, 'Raas-garba under the full moon, followed by dudh-pauva for every family.'],
    ['e2', 'Diwali Dinner', 'Festival', '2026-11-08', '19:00', 'Patidar Samaj Bhavan main hall', 600, 'Families of the Patidar Samaj gather for dinner, Umiya Mataji aarti and a children’s rangoli contest.'],
    ['e3', 'New Year Sneh Milan', 'Family', '2026-11-10', '10:00', 'Patidar Samaj Bhavan main hall', 800, 'Bestu varas greetings, blessings from elders and a community lunch.'],
    ['e4', 'Blood Donation Camp', 'Seva', '2026-11-22', '09:00', 'Patidar Samaj Bhavan, ground floor', 150, 'With the district blood bank. Donors receive a health check and certificate.'],
    ['e5', 'Scholarship Ceremony', 'Education', '2026-12-06', '11:00', 'Town Hall, Mehsana', 300, 'Awarding the 2026 scholarships to 38 students from member families.'],
    ['e6', 'Yuva Cricket League Final', 'Sports', '2026-12-20', '08:30', 'Sports ground, Mehsana', 250, 'The final of the twelve-team youth league, with a family picnic on the boundary.'],
    ['e7', 'Darshan Yatra to Umiya Mataji, Unjha', 'Seniors', '2027-01-10', '07:00', 'Departs Patidar Samaj Bhavan · Umiya Mataji Temple, Unjha', 120, 'A day of darshan at Maa Umiya’s temple for elders and families, with bhajans on the way and prasad at the temple.'],
    ['e8', 'Annual General Meeting', 'Meeting', '2027-02-14', '10:30', 'Patidar Samaj Bhavan main hall', 500, 'Accounts, committee reports and the vote on the Bhavan extension.'],
    ['e9', 'Navratri Garba Night', 'Festival', '2026-10-11', '20:00', 'Patidar Samaj Bhavan lawns, Unjha', 900, 'Nine nights of garba — this was the seventh night, with live dhol.'],
    ['e10', 'Health Check-up Camp', 'Seva', '2026-08-23', '09:00', 'Patidar Samaj Bhavan, ground floor', 200, 'Free check-ups by member doctors. 214 members screened.'],
    ['e11', 'Youth Career Workshop', 'Youth', '2027-01-24', '14:00', 'Online · Zoom', 200, 'Members working abroad talk about study and careers.', 'Draft'],
  ].map(([id, title, category, date, time, venue, capacity, summary, status]) => ({ id, title, category, date, time, venue, capacity, summary, status: status || 'Published', rsvps: Math.round(capacity * 0.42) }));

  const SEED_NEWS = [
    ['a1', 'Diwali Dinner registrations are open', 'Event', '2026-10-14', true, 'Register every family member attending by 1 November so the kitchen team can plan. Children under five eat free.'],
    ['a2', 'Scholarship results announced', 'Education', '2026-10-09', true, '38 students from member families will receive scholarships this year. Recipients have been informed by email; the ceremony is on 6 December.'],
    ['a3', 'Membership renewals for 2027', 'Notice', '2026-10-02', false, 'Renewals open on 1 November. The fee is unchanged. Renew from your profile or at the Patidar Samaj office.'],
    ['a4', 'Patidar Samaj Bhavan extension — design shared', 'Notice', '2026-09-21', false, 'Sonal Patel’s drawings for the new first-floor hall are on display at the office. Feedback is welcome before the AGM vote.'],
    ['a5', 'Health camp: 214 members screened', 'Seva', '2026-08-28', false, 'Thank you to the eleven member doctors who volunteered. Follow-up appointments have been arranged for 19 members.'],
    ['a6', 'Rohan Patel named state cricket umpire', 'Achievement', '2026-08-12', false, 'Our Yuva Mandal coordinator has been appointed to the state umpires’ panel. Congratulations, Rohan!'],
    ['a7', 'Gujarati weekend class starts a second batch', 'Education', '2026-07-30', false, 'Kavita Patel’s online class adds a Saturday batch for children aged 6–9.'],
    ['a8', 'Draft: winter blanket drive plan', 'Seva', '2026-10-16', false, 'Collection points and dates to be confirmed by the Seva team.', 'Draft'],
  ].map(([id, title, category, date, pinned, body, status]) => ({ id, title, category, date, pinned, body, status: status || 'Published' }));

  const ICONS = {
    home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z', about: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-5M12 8h.01', history: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    members: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    events: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', news: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
    contact: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6', grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    megaphone: 'M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6', shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  };
  /* ---------- roles & permissions (single source of truth) ---------- */
  const ROLES = {
    superadmin: { label: 'Super Admin', desc: 'Full access to every module, user and role overview.' },
    admin: { label: 'Admin', desc: 'Runs the Patidar Samaj portal: members, events, announcements.' },
    editor: { label: 'Editor', desc: 'Creates and edits events and announcements.' },
    member: { label: 'Member', desc: 'Directory, events, RSVPs and own profile.' },
    viewer: { label: 'Viewer', desc: 'Read-only access. No create, edit or delete.' },
  };
  const ROLE_ORDER = ['superadmin', 'admin', 'editor', 'member', 'viewer'];
  const A = ROLE_ORDER, ADM = ['superadmin', 'admin'], CONTENT = ['superadmin', 'admin', 'editor'], ACTIVE = ['superadmin', 'admin', 'editor', 'member'];
  const PERMS = {
    'dashboard.view': [A, 'View dashboard'],
    'members.manage': [ADM, 'Open member management'], 'members.create': [ADM, 'Add members'], 'members.edit': [ADM, 'Edit members'], 'members.delete': [ADM, 'Delete members'],
    'events.manage': [CONTENT, 'Open event management'], 'events.create': [CONTENT, 'Create events'], 'events.edit': [CONTENT, 'Edit events'], 'events.delete': [ADM, 'Delete events'],
    'announcements.manage': [CONTENT, 'Open announcement management'], 'announcements.create': [CONTENT, 'Create announcements'], 'announcements.edit': [CONTENT, 'Edit announcements'], 'announcements.delete': [ADM, 'Delete announcements'],
    'users.view': [ADM, 'View users & roles'], 'roles.matrix': [['superadmin'], 'View permission matrix'],
    'profile.view': [A, 'View own profile'], 'profile.edit': [ACTIVE, 'Edit own profile'],
    'contact.view': [['superadmin'], 'See member phone & email (private)'], 'events.rsvp': [ACTIVE, 'RSVP to events'],
  };
  const can = (user, perm) => !!user && !!PERMS[perm] && PERMS[perm][0].includes(user.role);

  /* ---------- demo accounts (one shared location) ---------- */
  const ACCOUNTS = [
    { email: 'super-admin@yopmail.com', password: 'Ravi@1234', role: 'superadmin', name: 'Kiranbhai Patel', memberId: 'm5' },
    { email: 'admin@yopmail.com', password: 'Ravi@1234', role: 'admin', name: 'Ashokbhai Patel', memberId: 'm7' },
    { email: 'editor@yopmail.com', password: 'Ravi@1234', role: 'editor', name: 'Deepa Patel', memberId: 'm8' },
    { email: 'member@yopmail.com', password: 'Ravi@1234', role: 'member', name: 'Priya Patel', memberId: 'm4' },
    { email: 'viewer@yopmail.com', password: 'Ravi@1234', role: 'viewer', name: 'Anjali Desai', memberId: null },
  ];

  /* ---------- mock data service (localStorage, this browser only) ---------- */
  const DKEY = 'samaj-preview-data-v2', SKEY = 'samaj-preview-session-v1';
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const store = {
    load() {
      try { const d = JSON.parse(localStorage.getItem(DKEY)); if (d && d.members) return d; } catch (e) {}
      return { members: clone(SEED_MEMBERS), events: clone(SEED_EVENTS), announcements: clone(SEED_NEWS), rsvps: { 'member@yopmail.com': ['e2', 'e3'] }, viewer: null };
    },
    save(d) { try { localStorage.setItem(DKEY, JSON.stringify(d)); } catch (e) {} },
    reset() { try { localStorage.removeItem(DKEY); } catch (e) {} },
  };
  const session = {
    get() { try { const s = JSON.parse(localStorage.getItem(SKEY)); return s && ACCOUNTS.find((a) => a.email === s.email) ? s : null; } catch (e) { return null; } },
    set(acc) { try { localStorage.setItem(SKEY, JSON.stringify({ email: acc.email, at: Date.now() })); } catch (e) {} },
    clear() { try { localStorage.removeItem(SKEY); } catch (e) {} },
  };

  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const TODAY = '2026-10-17';
  const pd = (s) => { const [y, m, d] = (s || TODAY).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); };
  const fmtTime = (t) => { if (!t) return ''; const [h, m] = t.split(':').map(Number); return ((h % 12) || 12) + ':' + String(m).padStart(2, '0') + (h < 12 ? ' AM' : ' PM'); };
  const initials = (n) => (n || '?').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s || '');
  const hashCode = (s) => { let h = 0; for (const c of s || '') h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };

  const FORMS = {
    members: {
      singular: 'member', title: 'Members', perm: 'members',
      cols: ['Name', 'Village', 'City', 'Joined', 'Status'],
      fields: [
        { name: 'name', label: 'Full name', required: true }, { name: 'email', label: 'Email', type: 'email', private: true },
        { name: 'phone', label: 'Phone', half: true, private: true }, { name: 'village', label: 'Village (gam)', options: VILLAGES, half: true },
        { name: 'city', label: 'City', required: true, half: true }, { name: 'country', label: 'Country', half: true },
        { name: 'occupation', label: 'Occupation', half: true }, { name: 'familySize', label: 'Family size', type: 'number', half: true },
        { name: 'status', label: 'Status', options: ['Active', 'Pending', 'Inactive'] }, { name: 'bio', label: 'Short bio', textarea: true },
      ],
      blank: () => ({ name: '', email: '', phone: '', village: VILLAGES[0], city: '', country: 'India', occupation: '', familySize: 1, status: 'Pending', bio: '', since: 2026 }),
    },
    events: {
      singular: 'event', title: 'Events', perm: 'events',
      cols: ['Event', 'Category', 'Date', 'RSVPs', 'Status'],
      fields: [
        { name: 'title', label: 'Event title', required: true }, { name: 'category', label: 'Category', options: Object.keys(CAT_IMG), half: true },
        { name: 'status', label: 'Status', options: ['Published', 'Draft'], half: true }, { name: 'date', label: 'Date', type: 'date', required: true, half: true },
        { name: 'time', label: 'Start time', type: 'time', half: true }, { name: 'venue', label: 'Venue', required: true },
        { name: 'capacity', label: 'Capacity', type: 'number', half: true }, { name: 'summary', label: 'Description', textarea: true },
      ],
      blank: () => ({ title: '', category: 'Festival', status: 'Draft', date: '', time: '18:00', venue: 'Patidar Samaj Bhavan main hall', capacity: 200, summary: '', rsvps: 0 }),
    },
    announcements: {
      singular: 'announcement', title: 'Announcements', perm: 'announcements',
      cols: ['Title', 'Category', 'Date', 'Pinned', 'Status'],
      fields: [
        { name: 'title', label: 'Headline', required: true }, { name: 'category', label: 'Category', options: ['Notice', 'Event', 'Education', 'Seva', 'Achievement'], half: true },
        { name: 'status', label: 'Status', options: ['Published', 'Draft'], half: true }, { name: 'date', label: 'Date', type: 'date', required: true, half: true },
        { name: 'pinned', label: 'Pin to top', options: ['No', 'Yes'], half: true }, { name: 'body', label: 'Message', textarea: true, required: true },
      ],
      blank: () => ({ title: '', category: 'Notice', status: 'Draft', date: TODAY, pinned: false, body: '' }),
    },
  };

  const DESIGNS = [
    { n: 1, id: 'design-1', name: 'Heritage & Devotion', file: 'Design 1 - Heritage.dc.html' },
    { n: 2, id: 'design-2', name: 'Modern Platform', file: 'Design 2 - Modern Platform.dc.html' },
    { n: 3, id: 'design-3', name: 'Bold Collective', file: 'Design 3 - Bold Collective.dc.html' },
  ];

  /* ---------- controller: one per mounted design ---------- */
  function controller(comp, theme) {
    theme = theme || {};
    const T = Object.assign({ on: { fg: '#000', bg: 'transparent', bd: '#000' }, off: { fg: '#555', bg: 'transparent', bd: 'transparent' }, avatars: ['#888'], status: {} }, theme);
    let data = store.load();
    const st = {
      route: parseHash(), narrow: window.innerWidth < 880, compact: window.innerWidth < 1100, menu: false,
      mq: '', mv: 'All', ecat: 'All', escope: 'upcoming', eq: '', ncat: 'All', nopen: null,
      login: { email: '', password: '' }, loginErr: '', loginBusy: false, showPw: false, loginTouched: false,
      reg: { name: '', email: '', phone: '', password: '', confirm: '', agree: false }, regErr: {}, regDone: false,
      contact: { name: '', email: '', subject: 'General enquiry', message: '' }, contactErr: {}, contactSent: false,
      mgrQ: '', form: null, confirm: null, toast: null, prof: null, profErr: {}, cmd: false, cmdQ: '', shuffleSeed: 0, from: null,
    };
    const up = () => comp.forceUpdate();
    const set = (p) => { Object.assign(st, p); up(); };
    const persist = () => store.save(data);
    let toastT;
    const toast = (text) => { clearTimeout(toastT); set({ toast: text }); toastT = setTimeout(() => set({ toast: null }), 2600); };

    function parseHash() {
      const h = (location.hash || '#/').replace(/^#/, '');
      const [p] = h.split('?');
      return p.split('/').filter(Boolean);
    }
    const onHash = () => { set({ route: parseHash(), menu: false, form: null, confirm: null, cmd: false, nopen: null }); window.scrollTo(0, 0); };
    const onResize = () => { const n = window.innerWidth < 880, c = window.innerWidth < 1100; if (n !== st.narrow || c !== st.compact) set({ narrow: n, compact: c }); };
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); set({ cmd: !st.cmd, cmdQ: '' }); }
      if (e.key === 'Escape') { if (st.form) set({ form: null }); else if (st.confirm) set({ confirm: null }); else if (st.cmd) set({ cmd: false }); else if (st.menu) set({ menu: false }); }
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    const go = (href) => { if (location.hash === href) onHash(); else location.hash = href; };

    const currentUser = () => { const s = session.get(); if (!s) return null; const a = ACCOUNTS.find((x) => x.email === s.email); return a ? Object.assign({}, a) : null; };
    const avatar = (name) => T.avatars[hashCode(name) % T.avatars.length];
    const memberById = (id) => data.members.find((m) => m.id === id);
    const decoM = (m, user) => m && Object.assign({}, m, {
      href: '#/members/' + m.id, ref: 'PS-FAM-' + m.id.replace(/\D/g, '').padStart(4, '0'), initials: initials(m.name), av: avatar(m.name), first: m.name.split(' ')[0],
      place: m.city + ', ' + m.country, sinceLabel: 'Member since ' + m.since,
      showContact: can(user, 'contact.view'), phoneShown: can(user, 'contact.view') ? m.phone : 'Private', emailShown: can(user, 'contact.view') ? m.email : 'Private',
      sfg: (T.status[m.status] || {}).fg, sbg: (T.status[m.status] || {}).bg,
    });
    const decoE = (e, user) => {
      const d = pd(e.date); const mine = user && (data.rsvps[user.email] || []).includes(e.id);
      return Object.assign({}, e, {
        href: '#/events/' + e.id, img: CAT_IMG[e.category] || IMAGES.hero, day: String(d.getDate()), mon: MON[d.getMonth()], year: String(d.getFullYear()),
        dateLong: DOW[d.getDay()] + ', ' + d.getDate() + ' ' + MONL[d.getMonth()] + ' ' + d.getFullYear(), dateShort: d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(),
        timeLabel: fmtTime(e.time), past: e.date < TODAY, upcoming: e.date >= TODAY, going: !!mine, rsvpTotal: (e.rsvps || 0) + (mine ? 1 : 0),
        spotsLeft: Math.max(0, (e.capacity || 0) - (e.rsvps || 0) - (mine ? 1 : 0)), fill: Math.min(100, Math.round(((e.rsvps || 0) / (e.capacity || 1)) * 100)) + '%',
        sfg: (T.status[e.status] || {}).fg, sbg: (T.status[e.status] || {}).bg, ref: 'EV-' + e.id.replace('e', '').padStart(4, '0'),
      });
    };
    const decoA = (a) => { const d = pd(a.date); return Object.assign({}, a, {
      dateLong: d.getDate() + ' ' + MONL[d.getMonth()] + ' ' + d.getFullYear(), dateShort: d.getDate() + ' ' + MON[d.getMonth()], day: String(d.getDate()), mon: MON[d.getMonth()],
      open: st.nopen === a.id, toggle: () => set({ nopen: st.nopen === a.id ? null : a.id }), excerpt: a.body.length > 110 ? a.body.slice(0, 107) + '…' : a.body,
      pinnedLabel: a.pinned ? 'Yes' : 'No', sfg: (T.status[a.status] || {}).fg, sbg: (T.status[a.status] || {}).bg, ref: 'NB-' + a.id.replace('a', '').padStart(4, '0'),
    }); };
    const chip = (on) => (on ? T.on : T.off);

    /* ---- login ---- */
    const onLogin = (e) => set({ login: Object.assign({}, st.login, { [e.target.name]: e.target.value }), loginErr: '' });
    const submitLogin = (e) => {
      e && e.preventDefault && e.preventDefault();
      const { email, password } = st.login;
      if (!email.trim() || !password) return set({ loginErr: 'Enter your email and password.', loginTouched: true });
      if (!isEmail(email.trim())) return set({ loginErr: 'That doesn’t look like a valid email address.', loginTouched: true });
      set({ loginBusy: true, loginErr: '' });
      setTimeout(() => {
        const acc = ACCOUNTS.find((a) => a.email === email.trim().toLowerCase() && a.password === password);
        if (!acc) return set({ loginBusy: false, loginErr: 'Email or password is incorrect. Use one of the demo accounts below.' });
        session.set(acc);
        const dest = st.from || '#/app';
        set({ loginBusy: false, login: { email: '', password: '' }, from: null });
        toast('Signed in as ' + acc.name + ' · ' + ROLES[acc.role].label);
        go(dest);
      }, 650);
    };
    const logout = () => { const u = currentUser(); session.clear(); set({ prof: null }); toast(u ? 'Signed out. See you soon, ' + u.name.split(' ')[0] + '.' : 'Signed out'); go('#/'); };

    /* ---- register (UI only) ---- */
    const onReg = (e) => { const t = e.target; set({ reg: Object.assign({}, st.reg, { [t.name]: t.type === 'checkbox' ? t.checked : t.value }), regErr: Object.assign({}, st.regErr, { [t.name]: '' }) }); };
    const submitReg = (e) => {
      e && e.preventDefault && e.preventDefault();
      const r = st.reg, err = {};
      if (!r.name.trim()) err.name = 'Enter your full name.';
      if (!r.email.trim()) err.email = 'Enter your email.'; else if (!isEmail(r.email)) err.email = 'Enter a valid email address.';
      if (r.phone && !/^[+\d][\d\s-]{6,}$/.test(r.phone)) err.phone = 'Enter a valid phone number.';
      if (!r.password) err.password = 'Choose a password.'; else if (r.password.length < 8) err.password = 'Use at least 8 characters.';
      if (r.confirm !== r.password || !r.confirm) err.confirm = 'Passwords don’t match.';
      if (!r.agree) err.agree = 'Please confirm your family belongs to the Patidar Samaj.';
      if (Object.keys(err).length) return set({ regErr: err });
      set({ regDone: true });
    };
    const resetReg = () => set({ regDone: false, reg: { name: '', email: '', phone: '', password: '', confirm: '', agree: false }, regErr: {} });

    /* ---- contact ---- */
    const onContact = (e) => set({ contact: Object.assign({}, st.contact, { [e.target.name]: e.target.value }), contactErr: Object.assign({}, st.contactErr, { [e.target.name]: '' }) });
    const submitContact = (e) => {
      e && e.preventDefault && e.preventDefault();
      const c = st.contact, err = {};
      if (!c.name.trim()) err.name = 'Enter your name.';
      if (!isEmail(c.email)) err.email = 'Enter a valid email address.';
      if (c.message.trim().length < 10) err.message = 'Write at least a sentence so we can help.';
      if (Object.keys(err).length) return set({ contactErr: err });
      set({ contactSent: true });
    };
    const resetContact = () => set({ contactSent: false, contact: { name: '', email: '', subject: 'General enquiry', message: '' } });

    /* ---- management ---- */
    const coll = (kind) => data[kind];
    const openForm = (kind, rec) => {
      const F = FORMS[kind]; const values = Object.assign(F.blank(), rec ? clone(rec) : {});
      if (kind === 'announcements') values.pinned = values.pinned ? 'Yes' : 'No';
      set({ form: { kind, id: rec ? rec.id : null, values, errors: {}, saving: false } });
    };
    const saveForm = (e) => {
      e && e.preventDefault && e.preventDefault();
      const f = st.form, F = FORMS[f.kind], err = {};
      F.fields.forEach((fd) => { if (fd.required && !String(f.values[fd.name] ?? '').trim()) err[fd.name] = fd.label + ' is required.'; });
      if (f.kind === 'members' && f.values.email && !isEmail(f.values.email)) err.email = 'Enter a valid email address.';
      if (Object.keys(err).length) return set({ form: Object.assign({}, f, { errors: err }) });
      set({ form: Object.assign({}, f, { saving: true }) });
      setTimeout(() => {
        const v = Object.assign({}, f.values);
        if (f.kind === 'announcements') v.pinned = v.pinned === 'Yes';
        ['capacity', 'familySize'].forEach((k) => { if (k in v) v[k] = Number(v[k]) || 0; });
        const list = coll(f.kind);
        if (f.id) { const i = list.findIndex((x) => x.id === f.id); list[i] = Object.assign({}, list[i], v); }
        else { v.id = f.kind[0] + Date.now().toString(36); list.unshift(v); }
        persist(); set({ form: null }); toast((f.id ? 'Saved changes to ' : 'Created ') + (v.title || v.name));
      }, 450);
    };
    const askDelete = (kind, rec) => set({ confirm: { kind, id: rec.id, text: 'Delete “' + (rec.title || rec.name) + '”? This removes it from this demo for everyone using this browser.' } });
    const doDelete = () => { const c = st.confirm; data[c.kind] = data[c.kind].filter((x) => x.id !== c.id); persist(); set({ confirm: null }); toast('Deleted'); };
    const resetData = () => { store.reset(); data = store.load(); toast('Demo data restored to the original sample'); up(); };

    /* ---- rsvp ---- */
    const toggleRsvp = (id) => {
      const u = currentUser();
      if (!u) { set({ from: '#/events/' + id }); return go('#/login'); }
      if (!can(u, 'events.rsvp')) return toast('Viewers can’t RSVP — this account is read-only.');
      const list = data.rsvps[u.email] || (data.rsvps[u.email] = []);
      const i = list.indexOf(id); if (i >= 0) list.splice(i, 1); else list.push(id);
      persist(); toast(i >= 0 ? 'RSVP cancelled' : 'You’re going! Added to your dashboard'); up();
    };

    /* ---- profile ---- */
    const PROF_FIELDS = [['name', 'Full name', false], ['email', 'Email', false], ['phone', 'Phone', true], ['city', 'City', true], ['country', 'Country', true], ['occupation', 'Occupation', true], ['bio', 'About me', true]];

    function vals() {
      const user = currentUser();
      const r = st.route; const s0 = r[0] || ''; const s1 = r[1] || '';
      let page = s0 || 'home';
      const inApp = s0 === 'app';
      let denied = null, missing = false;
      if (s0 === 'logout') { setTimeout(logout, 0); page = 'home'; }
      if (s0 === 'login' && user) { setTimeout(() => go('#/app'), 0); }
      if (inApp) {
        if (!user) { const want = location.hash; if (!st.from && want && !want.startsWith('#/login')) st.from = want; setTimeout(() => { if (location.hash.startsWith('#/app')) go('#/login'); }, 0); page = 'login'; }
        else {
          const map = { '': ['dashboard', 'dashboard.view'], members: ['manage', 'members.manage'], events: ['manage', 'events.manage'], announcements: ['manage', 'announcements.manage'], users: ['users', 'users.view'], profile: ['profile', 'profile.view'] };
          const m = map[s1];
          if (!m) page = 'notfound'; else if (!can(user, m[1])) { page = 'denied'; denied = PERMS[m[1]][1]; } else page = m[0];
        }
      }
      const known = ['home', 'about', 'history', 'members', 'events', 'news', 'contact', 'login', 'register', 'dashboard', 'manage', 'users', 'profile', 'denied', 'notfound'];
      if (!known.includes(page)) page = 'notfound';
      const memberDetail = s0 === 'members' && s1; const eventDetail = s0 === 'events' && s1;
      if (memberDetail) page = 'member'; if (eventDetail) page = 'event';
      const is = {}; ['home', 'about', 'history', 'members', 'member', 'events', 'event', 'news', 'contact', 'login', 'register', 'dashboard', 'manage', 'users', 'profile', 'denied', 'notfound'].forEach((k) => (is[k] = page === k));
      const appShell = inApp && !!user;
      is.app = appShell; is.auth = (page === 'login' || page === 'register') && !appShell; is.public = !is.app && !is.auth;

      const U = user && Object.assign({}, user, { roleLabel: ROLES[user.role].label, roleDesc: ROLES[user.role].desc, initials: initials(user.name), first: user.name.split(' ')[0], av: avatar(user.name) });
      const navItem = (label, href, key, extra) => { const on = key === s0 || (key === 'home' && !s0); return Object.assign({ label: (T.labels || {})[label] || label, href, on, ...chip(on), off: !(on), ip: ICONS[key] }, extra || {}); };
      const nav = [navItem('Home', '#/', 'home', { k: 'I' }), navItem('About', '#/about', 'about', { k: 'II' }), navItem('History', '#/history', 'history', { k: 'III' }), navItem('Members', '#/members', 'members', { k: 'IV' }), navItem('Events', '#/events', 'events', { k: 'V' }), navItem('News', '#/news', 'news', { k: 'VI' }), navItem('Contact', '#/contact', 'contact', { k: 'VII' })];
      const appDefs = [['Dashboard', '#/app', '', 'dashboard.view', 'grid'], ['Members', '#/app/members', 'members', 'members.manage', 'users'], ['Events', '#/app/events', 'events', 'events.manage', 'calendar'], ['Announcements', '#/app/announcements', 'announcements', 'announcements.manage', 'megaphone'], ['Users & roles', '#/app/users', 'users', 'users.view', 'shield'], ['My profile', '#/app/profile', 'profile', 'profile.view', 'user']];
      const appNav = appDefs.filter((d) => can(user, d[3])).map(([label, href, key, , icon]) => { const on = inApp && s1 === key; return { label: (T.labels || {})[label] || label, href, on, icon, ip: ICONS[icon], ...chip(on), off: !(on) }; });

      // directory
      const activeMembers = data.members.filter((m) => m.status === 'Active');
      const q = st.mq.trim().toLowerCase();
      const membersList = activeMembers.filter((m) => (st.mv === 'All' || m.village === st.mv) && (!q || (m.name + ' ' + m.city + ' ' + m.village + ' ' + m.occupation + ' ' + m.country).toLowerCase().includes(q))).map((m) => decoM(m, user));
      const villageChips = ['All'].concat(VILLAGES.filter((v) => activeMembers.some((m) => m.village === v))).map((v) => ({ label: v, on: st.mv === v, onClick: () => set({ mv: v }), ...chip(st.mv === v), off: !(st.mv === v), count: v === 'All' ? activeMembers.length : activeMembers.filter((m) => m.village === v).length }));
      const md = memberDetail ? decoM(data.members.find((m) => m.id === s1), user) : null;
      const mdRelated = md ? activeMembers.filter((m) => m.village === md.village && m.id !== md.id).slice(0, 3).map((m) => decoM(m, user)) : [];
      const mdRole = md ? (COMMITTEE.find((c) => c[0] === md.id) || [])[1] || '' : '';

      // events
      const pubEvents = data.events.filter((e) => e.status === 'Published').slice().sort((a, b) => a.date.localeCompare(b.date));
      const eq = st.eq.trim().toLowerCase();
      const eventsList = pubEvents.filter((e) => (st.escope === 'upcoming' ? e.date >= TODAY : e.date < TODAY) && (st.ecat === 'All' || e.category === st.ecat) && (!eq || (e.title + e.venue + e.summary).toLowerCase().includes(eq))).map((e) => decoE(e, user));
      if (st.escope === 'past') eventsList.reverse();
      const eventCats = ['All'].concat([...new Set(pubEvents.map((e) => e.category))]).map((c) => ({ label: c, on: st.ecat === c, onClick: () => set({ ecat: c }), ...chip(st.ecat === c), off: !(st.ecat === c) }));
      const scopeTabs = [['upcoming', 'Upcoming'], ['past', 'Past']].map(([k, l]) => ({ label: l, on: st.escope === k, onClick: () => set({ escope: k }), ...chip(st.escope === k), off: !(st.escope === k) }));
      const byMonth = []; eventsList.forEach((e) => { const k = MONL[pd(e.date).getMonth()] + ' ' + e.year; let g = byMonth.find((x) => x.month === k); if (!g) byMonth.push((g = { month: k, items: [] })); g.items.push(e); });
      const upcoming = pubEvents.filter((e) => e.date >= TODAY).map((e) => decoE(e, user));
      const evRaw = eventDetail ? data.events.find((e) => e.id === s1 && (e.status === 'Published' || can(user, 'events.manage'))) : null;
      const ed = evRaw ? decoE(evRaw, user) : null;
      const edMore = ed ? upcoming.filter((e) => e.id !== ed.id).slice(0, 3) : [];
      const canRsvp = !!user && can(user, 'events.rsvp');

      // news
      const pubNews = data.announcements.filter((a) => a.status === 'Published').slice().sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date));
      const newsCats = ['All'].concat([...new Set(pubNews.map((a) => a.category))]).map((c) => ({ label: c, on: st.ncat === c, onClick: () => set({ ncat: c }), ...chip(st.ncat === c), off: !(st.ncat === c) }));
      const newsList = pubNews.filter((a) => st.ncat === 'All' || a.category === st.ncat).map(decoA);
      const latestNews = pubNews.slice().sort((a, b) => b.date.localeCompare(a.date)).map(decoA);

      // dashboard
      let dash = null;
      if (user) {
        const role = user.role; const myIds = data.rsvps[user.email] || [];
        const myEvents = upcoming.filter((e) => myIds.includes(e.id));
        const pending = data.members.filter((m) => m.status === 'Pending').length;
        const drafts = data.events.filter((e) => e.status === 'Draft').length + data.announcements.filter((a) => a.status === 'Draft').length;
        const admin = role === 'superadmin' || role === 'admin';
        const tiles = admin ? [
          { label: 'Members in directory', value: String(data.members.length), note: activeMembers.length + ' active' },
          { label: 'Pending approvals', value: String(pending), note: pending ? 'Needs review' : 'All clear' },
          { label: 'Upcoming events', value: String(upcoming.length), note: 'Next: ' + (upcoming[0] ? upcoming[0].dateShort : '—') },
          { label: 'Drafts', value: String(drafts), note: 'Events + announcements' },
        ] : role === 'editor' ? [
          { label: 'Published events', value: String(pubEvents.length), note: upcoming.length + ' upcoming' },
          { label: 'Announcements live', value: String(pubNews.length), note: pubNews.filter((a) => a.pinned).length + ' pinned' },
          { label: 'Drafts waiting', value: String(drafts), note: 'Finish and publish' },
          { label: 'Total RSVPs', value: String(upcoming.reduce((s, e) => s + e.rsvpTotal, 0)), note: 'Across upcoming events' },
        ] : role === 'member' ? [
          { label: 'My RSVPs', value: String(myEvents.length), note: myEvents[0] ? 'Next: ' + myEvents[0].title : 'None yet' },
          { label: 'Upcoming events', value: String(upcoming.length), note: 'Open to RSVP' },
          { label: 'New announcements', value: String(latestNews.filter((a) => a.date >= '2026-10-01').length), note: 'This month' },
          { label: 'Families in directory', value: '1,146', note: activeMembers.length + ' shown in demo' },
        ] : [
          { label: 'Upcoming events', value: String(upcoming.length), note: 'Read-only' },
          { label: 'Announcements', value: String(pubNews.length), note: 'Read-only' },
          { label: 'Directory entries', value: String(activeMembers.length), note: 'Contacts hidden' },
          { label: 'Access level', value: 'View', note: 'No edit rights' },
        ];
        const quick = [];
        if (can(user, 'members.create')) quick.push({ label: 'Add a member', href: '#/app/members?new' });
        if (can(user, 'events.create')) quick.push({ label: 'Create an event', href: '#/app/events?new' });
        if (can(user, 'announcements.create')) quick.push({ label: 'Post an announcement', href: '#/app/announcements?new' });
        if (can(user, 'users.view')) quick.push({ label: 'Review users & roles', href: '#/app/users' });
        if (role === 'member' || role === 'viewer') { quick.push({ label: 'Browse the directory', href: '#/members' }); quick.push({ label: 'See upcoming events', href: '#/events' }); }
        quick.push({ label: can(user, 'profile.edit') ? 'Edit my profile' : 'View my profile', href: '#/app/profile' });
        const greet = { superadmin: 'Everything across the Patidar Samaj, in one place.', admin: 'Here’s what needs your attention today.', editor: 'Your content desk — events and announcements.', member: 'Your events, notices and community — all here.', viewer: 'You have read-only access to the community portal.' }[role];
        const pendingList = data.members.filter((m) => m.status === 'Pending').map((m) => decoM(m, user));
        dash = { tiles, quick, greet, admin, editor: role === 'editor', member: role === 'member', viewer: role === 'viewer', superadmin: role === 'superadmin', showActivity: admin || role === 'editor', myEvents, myEventsEmpty: !myEvents.length, pendingList, hasPending: admin && pendingList.length > 0, drafts: data.events.filter((e) => e.status === 'Draft').map((e) => decoE(e, user)).concat([]), draftNews: data.announcements.filter((a) => a.status === 'Draft').map(decoA) };
      }

      // manager
      let mgr = null;
      if (page === 'manage' && user) {
        const kind = s1; const F = FORMS[kind]; const qq = st.mgrQ.trim().toLowerCase();
        const rows = coll(kind).filter((x) => !qq || JSON.stringify(x).toLowerCase().includes(qq)).map((x) => {
          let cells, title, sub;
          if (kind === 'members') { const m = decoM(x, user); title = m.name; sub = can(user, 'contact.view') ? m.email : m.occupation; cells = [m.village, m.city, String(m.since), x.status]; Object.assign(x, { av: m.av, initials: m.initials }); }
          else if (kind === 'events') { const e = decoE(x, user); title = e.title; sub = e.venue; cells = [e.category, e.dateShort, String(e.rsvpTotal) + ' / ' + e.capacity, x.status]; }
          else { const a = decoA(x); title = a.title; sub = a.excerpt; cells = [a.category, a.dateLong, a.pinnedLabel, x.status]; }
          const s = T.status[x.status] || {};
          return { id: x.id, title, sub, cells: cells.slice(0, 3).map((v) => ({ v })), c1: cells[0], c2: cells[1], c3: cells[2], status: x.status, sfg: s.fg, sbg: s.bg, av: x.av || avatar(title), initials: initials(title),
            canEdit: can(user, kind + '.edit'), canDelete: can(user, kind + '.delete'), edit: () => openForm(kind, x), del: () => askDelete(kind, x), href: kind === 'members' ? '#/members/' + x.id : kind === 'events' ? '#/events/' + x.id : '#/news' };
        });
        mgr = { kind, title: F.title, singular: F.singular, cols: F.cols, rows, count: rows.length, total: coll(kind).length, empty: !rows.length, q: st.mgrQ, onQ: (e) => set({ mgrQ: e.target.value }),
          canCreate: can(user, kind + '.create'), create: () => openForm(kind, null), canDelete: can(user, kind + '.delete'), readOnlyNote: !can(user, kind + '.delete') ? 'Your role can create and edit, but not delete.' : 'You can create, edit and delete.' };
        if (location.hash.includes('?new') && !st.form && mgr.canCreate && !st._autoNew) { st._autoNew = true; setTimeout(() => { openForm(kind, null); history.replaceState(null, '', '#/app/' + kind); st._autoNew = false; }, 0); }
      }
      let form = null;
      if (st.form) {
        const f = st.form, F = FORMS[f.kind];
        form = { title: (f.id ? 'Edit ' : 'New ') + F.singular, saving: f.saving, saveLabel: f.saving ? 'Saving…' : f.id ? 'Save changes' : 'Create ' + F.singular, save: saveForm, cancel: () => set({ form: null }),
          fields: F.fields.filter((fd) => !fd.private || can(currentUser(), 'contact.view')).map((fd) => ({ name: fd.name, label: fd.label + (fd.required ? ' *' : ''), value: f.values[fd.name] ?? '', error: f.errors[fd.name] || '', hasError: !!f.errors[fd.name], type: fd.type || 'text', half: !!fd.half, span: fd.half ? 'span 1' : '1 / -1',
            isSelect: !!fd.options, isTextarea: !!fd.textarea, isInput: !fd.options && !fd.textarea, options: (fd.options || []).map((o) => ({ v: o, label: o })),
            onChange: (e) => set({ form: Object.assign({}, st.form, { values: Object.assign({}, st.form.values, { [fd.name]: e.target.value }), errors: Object.assign({}, st.form.errors, { [fd.name]: '' }) }) }) })) };
      }

      // users & roles
      const accounts = ACCOUNTS.map((a) => ({ name: a.name, email: (can(user, 'contact.view') || (user && user.email === a.email)) ? a.email : 'Private', role: a.role, roleLabel: ROLES[a.role].label, desc: ROLES[a.role].desc, initials: initials(a.name), av: avatar(a.name), isYou: !!user && user.email === a.email, member: a.memberId ? 'Linked to directory' : 'No directory record' }));
      const matrix = Object.keys(PERMS).map((k) => ({ label: PERMS[k][1], key: k, cells: ROLE_ORDER.map((r) => ({ yes: PERMS[k][0].includes(r), mark: PERMS[k][0].includes(r) ? '●' : '—' })) }));
      const roleCols = ROLE_ORDER.map((r) => ({ label: ROLES[r].label }));

      // profile
      let prof = null;
      if (page === 'profile' && user) {
        const m = user.memberId ? memberById(user.memberId) : null;
        const base = st.prof || Object.assign({ name: user.name, email: user.email, phone: '', city: '', country: '', occupation: '', bio: '' }, m ? { phone: m.phone, city: m.city, country: m.country, occupation: m.occupation, bio: m.bio } : { city: 'Vadodara', country: 'India', occupation: 'Well-wisher', bio: 'Guest access for reviewing the portal.' });
        const editable = can(user, 'profile.edit');
        prof = { editable, linked: !!m, village: m ? m.village : '—', since: m ? m.since : '—', family: m ? m.familySize : '—',
          fields: PROF_FIELDS.map(([name, label, ed]) => ({ name, label, value: base[name] || '', readOnly: !(editable && ed), editable: editable && ed, isTextarea: name === 'bio', isInput: name !== 'bio', error: st.profErr[name] || '', hasError: !!st.profErr[name],
            hint: !ed ? 'Managed by the Patidar Samaj office' : !editable ? 'Read-only for Viewer accounts' : '',
            onChange: (e) => set({ prof: Object.assign({}, base, { [name]: e.target.value }), profErr: Object.assign({}, st.profErr, { [name]: '' }) }) })),
          dirty: !!st.prof, clean: !st.prof,
          save: (e) => { e && e.preventDefault && e.preventDefault(); if (!st.prof) return; const err = {}; if (!String(st.prof.city).trim()) err.city = 'City is required.'; if (st.prof.phone && !/^[+\d][\d\s-]{6,}$/.test(st.prof.phone)) err.phone = 'Enter a valid phone number.'; if (Object.keys(err).length) return set({ profErr: err });
            if (m) { ['phone', 'city', 'country', 'occupation', 'bio'].forEach((k) => (m[k] = st.prof[k])); persist(); } set({ prof: null, profErr: {} }); toast('Profile updated — saved in this browser'); },
          discard: () => set({ prof: null, profErr: {} }), publicHref: m ? '#/members/' + m.id : '#/members' };
      }

      // command search
      const cq = st.cmdQ.trim().toLowerCase();
      const cmdResults = !cq ? [] : [].concat(
        activeMembers.filter((m) => (m.name + m.city + m.village).toLowerCase().includes(cq)).slice(0, 5).map((m) => ({ label: m.name, sub: m.village + ' · ' + m.city, href: '#/members/' + m.id, kind: 'Member' })),
        pubEvents.filter((e) => e.title.toLowerCase().includes(cq)).slice(0, 4).map((e) => ({ label: e.title, sub: decoE(e, user).dateShort, href: '#/events/' + e.id, kind: 'Event' })),
        pubNews.filter((a) => a.title.toLowerCase().includes(cq)).slice(0, 3).map((a) => ({ label: a.title, sub: a.category, href: '#/news', kind: 'News' })),
        nav.filter((n) => n.label.toLowerCase().includes(cq)).map((n) => ({ label: n.label, sub: 'Page', href: n.href, kind: 'Page' })));

      // shuffle (member discovery)
      const pool = activeMembers.slice(); let seed = st.shuffleSeed + 7;
      for (let i = pool.length - 1; i > 0; i--) { seed = (seed * 9301 + 49297) % 233280; const j = Math.floor((seed / 233280) * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }

      const crumbMap = { about: 'About', history: 'History', members: 'Members', events: 'Events', news: 'News', contact: 'Contact', login: 'Log in', register: 'Register' };
      const crumbs = [{ label: 'Home', href: '#/', last: false }];
      if (crumbMap[s0]) crumbs.push({ label: crumbMap[s0], href: '#/' + s0, last: !s1 });
      if (inApp && user) { crumbs.length = 0; crumbs.push({ label: 'Workspace', href: '#/app', last: !s1 }); const cur = appNav.find((n) => n.on); if (cur && s1) crumbs.push({ label: cur.label, href: cur.href, last: true }); }
      if (md) crumbs.push({ label: md.name, href: md.href, last: true }); if (ed) crumbs.push({ label: ed.title, href: ed.href, last: true });

      const committee = COMMITTEE.map(([id, title]) => Object.assign(decoM(memberById(id), user) || {}, { title }));

      return {
        ready: true, org: ORG, stats: STATS, milestones: MILESTONES, about: ABOUT, history: HISTORY, values: VALUES, achievements: ACHIEVEMENTS, activities: ACTIVITIES,
        committee, committeeTop: committee.slice(0, 4), links: LINKS, faq: FAQ, activity: ACTIVITY, gallery: GALLERY, images: IMAGES, year: '2026',
        is, page, narrow: st.narrow, wide: !st.narrow, compact: st.compact, roomy: !st.compact, menuOpen: st.menu, toggleMenu: () => set({ menu: !st.menu }), closeMenu: () => set({ menu: false }),
        user: U, loggedIn: !!user, guest: !user, nav, appNav, crumbs,
        members: membersList, membersCount: membersList.length, membersEmpty: !membersList.length, memberQuery: st.mq, onMemberQuery: (e) => set({ mq: e.target.value }), villageChips, villageOptions: villageChips.map((c) => ({ v: c.label, label: c.label === 'All' ? 'All villages' : c.label + ' (' + c.count + ')' })), memberVillage: st.mv, onVillage: (e) => set({ mv: e.target.value }), clearMemberFilters: () => set({ mq: '', mv: 'All' }),
        canSeeContact: can(user, 'contact.view'), contactNote: can(user, 'contact.view') ? 'Super Admin view — private contact details shown' : 'Phone numbers and emails are private', featuredMembers: activeMembers.slice(0, 6).map((m) => decoM(m, user)), shuffled: pool.slice(0, 6).map((m) => decoM(m, user)), shuffle: () => set({ shuffleSeed: st.shuffleSeed + 1 }),
        md, mdMissing: !!memberDetail && !md, mdRelated, mdHasRelated: mdRelated.length > 0, mdRole, mdIsCommittee: !!mdRole,
        events: eventsList, eventsEmpty: !eventsList.length, eventsCount: eventsList.length, eventCats, scopeTabs, eventsByMonth: byMonth, eventCat: st.ecat, onEventCat: (e) => set({ ecat: e.target.value }), eventCatOptions: eventCats.map((c) => c.label), eventQuery: st.eq, onEventQuery: (e) => set({ eq: e.target.value }), clearEventFilters: () => set({ eq: '', ecat: 'All' }),
        upcoming, upcoming3: upcoming.slice(0, 3), nextEvent: upcoming[0] || null, upcomingRest: upcoming.slice(1, 5),
        ed, edMissing: !!eventDetail && !ed, edMore, canRsvp, rsvp: () => ed && toggleRsvp(ed.id), rsvpLabel: !user ? 'Log in to RSVP' : !canRsvp ? 'RSVP unavailable (read-only)' : ed && ed.going ? 'Cancel my RSVP' : 'RSVP — I’m going',
        news: newsList, newsCats, latestNews: latestNews.slice(0, 4), latest3: latestNews.slice(0, 3), pinnedNews: pubNews.filter((a) => a.pinned).map(decoA), tickerNews: latestNews.slice(0, 5).concat(latestNews.slice(0, 5)),
        login: st.login, onLogin, submitLogin, loginErr: st.loginErr, hasLoginErr: !!st.loginErr, loginBusy: st.loginBusy, loginLabel: st.loginBusy ? 'Signing in…' : 'Log in', showPw: st.showPw, pwType: st.showPw ? 'text' : 'password', pwToggleLabel: st.showPw ? 'Hide' : 'Show', togglePw: () => set({ showPw: !st.showPw }),
        hasFrom: !!st.from,
        demoAccounts: ACCOUNTS.map((a) => ({ role: ROLES[a.role].label, email: a.email, password: a.password, name: a.name, fill: () => set({ login: { email: a.email, password: a.password }, loginErr: '' }) })),
        reg: st.reg, regErr: st.regErr, onReg, submitReg, regDone: st.regDone, regOpen: !st.regDone, resetReg,
        contact: st.contact, contactErr: st.contactErr, onContact, submitContact, contactSent: st.contactSent, contactOpen: !st.contactSent, resetContact,
        logout, dash, mgr, form, formOpen: !!form, confirm: st.confirm, confirmOpen: !!st.confirm, confirmYes: doDelete, confirmNo: () => set({ confirm: null }), resetData,
        accounts, matrix, roleCols, showMatrix: can(user, 'roles.matrix'), prof,
        denied, deniedRole: U ? U.roleLabel : '',
        toast: st.toast, hasToast: !!st.toast,
        cmdOpen: st.cmd, openCmd: () => set({ cmd: true, cmdQ: '' }), closeCmd: () => set({ cmd: false }), cmdQ: st.cmdQ, onCmd: (e) => set({ cmdQ: e.target.value }), cmdResults, cmdEmpty: !!cq && !cmdResults.length, cmdHint: !cq,
        designs: DESIGNS.map((d) => ({ n: String(d.n), name: d.name, href: encodeURI(d.file) + (location.hash || ''), on: d.id === theme.design, pill: d.id === theme.design ? 'rgba(255,255,255,.3)' : 'transparent' })),
        stop: (e) => e.stopPropagation(),
      };
    }
    return { vals, destroy() { window.removeEventListener('hashchange', onHash); window.removeEventListener('resize', onResize); window.removeEventListener('keydown', onKey); } };
  }

  window.SAMAJ = { controller, ACCOUNTS, ROLES, PERMS, can, DESIGNS };
})();
