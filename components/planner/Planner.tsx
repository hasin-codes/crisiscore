import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, AlertTriangle, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Groq from 'groq-sdk';

interface Task {
  id: number;
  description: string;
}

interface PlannerData {
  alert: {
    title: string;
    description: string;
  };
  tasks: Task[];
}

interface WindyData {
  ts: number[];
  units: {
    "wind_u-surface": string;
    "wind_v-surface": string;
    "temp-surface": string;
    "past3hprecip-surface": string;
  };
  "wind_u-surface": number[];
  "wind_v-surface": number[];
  "temp-surface": number[];
  "past3hprecip-surface": number[];
  warning: string;
}

export default function Planner({ windyData }: { windyData: WindyData }) {
  const [plannerData, setPlannerData] = useState<PlannerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlannerData = async () => {
    setIsLoading(true);
    const groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      dangerouslyAllowBrowser: true
    });
    
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "System Instruction for CrisisCore AI\n\nData Input:\n\n- Timestamps (ts): Provided as Unix epoch timestamps (in milliseconds), corresponding to specific times for weather data points.\n- Variables: The dataset includes weather-related variables with units:\n  - wind_u-surface: Zonal wind component (east or west) in meters per second (m/s).\n  - wind_v-surface: Meridional wind component (north or south) in meters per second (m/s).\n  - temp-surface: Surface temperature in Kelvin (K).\n  - past3hprecip-surface: Precipitation accumulated over the past three hours in meters (m).\n\nNext Steps:\n\n1. Convert Timestamps: Convert the ts values to human-readable dates and times.\n2. Visualize Data: Plot the time series data for each variable (temperature, wind speed, etc.) to identify trends.\n3. Data Cleaning: Verify the dataset for missing or erroneous values.\n4. Analysis:\n   - Compute wind speed and direction using wind_u and wind_v.\n   - Examine temperature and precipitation data for patterns or anomalies.\n\nCrisis Assessment and Disaster Identification:\n\n1. Input Handling:\n   - Gather forecast information for the next 3-4 hours, focusing on temperature, precipitation, wind speed, humidity, and meteorological warnings.\n\n2. Disaster Identification:\n   Analyze the data to determine if the situation indicates a disaster, probable disaster, or normal conditions. Identify disaster types and symptoms:\n   - Floods: Rising water levels, continuous rainfall, waterlogging, and warnings.\n   - Cyclones: Heavy rain, strong winds, rapid pressure drops, tidal surges, and alerts.\n   - Tornadoes: Thunderstorms, wind rotation, dark funnel-shaped clouds, and gusts.\n   - Landslides: Soil shifting, cracks, tilted trees, and water runoff.\n   - Heatwaves: Temperatures above 37°C, dry conditions, and heat-related warnings.\n   - Cold Waves: Temperatures below 13°C, frosty conditions, and fog.\n   - Riverbank Erosion: Changes in river current, land subsidence, or flooding near inhabited areas.\n   - Lightning Strikes: Dark clouds, lightning flashes, and thunder.\n   - Droughts: Low rainfall, water shortages, dry crops, and cracked soil.\n\n3. Disaster Preparedness Planner:\n   Generate an Instant Planner based on the situation analysis.\n\n4. Action-Based Planner for the Next 3-4 Hours:\n   - Risk Identification: Use analyzed data to identify and prioritize immediate threats like floods or cyclones.\n   - Action Timeline: Provide a time-based sequence of actions:\n     - 0-30 minutes: Move valuables to higher ground and unplug electronics.\n     - 30-60 minutes: Prepare emergency kits and monitor news.\n     - 60-120 minutes: Evacuate if necessary and seek higher ground.\n     - After 120 minutes: Stay indoors or in a safe shelter until further updates.\n\nAt least 15 Plan must be present. Note that you will tell him what to do and how to do, not like Prepare for this and that, give him direct ideas on what to do. Each point should be 2/3 line elaborated so he can understand what he has to do\n  GIVE OUTPUT as JSON \n\n{\n  \"alert\": {\n    \"title\": \"Alert\",\n    \"description\": \"\"\n  },\n  \"tasks\": [\n    {\n      \"id\": ,\n      \"description\": \" \"\n    }\n\n\n\nExample output for \n\n{\n  \"alert\": {\n    \"title\": \"Alert\",\n    \"description\": \"23CM Rainfall in last 30 mins, 2 hours very heavy rainshower incoming\"\n  },\n  \"tasks\": [\n    {\n      \"id\": 1,\n      \"description\": \"Gather important papers and put them in a waterproof bag or container. Use a zip-lock bag if you have one.\"\n    },\n    {\n      \"id\": 2,\n      \"description\": \"Move to higher ground if you're in a low-lying area. Go to the highest floor of your building if you can't leave.\"\n    },\n    {\n      \"id\": 3,\n      \"description\": \"Prepare an emergency kit with food, water, medicines, and a flashlight. Put it in a waterproof bag.\"\n    },\n    {\n      \"id\": 4,\n      \"description\": \"Turn off electricity, gas, and water supplies if it's safe to do so.\"\n    },\n    {\n      \"id\": 5,\n      \"description\": \"Stay away from flood water. It may be dirty or have electric currents.\"\n    },\n    {\n      \"id\": 6,\n      \"description\": \"Keep your phone charged and listen to local news for updates.\"\n    },\n    {\n      \"id\": 7,\n      \"description\": \"Help your neighbors, especially elderly or disabled people, if you can do so safely.\"\n    },\n    {\n      \"id\": 8,\n      \"description\": \"Don't drive through flooded areas. Your car can be swept away in just 30cm of water.\"\n    },\n    {\n      \"id\": 9,\n      \"description\": \"Be ready to leave quickly if told to evacuate. Know where the nearest safe place is.\"\n    },\n    {\n      \"id\": 10,\n      \"description\": \"If you're trapped, go to the roof and signal for help. Use a bright cloth or flashlight.\"\n    },\n    {\n      \"id\": 11,\n      \"description\": \"Secure loose items outside your home that could be swept away by flood waters.\"\n    },\n    {\n      \"id\": 12,\n      \"description\": \"Fill clean containers with drinking water in case the water supply becomes contaminated.\"\n    },\n    {\n      \"id\": 13,\n      \"description\": \"Move valuable items and electronics to higher levels in your home.\"\n    },\n    {\n      \"id\": 14,\n      \"description\": \"Wear protective clothing and footwear if you must walk through flood water.\"\n    },\n    {\n      \"id\": 15,\n      \"description\": \"Be cautious of snakes and other animals that may have been displaced by flood waters.\"\n    },\n    {\n      \"id\": 16,\n      \"description\": \"If you smell gas or suspect a leak, leave immediately and inform authorities.\"\n    },\n    {\n      \"id\": 17,\n      \"description\": \"Use your mobile phone sparingly to conserve battery life.\"\n    },\n    {\n      \"id\": 18,\n      \"description\": \"If you have time, consider helping neighbors move their valuables to higher ground.\"\n    },\n    {\n      \"id\": 19,\n      \"description\": \"Keep children and pets indoors and away from flood waters.\"\n    },\n    {\n      \"id\": 20,\n      \"description\": \"If you have a water pump, make sure it's working and ready to use.\"\n    },\n    {\n      \"id\": 21,\n      \"description\": \"Be prepared for power outages. Have flashlights and batteries ready.\"\n    },\n    {\n      \"id\": 22,\n      \"description\": \"If you have a generator, ensure it's in working condition and has fuel.\"\n    },\n    {\n      \"id\": 23,\n      \"description\": \"Monitor the structural integrity of your home. If you notice any cracks or shifting, evacuate immediately.\"\n    },\n    {\n      \"id\": 24,\n      \"description\": \"Have a designated family meeting point in case you get separated.\"\n    },\n    {\n      \"id\": 25,\n      \"description\": \"Stay calm and reassure family members, especially children and elderly.\"\n    }\n  ]\n}\n"
          },
          {
            role: "user",
            content: JSON.stringify({
              referenceData: {
                alert: {
                  title: "Alert",
                  description: "23CM Rainfall in last 30 mins, 2 hours very heavy rainshower incoming"
                },
                tasks: [
                  {
                    id: 1,
                    description: "Gather important papers and put them in a waterproof bag or container. Use a zip-lock bag if you have one."
                  },
                  {
                    id: 2,
                    description: "Move to higher ground if you're in a low-lying area. Go to the highest floor of your building if you can't leave."
                  },
                  {
                    id: 3,
                    description: "Prepare an emergency kit with food, water, medicines, and a flashlight. Put it in a waterproof bag."
                  },
                  {
                    id: 4,
                    description: "Turn off electricity, gas, and water supplies if it's safe to do so."
                  },
                  {
                    id: 5,
                    description: "Stay away from flood water. It may be dirty or have electric currents."
                  },
                  {
                    id: 6,
                    description: "Keep your phone charged and listen to local news for updates."
                  },
                  {
                    id: 7,
                    description: "Help your neighbors, especially elderly or disabled people, if you can do so safely."
                  },
                  {
                    id: 8,
                    description: "Don't drive through flooded areas. Your car can be swept away in just 30cm of water."
                  },
                  {
                    id: 9,
                    description: "Be ready to leave quickly if told to evacuate. Know where the nearest safe place is."
                  },
                  {
                    id: 10,
                    description: "If you're trapped, go to the roof and signal for help. Use a bright cloth or flashlight."
                  },
                  {
                    id: 11,
                    description: "Secure loose items outside your home that could be swept away by flood waters."
                  },
                  {
                    id: 12,
                    description: "Fill clean containers with drinking water in case the water supply becomes contaminated."
                  },
                  {
                    id: 13,
                    description: "Move valuable items and electronics to higher levels in your home."
                  },
                  {
                    id: 14,
                    description: "Wear protective clothing and footwear if you must walk through flood water."
                  },
                  {
                    id: 15,
                    description: "Be cautious of snakes and other animals that may have been displaced by flood waters."
                  },
                  {
                    id: 16,
                    description: "If you smell gas or suspect a leak, leave immediately and inform authorities."
                  },
                  {
                    id: 17,
                    description: "Use your mobile phone sparingly to conserve battery life."
                  },
                  {
                    id: 18,
                    description: "If you have time, consider helping neighbors move their valuables to higher ground."
                  },
                  {
                    id: 19,
                    description: "Keep children and pets indoors and away from flood waters."
                  },
                  {
                    id: 20,
                    description: "If you have a water pump, make sure it's working and ready to use."
                  },
                  {
                    id: 21,
                    description: "Be prepared for power outages. Have flashlights and batteries ready."
                  },
                  {
                    id: 22,
                    description: "If you have a generator, ensure it's in working condition and has fuel."
                  },
                  {
                    id: 23,
                    description: "Monitor the structural integrity of your home. If you notice any cracks or shifting, evacuate immediately."
                  },
                  {
                    id: 24,
                    description: "Have a designated family meeting point in case you get separated."
                  },
                  {
                    id: 25,
                    description: "Stay calm and reassure family members, especially children and elderly."
                  }
                ]
              },
              windyData: windyData
            })
          }
        ],
        model: "llama3-groq-70b-8192-tool-use-preview",
        temperature: 0.39,
        max_tokens: 1024,
        top_p: 0.65,
        stream: false,
        response_format: {
          type: "json_object"
        },
        stop: null
      });

      const content = chatCompletion.choices[0].message.content;
      if (content) {
        const parsedData = JSON.parse(content) as PlannerData;
        setPlannerData(parsedData);
      } else {
        console.error("No content in the response");
      }
    } catch (error) {
      console.error("Error fetching planner data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <BrainCircuit className="w-6 h-6 mr-2" />
          AI Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Button 
          onClick={fetchPlannerData} 
          disabled={isLoading}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? "Loading..." : "Get Planner"}
        </Button>
        <div className="bg-[#010B13] rounded-lg p-4 flex-grow overflow-y-auto">
          {plannerData ? (
            <div className="space-y-4">
              <WeatherAlert alert={plannerData.alert} />
              <Checklist tasks={plannerData.tasks} />
            </div>
          ) : (
            <p className="text-white text-sm">
              {isLoading ? "Generating planner data..." : "Click 'Get Planner' to generate a plan based on current weather data."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherAlert({ alert }: { alert: PlannerData['alert'] }) {
  return (
    <div className="mb-4">
      <h2 className="text-white text-lg font-bold flex items-center mb-2">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
        Weather Alert
      </h2>
      <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-3">
        <h3 className="text-yellow-500 font-semibold mb-1">{alert.title}</h3>
        <p className="text-white text-sm">{alert.description}</p>
      </div>
    </div>
  );
}

function Checklist({ tasks }: { tasks: PlannerData['tasks'] }) {
  return (
    <div>
      <h2 className="text-white text-lg font-bold flex items-center mb-2">
        <CheckSquare className="w-5 h-5 mr-2 text-green-500" />
        Action Checklist
      </h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span className="text-white text-sm">{task.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
