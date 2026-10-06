// Demo/seed data for MEDISAFE - used when MongoDB is not available or for initial setup
const bcrypt = require('bcryptjs');

const demoUsers = [
    {
        _id: 'user001',
        name: 'Bibek Jha',
        email: 'bibek@medisafe.com',
        password: bcrypt.hashSync('patient123', 10),
        phone: '+91-9876543210',
        role: 'patient',
        age: 24,
        gender: 'male',
        bloodGroup: 'B+',
        address: 'Kathmandu, Nepal',
        medicalHistory: ['Mild knee pain', 'Seasonal allergies'],
        createdAt: new Date('2024-01-15')
    },
    {
        _id: 'admin001',
        name: 'Admin User',
        email: 'admin@medisafe.com',
        password: bcrypt.hashSync('admin123', 10),
        phone: '+91-9999999999',
        role: 'admin',
        createdAt: new Date('2024-01-01')
    }
];

const demoDoctors = [
    {
        _id: 'doc001',
        name: 'Dr. Anjali Sharma',
        specialty: 'Orthopedic Surgeon',
        qualification: 'MBBS, MS (Ortho)',
        experience: 12,
        hospital: 'City Medical Center',
        location: 'Kathmandu, Nepal',
        phone: '+91-9811111111',
        email: 'anjali.sharma@medisafe.com',
        rating: 4.8,
        reviewCount: 156,
        consultationFee: 500,
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        bio: 'Dr. Anjali Sharma is a highly experienced orthopedic surgeon specializing in knee and hip replacements, sports injuries, and musculoskeletal disorders.',
        image: 'doctor1.jpg',
        specializations: ['Knee Surgery', 'Hip Replacement', 'Sports Injuries', 'Fracture Management']
    },
    {
        _id: 'doc002',
        name: 'Dr. Raj Mehta',
        specialty: 'Physiotherapist',
        qualification: 'BPT, MPT (Musculoskeletal)',
        experience: 8,
        hospital: 'Healing Hands Physiotherapy',
        location: 'Lalitpur, Nepal',
        phone: '+91-9822222222',
        email: 'raj.mehta@medisafe.com',
        rating: 4.9,
        reviewCount: 203,
        consultationFee: 350,
        availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
        availableSlots: ['08:00', '09:00', '10:00', '11:00', '15:00', '16:00', '17:00'],
        bio: 'Dr. Raj Mehta is a certified physiotherapist with expertise in musculoskeletal rehabilitation, sports physiotherapy, and post-surgical recovery.',
        image: 'doctor2.jpg',
        specializations: ['Sports Rehabilitation', 'Post-Surgical Recovery', 'Chronic Pain Management', 'Posture Correction']
    },
    {
        _id: 'doc003',
        name: 'Dr. Priya Singh',
        specialty: 'General Physician',
        qualification: 'MBBS, MD (General Medicine)',
        experience: 15,
        hospital: 'MediCare Hospital',
        location: 'Bhaktapur, Nepal',
        phone: '+91-9833333333',
        email: 'priya.singh@medisafe.com',
        rating: 4.7,
        reviewCount: 312,
        consultationFee: 400,
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
        bio: 'Dr. Priya Singh is a seasoned general physician with extensive experience in diagnosing and treating a wide range of medical conditions.',
        image: 'doctor3.jpg',
        specializations: ['Internal Medicine', 'Preventive Care', 'Chronic Disease Management', 'Geriatrics']
    },
    {
        _id: 'doc004',
        name: 'Dr. Arun Kumar',
        specialty: 'Dermatologist',
        qualification: 'MBBS, MD (Dermatology)',
        experience: 10,
        hospital: 'SkinCare Clinic',
        location: 'Kathmandu, Nepal',
        phone: '+91-9844444444',
        email: 'arun.kumar@medisafe.com',
        rating: 4.6,
        reviewCount: 178,
        consultationFee: 600,
        availableDays: ['Tuesday', 'Thursday', 'Saturday'],
        availableSlots: ['10:00', '11:00', '14:00', '15:00', '16:00'],
        bio: 'Dr. Arun Kumar is a specialist dermatologist treating skin disorders, cosmetic concerns, and allergic conditions.',
        image: 'doctor4.jpg',
        specializations: ['Skin Disorders', 'Cosmetic Dermatology', 'Allergic Conditions', 'Hair & Nail Disorders']
    },
    {
        _id: 'doc005',
        name: 'Dr. Sunita Rai',
        specialty: 'Neurologist',
        qualification: 'MBBS, DM (Neurology)',
        experience: 18,
        hospital: 'NeuroHealth Institute',
        location: 'Kathmandu, Nepal',
        phone: '+91-9855555555',
        email: 'sunita.rai@medisafe.com',
        rating: 4.9,
        reviewCount: 245,
        consultationFee: 800,
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        bio: 'Dr. Sunita Rai is a renowned neurologist specializing in headache disorders, epilepsy, stroke, and movement disorders.',
        image: 'doctor5.jpg',
        specializations: ['Epilepsy', 'Stroke', 'Headache Disorders', 'Movement Disorders']
    },
    {
        _id: 'doc006',
        name: 'Dr. Bikash Thapa',
        specialty: 'Cardiologist',
        qualification: 'MBBS, MD, DM (Cardiology)',
        experience: 20,
        hospital: 'Heart Care Hospital',
        location: 'Lalitpur, Nepal',
        phone: '+91-9866666666',
        email: 'bikash.thapa@medisafe.com',
        rating: 4.8,
        reviewCount: 289,
        consultationFee: 900,
        availableDays: ['Monday', 'Tuesday', 'Thursday'],
        availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        bio: 'Dr. Bikash Thapa is a leading cardiologist with expertise in interventional cardiology, heart failure management, and cardiac rehabilitation.',
        image: 'doctor6.jpg',
        specializations: ['Interventional Cardiology', 'Heart Failure', 'Hypertension', 'Cardiac Rehabilitation']
    }
];

const demoAppointments = [
    {
        _id: 'apt001',
        patientId: 'user001',
        patientName: 'Bibek Jha',
        doctorId: 'doc001',
        doctorName: 'Dr. Anjali Sharma',
        specialty: 'Orthopedic Surgeon',
        date: new Date('2024-02-15'),
        time: '10:00',
        status: 'completed',
        reason: 'Knee pain and difficulty walking',
        notes: 'Mild knee osteoarthritis detected. Physiotherapy recommended.',
        createdAt: new Date('2024-02-10')
    },
    {
        _id: 'apt002',
        patientId: 'user001',
        patientName: 'Bibek Jha',
        doctorId: 'doc002',
        doctorName: 'Dr. Raj Mehta',
        specialty: 'Physiotherapist',
        date: new Date('2024-02-20'),
        time: '09:00',
        status: 'completed',
        reason: 'Physiotherapy for knee rehabilitation',
        notes: 'Started knee strengthening program.',
        createdAt: new Date('2024-02-16')
    },
    {
        _id: 'apt003',
        patientId: 'user001',
        patientName: 'Bibek Jha',
        doctorId: 'doc001',
        doctorName: 'Dr. Anjali Sharma',
        specialty: 'Orthopedic Surgeon',
        date: new Date('2024-03-10'),
        time: '14:00',
        status: 'confirmed',
        reason: 'Follow-up for knee assessment',
        notes: '',
        createdAt: new Date('2024-03-01')
    }
];

const demoPrescriptions = [
    {
        _id: 'prx001',
        patientId: 'user001',
        doctorId: 'doc001',
        doctorName: 'Dr. Anjali Sharma',
        date: new Date('2024-02-15'),
        diagnosis: 'Mild Knee Osteoarthritis',
        medicines: [
            { name: 'Diclofenac Sodium 50mg', dosage: '1 tablet', frequency: 'Twice daily after meals', duration: '10 days' },
            { name: 'Glucosamine 500mg', dosage: '1 tablet', frequency: 'Once daily', duration: '3 months' },
            { name: 'Calcium + Vitamin D3', dosage: '1 tablet', frequency: 'Once daily', duration: '3 months' }
        ],
        instructions: 'Avoid strenuous exercise. Apply ice pack for 15 minutes after any pain episode. Follow up in 3 weeks.',
        followUp: new Date('2024-03-10'),
        fileName: 'prescription_20240215.pdf',
        createdAt: new Date('2024-02-15')
    },
    {
        _id: 'prx002',
        patientId: 'user001',
        doctorId: 'doc003',
        doctorName: 'Dr. Priya Singh',
        date: new Date('2024-01-20'),
        diagnosis: 'Seasonal Allergic Rhinitis',
        medicines: [
            { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily at night', duration: '2 weeks' },
            { name: 'Fluticasone Nasal Spray', dosage: '2 puffs each nostril', frequency: 'Once daily morning', duration: '2 weeks' }
        ],
        instructions: 'Avoid dust and pollen. Use mask outdoors during high pollen season.',
        followUp: null,
        fileName: 'prescription_20240120.pdf',
        createdAt: new Date('2024-01-20')
    }
];

const demoExercises = [
    {
        _id: 'ex001',
        name: 'Wall Push-ups',
        category: 'Upper Body',
        targetArea: 'Chest, Shoulders, Arms',
        difficulty: 'Beginner',
        duration: '10 minutes',
        repetitions: '3 sets of 10',
        instructions: [
            'Stand facing a wall, about arm\'s length away',
            'Place both palms flat on the wall at shoulder height',
            'Keep your body straight from head to heels',
            'Slowly bend your elbows, bringing your chest toward the wall',
            'Push back to the starting position',
            'Breathe in as you bend, breathe out as you push'
        ],
        benefits: 'Strengthens chest, shoulder, and arm muscles with minimal joint stress. Ideal for post-surgery recovery.',
        safetyGuidance: 'Stop if you feel sharp pain. Keep core engaged. Do not lock elbows at full extension.',
        image: 'wall-pushups.jpg',
        condition: ['shoulder pain', 'post-surgery', 'upper body weakness']
    },
    {
        _id: 'ex002',
        name: 'Knee Bends (Partial Squats)',
        category: 'Lower Body',
        targetArea: 'Quadriceps, Hamstrings, Glutes',
        difficulty: 'Beginner',
        duration: '10 minutes',
        repetitions: '3 sets of 12',
        instructions: [
            'Stand with feet shoulder-width apart, hold a chair for support',
            'Keep your back straight and core tight',
            'Slowly bend your knees, lowering your body partway (45 degrees)',
            'Hold for 2 seconds at the bottom',
            'Slowly straighten your knees back to standing',
            'Do not let knees go past your toes'
        ],
        benefits: 'Strengthens leg muscles supporting the knee joint. Reduces knee pain over time.',
        safetyGuidance: 'Do not squat fully if recovering from knee surgery. Stop if pain increases. Use chair support initially.',
        image: 'knee-bends.jpg',
        condition: ['knee pain', 'knee surgery recovery', 'lower body weakness']
    },
    {
        _id: 'ex003',
        name: 'Arm Stretches (Cross-body)',
        category: 'Stretching',
        targetArea: 'Shoulders, Upper Back',
        difficulty: 'Beginner',
        duration: '5 minutes',
        repetitions: 'Hold 30 seconds each side, 3 times',
        instructions: [
            'Stand or sit in a comfortable position',
            'Bring your right arm across your chest',
            'Use your left hand to gently press the arm closer to your chest',
            'Hold for 20-30 seconds, feeling a stretch in the shoulder',
            'Slowly release and switch arms',
            'Repeat 3 times on each side'
        ],
        benefits: 'Improves shoulder flexibility and range of motion. Relieves shoulder tension.',
        safetyGuidance: 'Do not force the stretch. If pain occurs in the shoulder joint, stop immediately.',
        image: 'arm-stretches.jpg',
        condition: ['shoulder pain', 'neck pain', 'upper body stiffness']
    },
    {
        _id: 'ex004',
        name: 'Shoulder Rolls',
        category: 'Mobility',
        targetArea: 'Shoulders, Neck',
        difficulty: 'Beginner',
        duration: '5 minutes',
        repetitions: '10 forward, 10 backward',
        instructions: [
            'Sit or stand with your back straight',
            'Relax your arms at your sides',
            'Slowly roll both shoulders forward in a circular motion',
            'Make the circle as large as comfortable',
            'Complete 10 forward rolls, then reverse direction',
            'Breathe steadily throughout'
        ],
        benefits: 'Improves shoulder mobility, relieves tension, and prevents stiffness.',
        safetyGuidance: 'Keep movements slow and controlled. Stop if you feel clicking pain (not just clicking sound).',
        image: 'shoulder-rolls.jpg',
        condition: ['shoulder pain', 'neck pain', 'posture issues']
    },
    {
        _id: 'ex005',
        name: 'Leg Raises (Straight)',
        category: 'Lower Body',
        targetArea: 'Quadriceps, Hip Flexors, Core',
        difficulty: 'Beginner',
        duration: '10 minutes',
        repetitions: '3 sets of 10 each leg',
        instructions: [
            'Lie flat on your back on a mat',
            'Keep one knee bent with foot flat on floor',
            'Tighten the thigh muscle of your straight leg',
            'Slowly raise the straight leg to about 45 degrees',
            'Hold for 2 seconds',
            'Slowly lower the leg back down',
            'Repeat with the other leg'
        ],
        benefits: 'Strengthens quadriceps without putting stress on the knee joint. Essential for knee rehabilitation.',
        safetyGuidance: 'Keep lower back pressed to the floor. Do not raise leg higher than 45 degrees initially.',
        image: 'leg-raises.jpg',
        condition: ['knee pain', 'hip pain', 'lower body weakness']
    },
    {
        _id: 'ex006',
        name: 'Calf Stretches',
        category: 'Stretching',
        targetArea: 'Calf, Achilles Tendon',
        difficulty: 'Beginner',
        duration: '5 minutes',
        repetitions: 'Hold 30 seconds each side, 3 times',
        instructions: [
            'Stand facing a wall with arms outstretched',
            'Place one foot forward and one foot back',
            'Keep your back heel on the ground',
            'Lean forward toward the wall until you feel a stretch in the back calf',
            'Hold for 30 seconds',
            'Switch legs and repeat'
        ],
        benefits: 'Improves ankle flexibility, prevents Achilles tendon issues, supports knee and hip health.',
        safetyGuidance: 'Do not bounce during the stretch. Keep back knee slightly bent for deeper calf stretch.',
        image: 'calf-stretches.jpg',
        condition: ['ankle pain', 'foot pain', 'calf tightness']
    },
    {
        _id: 'ex007',
        name: 'Balance Exercise (Single Leg Stand)',
        category: 'Balance',
        targetArea: 'Ankles, Core, Hips',
        difficulty: 'Intermediate',
        duration: '5 minutes',
        repetitions: 'Hold 30 seconds each leg, 3 times',
        instructions: [
            'Stand next to a chair for support if needed',
            'Shift your weight to one foot',
            'Slowly lift the other foot off the ground',
            'Try to maintain balance for 30 seconds',
            'Look at a fixed point on the wall to help with balance',
            'Switch to the other foot'
        ],
        benefits: 'Improves balance, strengthens ankle stabilizers, reduces fall risk in elderly patients.',
        safetyGuidance: 'Always have a chair or wall nearby. Start with shorter holds and build up.',
        image: 'balance-stand.jpg',
        condition: ['balance issues', 'ankle pain', 'elderly care', 'fall prevention']
    },
    {
        _id: 'ex008',
        name: 'Hip Flexor Stretch',
        category: 'Stretching',
        targetArea: 'Hip Flexors, Groin',
        difficulty: 'Beginner',
        duration: '5 minutes',
        repetitions: 'Hold 30 seconds each side, 3 times',
        instructions: [
            'Kneel on your right knee with left foot forward',
            'Keep your torso upright',
            'Gently push your hips forward until you feel a stretch in your right hip',
            'Hold for 20-30 seconds',
            'Slowly release and switch sides',
            'Keep core tight to protect your lower back'
        ],
        benefits: 'Reduces hip tightness, improves posture, beneficial for those who sit for long periods.',
        safetyGuidance: 'Place a cushion under the kneeling knee. Do not overarch the lower back.',
        image: 'hip-stretch.jpg',
        condition: ['hip pain', 'lower back pain', 'posture issues', 'sedentary lifestyle']
    }
];

const demoProgress = [
    {
        _id: 'prg001',
        patientId: 'user001',
        date: new Date('2024-02-01'),
        exercisesCompleted: 3,
        totalExercises: 5,
        painLevel: 7,
        mobilityScore: 45,
        recoveryScore: 38,
        jointAngles: { rightKnee: 55, leftKnee: 90, rightElbow: 120, leftElbow: 125 },
        notes: 'First session. Pain moderate.'
    },
    {
        _id: 'prg002',
        patientId: 'user001',
        date: new Date('2024-02-08'),
        exercisesCompleted: 4,
        totalExercises: 5,
        painLevel: 6,
        mobilityScore: 52,
        recoveryScore: 48,
        jointAngles: { rightKnee: 65, leftKnee: 92, rightElbow: 122, leftElbow: 127 },
        notes: 'Improved slightly. Less morning stiffness.'
    },
    {
        _id: 'prg003',
        patientId: 'user001',
        date: new Date('2024-02-15'),
        exercisesCompleted: 5,
        totalExercises: 5,
        painLevel: 5,
        mobilityScore: 62,
        recoveryScore: 58,
        jointAngles: { rightKnee: 75, leftKnee: 93, rightElbow: 124, leftElbow: 128 },
        notes: 'Good improvement. Completing all exercises.'
    },
    {
        _id: 'prg004',
        patientId: 'user001',
        date: new Date('2024-02-22'),
        exercisesCompleted: 5,
        totalExercises: 5,
        painLevel: 4,
        mobilityScore: 70,
        recoveryScore: 67,
        jointAngles: { rightKnee: 82, leftKnee: 94, rightElbow: 126, leftElbow: 130 },
        notes: 'Significant progress. Reduced pain medication.'
    },
    {
        _id: 'prg005',
        patientId: 'user001',
        date: new Date('2024-03-01'),
        exercisesCompleted: 5,
        totalExercises: 5,
        painLevel: 3,
        mobilityScore: 78,
        recoveryScore: 75,
        jointAngles: { rightKnee: 90, leftKnee: 95, rightElbow: 128, leftElbow: 132 },
        notes: 'Walking without significant pain. Continuing exercises.'
    },
    {
        _id: 'prg006',
        patientId: 'user001',
        date: new Date('2024-03-08'),
        exercisesCompleted: 5,
        totalExercises: 5,
        painLevel: 2,
        mobilityScore: 85,
        recoveryScore: 82,
        jointAngles: { rightKnee: 98, leftKnee: 96, rightElbow: 130, leftElbow: 133 },
        notes: 'Great progress. Near full mobility restored.'
    }
];

const demoRecommendations = [
    {
        bodyPart: 'knee',
        symptoms: ['pain', 'swelling', 'stiffness'],
        urgency: 'moderate',
        recommendedSpecialty: ['Orthopedic Surgeon', 'Physiotherapist'],
        recommendedDoctors: ['doc001', 'doc002'],
        physiotherapyNeeded: true,
        generalGuidance: 'Apply ice for 15-20 minutes. Rest the joint. Elevate the leg when seated.',
        exercises: ['ex002', 'ex005'],
        followUpIn: '2 weeks'
    }
];

module.exports = {
    demoUsers,
    demoDoctors,
    demoAppointments,
    demoPrescriptions,
    demoExercises,
    demoProgress,
    demoRecommendations
};
