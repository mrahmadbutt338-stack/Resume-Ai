export const educationDegrees = [
  'Matric', 'Intermediate', 'DAE', 'Diploma', "Bachelor's", 'BS Computer Science',
  'Software Engineering', 'BBA', 'MBA', 'MCS', 'MS', 'MPhil', 'PhD', 'Other'
];

export const employmentTypes = [
  'Full-Time', 'Part-Time', 'Internship', 'Freelance', 'Contract', 'Remote', 'Hybrid', 'Other'
];

export const skillOptions = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express.js',
  'MongoDB', 'SQL', 'Tailwind CSS', 'Bootstrap', 'Redux', 'Git', 'GitHub', 'Docker',
  'AWS', 'Firebase', 'REST API', 'GraphQL', 'Python', 'Java', 'PHP', 'Laravel',
  'WordPress', 'Figma', 'Adobe XD', 'Photoshop', 'Canva', 'Communication', 'Leadership',
  'Project Management', 'Problem Solving', 'Teamwork', 'Agile', 'Scrum'
];

export const languageOptions = [
  'English', 'Urdu', 'Arabic', 'French', 'German', 'Chinese', 'Spanish', 'Turkish', 'Japanese', 'Other'
];

export const proficiencyLevels = [
  'Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'
];

export const interestOptions = [
  'Coding', 'Reading', 'Traveling', 'Photography', 'Gaming', 'Cricket', 'Football',
  'Badminton', 'Volleyball', 'Basketball', 'Gym', 'Fitness', 'Music', 'Movies',
  'Writing', 'Cooking', 'Gardening', 'Artificial Intelligence', 'Machine Learning',
  'Web Development', 'Graphic Design', 'Other'
];

// Helper to convert array of strings to react-select options format
export const formatForSelect = (arr) => arr.map(item => ({ value: item, label: item }));
