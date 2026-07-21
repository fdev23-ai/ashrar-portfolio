export const profile = {
  name: 'Ashrar Ahmed',
  title: 'Software Developer',
  focus: 'Flutter & React',
  location: 'Abu Dhabi, UAE',
  phone: '+971 54 548 2933',
  email: 'asraraha0@gmail.com',
  linkedin: 'https://linkedin.com/in/asrar-ahmed-5ba36a18a',
  github: 'https://github.com/asrarahmed', // update to your actual GitHub username
  tagline:
    'I build real-time, cross-platform apps — from RTSP camera streams and WebRTC video to interactive maps — using Flutter and React.',
  about:
    'Software developer with a Flutter-first background and growing React expertise, currently building a real-time surveillance and monitoring platform for Web and iOS. Comfortable across the stack — from live video streaming and PTZ camera control to translating Figma designs into pixel-accurate, responsive UI. Shipped apps to both the App Store and Play Store, and enjoys solving problems where real-time data, maps, and performance intersect.',
}

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  points: string[]
}

export const experience: Experience[] = [
  {
    role: 'Software Developer (Flutter & React)',
    company: 'Etimad Research and Development',
    period: '08/2024 — Present',
    location: 'Abu Dhabi',
    points: [
      'Building a real-time surveillance and monitoring app for Web and iOS using Flutter.',
      'Integrated real-time map updates to track cameras and assets visually.',
      'Added RTSP streaming support for connecting live cameras, using WebRTC for low-latency video on Web and iOS.',
      'Implemented PTZ (Pan-Tilt-Zoom) camera controls within the Flutter Web app.',
      'Applied GetX for scalable state management and real-time updates.',
      'Worked with REST + WebSocket backend APIs to handle live updates and camera feeds, with performance tuning for multiple simultaneous streams.',
      'Expanded into React, building a web app centered around an interactive maps feature, plus a Visitor Management App for check-in and tracking.',
    ],
  },
  {
    role: 'Flutter Developer',
    company: 'German Experts',
    period: '2021 — 2024',
    location: 'Abu Dhabi',
    points: [
      'Designed and prototyped mobile app UI/UX in Figma for user-friendly interfaces.',
      'Developed cross-platform Android/iOS apps, including car service applications.',
      'Published two apps on Google Play Store and one on the Apple App Store.',
      'Built Loyalty Programs, Rent a Car, Recovery Requests, Buy a Car, and Car Service History apps, including warranty, invoice, and full service history views.',
      'Collaborated with backend developers on API integration, real-time data, and performance optimization.',
      'Used Git for version control, code review, and team collaboration.',
    ],
  },
  {
    role: 'Android Developer',
    company: 'Rumooz Technologies',
    period: '2019 — 2021',
    location: 'Chennai, India',
    points: ['Started career building native Android applications.'],
  },
]

export type Project = {
  name: string
  description: string
  points: string[]
  tags: string[]
}

export const projects: Project[] = [
  {
    name: 'BLE Communicator App',
    description:
      'A Bluetooth Low Energy communicator app in Flutter, similar to wearable devices like Whoop, for real-time data exchange with BLE-connected devices.',
    points: [
      'Real-time blood pressure monitoring, streaming live biometric data from a BLE-connected wearable.',
      'Explored Flutter Pigeon for type-safe native platform channel communication between Dart and native (iOS/Android) code.',
    ],
    tags: ['Flutter', 'BLE', 'Pigeon', 'Real-time'],
  },
]

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: 'Frameworks',
    skills: ['Flutter', 'Dart', 'React', 'Native Android (Java/Kotlin)'],
  },
  {
    title: 'State Management',
    skills: ['GetX', 'Provider', 'Bloc', 'Cubit'],
  },
  {
    title: 'Real-time & Streaming',
    skills: ['WebRTC', 'RTSP', 'WebSocket', 'BLE'],
  },
  {
    title: 'Backend & APIs',
    skills: ['REST APIs', 'GraphQL', 'Flutter Pigeon'],
  },
  {
    title: 'Design & Tooling',
    skills: ['Figma', 'UI/UX Design Integration', 'Git', 'GitHub / GitLab / Bitbucket'],
  },
]

// Flat list used for the marquee strip
export const skillsMarquee = [
  'Flutter',
  'Dart',
  'React',
  'WebRTC',
  'RTSP',
  'WebSocket',
  'BLE',
  'GetX',
  'Bloc',
  'Provider',
  'Figma',
  'REST APIs',
  'GraphQL',
  'Kotlin',
  'Java',
  'Git',
]

export const education = {
  degree: 'BCA in Computer Application',
  school: 'Mohamed Sathak College of Arts and Science',
  period: '2015 — 2018',
  location: 'Chennai, India',
}

export const certifications = [
  {
    name: 'Artificial Intelligence & Machine Learning (AI/ML)',
    issuer: 'GUVi — 6-month course',
  },
]

export const languages = [
  { name: 'English', level: 'Advanced' },
  { name: 'Tamil', level: 'Native' },
]
