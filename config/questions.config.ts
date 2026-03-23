import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q1",
    component: "RADIO",
    selection: "single",
    label: " What do you want to change?",
    subLabel: "Pick the one that feels most like you right now.",
    options: [
      { label: "Lose weight and keep it off", value: "weight_loss" },
      { label: "Build muscle and get stronger", value: "weight_gain" },
      { label: "Get lean and toned", value: "fitness" },
      { label: "Feel healthier and have more energy", value: "fitness" }

    ],
    autoNext: true
  },
  {
    id: "q2",
    component: "RADIO",
    selection: "single",
    label: "What's your biological sex?",
    subLabel: "Used to calculate your metabolic rate accurately.",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Prefer not to say", value: "prefer_not_to_say" }

    ],
    autoNext: true
  },

  // 👉 CUSTOM UI (later you replace with custom component)
  {
    id: "q3",
    component: "RADIO", // 🔥 for now, but will replace with custom input
    selection: "single",
    label: "How old are you?",
    subLabel: "Recovery, hormone levels and training volume all shift with age. This keeps your plan accurate.",
    options: [
      { label: "18-24", value: "18_24" },
      { label: "25-34", value: "25_34" },
      { label: "35-44", value: "35_44" },
      { label: "45-54", value: "45_54" },
      { label: "55+", value: "55_plus" }

    ],
    autoNext: true

  },
  {
    id: "q4",
    component: "HEIGHT", // 🔥 custom UI
    label: "How tall are you?",
    subLabel: "Used to calculate your metabolic rate and healthy weight range."
  },
  {
    id: "q5",
    component: "WEIGHT", // 🔥 custom UI
    label: "What is your weight?",
    subLabel: "This sets your starting baseline.",
  },

  {
    id: "q6",
    component: "EVENT",
    selection: "single",
    label: "Do you have an event coming up?",
    subLabel: "A deadline can be one of the most powerful motivators. We'll build your timeline around it.",
    options: [
      { label: "Wedding", value: "wedding" },
      { label: "Vacation", value: "vacation" },
      { label: "Summer", value: "summer" },
      { label: "Birthday", value: "birthday" },
      { label: "Reunion", value: "reunion" },
      { label: "Other", value: "other" },
    ],
    autoNext: true
  },
  {
    id: "q7",
    component: "RADIO",
    selection: "single",
    label: "How would you describe your current fitness level?",
    options: [
      { label: "New to Exercise", value: "new_to_exercise" },

      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" }
    ],
    autoNext: true
  },
  {
    id: "q8",
    component: "RADIO",
    selection: "single",
    label: "How many days per week can you train?",
    options: [
      { label: "1-2 days", value: "1_2" },
      { label: "3-4 days", value: "3_4" },
      { label: "5-6 days", value: "5_6" },
      { label: "7 days", value: "7" }
    ],
    autoNext: true
  },

  {
    id: "q9",
    component: "NAME",
    label: "What should we call you?"
  },
  {
    id: "q10",
    component: "SELECT",
    selection: "multiple",
    label: "Which days don't work for you?",
    subLabel: "We'll build your program around your schedule, not against it.",
    options: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },


  // 👉 SINGLE SELECT LIST
  {
    id: "q11",
    component: "RADIO",
    selection: "single",
    label: "How long can you train per session?",
    subLabel: "Shorter sessions done consistently outperform longer sessions done occasionally every time.",
    options: [
      { label: "20–30 minutes", value: "20_30" },
      { label: "30–45 minutes", value: "30_45" },
      { label: "45–60 minutes", value: "45_60" },
      { label: "60+ minutes", value: "60_plus" }
    ],
    autoNext: true
  },

  {
    id: "q12",
    component: "RADIO",
    selection: "single",
    label: "Where do you usually train?",
    subLabel: "You can update this anytime if your situation changes.",
    options: [
      { label: "Commercial Gym", value: "commercial_gym" },
      { label: "Home", value: "home" },
      { label: "Condo or Hotel Gym", value: "condo_or_hotel_gym" }
      ,
      { label: "No Equipment", value: "no_equipment" }

    ],
    autoNext: true
  },
  {
    id: "q13",
    component: "EQUIPMENT",
    label: "What equipment do you have access to?",
    subLabel: "Select everything you have. You can add more inside the app anytime.",
  },
  {
    id: "q14",
    component: "WEIGHTS_SETUP",
    label: "Sleep hours per day?",
    subLabel:"This lets us prescribe exact loads in your workouts."
   
  },

  // 👉 FINAL PHASE
  {
    id: "q15",
    component: "INJURY",
    label: "Any areas we should work around?",
    subLabel:"This helps us build a program that's safe for your body. Select all that apply."
    
  },
  {
    id: "q16",
    component: "RADIO",
    selection: "single",
    label: "What usually gets in the way of your progress?",
    subLabel:"Pick the one that hits closest to home.",
    options: [
      { label: "Loss of motivation", value: "morning" },
      { label: "Not Seeing results fast enough", value: "afternoon" },
      { label: "Life gets unpredictable", value: "evening" },
      { label: "I don’t know if i’m doing the right things", value: "evening" },
      { label: "injury or physical limitations", value: "evening" },

    ],
    autoNext: true
  },
  {
    id: "q17",
    component: "RADIO",
    selection: "single",
    label: "How would you describe your eating habits right now?",
    subLabel:"This shapes your nutrition baseline. The more accurate you are, the better your plan will be.",
    options: [
      { label: "On Point", value: "yes" },
      { label: "Pretty goog", value: "no" },
      { label: "Hit or miss", value: "yes" },
      { label: "Needs work", value: "no" },
      { label: "I don’t know where to start", value: "yes" },
    ],
    autoNext: true
  },
  {
    id: "q18",
    component: "RADIO",
    selection: "single",
    label: "What does your eating schedule look like?",
    subLabel:"We'll build your nutrition plan around when you actually eat — not an ideal schedule.",
    options: [
      { label: "3 meals a day", value: "1_2l" },
      { label: "2 larger meals", value: "2_3l" },
      { label: "5 to 6 smaller meals", value: "3l_plus" },
       { label: "intermittent fasting", value: "2_3l" },
      { label: "No set pattern", value: "3l_plus" }
    ],
    autoNext: true
  },
  {
    id: "q19",
    component: "RADIO",
    selection: "single",
    label: "Do you follow any particular way of eating?",
    subLabel:"This filters your entire meal plan so every recipe works for your lifestyle.",
    options: [
      { label: "No restrictions — I eat everything", value: "low" },
      { label: "Vegetarian", value: "medium" },
      { label: "Vegan", value: "high" },
        { label: "Low -carb / keto", value: "low" },
      { label: "Gluten - free", value: "medium" },
      { label: "Dairy - free", value: "high" },
        { label: "Halal", value: "medium" },
      { label: "Kosher", value: "high" }
    ],
    autoNext: true
  },
  {
    id: "q20",
    component: "RADIO",
    selection: "single",
    label: "Motivation level?",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" }
    ],
    autoNext: true
  },
  {
    id: "q21",
    component: "RADIO",
    selection: "single",
    label: "Goal urgency?",
    options: [
      { label: "Slow", value: "slow" },
      { label: "Moderate", value: "moderate" },
      { label: "Fast", value: "fast" }
    ],
    autoNext: true
  }
];