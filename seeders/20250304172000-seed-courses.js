const Institute = require('../src/models/institute.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get all institute IDs
    const institutes = await Institute.findAll({
      attributes: ['id'], // Only fetch the id field
    });

    if (institutes.length === 0) {
      throw new Error('No institutes found. Please seed institutes first.');
    }

    const instituteIds = institutes.map(institute => institute.id);

    const courses = [];
    const batchSize = 1000;

    const courseNames = [
      'Introduction to Programming',
      'Advanced Data Structures',
      'Machine Learning Basics',
      'Cloud Computing 101',
      'Web Development with JavaScript',
      'Database Management Systems',
      'Software Engineering Principles',
      'Algorithms and Complexity',
      'Artificial Intelligence Fundamentals',
      'Computer Networks',
      'Cybersecurity Essentials',
      'Python for Data Science',
      'Mobile App Development',
      'Blockchain Technology',
      'DevOps and Continuous Integration',
      'Natural Language Processing',
      'Computer Vision and Image Processing',
      'Quantum Computing Fundamentals',
      'Ethical Hacking and Penetration Testing',
      'Big Data Analytics',
      'React and Modern Web Frameworks',
      'Internet of Things (IoT) Design',
      'Cryptography and Network Security',
      'Deep Learning Techniques',
      'Full Stack Web Development',
      'Distributed Systems Architecture',
      'Game Development with Unity',
      'Advanced Machine Learning',
      'Computer Graphics and Visualization',
      'Agile Software Development Methodologies',
      'Advanced Robotics and AI Integration',
      'Augmented Reality Development',
      'Cloud Native Application Architecture',
      'Data Visualization and Storytelling',
      'Edge Computing and 5G Technologies',
      'Financial Technology (FinTech) Programming',
      'Green Computing and Sustainable Tech',
      'Healthcare Information Systems',
      'Interactive User Experience Design',
      'Julia Programming for Scientific Computing',
      'Kubernetes and Container Orchestration',
      'Machine Learning Operations (MLOps)',
      'Neural Network Architecture Design',
      'Open Source Software Development',
      'Predictive Analytics and Machine Learning',
      'Quantum Machine Learning',
      'Responsive Web Design Principles',
      'Smart Cities and Urban Technology',
      'Tensor Flow and Advanced Deep Learning',
      'User Privacy and Data Protection',
      'Virtual Reality Application Development',
      'Web3 and Decentralized Technologies',
      'XML and Advanced Data Markup',
      'Zero Trust Security Architecture',
      'Advanced SQL and Database Performance',
      'Bioinformatics Programming',
      'Cloud Security and Compliance',
      'Digital Forensics and Incident Response',
      'Embedded Systems Programming',
      'Frontend Framework Comparison',
      'Grid and Parallel Computing',
      'Human-Computer Interaction Design',
      'Industrial IoT and Sensor Networks',
      'JavaScript Design Patterns',
      'Kotlin Mobile Development',
      'Low-Code and No-Code Platform Development',
      'Microservices Architecture',
      'Network Simulation and Modeling',
      'Operating Systems Internals',
      'Performance Optimization Techniques',
      'Quantum Cryptography',
      'Rapid Prototyping with Python',
      'Semantic Web Technologies',
      'Time Series Analysis and Forecasting',
      'Unsupervised Learning Techniques',
      'Version Control and Git Mastery',
      'Web Scraping and Data Extraction',
      'eXtreme Programming Practices',
    ];

    for (let i = 0; i < 100000; i++) {
      const courseName = courseNames[Math.floor(Math.random() * courseNames.length)];
      const instituteId = instituteIds[Math.floor(Math.random() * instituteIds.length)];

      courses.push({
        title: courseName,
        instituteId: instituteId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Insert in batches to avoid memory issues
      if (courses.length === batchSize) {
        await queryInterface.bulkInsert('Courses', courses, {});
        courses.length = 0; // Reset the array to free memory
      }
    }

    // Insert remaining records that didn't fill a batch
    if (courses.length > 0) {
      await queryInterface.bulkInsert('Courses', courses, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};
