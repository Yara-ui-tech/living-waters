import { User, UserRole, AcademicModule, AcademicResult, BillingStatement, LibraryBook, AccommodationType, AdmissionApplication } from './types';

export const INITIAL_STUDENT: User = {
  id: 'student-1',
  regNo: 'LWTS/2025/0124',
  name: 'Ephraim Musonda',
  email: 'ephraim.musonda@student.lwts.edu',
  role: UserRole.STUDENT,
  program: 'Bachelor of Theology (B.Th.)',
  department: 'Biblical and Systematic Studies',
  admissionYear: '2025',
  currentSemester: 'Year 2 - Semester 1',
  gpa: 3.78,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
  bio: 'Second-year theology student focused on biblical hermeneutics and local church outreach initiatives. Eager to explore historical theology and scriptural exegesis.'
};

export const INITIAL_STAFF: User = {
  id: 'staff-1',
  regNo: 'LWTS/STAFF/082',
  name: 'Dr. Abigail Chola',
  email: 'abigail.chola@faculty.lwts.edu',
  role: UserRole.STAFF,
  program: 'Academic Dean / Professor',
  department: 'Theological and Pastoral Studies',
  admissionYear: '2018',
  currentSemester: 'N/A',
  gpa: 4.0,
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
  bio: 'Dean of Faculty at Living Waters Theological Seminary. Passionate about mentoring the next generation of academic theologians and pastoral leaders across the continent.'
};

export const INITIAL_MODULES: AcademicModule[] = [
  {
    id: 'mod-1',
    code: 'BS-101',
    title: 'Pentateuch & Hebrew Narrative Survey',
    credits: 3,
    instructor: 'Prof. Jeremiah Phiri',
    description: 'An in-depth study of the first five books of the Bible (Genesis to Deuteronomy). Focuses on primeval history, covenant theology, ancestral narratives, and the exodus motif, with attention to historical-grammatical exegesis.',
    schedule: 'Mondays & Wednesdays (09:00 - 10:30)',
    progress: 75,
    materialsCount: 14,
    syllabus: [
      'Introduction to Historical-Critical and Literary Methods',
      'Genesis 1-11: Primeval Origins and Theological Foundations',
      'The Abrahamic Covenant and Patriarchal Narratives',
      'Exodus: Redemption, Law, and Tabernacle Presence',
      'Leviticus and Numbers: Holiness, Rituals, and Wilderness Wanderings',
      'Deuteronomy: Covenant Renewal and Theological Core'
    ]
  },
  {
    id: 'mod-2',
    code: 'TH-204',
    title: 'Systematic Theology I: Prolegomena & Theology Proper',
    credits: 4,
    instructor: 'Dr. Abigail Chola',
    description: 'Deals with theological methodology, revelation, scriptural authority, and the doctrine of God. Explores the Trinity, divine attributes, and God\'s relation to the creation, history, and human redemption.',
    schedule: 'Tuesdays & Thursdays (11:00 - 12:30)',
    progress: 60,
    materialsCount: 18,
    syllabus: [
      'Prolegomena: The Nature and Sources of Systematic Theology',
      'General and Special Revelation',
      'The Inspiration, Inerrancy, and Authority of Scripture',
      'The Being and Essence of God: Names and Attributes',
      'The Doctrine of the Trinity: Biblical Roots and Historical Formulations',
      'Providence, Divine Decrees, and the Problem of Evil'
    ]
  },
  {
    id: 'mod-3',
    code: 'HM-302',
    title: 'Homiletics & Exegetical Sermon Preparation',
    credits: 3,
    instructor: 'Rev. Emmanuel Banda',
    description: 'Practical training in developing biblically faithful and culturally relevant expository sermons. Students learn how to move from historical-grammatical exegesis of a passage to structured sermon outlines and effective verbal delivery.',
    schedule: 'Fridays (14:00 - 17:00)',
    progress: 40,
    materialsCount: 9,
    syllabus: [
      'The Biblical Theology of Preaching',
      'Exegetical Groundwork: Choosing and Analyzing the Text',
      'Determining the Exegetical and Homiletical Idea',
      'Sermon Outlining and Structural Development',
      'Illustrations, Introductions, and Pastoral Applications',
      'Delivery Styles, Voice Control, and Sermon Evaluations'
    ]
  },
  {
    id: 'mod-4',
    code: 'PT-401',
    title: 'Pastoral Counseling & Counseling Hermeneutics',
    credits: 3,
    instructor: 'Dr. Grace Mwansa',
    description: 'Examines biblical frameworks for pastoral care and counseling. Focuses on theological anthropology, crisis counseling, spiritual direction, and pastoral ethics in dealing with marital, family, and grief counseling.',
    schedule: 'Wednesdays (14:00 - 16:30)',
    progress: 90,
    materialsCount: 11,
    syllabus: [
      'Theological Foundations of Pastoral Care',
      'The Pastoral Identity and Ethical Boundaries in Counseling',
      'Active Listening, Empathy, and Counseling Methodologies',
      'Crisis Intervention: Grief, Trauma, and Pastoral Presence',
      'Marital and Family Counseling in African Contexts',
      'Spiritual Direction and the Role of Prayer in Counseling'
    ]
  }
];

export const INITIAL_RESULTS: AcademicResult[] = [
  // Semester 1 Results
  { id: 'res-1', moduleCode: 'BS-100', moduleTitle: 'Introduction to Hermeneutics', credits: 3, grade: 'A', points: 4.0, semester: 'Year 1 - Semester 1' },
  { id: 'res-2', moduleCode: 'CH-102', moduleTitle: 'Early Church History', credits: 3, grade: 'B+', points: 3.5, semester: 'Year 1 - Semester 1' },
  { id: 'res-3', moduleCode: 'HB-101', moduleTitle: 'Basic Biblical Hebrew I', credits: 3, grade: 'A-', points: 3.7, semester: 'Year 1 - Semester 1' },
  { id: 'res-4', moduleCode: 'PT-101', moduleTitle: 'Spiritual Formation for Ministry', credits: 2, grade: 'A', points: 4.0, semester: 'Year 1 - Semester 1' },
  
  // Semester 2 Results
  { id: 'res-5', moduleCode: 'GK-102', moduleTitle: 'Basic Biblical Greek I', credits: 3, grade: 'A', points: 4.0, semester: 'Year 1 - Semester 2' },
  { id: 'res-6', moduleCode: 'CH-201', moduleTitle: 'Reformation & Modern Church History', credits: 3, grade: 'B', points: 3.0, semester: 'Year 1 - Semester 2' },
  { id: 'res-7', moduleCode: 'TH-201', moduleTitle: 'Christian Apologetics & Philosophy', credits: 3, grade: 'A-', points: 3.7, semester: 'Year 1 - Semester 2' },
  { id: 'res-8', moduleCode: 'BS-202', moduleTitle: 'Gospels & Acts Narrative Survey', credits: 4, grade: 'A', points: 4.0, semester: 'Year 1 - Semester 2' }
];

export const INITIAL_BILLING: BillingStatement = {
  totalInvoiced: 4850.00,
  totalPaid: 3200.00,
  balanceDue: 1650.00,
  items: [
    { id: 'bill-1', description: 'Year 2 Semester 1 - Tuition Fee', dueDate: '2026-08-15', amount: 3200.00, status: 'paid' },
    { id: 'bill-2', description: 'Year 2 Semester 1 - Hostel Accommodation Fee', dueDate: '2026-08-15', amount: 1200.00, status: 'pending' },
    { id: 'bill-3', description: 'Annual ICT and Digital Library Assessment', dueDate: '2026-07-20', amount: 350.00, status: 'pending' },
    { id: 'bill-4', description: 'Seminary Guild and Recreation Fund', dueDate: '2026-07-31', amount: 100.00, status: 'pending' }
  ],
  paymentsHistory: [
    { id: 'pay-1', date: '2026-06-12', amount: 1500.00, reference: 'TXN-90281481', method: 'Visa Card Direct' },
    { id: 'pay-2', date: '2026-06-25', amount: 1700.00, reference: 'TXN-91823901', method: 'Mobile Money Gate' }
  ]
};

export const INITIAL_HOSTELS: AccommodationType[] = [
  {
    id: 'hostel-a',
    name: 'Augustine Hall (Male Residence)',
    capacity: 64,
    occupied: 52,
    pricePerSemester: 1200.00,
    description: 'A serene living space overlooking the east gardens, ideal for prayerful reflection and studying. Dual-occupancy spacious rooms with academic desks.',
    amenities: ['Shared Study Hall', 'Hi-Speed Wi-Fi', 'Prayer Sanctuary', 'Self-catering Kitchens', 'Laundry Suite']
  },
  {
    id: 'hostel-b',
    name: 'Monica House (Female Residence)',
    capacity: 64,
    occupied: 48,
    pricePerSemester: 1200.00,
    description: 'Offering an peaceful environment with beautiful green lawns and comfortable study areas. Named after St. Monica, fostering community and theological study.',
    amenities: ['Shared Reading Room', 'Sanctuary Gardens', 'Hi-Speed Wi-Fi', 'Common Lounge & Piano', 'Kitchen Facility']
  },
  {
    id: 'hostel-c',
    name: 'Calvinist Married Quarters (Family Units)',
    capacity: 20,
    occupied: 18,
    pricePerSemester: 2200.00,
    description: 'Fully furnished self-contained single-bedroom family cottages for seminary couples and those with children. Offers family-oriented common gardens.',
    amenities: ['Playground Area', 'Dedicated Water Source', 'Fenced Security', 'Individual Kitchens', 'Quiet Community']
  }
];

export const MOCK_BOOKS: LibraryBook[] = [
  {
    id: 'bk-1',
    title: 'The Cost of Discipleship',
    author: 'Dietrich Bonhoeffer',
    year: 1937,
    category: 'Christian Ethics & Discipleship',
    coverColor: 'bg-emerald-950 text-emerald-100',
    available: true,
    isbn: '978-0684815008',
    summary: 'A compelling critique of "cheap grace" and a call to meaningful, sacrificial discipleship following Jesus Christ. Bonhoeffer outlines the profound costs and absolute treasures of the Sermon on the Mount.',
    pages: 320,
    chapters: [
      { title: 'Chapter 1: Costly Grace', pages: '1-34' },
      { title: 'Chapter 2: The Call to Discipleship', pages: '35-58' },
      { title: 'Chapter 3: Single-minded Obedience', pages: '59-78' },
      { title: 'Chapter 4: The Sermon on the Mount: Beatitudes', pages: '79-114' },
      { title: 'Chapter 5: The Visible Community', pages: '115-146' }
    ]
  },
  {
    id: 'bk-2',
    title: 'Institutes of the Christian Religion',
    author: 'John Calvin',
    year: 1559,
    category: 'Systematic Theology / Reformed Studies',
    coverColor: 'bg-indigo-950 text-indigo-100',
    available: true,
    isbn: '978-0664220204',
    summary: 'Calvin\'s masterpiece of systematic theological formulation. Explores the knowledge of God the Creator, God the Redeemer, the manner of obtaining grace, and the external means or aids.',
    pages: 1540,
    chapters: [
      { title: 'Book I: The Knowledge of God the Creator', pages: '1-140' },
      { title: 'Book II: The Knowledge of God the Redeemer in Christ', pages: '141-380' },
      { title: 'Book III: The Way in Which We Receive the Grace of Christ', pages: '381-890' },
      { title: 'Book IV: The Holy Catholic Church', pages: '891-1540' }
    ]
  },
  {
    id: 'bk-3',
    title: 'Hermeneutics: Principles and Processes of Biblical Interpretation',
    author: 'Henry A. Virkler',
    year: 2007,
    category: 'Hermeneutics & Exegesis',
    coverColor: 'bg-slate-950 text-slate-100',
    available: true,
    isbn: '978-0801031380',
    summary: 'A widely used scholarly textbook detailing the grammatical-historical method. Provides practical steps for navigating figures of speech, prophecy, narrative exegesis, and doctrinal synthesis.',
    pages: 256,
    chapters: [
      { title: 'Chapter 1: History of Biblical Interpretation', pages: '15-46' },
      { title: 'Chapter 2: Historical-Cultural Contextual Analysis', pages: '47-78' },
      { title: 'Chapter 3: Lexical-Syntactical Analysis', pages: '79-116' },
      { title: 'Chapter 4: Theological Analysis and Exposition', pages: '117-152' }
    ]
  },
  {
    id: 'bk-4',
    title: 'The City of God',
    author: 'Saint Augustine of Hippo',
    year: 426,
    category: 'Historical Theology & Philosophy',
    coverColor: 'bg-rose-950 text-rose-100',
    available: false,
    isbn: '978-0140448948',
    summary: 'Augustine\'s response to pagan allegations that the sack of Rome resulted from Christianity. It traces the spiritual conflict between the Heavenly City and the Earthly City, laying foundations for Christian philosophy of history.',
    pages: 1100,
    chapters: [
      { title: 'Part I: The Secular City and the Roman Fall', pages: '1-300' },
      { title: 'Part II: The Origins of the Two Cities', pages: '301-650' },
      { title: 'Part III: The Progress and Ends of the Two Cities', pages: '651-1100' }
    ]
  },
  {
    id: 'bk-5',
    title: 'Systematic Theology: An Introduction to Biblical Doctrine',
    author: 'Wayne Grudem',
    year: 1994,
    category: 'Systematic Theology',
    coverColor: 'bg-amber-950 text-amber-100',
    available: true,
    isbn: '978-0310286707',
    summary: 'A highly accessible, scripture-centric introduction to systematic theology. Emphasizes warm devotion, clarity of language, extensive biblical citations, and practical application to everyday faith.',
    pages: 1290,
    chapters: [
      { title: 'Part 1: The Doctrine of the Word of God', pages: '47-140' },
      { title: 'Part 2: The Doctrine of God', pages: '141-438' },
      { title: 'Part 3: The Doctrine of Man in the Image of God', pages: '439-567' },
      { title: 'Part 4: The Doctrine of Christ and the Atonement', pages: '568-752' },
      { title: 'Part 5: The Doctrine of the Application of Redemption', pages: '753-948' }
    ]
  }
];

export const GENERAL_MESSAGES = [
  { id: 'msg-1', sender: 'Registrar Office', content: 'Covenant greetings! Please note that physical application for Year 2 Sem 2 registration closes on August 10th. Ensure all accounts are settled.', date: 'July 2, 2026' },
  { id: 'msg-2', sender: 'Librarian', content: 'Return reminder: "The City of God" is currently overdue. Kindly renew or return to the main circulation desk.', date: 'June 30, 2026' },
  { id: 'msg-3', sender: 'Academic Dean', content: 'Seminary community prayer service is scheduled for tomorrow at 12:00 UTC at the Grace Chapel. Dr. Abigail Chola will be sharing.', date: 'July 3, 2026' }
];

export const MOCK_STUDENT_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'app-902',
    fullName: 'Timothy Phiri',
    email: 'timothy.phiri@outlook.com',
    programChoice: 'Master of Divinity (M.Div.)',
    academicBackground: 'B.A. in Christian Education, Africa Christian University, 2024',
    statementOfFaith: 'I believe in the verbal plenary inspiration of the Holy Scriptures as the sole infallible guide for faith and life. My life is called to the preaching of the Word of Truth.',
    status: 'offered',
    submissionDate: '2026-05-15',
    offerLetter: 'Official Offer of Admission:\n\nDear Timothy Phiri,\n\nWe are overjoyed to offer you admission to the Master of Divinity (M.Div.) program at Living Waters Theological Seminary for the Academic Year 2026/2027 starting this September.\n\nYour academic credentials and profound call to ministry resonated deeply with our admissions committee. May God bless your preparations.\n\nWarm regards,\nDr. Abigail Chola, Academic Dean.'
  }
];
