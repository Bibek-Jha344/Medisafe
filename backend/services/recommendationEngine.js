/**
 * MEDISAFE Rule-Based Recommendation Engine
 * 
 * This module implements a transparent rule-based system to recommend:
 * - Doctor specialties
 * - Physiotherapy guidance
 * - Exercise recommendations
 * - Urgency levels
 * 
 * Rules are clearly defined and explainable for academic/viva purposes.
 */

/**
 * RULE SET 1: Body Part to Specialty Mapping
 */
const bodyPartRules = {
    knee: {
        specialties: ['Orthopedic Surgeon', 'Physiotherapist'],
        doctorIds: ['doc001', 'doc002'],
        physiotherapyNeeded: true,
        exercises: ['Knee Bends (Partial Squats)', 'Leg Raises (Straight)', 'Calf Stretches'],
        exerciseIds: ['ex002', 'ex005', 'ex006'],
        generalGuidance: 'Rest the knee, apply ice for 15-20 minutes every few hours. Avoid high-impact activities.'
    },
    shoulder: {
        specialties: ['Orthopedic Surgeon', 'Physiotherapist'],
        doctorIds: ['doc001', 'doc002'],
        physiotherapyNeeded: true,
        exercises: ['Wall Push-ups', 'Shoulder Rolls', 'Arm Stretches (Cross-body)'],
        exerciseIds: ['ex001', 'ex004', 'ex003'],
        generalGuidance: 'Rest the shoulder. Avoid overhead activities. Apply warm compress for stiffness.'
    },
    back: {
        specialties: ['Orthopedic Surgeon', 'Physiotherapist'],
        doctorIds: ['doc001', 'doc002'],
        physiotherapyNeeded: true,
        exercises: ['Hip Flexor Stretch', 'Calf Stretches'],
        exerciseIds: ['ex008', 'ex006'],
        generalGuidance: 'Maintain good posture. Avoid heavy lifting. Sleep on a firm mattress.'
    },
    neck: {
        specialties: ['Orthopedic Surgeon', 'Physiotherapist', 'Neurologist'],
        doctorIds: ['doc001', 'doc002', 'doc005'],
        physiotherapyNeeded: true,
        exercises: ['Shoulder Rolls', 'Arm Stretches (Cross-body)'],
        exerciseIds: ['ex004', 'ex003'],
        generalGuidance: 'Keep neck in neutral position. Use a supportive pillow. Avoid prolonged screen time.'
    },
    hip: {
        specialties: ['Orthopedic Surgeon', 'Physiotherapist'],
        doctorIds: ['doc001', 'doc002'],
        physiotherapyNeeded: true,
        exercises: ['Hip Flexor Stretch', 'Leg Raises (Straight)', 'Balance Exercise (Single Leg Stand)'],
        exerciseIds: ['ex008', 'ex005', 'ex007'],
        generalGuidance: 'Avoid high-impact exercises. Use supportive footwear. Rest when pain is severe.'
    },
    ankle: {
        specialties: ['Orthopedic Surgeon', 'Physiotherapist'],
        doctorIds: ['doc001', 'doc002'],
        physiotherapyNeeded: true,
        exercises: ['Balance Exercise (Single Leg Stand)', 'Calf Stretches'],
        exerciseIds: ['ex007', 'ex006'],
        generalGuidance: 'RICE method: Rest, Ice, Compression, Elevation. Avoid weight-bearing if severely painful.'
    },
    skin: {
        specialties: ['Dermatologist'],
        doctorIds: ['doc004'],
        physiotherapyNeeded: false,
        exercises: [],
        exerciseIds: [],
        generalGuidance: 'Keep the affected area clean and dry. Avoid scratching. Note any new medications.'
    },
    chest: {
        specialties: ['Cardiologist', 'General Physician'],
        doctorIds: ['doc006', 'doc003'],
        physiotherapyNeeded: false,
        exercises: [],
        exerciseIds: [],
        generalGuidance: 'IMPORTANT: Seek immediate medical attention if chest pain is severe, crushing, or accompanied by shortness of breath.'
    },
    head: {
        specialties: ['Neurologist', 'General Physician'],
        doctorIds: ['doc005', 'doc003'],
        physiotherapyNeeded: false,
        exercises: [],
        exerciseIds: [],
        generalGuidance: 'Rest in a quiet, dark room. Stay hydrated. Avoid screen time. Track headache patterns.'
    },
    general: {
        specialties: ['General Physician'],
        doctorIds: ['doc003'],
        physiotherapyNeeded: false,
        exercises: [],
        exerciseIds: [],
        generalGuidance: 'Monitor symptoms. Stay hydrated and rested. Consult a doctor if symptoms persist beyond 3 days.'
    }
};

/**
 * RULE SET 2: Pain Level Rules
 * Rule: IF painLevel >= 8 THEN recommend urgent professional consultation
 * Rule: IF painLevel >= 5 THEN recommend doctor consultation
 * Rule: IF painLevel <= 3 THEN provide self-care guidance
 */
const getPainLevelUrgency = (painLevel) => {
    if (painLevel >= 8) {
        return {
            urgency: 'high',
            urgencyMessage: 'Severe pain detected. Please seek professional medical consultation as soon as possible.',
            urgencyColor: 'red',
            consultationRequired: true
        };
    } else if (painLevel >= 5) {
        return {
            urgency: 'moderate',
            urgencyMessage: 'Moderate pain detected. Schedule a consultation with the recommended specialist.',
            urgencyColor: 'orange',
            consultationRequired: true
        };
    } else {
        return {
            urgency: 'low',
            urgencyMessage: 'Mild discomfort. Self-care measures and guided exercises may help. Monitor symptoms.',
            urgencyColor: 'green',
            consultationRequired: false
        };
    }
};

/**
 * RULE SET 3: Duration Rules
 * Rule: IF duration > 4 weeks THEN chronic condition suspected, specialist needed
 * Rule: IF duration 1-4 weeks THEN subacute, physiotherapy recommended
 * Rule: IF duration < 1 week THEN acute, self-care first
 */
const getDurationAssessment = (duration) => {
    const durationMap = {
        'less_than_week': { phase: 'Acute', recommendation: 'Rest and self-care for 2-3 days. If no improvement, consult a doctor.' },
        'one_to_two_weeks': { phase: 'Subacute', recommendation: 'Physiotherapy and guided exercise program recommended.' },
        'two_to_four_weeks': { phase: 'Subacute-Chronic', recommendation: 'Specialist consultation and physiotherapy program recommended.' },
        'more_than_month': { phase: 'Chronic', recommendation: 'Specialist consultation required. Comprehensive rehabilitation program needed.' }
    };
    return durationMap[duration] || durationMap['one_to_two_weeks'];
};

/**
 * RULE SET 4: Mobility Rules
 * Rule: IF mobilityDifficulty == "high" THEN recommend physiotherapist as first contact
 * Rule: IF mobilityDifficulty == "moderate" THEN recommend physiotherapy alongside specialist
 * Rule: IF mobilityDifficulty == "low" THEN basic exercise program sufficient
 */
const getMobilityAssessment = (mobilityDifficulty) => {
    if (mobilityDifficulty === 'high') {
        return {
            physioUrgent: true,
            message: 'Significant mobility limitation detected. Physiotherapy is strongly recommended as a priority.'
        };
    } else if (mobilityDifficulty === 'moderate') {
        return {
            physioUrgent: false,
            message: 'Moderate mobility limitation. Combined physiotherapy and medical treatment recommended.'
        };
    } else {
        return {
            physioUrgent: false,
            message: 'Mild mobility limitation. Guided exercise program should help restore full function.'
        };
    }
};

/**
 * MAIN RECOMMENDATION ENGINE FUNCTION
 * Applies all rule sets and generates final recommendation
 */
const analyzeSymptoms = (symptomData) => {
    const { bodyPart, symptoms = [], painLevel = 5, duration = 'one_to_two_weeks', mobilityDifficulty = 'moderate', additionalNotes = '' } = symptomData;

    // Normalize body part
    const normalizedBodyPart = (bodyPart || 'general').toLowerCase();

    // Apply Rule Set 1: Body Part Rules
    const bodyPartResult = bodyPartRules[normalizedBodyPart] || bodyPartRules.general;

    // Apply Rule Set 2: Pain Level Rules
    const painAssessment = getPainLevelUrgency(parseInt(painLevel));

    // Apply Rule Set 3: Duration Rules
    const durationAssessment = getDurationAssessment(duration);

    // Apply Rule Set 4: Mobility Rules
    const mobilityAssessment = getMobilityAssessment(mobilityDifficulty);

    // RULE: If chest pain with high pain level -> Emergency
    const isEmergency = (normalizedBodyPart === 'chest' && parseInt(painLevel) >= 7);

    // RULE: Determine if physiotherapy is recommended
    const physiotherapyRecommended = bodyPartResult.physiotherapyNeeded ||
        mobilityAssessment.physioUrgent ||
        durationAssessment.phase.includes('Chronic');

    // Compose final recommendation
    const recommendation = {
        success: true,
        bodyPart: normalizedBodyPart,
        symptoms: symptoms,
        painLevel: parseInt(painLevel),
        duration: duration,
        mobilityDifficulty: mobilityDifficulty,

        // Assessment results
        urgency: painAssessment.urgency,
        urgencyMessage: painAssessment.urgencyMessage,
        urgencyColor: painAssessment.urgencyColor,
        consultationRequired: painAssessment.consultationRequired,

        isEmergency: isEmergency,
        emergencyMessage: isEmergency ? 'EMERGENCY: Severe chest pain may indicate a cardiac event. Call emergency services immediately.' : null,

        // Condition phase
        conditionPhase: durationAssessment.phase,
        phaseRecommendation: durationAssessment.recommendation,

        // Mobility
        mobilityMessage: mobilityAssessment.message,

        // Doctor recommendations
        recommendedSpecialties: bodyPartResult.specialties,
        recommendedDoctorIds: bodyPartResult.doctorIds,

        // Physiotherapy
        physiotherapyRecommended: physiotherapyRecommended,
        recommendedExercises: bodyPartResult.exercises,
        recommendedExerciseIds: bodyPartResult.exerciseIds,

        // General guidance
        generalGuidance: bodyPartResult.generalGuidance,

        // Rule explanation (for academic transparency)
        rulesApplied: [
            `Body Part Rule: ${normalizedBodyPart} → ${bodyPartResult.specialties.join(', ')}`,
            `Pain Level Rule: Level ${painLevel}/10 → Urgency: ${painAssessment.urgency}`,
            `Duration Rule: ${duration} → Phase: ${durationAssessment.phase}`,
            `Mobility Rule: ${mobilityDifficulty} difficulty → Physiotherapy ${physiotherapyRecommended ? 'recommended' : 'optional'}`
        ],

        timestamp: new Date().toISOString()
    };

    return recommendation;
};

module.exports = { analyzeSymptoms, bodyPartRules, getPainLevelUrgency, getDurationAssessment, getMobilityAssessment };
